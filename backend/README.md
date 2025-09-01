# Around the US - Backend API

The backend API for Around the US, a social travel photo sharing application. This RESTful API handles user authentication, photo management, and social interactions like likes and profiles.

## Features

🔐 **Authentication & Authorization**
- JWT-based user authentication
- Secure password hashing with bcrypt
- Protected routes with middleware authorization

👤 **User Management**
- User registration and login
- Profile management (name, bio, avatar)
- Email validation and unique user constraints

🖼️ **Photo/Card Management**
- Upload and share travel photos
- Delete own photos
- URL validation for image links

❤️ **Social Features**
- Like/unlike photos
- View all user-generated content
- User ownership validation

🛡️ **Security & Validation**
- Request validation with Celebrate/Joi
- Centralized error handling
- Request and error logging
- CORS configuration

## Technology Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Celebrate/Joi** - Request validation
- **Winston** - Logging
- **CORS** - Cross-origin resource sharing

## Project Structure

```
backend/
├── app.js                 # Main application entry point
├── models/                # MongoDB schemas
│   ├── user.js           # User model with auth fields
│   └── card.js           # Photo/card model
├── controllers/          # Business logic
│   ├── users.js          # User operations & auth
│   └── cards.js          # Photo/card operations
├── routes/               # API route definitions
│   ├── users.js          # User & auth routes
│   └── cards.js          # Photo/card routes
├── middlewares/          # Custom middleware
│   └── auth.js           # JWT authentication middleware
├── validation/           # Request validation schemas
│   └── schemas.js        # Joi validation schemas
├── .env.example          # Environment variables template
└── package.json          # Dependencies and scripts
```

## Setup & Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   ```

3. **Start the server:**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

## Environment Variables

Create a `.env` file with the following variables:

```env
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key
PORT=3000
MONGODB_URI=mongodb://localhost:27017/aroundb
```

## API Endpoints

### Public Routes (No Authentication Required)

| Method | Endpoint    | Description           | Body                          |
|--------|-------------|-----------------------|-------------------------------|
| POST   | `/signup`   | Register new user     | `{ email, password, name?, about?, avatar? }` |
| POST   | `/signin`   | Login user            | `{ email, password }`         |

### Protected Routes (Require Bearer Token)

**User Management:**
| Method | Endpoint           | Description                    |
|--------|--------------------|--------------------------------|
| GET    | `/users/me`        | Get current user profile       |
| GET    | `/users`           | Get all users                  |
| PATCH  | `/users/me`        | Update profile (name, about)   |
| PATCH  | `/users/me/avatar` | Update profile avatar          |

**Photo/Card Management:**
| Method | Endpoint                 | Description                    |
|--------|--------------------------|--------------------------------|
| GET    | `/cards`                 | Get all photos/cards           |
| POST   | `/cards`                 | Create new photo/card          |
| DELETE | `/cards/:cardId`         | Delete own photo/card          |
| PUT    | `/cards/:cardId/likes`   | Like a photo/card              |
| DELETE | `/cards/:cardId/likes`   | Remove like from photo/card    |

### Development Routes

| Method | Endpoint      | Description                    |
|--------|---------------|--------------------------------|
| GET    | `/crash-test` | Test server crash recovery (PM2) |

## Authentication

All protected routes require a Bearer token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

The token is returned upon successful login/registration and contains the user's ID.


## Error Handling

The API uses centralized error handling with consistent response formats:

| Status Code | Description                    | Response                                        |
|-------------|--------------------------------|-------------------------------------------------|
| 400         | Validation error               | `{ "message": "Invalid data" }`                |
| 401         | Authentication required        | `{ "message": "Unauthorized" }`                |
| 403         | Insufficient permissions       | `{ "message": "Forbidden" }`                   |
| 404         | Resource not found             | `{ "message": "Resource not found" }`          |
| 409         | Conflict (duplicate email)     | `{ "message": "Email already exists" }`        |
| 500         | Server error                   | `{ "message": "An error has occurred on the server" }` |

## Logging

The application logs all requests and errors:
- **Request logs**: Stored in `request.log`
- **Error logs**: Stored in `error.log`

Both use JSON format for structured logging.

## Development

**Code Linting:**
```bash
npm run lint
```

**Testing API:**
Use tools like [Postman](https://www.postman.com/) or [Thunder Client](https://www.thunderclient.com/) to test the API endpoints.

## Production Deployment

The API is designed for production deployment with:
- Environment variable configuration
- PM2 process management
- Error logging and monitoring
- Security middleware and validation

## Database Models

**User Model:**
- Email (unique, required)
- Password (hashed, required)
- Name (optional, default: "Jacques Cousteau")
- About (optional, default: "Explorador")
- Avatar (optional, default URL provided)

**Card Model:**
- Name (required)
- Link (required, validated URL)
- Owner (required, references User)
- Likes (array of User references)
- Created date
