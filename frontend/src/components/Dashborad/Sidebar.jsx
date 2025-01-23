import React from "react";
import Logo from '../../images/logo.png'; // Import the logo image
import { Link } from "react-router-dom"; // Import Link for navigation

const Sidebar = () => {
  return (
    <>
      {/* Button for opening the sidebar (visible only on small screens) */}
      <button
        data-drawer-target="logo-sidebar" // Accessibility: Specifies the sidebar as the target to open
        data-drawer-toggle="logo-sidebar" // Toggles the sidebar visibility
        aria-controls="logo-sidebar" // Specifies the control for accessibility
        type="button" // Specifies the button type
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-700 rounded-lg sm:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition-all duration-200"
      >
        {/* Hidden text for screen readers */}
        <span className="sr-only">Open sidebar</span>
        
        {/* SVG icon for the sidebar toggle button */}
        <svg
          className="w-6 h-6"
          aria-hidden="true" // Accessibility: Hides this icon from screen readers
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Three horizontal lines representing the hamburger menu icon */}

          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>

      {/* Sidebar container */}
      <aside
        id="logo-sidebar" // Sidebar ID to match the toggle target
        className="fixed top-0 left-0 z-40 w-60 h-screen transition-transform -translate-x-full sm:translate-x-0 shadow-lg bg-gradient-to-b from-pink-800 to-pink-300" // Sidebar hidden by default on small screens
        aria-label="Sidebar" // Accessibility: Describes the element as a sidebar
      >
        {/* Sidebar content: scrollable with overflow-y-auto */}
        <div className="h-full px-4 py-6 overflow-y-auto">
          
          {/* Sidebar logo with link */}
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
            {/* Logo image */}
            <img
              src={Logo}
              alt="logo" // Accessibility: Logo image description
              className="w-10 h-10 rounded-full shadow-lg"
            />
            {/* Logo text */}
            <span className="text-white self-center text-2xl font-bold whitespace-nowrap">Salon Bashi</span>
          </a>

          {/* Sidebar navigation links */}
          <ul className="space-y-4 font-medium">
            {/* Dashboard Link */}
            <li>
              <Link
                to="#"
                className="flex items-center p-4 rounded-lg text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 group relative"
              >
                {/* Dashboard icon */}
                <svg
                  className="w-7 h-7 text-gray-800 transition duration-75 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transform group-hover:scale-110"
                  aria-hidden="true" // Hides the icon from screen readers
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                {/* Dashboard text */}
                <span className="ml-4 text-xl font-semibold text-gray-900 dark:text-white">Dashboard</span>

                {/* Left highlight bar that appears on hover */}
                <span className="absolute left-0 h-full w-1 bg-pink-600 rounded-lg transition-all duration-200 transform scale-0 group-hover:scale-100"></span>
              </Link>
            </li>

            {/* Logout Link */}
            <li>
              <Link
                to="/"
                className="flex items-center p-4 rounded-lg text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 group relative"
              >
                {/* Logout icon */}
                <svg
                  className="w-7 h-7 text-gray-800 transition duration-75 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transform group-hover:scale-110"
                  aria-hidden="true" // Hides the icon from screen readers
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h6a1 1 0 100-2H4a3 3 0 00-3 3v12a3 3 0 003 3h6a1 1 0 100-2H4a1 1 0 01-1-1V4zm10.293 5.707a1 1 0 010-1.414l3-3a1 1 0 111.414 1.414L15.414 9H9a1 1 0 000 2h6.414l2.293 2.293a1 1 0 01-1.414 1.414l-3-3z"
                    clipRule="evenodd"
                  />
                </svg>
                {/* Logout text */}
                <span className="ml-4 text-xl font-semibold text-gray-900 dark:text-white">Logout</span>

                {/* Left highlight bar that appears on hover */}
                <span className="absolute left-0 h-full w-1 bg-pink-600 rounded-lg transition-all duration-200 transform scale-0 group-hover:scale-100"></span>
              </Link>
            </li>

            {/* Add more sidebar items as needed */}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
