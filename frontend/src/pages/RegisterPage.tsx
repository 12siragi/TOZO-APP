import React from 'react';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
  const handleRegisterSuccess = () => {
    console.log('User registered successfully!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg">
        <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
      </div>
    </div>
  );
};

export default RegisterPage;
