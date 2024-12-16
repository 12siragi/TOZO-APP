import React, { useState } from 'react';
import { register } from '../api/authAPI';

const RegisterForm = ({ onRegisterSuccess }: { onRegisterSuccess: () => void }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (password1 !== password2) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await register({ username, email, password1, password2 });
      console.log('Registration successful:', response.data);

      setSuccess(true);
      setUsername('');
      setEmail('');
      setPassword1('');
      setPassword2('');

      onRegisterSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed.');
      console.error('Register error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-8 space-y-6"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800">Create an Account</h2>

      {success && (
        <div className="text-green-600 bg-green-100 p-2 rounded-md text-sm">
          Registration successful! You can now log in.
        </div>
      )}
      {error && (
        <div className="text-red-600 bg-red-100 p-2 rounded-md text-sm">{error}</div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          placeholder="Enter your password"
          className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          placeholder="Confirm your password"
          className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className={`w-full py-2 text-white rounded-lg shadow-md transition ${
          loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        }`}
        disabled={loading}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>

      <div className="text-center text-sm">
        Already have an account?{' '}
        <a href="/login" className="text-blue-500 hover:underline">
          Log in
        </a>
      </div>
    </form>
  );
};

export default RegisterForm;
