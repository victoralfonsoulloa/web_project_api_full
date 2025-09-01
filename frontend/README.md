# Around the US - Frontend

The frontend application for Around the US, a responsive social travel photo sharing platform built with React. Users can create profiles, share travel photos, and interact with content from other travelers across the United States.

## Features

🎨 **Modern React Interface**
- Responsive design that works on desktop and mobile
- Modern React hooks and functional components
- Smooth animations with Framer Motion
- Clean, intuitive user experience

👤 **User Authentication**
- Secure registration and login forms
- JWT token management with localStorage
- Protected routes and authentication persistence
- User profile management

🖼️ **Photo Sharing**
- Upload travel photos with titles and descriptions
- Image validation and URL support
- Responsive image gallery layout
- Delete own photos

❤️ **Social Interactions**
- Like and unlike photos from other users
- Real-time like count updates
- Visual feedback for user interactions

📱 **Responsive Design**
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interface elements
- Cross-browser compatibility

## Technology Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **CSS Modules** - Scoped styling
- **Framer Motion** - Smooth animations
- **JavaScript ES6+** - Modern JavaScript features

## Project Structure

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── App/            # Main app component
│   │   ├── Header/         # Navigation header
│   │   ├── Main/           # Main content area
│   │   │   ├── Components/ # Main sub-components
│   │   │   │   ├── Card/   # Photo card component
│   │   │   │   └── Popup/  # Modal components
│   │   │   └── Main.jsx    # Main component logic
│   │   ├── Login/          # Authentication forms
│   │   ├── Register/       # User registration
│   │   └── ProtectedRoute/ # Route protection
│   ├── contexts/           # React contexts
│   │   └── CurrentUserContext.js # User state management
│   ├── utils/              # Utility functions
│   │   ├── api.js          # API communication
│   │   └── auth.js         # Authentication helpers
│   ├── images/             # Static images and icons
│   ├── styles/             # CSS stylesheets
│   └── index.js            # Application entry point
├── public/                 # Static assets
├── .env.development        # Development environment variables
├── .env.production         # Production environment variables
└── package.json            # Dependencies and scripts
```

## Setup & Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   
   The app uses environment variables to configure the API endpoint:
   
   **Development (.env.development):**
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```
   
   **Production (.env.production):**
   ```env
   VITE_API_BASE_URL=https://around-the-us.mooo.com/api
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint for code quality
npm run lint
```

## Component Architecture

### Main Components

- **App**: Root component with routing and authentication state
- **Header**: Navigation with user avatar and logout functionality
- **Main**: Photo gallery and user profile management
- **Card**: Individual photo display with like functionality
- **Popup**: Modal system for forms and image viewing

### Authentication Flow

1. **Login/Register**: Forms with validation
2. **Token Storage**: JWT stored in localStorage
3. **Route Protection**: ProtectedRoute component guards authenticated pages
4. **Auto-login**: Check for valid token on app initialization

### State Management

- **CurrentUserContext**: Global user state management
- **Local State**: Component-specific state with React hooks
- **API Integration**: Centralized API calls with error handling

## API Integration

The frontend communicates with the backend API through:

- **auth.js**: Authentication endpoints (login, register, token validation)
- **api.js**: Protected resource endpoints (users, cards, likes)

All API calls include:
- Automatic token inclusion for protected routes
- Error handling with user feedback
- Loading states for better UX

## Development Guidelines

- **Components**: Use functional components with hooks
- **Styling**: CSS modules for component-scoped styles
- **API Calls**: Centralized in utils directory
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback for async operations

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Responsive Design

The application is fully responsive with:

- **Mobile First**: Designed for mobile devices first
- **Breakpoints**: Tablet and desktop optimizations
- **Flexible Layouts**: CSS Grid and Flexbox
- **Touch Support**: Mobile-friendly interactions

## Production Build

The production build:
- Minifies and optimizes all assets
- Includes source maps for debugging
- Uses environment variables for API configuration
- Optimized for deployment to static hosting

## Key Features in Detail

### Authentication System
- Secure JWT token management
- Persistent login sessions
- Route protection for authenticated users
- Automatic token validation on app load

### Photo Management
- Upload photos with title and image URL
- Delete own photos with confirmation
- Real-time updates when photos are modified
- Image validation and error handling

### Social Features
- Like/unlike photos from other users
- Real-time like count updates
- Visual feedback for interactions
- User profile management

### User Experience
- Smooth animations and transitions
- Loading states for better feedback
- Error handling with user-friendly messages
- Responsive design for all devices
