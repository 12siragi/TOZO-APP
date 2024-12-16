import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const handleLoginSuccess = () => {
    // Handle success (e.g., redirect user to dashboard or home)
    console.log('User logged in successfully!');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-lg w-full px-6">
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </div>
    </div>
  );
};

export default LoginPage;
