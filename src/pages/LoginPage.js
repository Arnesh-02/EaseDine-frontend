import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaEnvelope, FaMobileAlt, FaGoogle, FaFacebook } from 'react-icons/fa';
import './AuthPages.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear errors when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Email/Phone validation
    if (!formData.emailOrPhone) {
      newErrors.emailOrPhone = 'Email or phone number is required';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailOrPhone) && 
      !/^\d{10}$/.test(formData.emailOrPhone)
    ) {
      newErrors.emailOrPhone = 'Please enter a valid email or phone number';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      setLoginError('');
      
      // Mock login process
      setTimeout(() => {
        setIsSubmitting(false);
        
        // Demo user check
        if (formData.emailOrPhone === 'demo@fdelivery.com' && formData.password === 'password123') {
          // Successful login
          navigate('/dashboard');
        } else {
          // Failed login
          setLoginError('Invalid credentials. Please try again.');
        }
      }, 1000);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <div className="auth-logo">Fdelivery</div>
        
        <h1>Welcome Back</h1>
        
        {loginError && <div className="auth-error-message">{loginError}</div>}
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-icon-wrapper">
              <span className="input-icon">
                {/^\d+$/.test(formData.emailOrPhone) ? <FaMobileAlt /> : <FaEnvelope />}
              </span>
              <input
                type="text"
                name="emailOrPhone"
                placeholder="Enter email or phone number"
                value={formData.emailOrPhone}
                onChange={handleChange}
                className={errors.emailOrPhone ? 'input-error' : ''}
              />
            </div>
            {errors.emailOrPhone && <div className="error-text">{errors.emailOrPhone}</div>}
          </div>
          
          <div className="form-group">
            <div className="input-icon-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'input-error' : ''}
              />
              <button 
                type="button" 
                className="password-toggle" 
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <div className="error-text">{errors.password}</div>}
          </div>
          
          <div className="forgot-password">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
          
          <button 
            type="submit" 
            className={`auth-button ${(!formData.emailOrPhone || !formData.password) ? 'disabled' : ''}`}
            disabled={isSubmitting || !formData.emailOrPhone || !formData.password}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="social-login">
          <div className="divider">
            <span>Or continue with</span>
          </div>
          
          <div className="social-buttons">
            <button className="social-button google">
              <FaGoogle /> Google
            </button>
            <button className="social-button facebook">
              <FaFacebook /> Facebook
            </button>
          </div>
        </div>
        
        <div className="auth-redirect">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;