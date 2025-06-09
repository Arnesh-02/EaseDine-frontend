import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import './AuthPages.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const validateEmail = () => {
    if (!email) {
      setError('Email is required');
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateEmail()) {
      setIsSubmitting(true);
      setError('');
      
      // Mock password reset process
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1500);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <div className="auth-logo">Fdelivery</div>
        
        <h1>Reset Password</h1>
        
        {!isSubmitted ? (
          <>
            <p className="auth-description">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            
            {error && <div className="auth-error-message">{error}</div>}
            
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="input-icon-wrapper">
                  <span className="input-icon">
                    <FaEnvelope />
                  </span>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleChange}
                    className={error ? 'input-error' : ''}
                  />
                </div>
                {error && <div className="error-text">{error}</div>}
              </div>
              
              <button 
                type="submit" 
                className={`auth-button ${!email ? 'disabled' : ''}`}
                disabled={isSubmitting || !email}
              >
                {isSubmitting ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          </>
        ) : (
          <div className="success-message">
            <p>
              If an account exists with the email <strong>{email}</strong>, you will receive a password reset link shortly.
            </p>
            <p>
              Please check your email and follow the instructions to reset your password.
            </p>
          </div>
        )}
        
        <div className="auth-redirect">
          <Link to="/login" className="back-to-login">
            <FaArrowLeft /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;