import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password_hash, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post(
        'http://localhost:8080/api/auth/login',
        { email, password_hash },
        { headers: { 'Content-Type': 'application/json' } }
      );


      // ✅ Either check for status or exact string
      if (res.status === 200 || res.data === 'User Logged In Successfully!!!') {
        localStorage.setItem('email', email);
        navigate('/dashboard'); // ✅ Redirect to dashboard
      } else {
        throw new Error('Unexpected login response');
      }
    } catch (err) {
      console.error('Login failed:', err.response || err);
      setError(
        err.response?.data?.message || 'Login failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgotpassword');
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password_hash}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <button
          type="button"
          className="forgot-password-btn"
          onClick={handleForgotPassword}
        >
          Forgot Password?
        </button>

        <div className="register-link">
          Not Registered? <a href="/register">Register Now</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
