import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-500 text-white px-6 py-4 flex items-center justify-between shadow-md">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        {/* Fix the image path */}
        <img
          src="/images.png" // Make sure this path is correct or use an import
          alt="Logo"
          className="h-8 w-8 object-contain max-w-full" // Adjust styling
        />
        <span className="text-2xl font-semibold">Tozo</span>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden text-white focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Navigation Links (Mobile/Tablet) */}
      <ul
        className={`flex space-x-6 lg:flex ${isMenuOpen ? 'block' : 'hidden'} lg:block`}
      >
        <li>
          <a
            href="#home"
            className="text-white hover:text-gray-300 focus:text-gray-300 transition duration-200"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#settings"
            className="text-white hover:text-gray-300 focus:text-gray-300 transition duration-200"
          >
            Settings
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
