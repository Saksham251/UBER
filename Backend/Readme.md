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
    GOOGLE_MAPS_API=your_google_maps_api_key
    ```

4. Enable Google Maps APIs in Google Cloud Console:
    1. Go to [Google Cloud Console](https://console.cloud.google.com/).
    2. Create/select a project.
    3. Navigate to **APIs & Services > Library**.
    4. Search and enable the following APIs:
        - **Maps JavaScript API**
        - **Geocoding API**
        - **Distance Matrix API**
        - **Places API**
    5. Go to **APIs & Services > Credentials** and create an API key.
    6. Copy the API key and add it to your `.env` file as `GOOGLE_MAPS_API`.

5. Start the server:
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
    "firstName": "Priya",
    "lastName": "Sharma"
  },
  "email": "priya.sharma@example.com",
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
  "email": "priya.sharma@example.com",
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
    "firstName": "Rohan",
    "lastName": "Verma"
  },
  "email": "rohan.verma@example.com",
  "password": "yourpassword",
  "vehicle": {
    "color": "Blue",
    "plate": "DL5CAB1234",
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
        "firstName": "Rohan",
        "lastName": "Verma"
      },
      "email": "rohan.verma@example.com",
      "vehicle": {
        "color": "Blue",
        "plate": "DL5CAB1234",
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
  "email": "rohan.verma@example.com",
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
        "firstName": "Rohan",
        "lastName": "Verma"
      },
      "email": "rohan.verma@example.com",
      "vehicle": {
        "color": "Blue",
        "plate": "DL5CAB1234",
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
        "firstName": "Rohan",
        "lastName": "Verma"
      },
      "email": "rohan.verma@example.com",
      "vehicle": {
        "color": "Blue",
        "plate": "DL5CAB1234",
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

### `/maps/get-coordinates`

Returns latitude and longitude for a given address using Google Maps Geocoding API.

- **URL:** `/maps/get-coordinates`
- **Method:** `GET`
- **Headers:**  
  - `Authorization: Bearer <JWT_TOKEN>` (or cookie named `token`)
- **Query Parameters:**
  - `address` (string, required, min 3 chars)

#### Responses
- **200 OK**
  ```json
  {
    "lat": 28.6139,
    "lng": 77.2090
  }
  ```
- **400 Bad Request**  
  Validation failed.
- **404 Not Found**  
  Coordinates not found.

---

### `/maps/get-distance-time`

Returns distance and duration between origin and destination using Google Maps Distance Matrix API.

- **URL:** `/maps/get-distance-time`
- **Method:** `GET`
- **Headers:**  
  - `Authorization: Bearer <JWT_TOKEN>` (or cookie named `token`)
- **Query Parameters:**
  - `origin` (string, required, min 3 chars)
  - `destination` (string, required, min 3 chars)

#### Responses
- **200 OK**
  ```json
  {
    "distance": { "text": "10 km", "value": 10000 },
    "duration": { "text": "20 mins", "value": 1200 }
  }
  ```
- **400 Bad Request**  
  Validation failed.
- **404 Not Found**  
  No route found.

---

### `/maps/get-suggestions`

Returns location autocomplete suggestions using Google Maps Places API.

- **URL:** `/maps/get-suggestions`
- **Method:** `GET`
- **Query Parameters:**
  - `input` (string, required, min 3 chars)

#### Responses
- **200 OK**
  ```json
  [
    {
      "description": "New Delhi, India",
      "place_id": "ChIJLbZ-NFv9DDkRzk0gTkm3wlI"
    },
    ...
  ]
  ```
- **400 Bad Request**  
  Validation failed.
- **404 Not Found**  
  No suggestions found.

---

### `/rides/create`

Creates a new ride request.

- **URL:** `/rides/create`
- **Method:** `POST`
- **Content-Type:** `application/json`
- **Headers:**  
  - `Authorization: Bearer <JWT_TOKEN>` (or cookie named `token`)

#### Request Body

```json
{
  "pickup": "Connaught Place, New Delhi",
  "destination": "Cyber Hub, Gurgaon",
  "vehicleType": "car"
}
```

- `pickup` (string, required, min 3 chars)
- `destination` (string, required, min 3 chars)
- `vehicleType` (string, required, one of: `auto`, `car`, `moto`)

#### Responses

- **200 OK**  
  Returns the created ride object.
  ```json
  {
    "ride": {
        "_id": "60d21b4667d0d8992e610c85",
        "user": "60d21b4667d0d8992e610c84",
        "pickup": "Connaught Place, New Delhi",
        "destination": "Cyber Hub, Gurgaon",
        "fare": 450.50,
        "status": "pending"
    }
  }
  ```
- **400 Bad Request**  
  Validation failed.
- **500 Internal Server Error**  
  Server error.

---

## 🗺️ Google Maps API Setup

To enable Google Maps services for this project, follow these steps:

1. **Go to Google Cloud Console**  
   👉 [Google Cloud Console](https://console.cloud.google.com/)

2. **Create / Select a Project**  
   - If you don’t have a project yet, create a new one.  
   - Otherwise, select your existing project.

3. **Enable Required APIs**  
   Navigate to **APIs & Services > Library** and enable the following APIs:
   - ✅ Maps JavaScript API  
   - ✅ Geocoding API  
   - ✅ Distance Matrix API  
   - ✅ Places API  

4. **Generate API Key**  
   - Go to **APIs & Services > Credentials**  
   - Click **Create Credentials → API Key**  
   - Copy the generated key.

5. **Add API Key to Environment Variables**  
   In your `.env` file, add:  
   ```env
   GOOGLE_MAPS_API=your_api_key_here
   

## Project Structure

```
Backend/
├── controllers/
│   ├── user.controller.js
│   ├── captain.controller.js
│   ├── map.controller.js
│   └── ride.controller.js
├── db/
│   └── db.js
├── middlewares/
│   └── auth.middleware.js
├── models/
│   ├── user.model.js
│   ├── captain.model.js
│   ├── blackListToken.model.js
│   └── ride.model.js
├── routes/
│   ├── user.routes.js
│   ├── captain.routes.js
│   ├── maps.routes.js
│   └── ride.routes.js
├── services/
│   ├── user.service.js
│   ├── captain.service.js
│   ├── maps.service.js
│   └── ride.service.js
├── app.js
├── package.json
├── server.js
└── Readme.md
```