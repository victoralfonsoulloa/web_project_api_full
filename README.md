# Around the US - Social Travel Photo Sharing App

Around the US is a full-stack social media application where users can share and discover beautiful travel photos from around the United States. Users can register accounts, upload photos of their favorite places, and interact with other travelers' content through likes and comments.

## Features

🌎 **Share Your Adventures**: Upload photos of your favorite travel destinations across the US
👤 **Personal Profiles**: Create and customize your profile with avatar and bio
❤️ **Social Interaction**: Like and discover photos shared by other travelers
🔒 **Secure Authentication**: Safe user registration and login system
📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technology Stack

- **Frontend**: React with modern hooks and responsive design
- **Backend**: Node.js/Express API with JWT authentication
- **Database**: MongoDB for storing user profiles and photo data
- **Deployment**: Cloud server with HTTPS and automatic SSL renewal

### Project Structure

```
web_project_api_full/
├── backend/        # Node.js API server
├── frontend/       # React application
├── deploy.sh       # Automated deployment script
├── package.json    # Deployment scripts
└── README.md       # Project documentation
```

## Getting Started

### Live Application

🌐 **Visit**: https://around-the-us.mooo.com

### Local Development

1. **Clone the repository**

```bash
git clone https://github.com/victoralfonsoulloa/web_project_api_full.git
cd web_project_api_full
```

2. **Backend Setup**

```bash
cd backend
npm install
# Create .env file with your MongoDB URI and JWT secret
npm start
```

3. **Frontend Setup**

```bash
cd frontend
npm install
npm run dev
```

### Easy Deployment

```bash
npm run deploy
```

## Sprint 18 Technical Requirements

This project was built as part of TripleTen's Sprint 18, implementing advanced full-stack development concepts including user authentication, error handling, and production deployment.

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

- [x] Centralized error handling
- [x] Request validation with celebrate
- [x] Request/error logging
- [x] Cloud deployment
- [x] Domain setup with HTTPS
- [x] PM2 configuration
- [x] Environment variables setup

### Live Application

🌐 **Visit the App**: https://around-the-us.mooo.com  
🔗 **Alternative URL**: https://www.around-the-us.mooo.com  
🖥️ **Server IP**: http://34.53.31.53  
✅ **Status**: Live with HTTPS enabled

### App Features in Action:

- 📝 **User Registration & Login**: Create your travel profile
- 🖼️ **Photo Upload**: Share your favorite US travel destinations
- 👤 **Profile Management**: Update your avatar and bio
- ❤️ **Like System**: Show appreciation for other travelers' photos
- 🗑️ **Content Management**: Edit and delete your own posts
- 🔐 **Secure Access**: Protected routes and user authentication

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
