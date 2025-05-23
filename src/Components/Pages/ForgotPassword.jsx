import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/Login.css";


axios.defaults.withCredentials = true; // include session cookie

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password_hash, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [info, setInfo] = useState('');
  const [error, setError] = useState('');

  //  Send reset email (sets session “email” on server)
  const sendResetEmail = async e => {
    e.preventDefault();
    setError(''); setInfo('');
    try {
      await axios.post('http://localhost:8080/api/users/changepassword/email', { email });
      setInfo('OTP sent—check your email.');
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset email.');
    }
  };

  // Verify OTP
  const verifyOtp = async e => {
    e.preventDefault();
    setError(''); setInfo('');
    try {
      await axios.post('http://localhost:8080/api/users/changepassword/check', { otp });
      setInfo('OTP verified. Please enter a new password.');
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP.');
    }
  };

  // Change password
  const changePassword = async e => {
    e.preventDefault();
    setError(''); setInfo('');
    if (password_hash !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      await axios.put('http://localhost:8080/api/users/changepassword', {
        password_hash,
        confirmPassword
      });
      alert('Password changed successfully!');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password.');
    }
  };

  return (
    <div className="forgot-container">
      <h2>Reset Your Password</h2>
      {info  && <div className="info">{info}</div>}
      {error && <div className="error">{error}</div>}

      {step === 1 && (
        <form onSubmit={sendResetEmail} className="forgot-form">
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send OTP</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={verifyOtp} className="forgot-form">
          <input
            type="text"
            placeholder="Enter the OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            required
          />
          <button type="submit">Verify OTP</button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={changePassword} className="forgot-form">
          <input
            type="password"
            placeholder="New Password"
            value={password_hash}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Change Password</button>
        </form>
      )}
    </div>
  );
}
