import React, { useState } from 'react';
import { register } from '../api/authAPI';   // Import the register API function

const RegisterForm = ({ onRegisterSuccess }: { onRegisterSuccess: () => void }) => {
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password1 !== password2) {
      setError('Passwords do not match.');
      return;
    }
    try {
      const response = await register({ email, password1, password2 });
      console.log('Registration successful:', response.data);
      onRegisterSuccess();  // Call callback after successful registration
    } catch (err) {
      setError('Registration failed.');
      console.error('Register error:', err);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}  // Update email state
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password1}
        onChange={(e) => setPassword1(e.target.value)}  // Update password state
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}  // Update password2 state
        required
      />
      {error && <div>{error}</div>}
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
