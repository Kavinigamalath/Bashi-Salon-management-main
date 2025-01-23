import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import BackButton from "../../components/BackButton";
import './checkout.css';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { items, userId: CusID, total } = location.state || {};

    const [loading, setLoading] = useState(false);
    const [customerInfo, setCustomerInfo] = useState({
        FirstName: "",
        Email: "",
        ContactNo: "",
    });
    const [deliveryInfo, setDeliveryInfo] = useState({
        address: "",
        city: "",
        postalCode: "",
    });
    const [paymentMethod, setPaymentMethod] = useState("Cash");
    const [cardInfo, setCardInfo] = useState({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });

    useEffect(() => {
        const fetchCustomerInfo = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8076/customers/${CusID}`);
                const { FirstName, Email, ContactNo } = response.data;
                setCustomerInfo({
                    FirstName: FirstName || "",
                    Email: Email || "",
                    ContactNo: ContactNo || ""
                });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching customer information:", error);
                Swal.fire("Error", "Failed to fetch customer information", "error");
                setLoading(false);
            }
        };

        if (CusID) {
            fetchCustomerInfo();
        }
    }, [CusID]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleDeliveryChange = (e) => {
        const { name, value } = e.target;
        setDeliveryInfo((prevState) => ({ ...prevState, [name]: value }));
    };

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleCardInfoChange = (e) => {
        const { name, value } = e.target;
        setCardInfo((prevState) => ({ ...prevState, [name]: value }));
    };

    const validateForm = () => {
        if (!customerInfo.FirstName || !customerInfo.Email || !customerInfo.ContactNo) {
            Swal.fire('Error', 'Please fill in all customer information fields.', 'error');
            return false;
        }
        if (!deliveryInfo.address || !deliveryInfo.city || !deliveryInfo.postalCode) {
            Swal.fire('Error', 'Please fill in all delivery information fields.', 'error');
            return false;
        }
        if (paymentMethod === 'Card' && (!cardInfo.cardNumber || !cardInfo.expiryDate || !cardInfo.cvv)) {
            Swal.fire('Error', 'Please fill in all card information fields.', 'error');
            return false;
        }
        return true;
    };

    const validateCardInfo = () => {
        const { cardNumber, expiryDate, cvv } = cardInfo;

        // Card Number validation
        const cardNumberPattern = /^\d{16}$/; // Basic check for 16 digits
        if (!cardNumberPattern.test(cardNumber)) {
            Swal.fire('Error', 'Please enter a valid card number (16 digits).', 'error');
            return false;
        }

        // Expiry Date validation
        const expiryPattern = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/; // MM/YY format
        if (!expiryPattern.test(expiryDate)) {
            Swal.fire('Error', 'Please enter a valid expiry date (MM/YY).', 'error');
            return false;
        }

        const [month, year] = expiryDate.split('/').map(Number);
        const currentYear = new Date().getFullYear() % 100; // Get last two digits of current year
        const currentMonth = new Date().getMonth() + 1; // Get current month (1-12)

        if (year < currentYear || (year === currentYear && month < currentMonth)) {
            Swal.fire('Error', 'Card has expired. Please use a valid card.', 'error');
            return false;
        }

        // CVV validation
        const cvvPattern = /^\d{3,4}$/; // 3 or 4 digits
        if (!cvvPattern.test(cvv)) {
            Swal.fire('Error', 'Please enter a valid CVV (3 or 4 digits).', 'error');
            return false;
        }

        return true;
    };

    const handlePlaceOrder = async () => {
        if (!validateForm()) return; // Existing validation for customer and delivery info
        if (paymentMethod === 'Card' && !validateCardInfo()) return; // Validate card info

        setLoading(true);
        const orderData = {
            CusID,
            items,
            total: total || 0,
            customerInfo,
            deliveryInfo,
            paymentMethod,
            cardInfo,
        };

        try {
            const response = await axios.post("http://localhost:8076/order", orderData);
            localStorage.removeItem("cart");
            setLoading(false);
            Swal.fire("Success", `Order placed successfully! Order ID: ${response.data.orderId}`, "success")
                .then(() => {
                    navigate(`/customers/get/${CusID}`);
                });
        } catch (error) {
            setLoading(false);
            Swal.fire("Error", "Failed to place order. Please try again.", "error");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (

<div className="animated-bg min-h-screen">      
<div>
    <BackButton destination={`/cart/${CusID}`} />
    <div className="p-8 flex flex-col items-center">
        <div className="w-full max-w-4xl bg-gradient-to-r from-pink-400 to-pink-400 p-8 rounded-3xl shadow-xl">
            <h1 className="text-4xl font-bold text-white mb-8 text-center">CHECKOUT</h1>

            {items && items.length > 0 ? (
                <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                    <h2 className="text-2xl font-semibold text-pink-600 mb-6 text-center">Your Order</h2>
                    {items.map((item) => (
                        <div
                            key={item.itemId}
                            className="flex justify-between items-center p-4 mb-4 border border-pink-400 rounded-lg shadow-md bg-gradient-to-r from-pink-100 to-pink-200 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="flex gap-4 items-center">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-16 h-16 object-cover rounded-full shadow-lg border border-pink-400"
                                />
                                <span className="font-medium text-pink-700">{item.title}</span>
                            </div>
                            <span className="text-pink-700">Qty: {item.quantity}</span>
                            <span className="text-pink-700">Total Price: Rs.{(item.SPrice * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-white text-center">No items to display</p>
            )}

            <div className="mb-8">
                <h2 className="text-3xl font-semibold text-white mb-4">Customer Information</h2>
                <label className="text-white font-semibold mb-2 block">First Name</label>
                <input
                    type="text"
                    name="FirstName"
                    placeholder="First Name"
                    value={customerInfo.FirstName}
                    onChange={handleInputChange}
                    readOnly
                    className="block w-full mb-4 p-4 border border-white rounded-lg bg-pink-200 text-gray-800 shadow-md"
                />
                <label className="text-white font-semibold mb-2 block">Email</label>
                <input
                    type="email"
                    name="Email"
                    placeholder="Email"
                    value={customerInfo.Email}
                    onChange={handleInputChange}
                    readOnly
                    className="block w-full mb-4 p-4 border border-white rounded-lg bg-pink-200 text-gray-800 shadow-md"
                />
                <label className="text-white font-semibold mb-2 block">Contact Number</label>
                <input
                    type="text"
                    name="ContactNo"
                    placeholder="Contact Number"
                    value={customerInfo.ContactNo}
                    onChange={handleInputChange}
                    readOnly
                    className="block w-full mb-4 p-4 border border-white rounded-lg bg-pink-200 text-gray-800 shadow-md"
                />
            </div>

            <div className="mb-8">
                <h2 className="text-3xl font-semibold text-white mb-4">Delivery Information</h2>
                <label className="text-white font-semibold mb-2 block">Address</label>
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={deliveryInfo.address}
                    onChange={handleDeliveryChange}
                    className="block w-full mb-4 p-4 border border-white rounded-lg bg-pink-200 text-gray-800 shadow-md"
                />
                <label className="text-white font-semibold mb-2 block">City</label>
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={deliveryInfo.city}
                    onChange={handleDeliveryChange}
                    className="block w-full mb-4 p-4 border border-white rounded-lg bg-pink-200 text-gray-800 shadow-md"
                />
                <label className="text-white font-semibold mb-2 block">Postal Code</label>
                <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={deliveryInfo.postalCode}
                    onChange={handleDeliveryChange}
                    className="block w-full mb-4 p-4 border border-white rounded-lg bg-pink-200 text-gray-800 shadow-md"
                />
            </div>

            <div className="mb-8">
                <h2 className="text-3xl font-semibold text-white mb-4">Payment Method</h2>
                <label className="text-white font-semibold mb-2 block">Select Payment Method</label>
                <select
                    value={paymentMethod}
                    onChange={handlePaymentChange}
                    className="block w-full mb-4 p-4 border border-white rounded-lg bg-pink-200 text-gray-800 shadow-md"
                >
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                </select>

                {paymentMethod === 'Card' && (
                    <div>
                        <label className="text-white font-semibold mb-2 block">Card Number</label>
                        <input
                            type="text"
                            name="cardNumber"
                            placeholder="Card Number"
                            value={cardInfo.cardNumber}
                            onChange={handleCardInfoChange}
                            maxLength={16}
                            className="block w-full mb-4 p-4 border border-white rounded-lg bg-pink-200 text-gray-800 shadow-md"
                        />
                        <label className="text-white font-semibold mb-2 block">Expiry Date (MM/YY)</label>
                        <input
                            type="text"
                            name="expiryDate"
                            placeholder="Expiry Date (MM/YY)"
                            value={cardInfo.expiryDate}
                            onChange={handleCardInfoChange}
                            className="block w-full mb-4 p-4 border border-white rounded-lg bg-pink-200 text-gray-800 shadow-md"
                        />
                        <label className="text-white font-semibold mb-2 block">CVV</label>
                        <input
                            type="text"
                            name="cvv"
                            placeholder="CVV"
                            value={cardInfo.cvv}
                            onChange={handleCardInfoChange}
                            maxLength={4}
                            className="block w-full mb-4 p-4 border border-white rounded-lg bg-pink-200 text-gray-800 shadow-md"
                        />
                    </div>
                )}
            </div>

            <button
                onClick={handlePlaceOrder}
                className="mt-4 w-full bg-pink-700 hover:bg-pink-800 text-white p-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
            >
                Place Order
            </button>
        </div>
    </div>
</div>
</div>  


    );
};

export default Checkout;
