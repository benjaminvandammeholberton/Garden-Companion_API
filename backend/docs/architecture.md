
# Architecture

- **app:**
  - Main application package.

- **api:**
  - API-related code.

- **api_v1:**
  - Versioned API code.

- **handlers:**
  - Request handlers for API endpoints.

- **auth:**
  - Authentication-related code.

- **deps:**
  - Dependency injection and dependencies code.

- **core:**
  - Core application code, such as configuration and security.

- **models:**
  - Database models.

- **schemas:**
  - Pydantic schemas for request and response validation.

- **services:**
  - Business logic and service layer.

- **app.py:**
  - Main application file.


1. Requested Route
   
   |
   
   v
2. handlers --> 3. Verification (Pydantic Schemas) --> 4. Dependency Injection
   
   |
   
   v
5. Business Logic (Service Layer) --> 6. Database Interaction
   
   |
   
   v
7. Response Preparation (Pydantic Schemas) --> 8. Response Serialization (JSON Format) --> 9. Response to Client (HTTP Response)

