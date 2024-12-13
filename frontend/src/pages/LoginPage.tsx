import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const handleLoginSuccess = () => {
    // Handle success (e.g., redirect user to dashboard or home)
    console.log('User logged in successfully!');
  };

  return (
    <div>
      <h2>Login Page</h2>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;
