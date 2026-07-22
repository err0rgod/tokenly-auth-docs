# Tokens

The `tokens` module handles JSON Web Token (JWT) generation and verification, as well as secure refresh token management.

## Access Tokens (JWT)

The `jwtHandler` class manages the creation and verification of JWTs. It uses strong cryptographic signatures (default `HS256`, though `RS256` is also supported) to ensure token integrity.

### Initialization

```python
from tokenly_auth.tokens.jwt import jwtHandler

handler = jwtHandler(SECRET_KEY="your_super_secret_key", algorithm="HS256")
```

### Creating Tokens

`createJwt` generates both a short-lived access token and a cryptographically secure, random refresh token.

```python
# Create access & refresh tokens
tokens = handler.createJwt(sub="user_id_123", jwt_mins=15, refresh_days=7)

# Returns:
# {
#   "access_token": "eyJhbGciOiJIUzI1NiIsInR5c...",
#   "refresh_token": "a_secure_urlsafe_random_string",
#   "refresh_days": 7
# }
```

### Verifying Tokens

`verifyJwt` decodes and validates the token signature and expiration date. If the token is invalid or expired, it raises a `ValueError`.

```python
try:
    payload = handler.verifyJwt(tokens["access_token"])
    print(payload["sub"]) # "user_id_123"
except ValueError as e:
    print(f"Token error: {e}")
```

## Refresh Tokens

The `RefreshManager` (often referred to as `SessionManager` in legacy documentation) provides utilities for hashing refresh tokens before storing them in the database.

```python
from tokenly_auth.tokens.refresh import RefreshManager

session_util = RefreshManager()

# Hash the refresh token for secure database storage
storage_hash = session_util.hash_refresh_token(tokens["refresh_token"])
```
