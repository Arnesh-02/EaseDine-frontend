import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaEnvelope, FaUser, FaGoogle, FaFacebook } from 'react-icons/fa';
import './AuthPages.css';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

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
    
    // Check password strength in real-time
    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    if (!password) {
      setPasswordStrength('');
      return;
    }
    
    // Simple password strength check
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;
    
    if (isLongEnough && hasLetter && hasNumber && hasSpecial) {
      setPasswordStrength('strong');
    } else if (isLongEnough && (hasLetter && hasNumber || hasLetter && hasSpecial || hasNumber && hasSpecial)) {
      setPasswordStrength('medium');
    } else {
      setPasswordStrength('weak');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters';
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      setSignupError('');
      
      // Mock signup process
      setTimeout(() => {
        setIsSubmitting(false);
        
        // Show success message
        const successToast = document.createElement('div');
        successToast.className = 'success-toast';
        successToast.textContent = 'Account created!';
        document.body.appendChild(successToast);
        
        // Remove toast after animation
        setTimeout(() => {
          successToast.classList.add('hide');
          setTimeout(() => {
            document.body.removeChild(successToast);
            // Redirect to login page
            navigate('/login');
          }, 500);
        }, 3000);
        
      }, 1500);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <div className="auth-logo">Fdelivery</div>
        
        <h1>Create Account</h1>
        
        {signupError && <div className="auth-error-message">{signupError}</div>}
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-icon-wrapper">
              <span className="input-icon">
                <FaUser />
              </span>
              <input
                type="text"
                name="fullName"
                placeholder="Full name"
                value={formData.fullName}
                onChange={handleChange}
                className={errors.fullName ? 'input-error' : ''}
              />
            </div>
            {errors.fullName && <div className="error-text">{errors.fullName}</div>}
          </div>
          
          <div className="form-group">
            <div className="input-icon-wrapper">
              <span className="input-icon">
                <FaEnvelope />
              </span>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'input-error' : ''}
              />
            </div>
            {errors.email && <div className="error-text">{errors.email}</div>}
          </div>
          
          <div className="form-group">
            <div className="input-icon-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Create password"
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
            
            {formData.password && (
              <div className="password-strength">
                <div className="strength-text">Password strength: {passwordStrength}</div>
                <div className="strength-meter">
                  <div 
                    className={`strength-meter-fill ${passwordStrength}`}
                    style={{ 
                      width: passwordStrength === 'weak' ? '33%' : 
                             passwordStrength === 'medium' ? '66%' : '100%' 
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>
          
          <div className="form-group">
            <div className="input-icon-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'input-error' : ''}
              />
              <button 
                type="button" 
                className="password-toggle" 
                onClick={toggleConfirmPasswordVisibility}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && <div className="error-text">{errors.confirmPassword}</div>}
          </div>
          
          <button 
            type="submit" 
            className={`auth-button ${Object.values(formData).some(val => !val) ? 'disabled' : ''}`}
            disabled={isSubmitting || Object.values(formData).some(val => !val)}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
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
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;