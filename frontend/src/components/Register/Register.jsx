import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Register() {
  const { handleRegistration } = useContext(CurrentUserContext);

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
    handleRegistration(data);
    setData({ email: '', password: '' });
  };

  return (
    <>
      <h1 className="signup__title">Register</h1>
      <form className="signup__form" onSubmit={handleSubmit}>
        <label className="signup__form-field">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={data.email}
            className="signup__input signup__input_type_email"
            id="signup-email"
            autoComplete="username"
            required
            minLength="2"
            maxLength="40"
            onChange={handleChange}
          />
          <span className="signup__input-error signup__input-error_type_email"></span>
        </label>
        <label className="signup__form-field">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={data.password}
            className="signup__input signup__input_type_password"
            id="signup-password"
            autoComplete="new-password"
            required
            onChange={handleChange}
          />
          <span className="signup__input-error signup__input-error_type_password"></span>
        </label>
        <button type="submit" className="signup__button" id="signup__button">
          Sign Up
        </button>
        <p className="signup__login-text">
          Already a member?{' '}
          <Link to="/signin" className="register__login-link">
            Sign in here.
          </Link>
        </p>
      </form>
    </>
  );
}

export default Register;
