# Crypto

The `crypto` module provides robust security primitives for password hashing and verification using the industry-standard **Argon2id** algorithm. It includes built-in brute-force protection logic.

## Functions

### Hashing Passwords

Use the `hash_password` function to generate a secure Argon2 hash.

```python
from tokenly_auth.crypto.passwords import hash_password

hashed = hash_password("my_secure_password", user_id="user_123")
```

### Verifying Passwords

Use the `verifyPassword` function to compare a plain-text password against a stored hash. It supports brute-force protection by checking a `locked_until` timestamp.

```python
from tokenly_auth.crypto.passwords import verifyPassword
from datetime import datetime

# Basic verification
is_valid = verifyPassword("my_secure_password", hashed, user_id="user_123")

# Verification with lockout check
is_valid = verifyPassword(
    "my_secure_password", 
    hashed, 
    user_id="user_123",
    locked_until=datetime(2030, 1, 1) # Will raise ValueError if current time < locked_until
)
```

### Resetting Passwords

Use the `resetPassword` function to safely update a password. This function first verifies the old password before generating a new hash, ensuring the user is authorized to make the change.

```python
from tokenly_auth.crypto.passwords import resetPassword

new_hash = resetPassword(
    old_hash=hashed,
    old_password_plain="old_password",
    new_password="new_password_123",
    user_id="user_123"
)
```
