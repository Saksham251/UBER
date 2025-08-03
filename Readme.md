# Uber Backend

This is the backend service for the Uber Video application. It provides RESTful APIs for user and captain registration and authentication.

## Table of Contents

- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
  - [/users/register](#usersregister)
    - [Request Body](#request-body)
    - [Responses](#responses)
  - [/users/login](#userslogin)
    - [Request Body](#login-request-body)
    - [Responses](#login-responses)
  - [/users/profile](#usersprofile)
    - [Responses](#profile-responses)
  - [/users/logout](#userslogout)
    - [Responses](#logout-responses)
  - [/captain/register](#captainregister)
    - [Request Body](#captain-register-request-body)
    - [Responses](#captain-register-responses)
  - [/captain/login](#captainlogin)
    - [Request Body](#captain-login-request-body)
    - [Responses](#captain-login-responses)
  - [/captain/profile](#captainprofile)
    - [Responses](#captain-profile-responses)
  - [/captain/logout](#captainlogout)
    - [Responses](#captain-logout-responses)
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

### `/users/register`

Registers a new user.

- **URL:** `/users/register`
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

#### Responses

- **201 Created**  
  Returns a JWT token and user info.
- **400 Bad Request**  
  Validation failed.
- **500 Internal Server Error**  
  Server error.

---

### `/users/login`

Authenticates a user and returns a JWT token.

- **URL:** `/users/login`
- **Method:** `POST`
- **Content-Type:** `application/json`

#### Login Request Body

```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

#### Login Responses

- **201 Created**  
  Returns a JWT token and user info.
- **400 Bad Request**  
  Validation failed.
- **401 Unauthorized**  
  Invalid email or password.
- **500 Internal Server Error**  
  Server error.

---

### `/users/profile`

Returns the authenticated user's profile information.

- **URL:** `/users/profile`
- **Method:** `POST`
- **Headers:**  
  - `Authorization: Bearer <JWT_TOKEN>` (or cookie named `token`)

#### Profile Responses

- **200 OK**  
  Returns the user profile.
- **401 Unauthorized**  
  Missing or invalid token.

---

### `/users/logout`

Logs out the authenticated user by blacklisting the JWT token.

- **URL:** `/users/logout`
- **Method:** `POST`
- **Headers:**  
  - `Authorization: Bearer <JWT_TOKEN>` (or cookie named `token`)

#### Logout Responses

- **200 OK**  
  Logout successful.
- **401 Unauthorized**  
  Missing or invalid token.
- **500 Internal Server Error**  
  Server error.

---

### `/captain/register`

Registers a new captain.

- **URL:** `/captain/register`
- **Method:** `POST`
- **Content-Type:** `application/json`

#### Captain Register Request Body

```json
{
  "fullname": {
    "firstName": "Amit",
    "lastName": "Sharma"
  },
  "email": "amit@example.com",
  "password": "yourpassword",
  "vehicle": {
    "color": "Red",
    "plate": "AB1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

- `fullname.firstName` (string, required, min 3 chars)
- `fullname.lastName` (string, required, min 3 chars)
- `email` (string, required, must be valid email)
- `password` (string, required, min 6 chars)
- `vehicle.color` (string, required, min 3 chars)
- `vehicle.plate` (string, required, min 3 chars)
- `vehicle.capacity` (number, required, min 1)
- `vehicle.vehicleType` (string, required, one of: `car`, `motorcycle`, `auto`)

#### Captain Register Responses

- **201 Created**  
  Returns a JWT token and captain info.
  ```json
  {
    "token": "jwt_token_here",
    "captain": {
      "_id": "captain_id",
      "fullname": {
        "firstName": "Amit",
        "lastName": "Sharma"
      },
      "email": "amit@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "AB1234",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
  ```
- **400 Bad Request**  
  Validation failed or captain already exists.
- **500 Internal Server Error**  
  Server error.

---

### `/captain/login`

Authenticates a captain and returns a JWT token.

- **URL:** `/captain/login`
- **Method:** `POST`
- **Content-Type:** `application/json`

#### Captain Login Request Body

```json
{
  "email": "amit@example.com",
  "password": "yourpassword"
}
```

#### Captain Login Responses

- **201 Created**  
  Returns a JWT token and captain info.
  ```json
  {
    "token": "jwt_token_here",
    "captain": {
      "_id": "captain_id",
      "fullname": {
        "firstName": "Amit",
        "lastName": "Sharma"
      },
      "email": "amit@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "AB1234",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
  ```
- **400 Bad Request**  
  Validation failed.
- **401 Unauthorized**  
  Invalid email or password.
- **500 Internal Server Error**  
  Server error.

---

### `/captain/profile`

Returns the authenticated captain's profile information.

- **URL:** `/captain/profile`
- **Method:** `POST`
- **Headers:**  
  - `Authorization: Bearer <JWT_TOKEN>` (or cookie named `token`)

#### Captain Profile Responses

- **200 OK**  
  Returns the captain profile.
  ```json
  {
    "captain": {
      "_id": "captain_id",
      "fullname": {
        "firstName": "Amit",
        "lastName": "Sharma"
      },
      "email": "amit@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "AB1234",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
  ```
- **401 Unauthorized**  
  Missing or invalid token.

---

### `/captain/logout`

Logs out the authenticated captain by blacklisting the JWT token.

- **URL:** `/captain/logout`
- **Method:** `POST`
- **Headers:**  
  - `Authorization: Bearer <JWT_TOKEN>` (or cookie named `token`)

#### Captain Logout Responses

- **200 OK**  
  Logout successful.
  ```json
  {
    "message": "Logged out"
  }
  ```
- **401 Unauthorized**  
  Missing or invalid token.
- **500 Internal Server Error**  
  Server error.

---

## Project Structure

```
Backend/
├── controllers/
│   ├── user.controller.js
│   └── captain.controller.js
├── models/
│   ├── user.model.js
│   ├── captain.model.js
│   └── blackListToken.model.js
├── routes/
│   ├── user.routes.js
│   └── captain.routes.js
├── services/
│   ├── user.service.js
│   └── captain.service.js
├── app.js
├── server.js