## Sprint 18 - Full Stack Application

This project consists of two main parts:

1. **Backend**: Node.js API with user authentication and authorization
2. **Frontend**: React application that connects to the backend API

### Project Structure

```
web_project_api_full/
├── backend/        # Node.js API server
├── frontend/       # React application
└── README.md       # This file
```

### Setup Instructions

1. **Backend Setup**: Copy your existing backend code into the `backend/` folder
2. **Frontend Setup**: Copy your existing frontend code into the `frontend/` folder

### Next Steps

- Clone your existing backend repository content into `backend/`
- Clone your existing frontend repository content into `frontend/`
- Implement user authentication and authorization
- Add centralized error handling
- Configure CORS for frontend-backend communication
- Deploy to cloud server with domain and HTTPS

### Requirements Checklist

**Part I: User Authentication & Authorization**

- [x] User registration and login with email/password
- [x] JWT token authentication
- [x] Protected routes with authorization middleware
- [x] Email validation using validator package
- [x] Password hashing
- [x] User schema updated with email/password fields
- [x] Authentication middleware created
- [x] User ownership validation for cards
- [x] CORS configuration
- [x] Remove hardcoded user middleware

**Part II: Error Handling & Deployment**

- [ ] Centralized error handling
- [ ] Request validation with celebrate
- [ ] Request/error logging
- [ ] Cloud deployment
- [ ] Domain setup with HTTPS
- [ ] PM2 configuration
- [ ] Environment variables setup

### Testing Endpoints

**Public Routes:**

- POST `/signup` - Register new user
- POST `/signin` - Login user

**Protected Routes (require Bearer token):**

- GET `/users/me` - Get current user info
- GET `/users` - Get all users
- PATCH `/users/me` - Update user profile
- PATCH `/users/me/avatar` - Update user avatar
- GET `/cards` - Get all cards
- POST `/cards` - Create new card
- DELETE `/cards/:cardId` - Delete own card
- PUT `/cards/:cardId/likes` - Like card
- DELETE `/cards/:cardId/likes` - Unlike card

**Test Route:**

- GET `/crash-test` - Crash server for PM2 testing
