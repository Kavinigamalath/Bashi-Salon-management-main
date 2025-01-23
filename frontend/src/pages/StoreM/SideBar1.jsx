import React from "react";
import Logo from '../../images/logo.png'; // Import the logo image
import { Link } from "react-router-dom"; // Import Link for navigation

// Sidebar1 component definition
const Sidebar1 = () => {
  return (
    <>
      {/* Button for opening the sidebar (visible only on small screens) */}
      <button
        data-drawer-target="logo-sidebar" // Specifies the sidebar target for the drawer
        data-drawer-toggle="logo-sidebar" // Toggles the drawer state
        aria-controls="logo-sidebar" // Provides accessibility information for the button
        type="button" // Defines the button type
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-700 rounded-lg sm:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition-all duration-200"
      >
        <span className="sr-only">Open sidebar</span> {/* Screen reader text to describe the button */}
        <svg
          className="w-6 h-6" // Styling the size of the SVG (hamburger icon)
          aria-hidden="true" // Hides SVG from screen readers
          fill="currentColor" // Sets the color to current text color
          viewBox="0 0 20 20" // Defines the viewbox for the SVG
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" // SVG path for the hamburger menu icon
          />
        </svg>
      </button>

      {/* Sidebar container */}
      <aside
        id="logo-sidebar" // Sidebar element ID for targeting
        className="fixed top-0 left-0 z-40 w-60 h-screen transition-transform -translate-x-full sm:translate-x-0 shadow-lg bg-gradient-to-b from-pink-800 to-pink-300" // Sidebar styling and positioning
        aria-label="Sidebar" // Accessibility label for the sidebar
      >
        {/* Sidebar content */}
        <div className="h-full px-4 py-6 overflow-y-auto"> {/* Sidebar container with padding and scrollable content */}
          
          {/* Sidebar logo with link */}
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse mb-6"> {/* Flexbox for logo and text */}
            <img
              src={Logo} // Path to logo image
              alt="logo" // Alt text for logo
              className="w-10 h-10 rounded-full shadow-lg" // Logo image styling
            />
            <span className="text-white self-center text-2xl font-bold whitespace-nowrap">Salon Bashi</span> {/* Sidebar title */}
          </a>

          {/* Sidebar navigation links */}
          <ul className="space-y-4 font-medium"> {/* List of navigation links */}
            
            {/* Add Item Button */}
            <li>
              <Link
                to="/store/create" // Route for the Add Item page
                className="flex items-center p-4 rounded-lg text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 group relative" // Styling and hover effects
              >
                <svg
                  className="w-7 h-7 text-gray-800 transition duration-75 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transform group-hover:scale-110" // SVG icon styling
                  aria-hidden="true" // Hides SVG from screen readers
                  fill="currentColor" // Fills the icon color with the current text color
                  viewBox="0 0 20 20" // Viewbox for the SVG
                >
                  <path
                    fillRule="evenodd" // SVG fill rule
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" // SVG path for add item icon
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-4 text-xl font-semibold text-gray-900 dark:text-white">Add Item</span> {/* Add Item label */}
                <span className="absolute left-0 h-full w-1 bg-pink-600 rounded-lg transition-all duration-200 transform scale-0 group-hover:scale-100"></span> {/* Highlight effect on hover */}
              </Link>
            </li>

            {/* Orders Button */}
            <li>
              <Link
                to="/allorders" // Route for Orders page
                className="flex items-center p-4 rounded-lg text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 group relative" // Styling for Orders button
              >
                <svg
                  className="w-7 h-7 text-gray-800 transition duration-75 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transform group-hover:scale-110" // Styling for Orders icon
                  aria-hidden="true" // Hides SVG from screen readers
                  fill="currentColor" // Sets current text color to fill the icon
                  viewBox="0 0 24 24" // Viewbox for the SVG
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 18c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm10 0c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm-11.173-1h12.265l1.825-8h-16.18l-1.825 8zm16.062-9h-14.573l-.73-4h-3.586v2h2.221l3.278 18h14.596v-2h-13.073l.67-4h11.44z"/> {/* Orders icon SVG path */}
                </svg>
                <span className="ml-4 text-xl font-semibold text-gray-900 dark:text-white">Orders</span> {/* Orders label */}
                <span className="absolute left-0 h-full w-1 bg-pink-600 rounded-lg transition-all duration-200 transform scale-0 group-hover:scale-100"></span> {/* Highlight effect on hover */}
              </Link>
            </li>

            {/* Logout Button */}
            <li>
              <Link
                to="/" // Route for logout (home)
                className="flex items-center p-4 rounded-lg text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 group relative" // Styling for logout button
              >
                <svg
                  className="w-7 h-7 text-gray-800 transition duration-75 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transform group-hover:scale-110" // Styling for logout icon
                  aria-hidden="true" // Hides SVG from screen readers
                  fill="currentColor" // Fills the icon with the current text color
                  viewBox="0 0 20 20" // Viewbox for the SVG
                >
                  <path
                    fillRule="evenodd" // SVG fill rule
                    d="M3 4a1 1 0 011-1h6a1 1 0 100-2H4a3 3 0 00-3 3v12a3 3 0 003 3h6a1 1 0 100-2H4a1 1 0 01-1-1V4zm10.293 5.707a1 1 0 010-1.414l3-3a1 1 0 111.414 1.414L15.414 9H9a1 1 0 000 2h6.414l2.293 2.293a1 1 0 01-1.414 1.414l-3-3z" // SVG path for logout icon
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-4 text-xl font-semibold text-gray-900 dark:text-white">Logout</span> {/* Logout label */}
                <span className="absolute left-0 h-full w-1 bg-pink-600 rounded-lg transition-all duration-200 transform scale-0 group-hover:scale-100"></span> {/* Highlight effect on hover */}
              </Link>
            </li>

          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar1; // Exporting the Sidebar1 component
