import React, { useState } from 'react';
import { login } from '../api//authAPI'; 

const LoginForm = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();  // Prevent form from reloading the page
    try {
      const response = await login({ email, password });
      console.log('Login successful:', response.data);
      onLoginSuccess();  // Call callback after successful login
    } catch (err) {
      setError('Login failed. Check your credentials.');
      console.error('Login error:', err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}  // Update password state
        required
      />
      {error && <div>{error}</div>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
