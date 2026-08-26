import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
    getProviderBookings,
    updateBookingStatus
} from "../api/bookingApi";

import {
    getProviderReviews
} from "../api/reviewApi";

import {
    FaClipboardList,
    FaCheckCircle,
    FaClock,
    FaMoneyBillWave,
    FaStar,
    FaUserCircle,
    FaMapMarkerAlt,
    FaPhoneAlt
} from "react-icons/fa";

function ProviderDashboard() {

    const currentUser = JSON.parse(localStorage.getItem("user"));

    const [bookings, setBookings] = useState([]);

    const [reviews, setReviews] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

    if (currentUser?._id) {
        loadDashboard();
    }

}, []);

    const loadDashboard = async () => {

        try {

            const bookingData = await getProviderBookings(currentUser._id);

            const reviewData = await getProviderReviews(currentUser._id);

            setBookings(bookingData);

            setReviews(reviewData);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };


   const updateStatus = async (id, status) => {
    try {
        await updateBookingStatus(id, status);
        await loadDashboard();
    }
    catch (err) {
        console.log(err);
    }
};

    const totalBookings = bookings.length;

    const pendingBookings =
        bookings.filter(item => item.status === "Pending").length;

    const acceptedBookings =
        bookings.filter(item => item.status === "Accepted").length;

    const completedBookings =
        bookings.filter(item => item.status === "Completed").length;
        
const totalEarnings =
    bookings
        .filter(item => item.status === "Completed")
        .reduce(
            (sum, item) => sum + (item.price || currentUser?.price || 0),
            0
        );

    const averageRating =
        reviews.length > 0
            ? (
                reviews.reduce(
                    (sum, item) => sum + item.rating,
                    0
                ) / reviews.length
            ).toFixed(1)
            : "0";

    if (loading) {

        return (

            <>

                <Navbar />

                <div className="min-h-screen flex items-center justify-center">

                    <h1 className="text-3xl font-bold">

                        Loading Dashboard...

                    </h1>

                </div>

            </>

        );

    }

    return (

        <>

            <Navbar />

            {/* Hero */}

            <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white">

                <div className="max-w-7xl mx-auto px-6 py-14">

                    <h1 className="text-5xl font-bold">

                        Welcome Back,

                        <span className="text-yellow-300">

                            {" "} {currentUser.name}

                        </span>

                    </h1>

                    <p className="mt-4 text-xl text-blue-100">

                        Manage your customers, bookings and earnings.

                    </p>

                </div>

            </section>

            {/* Statistics */}

            <div className="max-w-7xl mx-auto px-6 py-10">

                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">

                    <div className="bg-white rounded-3xl shadow-lg p-6">

                        <FaClipboardList className="text-blue-600 text-5xl" />

                        <h2 className="text-4xl font-bold mt-5">

                            {totalBookings}

                        </h2>

                        <p className="text-gray-500 mt-2">

                            Total Bookings

                        </p>

                    </div>

                    <div className="bg-white rounded-3xl shadow-lg p-6">

                        <FaClock className="text-orange-500 text-5xl" />

                        <h2 className="text-4xl font-bold mt-5">

                            {pendingBookings}

                        </h2>

                        <p className="text-gray-500 mt-2">

                            Pending

                        </p>

                    </div>

                    <div className="bg-white rounded-3xl shadow-lg p-6">

                        <FaCheckCircle className="text-green-600 text-5xl" />

                        <h2 className="text-4xl font-bold mt-5">

                            {acceptedBookings}

                        </h2>

                        <p className="text-gray-500 mt-2">

                            Accepted

                        </p>

                    </div>

                    <div className="bg-white rounded-3xl shadow-lg p-6">

                        <FaMoneyBillWave className="text-emerald-600 text-5xl" />

                        <h2 className="text-3xl font-bold mt-5">

                            ₹{totalEarnings}

                        </h2>

                        <p className="text-gray-500 mt-2">

                            Earnings

                        </p>

                    </div>

                    <div className="bg-white rounded-3xl shadow-lg p-6">

                        <FaStar className="text-yellow-500 text-5xl" />

                        <h2 className="text-4xl font-bold mt-5">

                            {averageRating}

                        </h2>

                        <p className="text-gray-500 mt-2">

                            Rating

                        </p>

                    </div>

                </div>

                {/* Customer Bookings */}

                <div className="mt-14">

                    <h2 className="text-4xl font-bold mb-8">

                        Customer Bookings

                    </h2>

                    <div className="space-y-6">
                        {

    bookings.length === 0 ?

        (

            <div className="bg-white rounded-3xl shadow-lg p-12 text-center">

                <img
                    src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png"
                    alt=""
                    className="w-28 mx-auto mb-5 opacity-60"
                />

                <h2 className="text-2xl font-bold">

                    No Bookings Yet

                </h2>

                <p className="text-gray-500 mt-3">

                    Once customers book your service, they'll appear here.

                </p>

            </div>

        )

        :

        bookings.map((booking) => (

            <div

                key={booking._id}

                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 p-8"

            >

                <div className="flex flex-col lg:flex-row justify-between gap-8">

                    {/* Left */}

                    <div className="flex gap-5">

                        <img

                            src="https://placehold.co/90x90"

                            alt="customer"

                            className="w-20 h-20 rounded-full"

                        />

                        <div>

                            <h2 className="text-2xl font-bold">

                                {booking.customerName}

                            </h2>

                            <div className="flex items-center gap-2 mt-3 text-gray-600">

                                <FaPhoneAlt />

                                {booking.customerPhone}

                            </div>

                            <div className="flex items-center gap-2 mt-2 text-gray-600">

                                <FaMapMarkerAlt />

                                {booking.customerAddress}

                            </div>

                            <div className="mt-3">

                                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">

                                    {booking.service}

                                </span>

                            </div>

                        </div>

                    </div>

                    {/* Right */}

                    <div className="text-right">

                        {

                            booking.status === "Pending" &&

                            <span className="bg-yellow-100 text-yellow-700 px-5 py-2 rounded-full font-semibold">

                                Pending

                            </span>

                        }

                        {

                            booking.status === "Accepted" &&

                            <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold">

                                Accepted

                            </span>

                        }

                        {

                            booking.status === "Completed" &&

                            <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold">

                                Completed

                            </span>

                        }

                        {

                            booking.status === "Rejected" &&

                            <span className="bg-red-100 text-red-700 px-5 py-2 rounded-full font-semibold">

                                Rejected

                            </span>

                        }

                        {

                            booking.status === "Cancelled" &&

                            <span className="bg-gray-200 text-gray-700 px-5 py-2 rounded-full font-semibold">

                                Cancelled

                            </span>

                        }

                        <p className="text-gray-500 mt-5">

                            {

                                new Date(

                                    booking.createdAt

                                ).toLocaleDateString()

                            }

                        </p>

                    </div>

                </div>

                {/* Buttons */}

                <div className="flex flex-wrap gap-4 mt-8">

                    {

                        booking.status === "Pending" &&

                        <>

                            <button

                                onClick={() => updateStatus(booking._id, "Accepted")}

                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"

                            >

                                Accept Booking

                            </button>

                            <button

                                onClick={() => updateStatus(booking._id, "Rejected")}

                                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"

                            >

                                Reject Booking

                            </button>

                        </>

                    }

                    {

                        booking.status === "Accepted" &&

                        <button

                            onClick={() => updateStatus(booking._id, "Completed")}

                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"

                        >

                            Mark as Completed

                        </button>

                    }

                </div>

            </div>

        ))

}

                    </div>

                </div>

                {/* Customer Reviews */}

                <div className="mt-20">

                    <h2 className="text-4xl font-bold mb-8">

                        Customer Reviews

                    </h2>

                    <div className="space-y-6">
                        {

    reviews.length === 0 ?

    (

        <div className="bg-white rounded-3xl shadow-lg p-12 text-center">

            <FaStar className="text-6xl text-yellow-400 mx-auto mb-5" />

            <h2 className="text-2xl font-bold">

                No Reviews Yet

            </h2>

            <p className="text-gray-500 mt-3">

                Reviews from your customers will appear here.

            </p>

        </div>

    )

    :

    reviews.map((review) => (

        <div

            key={review._id}

            className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition p-8"

        >

            <div className="flex items-center justify-between">

                <div className="flex items-center gap-5">

                    <img

                        src="https://placehold.co/70x70"

                        alt="customer"

                        className="w-16 h-16 rounded-full"

                    />

                    <div>

                        <h3 className="text-xl font-bold">

                            {review.customerId?.name || "Customer"}

                        </h3>

                        <p className="text-gray-500">

                            {

                                new Date(

                                    review.createdAt

                                ).toLocaleDateString()

                            }

                        </p>

                    </div>

                </div>

                <div className="flex text-yellow-500 text-xl">

                    {"⭐".repeat(review.rating)}

                </div>

            </div>

            <p className="mt-6 text-gray-700 leading-8">

                {review.review}

            </p>

        </div>

    ))

}

                    </div>

                </div>

            </div>

            <Footer />

        </>

    );

}

export default ProviderDashboard;
