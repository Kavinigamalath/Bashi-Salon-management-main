import React from 'react'; // Importing React library
import { Link } from 'react-router-dom'; // Importing Link component for navigation
import { BsArrowLeft } from 'react-icons/bs'; // Importing arrow icon from react-icons

// BackButton component definition
const BackButton = ({ destination }) => { // Accepting 'destination' prop for navigation
    return (
        <div className="flex"> {/* Flex container for alignment */}
            <Link
                to={destination} // Link to the specified destination
                className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 bg-white rounded-lg shadow-md group transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-pink-200"
            >
                {/* Background gradient span for hover effect */}
                <span className="absolute inset-0 rounded-lg bg-gradient-to-br from-pink-600 to-pink-400 group-hover:bg-opacity-50 transition duration-300"></span>
                
                {/* Button content with text and icon */}
                <span className="relative flex items-center px-4 py-2 text-gray-900 transition-all duration-200 rounded-md group-hover:text-black">
                    {/* SVG Arrow icon */}
                    <svg
                        className="w-5 h-5 mr-2 transition-transform duration-200 transform group-hover:-translate-x-1"
                        xmlns="http://www.w3.org/2000/svg" // Defining SVG namespace
                        fill="none" // No fill for the icon
                        viewBox="0 0 24 24" // Viewbox for the SVG
                        stroke="currentColor" // Stroke color follows the current text color
                    >
                        <path
                            strokeLinecap="round" // Rounded cap for stroke ends
                            strokeLinejoin="round" // Rounded join for stroke segments
                            strokeWidth={2} // Stroke width
                            d="M15 19l-7-7 7-7" // Path for the arrow icon
                        />
                    </svg>
                    <span className="text-lg font-semibold">Back</span> {/* Button label */}
                </span>
            </Link>
        </div>
    );
};

export default BackButton; // Exporting the BackButton component for use in other parts of the application

