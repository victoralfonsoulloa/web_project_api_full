import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Login() {
  const { handleLogin } = useContext(CurrentUserContext);

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data);
    setData({ email: '', password: '' });
  };

  return (
    <>
      <h1 className="login__title">Log In</h1>
      <form className="login__form" onSubmit={handleSubmit}>
        <label className="login__form-field">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={data.email}
            className="login__input login__input_type_email"
            id="login-email"
            required
            minLength="2"
            maxLength="40"
            autoComplete="username"
            onChange={handleChange}
          />
          <span className="login__input-error login__input-error_type_email"></span>
        </label>
        <label className="login__form-field">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={data.password}
            className="login__input login__input_type_password"
            id="login-password"
            autoComplete="current-password"
            required
            onChange={handleChange}
          />
          <span className="login__input-error login__input-error_type_password"></span>
        </label>
        <button type="submit" className="login__button" id="login__button">
          Sign In
        </button>
        <p className="login__signup-text">
          Not a member?{' '}
          <Link to="/signup" className="register__login-link">
            Sign up here.
          </Link>
        </p>
      </form>
    </>
  );
}

export default Login;
