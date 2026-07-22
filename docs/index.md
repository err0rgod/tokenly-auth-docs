# FastAPI-Auth (Tokenly-Auth)

FastAPI-Auth (Tokenly-Auth) is a professional-grade, database-agnostic authentication and session management utility library for Python. It provides high-level security primitives without enforcing any specific database ORM or model structure, giving you total flexibility.

## Core Features

- **Crypto Utilities:** Argon2id password hashing and verification with brute-force protection logic.
- **Token Management:** JWT creation and verification.
- **Session Utilities:** Secure refresh token hashing for rotation strategies.
- **Middleware:** Storage-agnostic rate limiting and authentication decorators.
- **Validation:** Strict structural validation for usernames and passwords.
- **Lightweight:** No dependency on SQLModel, Pydantic, or any specific database driver.

## Installation

```bash
pip install tokenly-auth
```

## Quick Start

See the [Core Modules](crypto.md) section for detailed guides on how to use each feature.

- [Crypto Module](crypto.md): Hash and verify passwords using Argon2id.
- [Tokens Module](tokens.md): Manage JWT access and refresh tokens.
- [Middleware Module](middleware.md): Rate limiting and authentication decorators.
- [Validators Module](validators.md): Enforce strict credential requirements.
- [Architecture](architecture.md): Learn about the database-agnostic philosophy.
