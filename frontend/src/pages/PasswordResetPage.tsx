import React from 'react';
import PasswordResetForm from '../components/PasswordResetForm';

const PasswordResetPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Password Reset</h1>
        <p className="text-center text-gray-600 mb-6">Please enter your email to receive a password reset link.</p>
        <PasswordResetForm />
      </div>
    </div>
  );
};

export default PasswordResetPage;
