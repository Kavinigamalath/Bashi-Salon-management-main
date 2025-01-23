import React, { useEffect, useState } from 'react'; 
// Imports React and hooks `useEffect` and `useState` to handle component lifecycle and state management.

import axios from 'axios'; 
// Imports `axios` for making HTTP requests to fetch data from the server.

import { FaCartArrowDown } from 'react-icons/fa6'; 
// Imports an icon from `react-icons`, specifically the cart icon `FaCartArrowDown`.

import Swal from 'sweetalert2'; 
// Imports `SweetAlert2`, a library for displaying beautiful alerts and notifications.

import { Link } from 'react-router-dom'; 
// Imports `Link` from `react-router-dom` to allow navigation between different routes.

const HCard = ({ CusID }) => { 
  // Defines the `HCard` functional component, accepting `CusID` as a prop to customize links based on the customer ID.
  
  const [data, setData] = useState([]); 
  // Declares a state variable `data` to store the fetched product data, initialized as an empty array.

  const [loading, setLoading] = useState(true); 
  // Declares a `loading` state to manage the loading status while fetching data.

  const [error, setError] = useState(null); 
  // Declares an `error` state to capture any errors encountered during the fetch request.

  useEffect(() => { 
    // useEffect hook to trigger the fetching of data when the component mounts.

    const fetchData = async () => { 
      // Defines an asynchronous function `fetchData` to fetch product data from the server.

      try {
        const response = await axios.get('http://localhost:8076/store'); 
        // Sends a GET request to the API endpoint to fetch data from the store.

        const fetchedData = response.data; 
        // Stores the response data from the API request.

        if (Array.isArray(fetchedData) && fetchedData.length > 0) { 
          // Checks if the fetched data is an array and has at least one element.

          setData(fetchedData); 
          // Updates the `data` state with the fetched product data.
        } else {
          console.warn('Data is not an array or is empty:', fetchedData); 
          // Logs a warning if the data is not an array or is empty.
        }
      } catch (error) {
        console.error('Error fetching data:', error); 
        // Logs an error message if the fetch request fails.

        setError(error); 
        // Updates the `error` state to store the error encountered during the fetch request.
      } finally {
        setLoading(false); 
        // Ensures that the `loading` state is set to false, whether the fetch request succeeded or failed.
      }
    };

    fetchData(); 
    // Calls the `fetchData` function to fetch product data on component mount.
  }, []); 
  // The empty dependency array ensures this effect runs only once, when the component first mounts.

  const handleItemClick = () => { 
    // Defines a function to handle clicking on the cart icon for an item.

    if (remainingQuantity <= 0) { 
      // Checks if the item's remaining quantity is zero or less.

      Swal.fire({
        title: 'Item Unavailable',
        text: 'This item is currently out of stock.',
        icon: 'warning',
        confirmButtonText: 'OK',
      }); 
      // Displays a SweetAlert warning if the item is out of stock.
    } else {
      console.log(`Item ${item.ItemName} added to cart`); 
      // Logs a message indicating the item has been added to the cart.

      // Logic for adding to cart can go here
      // Placeholder comment for where the actual logic for adding items to the cart would be implemented.
    }
  };

  if (loading) return <p>Loading...</p>; 
  // If the `loading` state is true, displays a loading message.

  if (error) return <p>Error loading data</p>; 
  // If an error occurred, displays an error message.

  if (data.length === 0) return <p>No data available</p>; 
  // If the data is fetched but empty, displays a "No data available" message.

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"> 
      {/* Creates a responsive grid layout to display product cards, with different column counts based on screen size. */}

      {data.map((item) => ( 
        // Iterates over the `data` array, rendering a product card for each item.

        <div key={item.ItemNo} className="w-72 shadow-lg rounded-lg bg-neutral-50 p-4 transform transition-transform duration-300 hover:-translate-y-2">
          {/* Creates a card for each item with shadow, padding, and hover effect. */}
          
          <Link to={`/itemdis/${item.ItemNo}/${CusID}`} className="flex flex-col items-center">
            {/* Wraps the card content in a `Link` component to enable navigation to the item details page. */}
            
            <img
              src={item.image}
              alt={item.ItemName}
              className="w-full h-48 object-cover rounded-md"
            />
            {/* Displays the product image, using the `image` property from the data. */}

            <div className="mt-4">
              <h2 className="font-semibold text-lg font-title text-pink-500">{item.ItemName}</h2>  
              {/* Displays the item name in a large pink font. */}
              
              <p className="mt-2 text-sm text-neutral-700">
                {item.Description.length > 100
                  ? item.Description.slice(0, 100) + '...'
                  : item.Description}
              </p>
              {/* Displays the item description, truncating it to 100 characters if it is too long. */}
            </div>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-lg font-semibold text-pink-500">{`RS.${item.SPrice}`}</span>
              {/* Displays the price of the item in pink text. */}
              
              <div className="ml-4">
                <button onClick={() => handleItemClick(item)} className="bg-primary rounded-md text-pink-500 py-2 px-4">
                  <FaCartArrowDown size={24} />
                </button>
                {/* Renders a button with a cart icon, and handles click events by calling `handleItemClick`. */}
              </div>
            </div>

          </Link>
        </div>
      ))}
    </div>
  );
};

export default HCard; 
// Exports the `HCard` component as the default export.
