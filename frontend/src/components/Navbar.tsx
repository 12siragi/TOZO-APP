import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-500 text-white px-6 py-4 flex items-center justify-between">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <img
          src="images.png" // Replace with your logo path
          alt="Logo"
          className="h-8 w-8"
        />
        <span className="text-xl font-bold">Tozo</span>
      </div>

      {/* Example Navigation Links */}
      <ul className="flex space-x-6">
        <li>
          <a href="#home" className="hover:underline">
            Home
          </a>
        </li>
        <li>
          <a href="#settings" className="hover:underline">
            settings
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
