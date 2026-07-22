# Middleware

The `middleware` module provides decorators and classes to protect your endpoints with authentication and rate limiting.

## Authentication Decorator

The `require_auth` decorator enforces JWT authentication on a function. It seamlessly integrates with `jwtHandler` and can optionally check if a token has been blacklisted.

```python
from tokenly_auth.middleware.auth import require_auth
from tokenly_auth.tokens.jwt import jwtHandler

handler = jwtHandler(SECRET_KEY="your_secret_key")

@require_auth(jwt_handler=handler, isBlacklisted=False)
def protected_route(payload):
    # 'payload' contains the decoded JWT data
    return f"Hello, User {payload['sub']}!"
```
*Note: The decorator expects the access token to be passed as the first positional argument (`token`) when the decorated function is called.*

## Rate Limiting

The `RateLimiter` class implements a storage-agnostic rate limiting mechanism. It can be used to prevent brute-force attacks on login endpoints or to mitigate general API abuse. 

It requires a storage client (like Redis or Memcached) that supports `incr` (increment) and `expire` operations.

### Integration with Redis

```python
import redis
from tokenly_auth.middleware.ratelimit import RateLimiter

# 1. Initialize your storage client
redis_client = redis.Redis(host='localhost', port=6379, db=0)

# 2. Configure the rate limiter (e.g., 5 requests per 60 seconds)
limiter = RateLimiter(storage_client=redis_client, max_requests=5, window=60)

# 3. Check the limit in your endpoint
def login_endpoint(username: str):
    try:
        # Action defaults to "login"
        current_count = limiter.check_limit(identifier=username, action="login")
        print(f"Login attempt {current_count} for {username}")
        
        # Proceed with authentication...
    except ValueError as e:
        return {"error": str(e)} # "Rate limit exceeded. Try again in 60 seconds"
```
