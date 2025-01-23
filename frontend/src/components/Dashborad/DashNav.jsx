import React from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Importing user profile icon from react-icons library

const DashNav = () => {
  return (
    // Navigation bar with a pink gradient background, fixed to the top, full width, and shadow effect for elevation
    <nav className="fixed top-0 left-0 w-full flex flex-wrap items-center justify-between bg-gradient-to-r from-pink-800 to-pink-300 py-2 shadow-lg dark:bg-pink-700 lg:py-4">
      
      {/* Container for the navbar content */}
      <div className="flex w-full flex-wrap items-center justify-between px-4">
        
        {/* Dashboard Title */}
        <span className="text-xl font-bold text-white dark:text-white">
          Bashi Dashboard
        </span>
        
        {/* Right-side section with user profile icon */}
        <div className="flex items-center ms-5 w-[30%] justify-end">
          
          {/* User Profile Icon Section */}
          <div className="relative">
            {/* Button that holds the user profile icon, with hover effect */}
            <button className="flex items-center p-2 rounded-full hover:bg-pink-600 transition duration-200">
              <FaUserCircle className="w-8 h-8 text-white" /> {/* User profile icon from react-icons */}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashNav;
