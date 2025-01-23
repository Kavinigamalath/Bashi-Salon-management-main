import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import Hcard from '../HomeCard/Hcard';
import BackButton from '../../components/BackButton';

const ItemDis = () => {
    const { ItemNo, CusID } = useParams();  // Extract ItemNo and CusID from URL
    const navigate = useNavigate();  // Initialize useNavigate
    const [store, setStore] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8076/store')
            .then((response) => {
                const data = response.data;
                if (Array.isArray(data)) {
                    setStore(data);
                } else {
                    console.warn('Data is not an array:', data);
                    setStore([]);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching store data:', error);
                setStore([]);
                setLoading(false);
            });
    }, []);

    const itemdis = store.find((item) => item.ItemNo.toString() === ItemNo);  // Ensure matching string types
    //const recommendedItems = store.filter((item) => item.ItemNo.toString() !== ItemNo);  // Filter out current item

    const handleIncrease = () => setQuantity(quantity + 1);
    const handleDecrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleAddToCart = () => {
        try {
            if (!itemdis) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Item details are not available.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
                return;
            }
    
            const cartItem = {
                userId: CusID,  // Pass CusID from URL
                ItemNo: itemdis.ItemNo,
                ItemName: itemdis.ItemName,
                image: itemdis.image,
                SPrice: itemdis.SPrice,
                quantity,
            };
    
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(cartItem);
            localStorage.setItem('cart', JSON.stringify(cart));
    
            Swal.fire({
                title: 'Item added to cart successfully!',
                text: 'Would you like to view your cart or add more items?',
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: 'Go to Cart',
                cancelButtonText: 'Add More',
            }).then((result) => {
                if (result.isConfirmed) {
                    // Navigate to cart page with CusID
                    window.location.href = `/cart/${CusID}`;
                }
            });
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred while adding the item to the cart. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };
    
    const handleBuyNow = () => {
        // Logic to buy the item immediately
    };

    if (loading) {
        return <div>Loading...</div>;  // Show loading until data is fetched
    }

    if (!itemdis) {
        return <div>Item not found</div>;  // If no matching item is found
    }
    const recommendedItems = store.filter((item) => item.ItemNo !== parseInt(ItemNo, 5));

    return (
        <div>
                        <BackButton destination={`/ReadOneHome/${CusID}`} />

        <div className="min-h-screen p-8 flex flex-col items-center">
        <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12 py-8 px-4 bg-white shadow-lg rounded-xl">
        {/* Product Image */}
        <div className="w-full lg:w-1/2">
            <img
            className="rounded-xl w-full transition-transform duration-300 transform hover:scale-105 shadow-lg"
            src={itemdis?.image}
            alt={itemdis?.ItemName}
            />
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2 space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">{itemdis?.ItemName}</h1>
            <p className="text-lg text-gray-600 leading-relaxed">{itemdis?.Description}</p>
            <h2 className="text-2xl font-semibold text-gray-900">Rs. {itemdis?.SPrice}</h2>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
            <button
                onClick={handleDecrease}
                className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-full shadow-md hover:bg-gray-300 transition duration-200"
            >
                -
            </button>
            <span className="text-xl font-medium">{quantity}</span>
            <button
                onClick={handleIncrease}
                className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-full shadow-md hover:bg-gray-300 transition duration-200"
            >
                +
            </button>
            </div>

            {/* Add to Cart Button */}
            <div className="flex space-x-4">
            <button
                onClick={handleAddToCart}
                className="px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-full shadow-lg hover:bg-green-500 hover:shadow-2xl transition-transform transform hover:scale-105 duration-300"
            >
                Add to Cart
            </button>
            </div>
        </div>
        </div>


         
            <div className="w-full flex justify-center mt-12">
                <div id="products" className="bg-gradient-to-t from-gray-900 to-gray-600py-16 px-8 md:px-16 min-h-screen w-[100%] animate-fadeIn rounded-t-[10%] ">
                <h3 className="text-6xl font-extrabold text-center mb-10 text-gray-800 tracking-tight leading-snug animate-bounce">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 ">Recommended for you..</span>
        </h3>
        
              <Hcard CusID={CusID} />
             
              {/* Animated Divider */}
      <div className="w-full flex justify-center mt-12">
        <hr className="w-1/2 border-t-2 border-pink-300 animate-glow" />
      </div>

      {/* Interactive Call to Action */}
      <div className="ml-4">
      <div className="flex justify-center mt-16">
        <a className="relative z-10 bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800 text-white font-bold py-4 px-10 rounded-full shadow-lg tracking-wider transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-2xl">
        Premium value, budget-friendly prices!
          <span className="absolute inset-0 w-full h-full bg-pink-800 opacity-0 transition-opacity duration-300 rounded-full hover:opacity-20"></span>
        </a>
        </div>
        
        <center>**********</center>
      </div>

      {/* Bottom Floating Decorative Element */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-400 rounded-full filter blur-2xl opacity-30 animate-float-slow"></div>

        </div>
            </div>
        </div>
        </div>
    );
};

export default ItemDis;
