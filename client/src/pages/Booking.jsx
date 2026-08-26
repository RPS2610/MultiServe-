import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { getProviderById } from "../api/providerApi";
import { createBooking } from "../api/bookingApi";

import {
    FaUser,
    FaPhone,
    FaMapMarkerAlt,
    FaCheckCircle,
    FaBriefcase,
    FaRupeeSign
} from "react-icons/fa";

function Booking() {

    const { providerId } = useParams();

    const navigate = useNavigate();

    const [provider, setProvider] = useState(null);

    const [loading, setLoading] = useState(false);

    const currentUser = JSON.parse(localStorage.getItem("user"));

    const [formData, setFormData] = useState({

        customerName: currentUser?.name || "",

        phone: currentUser?.phone || "",

        address: currentUser?.address || ""

    });

    useEffect(() => {

        loadProvider();

    }, []);

    const loadProvider = async () => {

        try {

            const data = await getProviderById(providerId);

            setProvider(data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            await createBooking({

                customerId: currentUser._id,

                providerId,

                customerName: formData.customerName,

                customerPhone: formData.phone,

                customerAddress: formData.address,

                service: provider.service

            });

            alert("✅ Booking Confirmed Successfully");

            navigate("/my-bookings");

        }

        catch (error) {

            console.log(error);

            alert("Booking Failed");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <>

            <Navbar />

            <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">

                <div className="max-w-7xl mx-auto px-6 py-14">

                    <h1 className="text-5xl font-bold">

                        Confirm Your Booking

                    </h1>

                    <p className="mt-4 text-xl text-blue-100">

                        Fill your details and confirm your service request.

                    </p>

                </div>

            </section>

            <div className="max-w-7xl mx-auto px-6 py-14">

                <div className="grid lg:grid-cols-3 gap-10">

                    {/* Form */}

                    <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-10">

                        <h2 className="text-3xl font-bold mb-8">

                            Customer Information

                        </h2>

                        <form onSubmit={handleSubmit}>

                            <div className="space-y-6">

                                <div>

                                    <label className="font-semibold">

                                        Full Name

                                    </label>

                                    <div className="flex items-center border rounded-xl mt-2 px-4">

                                        <FaUser className="text-gray-400" />

                                        <input

                                            type="text"

                                            name="customerName"

                                            value={formData.customerName}

                                            onChange={handleChange}

                                            className="w-full p-4 outline-none"

                                            required

                                        />

                                    </div>

                                </div>

                                <div>

                                    <label className="font-semibold">

                                        Phone Number

                                    </label>

                                    <div className="flex items-center border rounded-xl mt-2 px-4">

                                        <FaPhone className="text-gray-400" />

                                        <input

                                            type="text"

                                            name="phone"

                                            value={formData.phone}

                                            onChange={handleChange}

                                            className="w-full p-4 outline-none"

                                            required

                                        />

                                    </div>

                                </div>

                                <div>

                                    <label className="font-semibold">

                                        Service Address

                                    </label>

                                    <div className="flex border rounded-xl mt-2 px-4">

                                        <FaMapMarkerAlt className="text-gray-400 mt-5" />

                                        <textarea

                                            rows="5"

                                            name="address"

                                            value={formData.address}

                                            onChange={handleChange}

                                            className="w-full p-4 outline-none resize-none"

                                            required

                                        />

                                    </div>

                                </div>

                                <button

                                    disabled={loading}

                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-lg font-semibold transition"

                                >

                                    {

                                        loading

                                            ?

                                            "Booking..."

                                            :

                                            "Confirm Booking"

                                    }

                                </button>

                            </div>

                        </form>

                    </div>

                    {/* Summary */}

                    <div>

                        {

                            provider &&

                            <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-24">

                                <h2 className="text-3xl font-bold mb-6">

                                    Booking Summary

                                </h2>

                                <img

                                    src="https://placehold.co/200x200"

                                    className="w-36 h-36 rounded-full mx-auto shadow-lg"

                                    alt="provider"

                                />

                                <h3 className="text-2xl font-bold text-center mt-5">

                                    {provider.name}

                                </h3>

                                <p className="text-center text-blue-600 font-semibold">

                                    {provider.service}

                                </p>

                                <div className="space-y-5 mt-8">

                                    <div className="flex items-center gap-3">

                                        <FaBriefcase className="text-blue-600" />

                                        {provider.experience} Years Experience

                                    </div>

                                    <div className="flex items-center gap-3">

                                        <FaMapMarkerAlt className="text-red-500" />

                                        {provider.city}

                                    </div>

                                    <div className="flex items-center gap-3">

                                        <FaRupeeSign className="text-green-600" />

                                        ₹{provider.price}

                                    </div>

                                </div>

                                <hr className="my-8" />

                                <div className="space-y-4">

                                    <div className="flex items-center gap-3">

                                        <FaCheckCircle className="text-green-600" />

                                        Verified Professional

                                    </div>

                                    <div className="flex items-center gap-3">

                                        <FaCheckCircle className="text-green-600" />

                                        Instant Booking

                                    </div>

                                    <div className="flex items-center gap-3">

                                        <FaCheckCircle className="text-green-600" />

                                        No Hidden Charges

                                    </div>

                                </div>

                            </div>

                        }

                    </div>

                </div>

            </div>

            <Footer />

        </>

    );

}

export default Booking;