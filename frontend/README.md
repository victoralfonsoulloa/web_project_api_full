# Web Project Around Auth

## Description

This project is a responsive web application for a card gallery with user authentication. Users can register, log in, edit their profile and avatar, add new cards, like cards, and delete their own cards. The app protects private routes and manages user sessions using JWT stored in localStorage.

## Main Features

- **User registration and authentication** (JWT)
- **Protected private routes** (only authenticated users can access the gallery)
- **Edit profile and avatar**
- **Add, delete, and like cards**
- **Popups for forms and feedback messages**
- **Session persistence** (JWT verification on app load)
- **Responsive design** and menu animations

## Project Structure

```
src/
  blocks/                # CSS files by block
  components/            # React components
    App.jsx
    Header.jsx
    Main.jsx
    Footer.jsx
    Card.jsx
    ImagePopup.jsx
    PopupWithForm.jsx
    AddPlacePopup.jsx
    EditAvatarPopup.jsx
    EditProfilePopup.jsx
    Register.jsx
    Login.jsx
    ProtectedRoute.jsx
    InfoTooltip.jsx
  contexts/
    CurrentUserContext.js
  images/                # Images used in the app
  utils/
    api.js               # API functions
  index.js
  index.css
public/
  index.html
README.md
.gitignore
```

## Technologies & Techniques

- **React** (functional components, hooks, context API)
- **React Router v6**
- **Modular CSS**
- **Vite** or CRA for project infrastructure
- **Fetch API** for backend requests
- **JWT** for authentication
- **LocalStorage** for session persistence
- **Responsive design** and CSS animations
- **Code style:** camelCase, descriptive names, separation of logic and presentation

## Visual Features

- Animated, responsive dropdown menu
- Popups for forms and success/error messages
- Card gallery with images, likes, and delete button
- Profile and avatar editing in popups

## Installation & Usage

1. Clone the repository:
   ```
   git clone https://github.com/your-username/web_project_around_auth.git
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the app:
   ```
   npm run dev
   ```
   or
   ```
   npm start
   ```

## Development Notes

- The `CurrentUserContext` manages global user and authentication state.
- All private routes are protected by the `ProtectedRoute` component.
- Success and error popups are managed locally in `App.jsx`.
- Code follows all conventions and requirements from the sprint brief.

## Author

Victor Ulloa
