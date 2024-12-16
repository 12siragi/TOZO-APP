import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/login"
        className="text-blue-500 hover:text-blue-700 underline"
      >
        Go to Login
      </Link>
    </div>
  );
};

export default NotFoundPage;
