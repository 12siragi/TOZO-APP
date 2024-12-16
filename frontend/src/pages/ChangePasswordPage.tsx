import React from 'react';
import ChangePasswordForm from '../components/ChangePasswordForm';

const ChangePasswordPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Change Your Password</h1>
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default ChangePasswordPage;
