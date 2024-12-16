import React, { useState } from 'react';
import { requestPasswordReset } from '../api/authAPI'; // Adjust the import to your API function

const PasswordResetRequestForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      await requestPasswordReset(email); // Send email to backend for password reset link
      setMessage('Password reset email has been sent. Please check your inbox.');
    } catch (error) {
      setMessage('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 px-4 rounded-md text-white font-semibold ${isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
      >
        {isLoading ? 'Processing...' : 'Request Password Reset'}
      </button>

      {message && (
        <p className={`text-center mt-4 text-sm ${message.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>
          {message}
        </p>
      )}
    </form>
  );
};

export default PasswordResetRequestForm;
