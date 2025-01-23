import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import Swal from 'sweetalert2'; 
import Spinner from "../../components/Spinner";
import StoreReport from './StoreReport';
import Nav from '../../components/Dashborad/DashNav';
import SideBar from './SideBar1';
import servicePC from '../../images/service.jpg'; // Import the background image for the page

const ShowStore = () => {
    // State for storing the store items, orders, loading status, and search query
    const [store, setStore] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // useEffect to fetch store items and orders from the backend when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Set loading state to true before fetching data
            try {
                // Fetch store items
                const storeResponse = await axios.get('http://localhost:8076/store');
                const storeData = storeResponse.data;

                // Fetch orders
                const ordersResponse = await axios.get('http://localhost:8076/order');
                const ordersData = ordersResponse.data;

                // Set store and orders state
                setStore(storeData);
                setOrders(ordersData);

                // Check for low inventory items after setting the state
                checkLowInventory(storeData, ordersData);
            } catch (error) {
                // Handle any errors during the fetch
                console.error('Error fetching data:', error);
                setStore([]);
                setOrders([]);
            } finally {
                // Set loading to false once the data has been fetched
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Function to check if any item in the store has low inventory
    const checkLowInventory = (storeData, ordersData) => {
        storeData.forEach(item => {
            const remainingQuantity = calculateRemainingQuantity(item, ordersData);
            // If the remaining quantity is below 5, show a warning using SweetAlert
            if (remainingQuantity < 5) {
                Swal.fire({
                    title: 'Low Inventory!',
                    text: `Item "${item.ItemName}" has a low quantity of ${remainingQuantity}`,
                    icon: 'warning',
                    confirmButtonText: 'OK',
                });
            }
        });
    };

    // Function to calculate the remaining quantity of a store item by subtracting sold quantity
    const calculateRemainingQuantity = (storeItem, ordersData) => {
        let soldQuantity = 0;
        ordersData.forEach((order) => {
            order.items.forEach((orderItem) => {
                // Check if the ordered item matches the store item
                if (orderItem.ItemNo === storeItem.ItemNo) {
                    soldQuantity += orderItem.quantity; // Sum the quantity sold
                }
            });
        });
        // Return the remaining quantity of the item
        return storeItem.Quantity - soldQuantity;
    };

    // Handle the search query input changes
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value); // Update search query state
    };

    // Filter store items based on the search query
    const filteredStores = Array.isArray(store) ? store.filter((storeItem) => {
        const searchMatch = storeItem.ItemNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
            storeItem.ItemName.toLowerCase().includes(searchQuery.toLowerCase())
            //  ||
            // storeItem.Description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            // storeItem.Quantity.toString().includes(searchQuery) ||  
            // storeItem.cost.toString().includes(searchQuery) ||  
            // storeItem.SPrice.toString().includes(searchQuery)
            ;
        return searchMatch; // Return items that match the search query
    }) : [];

    return (
        <div 
            className="min-h-screen bg-cover bg-center" 
            style={{ backgroundImage: `url(${servicePC})` }} // Apply background image to the page
        >
            <div className='bg-white bg-opacity-50 min-h-screen'> {/* Overlay to increase readability */}
            <Nav /> {/* Navigation bar */}
            <SideBar /> {/* Sidebar */}
            <div className="flex-grow p-6 ml-[18%] mt-[4%]">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-900">
                        Item <span className="text-pink-600">List</span>
                    </h1>

                {/* Search bar section */}
                <div className="flex items-center gap-4">
                    <div className="relative w-full md:w-80 group">
                        {/* Floating Label */}
                        <label
                            className={`absolute top-0 right-3 text-gray-600 transform transition-all duration-300 ease-in-out pointer-events-none 
                            ${searchQuery ? '-translate-y-8 scale-75' : 'translate-y-3 scale-100'}
                            group-focus-within:-translate-y-8 group-focus-within:scale-75`}
                        >
                            Search by Item No and Item Name
                        </label>

                        {/* Search Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 group-hover:text-pink-600 transition-all duration-300 ease-in-out"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 3.5a7.5 7.5 0 006.15 13.65z" />
                        </svg>

                        {/* Input Field */}
                        <input
                            type="text"
                            placeholder=""
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="border border-gray-300 pl-10 pr-10 py-2 rounded-lg shadow-lg bg-white bg-opacity-70 focus:bg-opacity-100 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-500 w-full 
                            group-hover:shadow-xl"
                        />

                        {/* Clear Button - Appears only if there is a search query */}
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')} // Clear the search query
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-red-200 p-1 rounded-full text-gray-600 hover:text-red-600 transition-all duration-300 ease-in-out"
                                aria-label="Clear search query"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}

                        {/* Decorative Border Animation */}
                        <div className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 scale-x-0 group-focus-within:scale-x-100 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"></div>
                    </div>
                </div>
                </div>

               
                {/* Container for the StoreReport component that displays filtered store data*/} 
                <div className='mb-4'>
                    {/* Render StoreReport component with filteredStores as props */}
                    <StoreReport filteredStores={filteredStores} />
                </div>

                {/*Conditional rendering based on loading state*/} 
                {loading ? (
                    // If loading is true, display the spinner component
                    <Spinner />
                ) : (
                    <div className="overflow-x-auto">
                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="max-h-[450px] overflow-y-auto">                    
                     {/* If loading is false, display the table with store items */}
                     <table className="w-full border-separate border-spacing-2">
                <thead className="sticky top-0 z-10 bg-gray-100">
                    <tr>
                        {/* Table headers for each column */}
                        <th className="border border-black px-4 py-2 text-left sticky top-0 bg-pink-100">Picture</th>
                        <th className="border border-black px-4 py-2 text-left sticky top-0 bg-pink-100">Item No</th>
                        {/* <th className="border border-black px-4 py-2 text-left sticky top-0 bg-pink-100">SupplierPhoneNumber</th> */}
                        <th className="border border-black px-4 py-2 text-left sticky top-0 bg-pink-100">Item Name</th>
                        <th className="border border-black px-4 py-2 text-left sticky top-0 bg-pink-100">Description</th>
                        <th className="border border-black px-4 py-2 text-left sticky top-0 bg-pink-100">Remaining Quantity</th>
                        <th className="border border-black px-4 py-2 text-left sticky top-0 bg-pink-100">Cost</th>
                        <th className="border border-black px-4 py-2 text-left sticky top-0 bg-pink-100">Selling Price</th>
                        <th className="border border-black px-4 py-2 text-left sticky top-0 bg-pink-100">Actions</th>
                    </tr>
                        </thead>
                        <tbody>
                            {/* Check if there are any filtered stores to display */}
                            {filteredStores.length > 0 ? (
                                // Map through each filtered store item to create table rows
                                filteredStores.map((storeItem, index) => (
                                    <tr key={storeItem._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                        {/* Cell for item image */}
                                        <td className="border border-black px-4 py-2">
                                            <img src={storeItem.image} alt="Item" width={'100'} /> {/* Display item image */}
                                        </td>
                                        {/* Cell for item number */}
                                        <td className="border border-black px-4 py-2">{storeItem.ItemNo}</td>
                                        
                                        {/* <td className="border border-black px-4 py-2">{storeItem.SupplierPhoneNumber}</td> */}

                                        {/* Cell for item name */}
                                        <td className="border border-black px-4 py-2">{storeItem.ItemName}</td>
                                        {/* Cell for item description */}
                                        <td className="border border-black px-4 py-2">{storeItem.Description}</td>
                                        {/* Cell for remaining quantity, calculated using a function */}
                                        <td className="border border-black px-4 py-2">{calculateRemainingQuantity(storeItem, orders)}</td>
                                        {/* Cell for item cost */}
                                        <td className="border border-black px-4 py-2">{storeItem.cost}</td>
                                        {/* Cell for selling price */}
                                        <td className="border border-black px-4 py-2">{storeItem.SPrice}</td>
                                        {/* Cell for action buttons */}
                                        <td className="border border-black px-4 py-2">
                                            <div className="flex justify-center gap-x-4">
                                                {/* Link to edit the store item, uses storeItem's id */}
                                                <Link to={`/store/edit/${storeItem._id}`}>
                                                    <AiOutlineEdit className="text-xl text-yellow-600 hover:text-yellow-800 transition-colors" /> {/* Edit icon */}
                                                </Link>
                                                {/* Link to delete the store item, uses storeItem's id */}
                                                <Link to={`/store/delete/${storeItem._id}`}>
                                                    <MdOutlineDelete className="text-xl text-red-600 hover:text-red-800 transition-colors" /> {/* Delete icon */}
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                // Display this row if there are no filtered stores
                                <tr>
                                    <td colSpan="8" className="text-center text-gray-500">No items found</td> {/* Message indicating no items were found */}
                                </tr>
                            )}
                        </tbody>
                    </table>
                    </div>
                    </div>
                    </div>
                )}

                
            </div>
        </div>
        </div>
    );
};

export default ShowStore;
