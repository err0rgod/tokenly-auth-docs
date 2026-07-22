# Validators

The `validators` module provides decorators to enforce strict structural requirements on user credentials, ensuring that weak passwords or invalid usernames are rejected before they even reach the database or hashing logic.

## Credential Structure

The `validate_creds_structure` decorator wraps a function (like a user registration or password reset handler) and automatically validates the `user_name` and `password` arguments.

### Rules Enforced

**Username:**
- Must be between 3 and 15 characters long.
- Must be purely alphanumeric (no special characters).

**Password:**
- Minimum of 8 characters.
- At least one uppercase letter.
- At least one lowercase letter.
- At least one digit.
- At least one special character (`!@#$%^&*()-_=+[]{}|;:,.<>?/`).

### Usage

```python
from tokenly_auth.validators.credentials import validate_creds_structure

@validate_creds_structure
def register_user(user_name: str, password: str, email: str):
    # This block will only execute if user_name and password pass all structural checks.
    print(f"Registering {user_name} with email {email}")
    return True

# Valid registration
register_user("johnDoe123", "StrongPass!1", "john@example.com")

# Invalid registration (raises ValueError: Password must contain at least one digit)
try:
    register_user("johnDoe123", "WeakPassword!", "john@example.com")
except ValueError as e:
    print(e)
```
