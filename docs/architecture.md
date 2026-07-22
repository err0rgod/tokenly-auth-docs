# Architecture

Tokenly-Auth (and FastAPI-Auth) is built around a singular philosophy: **Database Agnosticism**.

## Why "Database Agnostic"?

Unlike many authentication libraries that force you to adopt a specific Object-Relational Mapper (ORM) like SQLAlchemy, SQLModel, or Tortoise ORM, Tokenly-Auth acts strictly as a **security toolkit**. 

We believe that authentication and security logic shouldn't dictate your data access layer.

### The Problem with Tightly-Coupled Auth
When an authentication library is tightly coupled to an ORM:
- Migrating to a different database (e.g., PostgreSQL to MongoDB) requires ripping out the entire authentication system.
- You are forced into specific schema designs (e.g., a mandatory `users` table with hardcoded columns).
- It adds heavy dependencies to your project, increasing bloat and deployment complexity.

### The Tokenly-Auth Solution
- **You** control the database (PostgreSQL, MongoDB, Redis, etc.).
- **You** control the models, schemas, and queries.
- **Tokenly-Auth** handles the complex, high-risk security primitives: password hashing, cryptographic signing, brute-force mitigation, and token validation.

By decoupling the *security logic* from the *storage logic*, Tokenly-Auth ensures total flexibility for modern, microservice-oriented Python applications.
