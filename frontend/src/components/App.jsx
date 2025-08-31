import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Login from './Login/Login';
import Register from './Register/Register';
import Popup from './Main/Components/Popup/Popup';
import InfoTooltip from './Main/Components/Popup/InfoTooltip/InfoTooltip';
import * as auth from '../utils/auth';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import successImage from '../images/success-image.svg';
import errorImage from '../images/error-image.svg';
import '../index.css';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      api
        .getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
          navigate('/');
        })
        .catch((err) => {
          setIsLoggedIn(false);
          localStorage.removeItem('jwt');
          console.error('Invalid token or failed to fetch user info:', err);
        });
    }
  }, []);

  const handleUpdateUser = async ({ name, about }) => {
    try {
      const newData = await api.setUserInfo(name, about);
      setCurrentUser((prevData) => ({
        ...prevData,
        ...newData,
      }));
    } catch (err) {
      console.error('Failed to update user info:', err);
    }
  };

  const handleUpdateAvatar = async ({ avatar }) => {
    try {
      const updatedUser = await api.changeProfilePicture(avatar);
      setCurrentUser((prevData) => ({
        ...prevData,
        ...updatedUser,
      }));
    } catch (err) {
      console.error('Failed to update avatar:', err);
    }
  };
  const handleRegistration = ({ email, password }) => {
    if (email && password) {
      auth
        .register(email, password)
        .then(() => {
          console.log('user successfully registered');
          setIsSuccessPopupOpen(true);
        })
        .catch((err) => {
          console.error('Registration failed:', err);
          setIsErrorPopupOpen(true);
        });
    }
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setIsLoggedIn(true);

          // Get user data using the new token
          return api.getUserInfo();
        }
      })
      .then((userData) => {
        setCurrentUser(userData);
        navigate('/');
      })
      .catch((err) => {
        console.error('Login failed:', err);
        setIsErrorPopupOpen(true);
      });
  };

  return (
    <div className="content-wrapper">
      <CurrentUserContext.Provider
        value={{
          currentUser,
          setCurrentUser,
          isLoggedIn,
          setIsLoggedIn,
          handleUpdateUser,
          handleUpdateAvatar,
          handleLogin,
          handleRegistration,
        }}
      >
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            }
          />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <main />
              </ProtectedRoute>
            }
          />
        </Routes>
        {isLoggedIn ? <Footer /> : ''}

        {isSuccessPopupOpen && (
          <Popup onClose={() => setIsSuccessPopupOpen(false)}>
            <InfoTooltip
              image={successImage}
              title="Awesome, you have been successfully registered."
            />
          </Popup>
        )}

        {isErrorPopupOpen && (
          <Popup onClose={() => setIsErrorPopupOpen(false)}>
            <InfoTooltip
              image={errorImage}
              title="Oops, something went wrong. Please try again!"
            />
          </Popup>
        )}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
