# Book Review Application - Final Project

## Project Overview

This is a RESTful API for a book review application built with Express.js, featuring JWT authentication, session management, and async/await operations. Users can browse books, register accounts, login, and manage book reviews.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing with cURL](#testing-with-curl)
- [Implementation Details](#implementation-details)

## Features

### Authentication & Security

- ✅ JWT-based authentication
- ✅ Session management with express-session
- ✅ Protected routes for authenticated users
- ✅ User registration and login system

### Public Features (No Authentication Required)

- ✅ Browse all books in the catalog
- ✅ Search books by ISBN
- ✅ Search books by author
- ✅ Search books by title
- ✅ View book reviews
- ✅ User registration

### Protected Features (Authentication Required)

- ✅ User login with JWT token generation
- ✅ Add book reviews
- ✅ Modify existing reviews
- ✅ Delete reviews

### Async Operations

- ✅ Async/await implementation for fetching all books
- ✅ Promise-based search by ISBN
- ✅ Promise-based search by author
- ✅ Promise-based search by title

## Project Structure

```
book-review-app/
├── index.js                    # Main server file with middleware
├── package.json                # Project dependencies
├── README.md                   # This file
└── router/
    ├── booksdb.js             # Book database (DO NOT MODIFY)
    ├── general.js             # Public routes implementation
    └── auth_users.js          # Authentication & protected routes
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Steps

1. **Clone or download the repository**

   ```bash
   cd book-review-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install axios for async operations** (if not already installed)
   ```bash
   npm install axios --save
   ```

## Running the Application

### Start the server

```bash
npm start
```

The server will start on **port 5000** and you should see:

```
Server is running
```

### Alternative start command

```bash
node index.js
```

## API Endpoints

### Public Endpoints (No Authentication Required)

| Method | Endpoint          | Description            | Parameters                     |
| ------ | ----------------- | ---------------------- | ------------------------------ |
| GET    | `/`               | Get all books          | None                           |
| GET    | `/isbn/:isbn`     | Get book by ISBN       | isbn (path param)              |
| GET    | `/author/:author` | Get books by author    | author (path param)            |
| GET    | `/title/:title`   | Get books by title     | title (path param)             |
| GET    | `/review/:isbn`   | Get reviews for a book | isbn (path param)              |
| POST   | `/register`       | Register new user      | username, password (JSON body) |

### Protected Endpoints (Authentication Required)

| Method | Endpoint                      | Description       | Parameters                     |
| ------ | ----------------------------- | ----------------- | ------------------------------ |
| POST   | `/customer/login`             | Login user        | username, password (JSON body) |
| PUT    | `/customer/auth/review/:isbn` | Add/modify review | isbn (path), review (query)    |
| DELETE | `/customer/auth/review/:isbn` | Delete review     | isbn (path param)              |

### Async/Promise Endpoints (Bonus - Part E)

| Method | Endpoint                | Description         | Implementation |
| ------ | ----------------------- | ------------------- | -------------- |
| GET    | `/async/books`          | Get all books       | Async/Await    |
| GET    | `/async/isbn/:isbn`     | Get book by ISBN    | Promise        |
| GET    | `/async/author/:author` | Get books by author | Promise        |
| GET    | `/async/title/:title`   | Get books by title  | Promise        |

## Testing with cURL

### 1. Get All Books (Question 2)

```bash
curl http://localhost:5000/
```

**Expected Output:**

```json
{
    "1": {
        "author": "Chinua Achebe",
        "title": "Things Fall Apart",
        "reviews": {}
    },
    ...
}
```

### 2. Get Book by ISBN (Question 3)

```bash
curl http://localhost:5000/isbn/1
```

**Expected Output:**

```json
{
  "author": "Chinua Achebe",
  "title": "Things Fall Apart",
  "reviews": {}
}
```

### 3. Get Books by Author (Question 4)

```bash
curl http://localhost:5000/author/Chinua%20Achebe
```

**Expected Output:**

```json
[
  {
    "author": "Chinua Achebe",
    "title": "Things Fall Apart",
    "reviews": {}
  }
]
```

### 4. Get Books by Title (Question 5)

```bash
curl http://localhost:5000/title/Things%20Fall%20Apart
```

**Expected Output:**

```json
[
  {
    "author": "Chinua Achebe",
    "title": "Things Fall Apart",
    "reviews": {}
  }
]
```

### 5. Get Book Reviews (Question 6)

```bash
curl http://localhost:5000/review/1
```

**Expected Output:**

```json
{}
```

### 6. Register a New User (Question 7)

```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}'
```

**Expected Output:**

```json
{
  "message": "User successfully registered. Now you can login"
}
```

### 7. Login as Registered User (Question 8)

```bash
curl -X POST http://localhost:5000/customer/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}' \
  -c cookies.txt
```

**Expected Output:**

```
User successfully logged in
```

**Note:** The `-c cookies.txt` flag saves the session cookie for subsequent requests.

### 8. Add/Modify Book Review (Question 9)

```bash
curl -X PUT "http://localhost:5000/customer/auth/review/1?review=This%20is%20a%20great%20book!" \
  -H "Content-Type: application/json" \
  -b cookies.txt
```

**Expected Output:**

```json
{
  "message": "Review successfully added/updated",
  "reviews": {
    "testuser": "This is a great book!"
  }
}
```

**Note:** The `-b cookies.txt` flag sends the saved session cookie.

### 9. Delete Book Review (Question 10)

```bash
curl -X DELETE http://localhost:5000/customer/auth/review/1 \
  -H "Content-Type: application/json" \
  -b cookies.txt
```

**Expected Output:**

```json
{
  "message": "Review successfully deleted",
  "reviews": {}
}
```

### 10. Test Async Endpoints (Question 11)

**Get all books (async/await):**

```bash
curl http://localhost:5000/async/books
```

**Get book by ISBN (Promise):**

```bash
curl http://localhost:5000/async/isbn/1
```

**Get books by author (Promise):**

```bash
curl http://localhost:5000/async/author/Chinua%20Achebe
```

**Get books by title (Promise):**

```bash
curl http://localhost:5000/async/title/Things%20Fall%20Apart
```

## Implementation Details

### 1. Authentication Middleware (`index.js`)

```javascript
app.use("/customer/auth/*", function auth(req, res, next) {
  if (req.session.authorization) {
    let token = req.session.authorization["accessToken"];
    jwt.verify(token, "access", (err, user) => {
      if (!err) {
        req.user = user;
        next();
      } else {
        return res.status(403).json({ message: "User not authenticated" });
      }
    });
  } else {
    return res.status(403).json({ message: "User not logged in" });
  }
});
```

### 2. User Validation (`auth_users.js`)

```javascript
const isValid = (username) => {
  let userswithsamename = users.filter((user) => {
    return user.username === username;
  });
  return userswithsamename.length > 0;
};
```

### 3. User Authentication (`auth_users.js`)

```javascript
const authenticatedUser = (username, password) => {
  let validusers = users.filter((user) => {
    return user.username === username && user.password === password;
  });
  return validusers.length > 0;
};
```

### 4. User Registration (`general.js`)

- Validates username and password are provided
- Checks if username already exists
- Adds new user to users array
- Returns success or error message

### 5. User Login (`auth_users.js`)

- Validates credentials using `authenticatedUser()`
- Generates JWT token with 1-hour expiration
- Stores token in session
- Returns success or error message

### 6. Review Management (`auth_users.js`)

- **Add/Modify:** Stores review with username as key
- **Delete:** Removes review for the logged-in user
- All operations require valid JWT authentication

### 7. Async Operations (`general.js`)

- **Async/Await:** Used for retrieving all books
- **Promises:** Used for searching by ISBN, author, and title
- Proper error handling for all async operations

## Book Database

The application uses a pre-populated book database with 10 classic books:

1. Things Fall Apart - Chinua Achebe
2. Fairy tales - Hans Christian Andersen
3. The Divine Comedy - Dante Alighieri
4. The Epic Of Gilgamesh - Unknown
5. The Book Of Job - Unknown
6. One Thousand and One Nights - Unknown
7. Njál's Saga - Unknown
8. Pride and Prejudice - Jane Austen
9. Le Père Goriot - Honoré de Balzac
10. Molloy, Malone Dies, The Unnamable, the trilogy - Samuel Beckett

## Important Notes

### URL Encoding

When testing with cURL, remember to URL encode special characters:

- Space → `%20`
- Example: "Chinua Achebe" → `Chinua%20Achebe`

### Session Management

- Login creates a session with JWT token
- Token expires after 1 hour
- Use cookies to maintain session across requests
- Protected routes require valid session token

### Error Handling

The application returns appropriate HTTP status codes:

- `200` - Success
- `403` - Forbidden (authentication failed)
- `404` - Not found (user/book/review doesn't exist)
- `400` - Bad request (missing required parameters)
- `500` - Server error

## Grading Rubric Reference

This implementation covers all required tasks:

- ✅ **Question 1:** GitHub repository forked from ibm-developer-skills-network
- ✅ **Question 2:** Get all books - `curl http://localhost:5000/`
- ✅ **Question 3:** Get by ISBN - `curl http://localhost:5000/isbn/1`
- ✅ **Question 4:** Get by author - `curl http://localhost:5000/author/...`
- ✅ **Question 5:** Get by title - `curl http://localhost:5000/title/...`
- ✅ **Question 6:** Get reviews - `curl http://localhost:5000/review/1`
- ✅ **Question 7:** Register user - `curl -X POST .../register`
- ✅ **Question 8:** Login user - `curl -X POST .../customer/login`
- ✅ **Question 9:** Add/modify review - `curl -X PUT .../auth/review/1`
- ✅ **Question 10:** Delete review - `curl -X DELETE .../auth/review/1`
- ✅ **Question 11:** Async operations in general.js with Promises and async/await

## License

MIT

## Author

[Your Name]

## Acknowledgments

- IBM Developer Skills Network
- Course: Developing Back-End Apps with Node.js and Express
