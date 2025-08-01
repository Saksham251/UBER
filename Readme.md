# Uber Backend

This is the backend service for the Uber Video application. It provides RESTful APIs for user registration and authentication.

## Table of Contents

- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
  - [/user/register](#userregister)
    - [Request Body](#request-body)
    - [Responses](#responses)
- [Project Structure](#project-structure)
- [License](#license)

---

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB

### Installation

1. Clone this repository.
2. Install dependencies:
    ```
    npm install
    ```
3. Create a `.env` file in the root directory with the following variables:
    ```
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```
4. Start the server:
    ```
    node server.js
    ```

---

## API Endpoints

### `/user/register`

Registers a new user.

- **URL:** `/user/register`
- **Method:** `POST`
- **Content-Type:** `application/json`

#### Request Body

```json
{
  "fullname": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john@example.com",
  "password": "yourpassword"
}
```

- `fullname.firstName` (string, required, min 3 chars)
- `fullname.lastName` (string, required, min 3 chars)
- `email` (string, required, must be valid email)
- `password` (string, required, min 6 chars)

#### Responses

- **201 Created**
  - Registration successful.
  - Returns a JWT token and user info.
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john@example.com"
    }
  }
  ```

- **400 Bad Request**
  - Validation failed.
  - Example:
  ```json
  {
    "errors": [
      {
        "msg": "First name must be at least 3 characters long",
        "param": "fullname.firstName",
        "location": "body"
      }
    ]
  }
  ```

- **500 Internal Server Error**
  - Server error.
  - Example:
  ```json
  {
    "message": "Server error"
  }
  ```

---

## Project Structure

```
Backend/
├── controllers/
│   └── user.controller.js
├── models/
│   └── user.model.js
├── routes/
│   └── user.routes.js
├── services/
│   └── user.service.js
├── app.js
├── server.js
├── package.json
└── .env