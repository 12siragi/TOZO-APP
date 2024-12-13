import React from 'react';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
  const handleRegisterSuccess = () => {
    // Handle success (e.g., redirect user to login page)
    console.log('User registered successfully!');
  };

  return (
    <div>
      <h2>Register Page</h2>
      <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
    </div>
  );
};

export default RegisterPage;
