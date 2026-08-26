import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
    getMyBookings,
    cancelBooking
} from "../api/bookingApi";

import { addReview } from "../api/reviewApi";

import {
    FaCalendarAlt,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaUserCircle,
    FaClock,
    FaCheckCircle,
    FaBan,
    FaStar
} from "react-icons/fa";

function MyBookings() {

    const currentUser = JSON.parse(localStorage.getItem("user"));

    const [bookings, setBookings] = useState([]);

    const [rating, setRating] = useState(0);

    const [review, setReview] = useState("");

    const [selectedBooking, setSelectedBooking] = useState(null);

    const [submittingReview, setSubmittingReview] = useState(false);

    useEffect(() => {

        if (currentUser?._id) {
            fetchBookings();
        }

    }, []);

    const fetchBookings = async () => {

        try {

            const data = await getMyBookings(currentUser._id);

            setBookings(data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleCancel = async (id) => {

        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this booking?"
        );

        if (!confirmCancel) return;

        try {

            await cancelBooking(id);

            fetchBookings();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to cancel booking"
            );

        }

    };

    const openReviewModal = (booking) => {

        setSelectedBooking(booking);

        setRating(0);

        setReview("");

    };

    const closeReviewModal = () => {

        setSelectedBooking(null);

        setRating(0);

        setReview("");

    };

    const handleReview = async () => {

        if (rating === 0) {

            alert("Please select a rating.");

            return;

        }

        if (!review.trim()) {

            alert("Please write a review.");

            return;

        }

        try {

            setSubmittingReview(true);

            await addReview({

                bookingId: selectedBooking._id,

                providerId: selectedBooking.providerId?._id,

                rating: rating,

                review: review.trim()

            });

            closeReviewModal();

            await fetchBookings();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to submit review"
            );

        } finally {

            setSubmittingReview(false);

        }

    };

    const totalBookings = bookings.length;

    const pending =
        bookings.filter(
            item => item.status === "Pending"
        ).length;

    const completed =
        bookings.filter(
            item => item.status === "Completed"
        ).length;

    const cancelled =
        bookings.filter(
            item => item.status === "Cancelled"
        ).length;

    const getStatusColor = (status) => {

        switch (status) {

            case "Pending":
                return "bg-yellow-100 text-yellow-700";

            case "Accepted":
                return "bg-green-100 text-green-700";

            case "Completed":
                return "bg-blue-100 text-blue-700";

            case "Rejected":
                return "bg-red-100 text-red-700";

            case "Cancelled":
                return "bg-gray-200 text-gray-700";

            default:
                return "bg-gray-100 text-gray-700";

        }

    };
        return (

        <>

            {/* Blur complete page when review modal is open */}
            <div
                className={
                    selectedBooking
                        ? "blur-sm transition duration-300"
                        : "transition duration-300"
                }
            >

                <Navbar />

                {/* Hero Section */}

                <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white">

                    <div className="max-w-7xl mx-auto px-6 py-14">

                        <h1 className="text-5xl font-bold">
                            My Bookings
                        </h1>

                        <p className="text-xl text-blue-100 mt-4">
                            Track all your booked services in one place.
                        </p>

                    </div>

                </section>

                {/* Dashboard Cards */}

                <div className="max-w-7xl mx-auto px-6 py-10">

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

                        {/* Total Bookings */}

                        <div className="bg-white rounded-3xl shadow-lg p-6">

                            <FaCalendarAlt className="text-5xl text-blue-600" />

                            <h2 className="text-4xl font-bold mt-5">
                                {totalBookings}
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Total Bookings
                            </p>

                        </div>

                        {/* Pending */}

                        <div className="bg-white rounded-3xl shadow-lg p-6">

                            <FaClock className="text-5xl text-yellow-500" />

                            <h2 className="text-4xl font-bold mt-5">
                                {pending}
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Pending
                            </p>

                        </div>

                        {/* Completed */}

                        <div className="bg-white rounded-3xl shadow-lg p-6">

                            <FaCheckCircle className="text-5xl text-green-600" />

                            <h2 className="text-4xl font-bold mt-5">
                                {completed}
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Completed
                            </p>

                        </div>

                        {/* Cancelled */}

                        <div className="bg-white rounded-3xl shadow-lg p-6">

                            <FaBan className="text-5xl text-red-500" />

                            <h2 className="text-4xl font-bold mt-5">
                                {cancelled}
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Cancelled
                            </p>

                        </div>

                    </div>

                    {/* No Bookings */}

                    {bookings.length === 0 ? (

                        <div className="bg-white rounded-3xl shadow-lg py-20 text-center">

                            <img
                                src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png"
                                alt="No Bookings"
                                className="w-32 mx-auto opacity-60"
                            />

                            <h2 className="text-3xl font-bold mt-8">
                                No Bookings Yet
                            </h2>

                            <p className="text-gray-500 mt-3">
                                Book a service and it will appear here.
                            </p>

                        </div>

                    ) : (

                        <div className="space-y-8">

                            {bookings.map((booking) => (

                                <div
                                    key={booking._id}
                                    className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden"
                                >

                                    <div className="grid lg:grid-cols-4">

                                        {/* Provider Image */}

                                        <div className="bg-gray-100 flex items-center justify-center p-8">

                                            <img
                                                src={
                                                    booking.providerId?.profileImage ||
                                                    "https://placehold.co/180x180"
                                                }
                                                alt="Provider"
                                                className="w-36 h-36 rounded-full border-4 border-white shadow-lg object-cover"
                                            />

                                        </div>

                                        {/* Provider Details */}

                                        <div className="lg:col-span-2 p-8">

                                            <h2 className="text-3xl font-bold">

                                                {booking.providerId?.name ||
                                                    "Provider"}

                                            </h2>

                                            <p className="text-blue-600 text-lg mt-2">

                                                {booking.service}

                                            </p>

                                            <div className="mt-6 space-y-4">

                                                <div className="flex items-center gap-3">

                                                    <FaPhoneAlt className="text-blue-600" />

                                                    <span>
                                                        {booking.providerId?.phone ||
                                                            "Not available"}
                                                    </span>

                                                </div>

                                                <div className="flex items-center gap-3">

                                                    <FaMapMarkerAlt className="text-red-500" />

                                                    <span>
                                                        {booking.providerId?.city ||
                                                            "Not available"}
                                                    </span>

                                                </div>

                                                <div className="flex items-center gap-3">

                                                    <FaUserCircle className="text-gray-500" />

                                                    <span>
                                                        {booking.customerName ||
                                                            currentUser?.name}
                                                    </span>

                                                </div>

                                                <div className="flex items-start gap-3">

                                                    <FaMapMarkerAlt className="text-green-600 mt-1" />

                                                    <span>
                                                        {booking.customerAddress ||
                                                            "Address not available"}
                                                    </span>

                                                </div>

                                            </div>

                                        </div>

                                        {/* Right Section */}

                                        <div className="bg-gray-50 p-8 flex flex-col justify-between">

                                            <div>

                                                <p className="text-gray-500">
                                                    Booking Date
                                                </p>

                                                <h3 className="text-xl font-bold mt-2">

                                                    {new Date(
                                                        booking.createdAt
                                                    ).toLocaleDateString()}

                                                </h3>

                                                <div className="mt-6">

                                                    <span
                                                        className={`px-5 py-2 rounded-full font-semibold ${getStatusColor(
                                                            booking.status
                                                        )}`}
                                                    >
                                                        {booking.status}
                                                    </span>

                                                </div>

                                            </div>

                                            <div className="mt-8 space-y-3">

                                                {/* Cancel Booking */}

                                                {booking.status === "Pending" && (

                                                    <button
                                                        onClick={() =>
                                                            handleCancel(
                                                                booking._id
                                                            )
                                                        }
                                                        className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl transition"
                                                    >
                                                        Cancel Booking
                                                    </button>

                                                )}

                                                {/* Give Review */}

                                                {booking.status === "Completed" && (

                                                    <button
                                                        onClick={() =>
                                                            openReviewModal(
                                                                booking
                                                            )
                                                        }
                                                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition"
                                                    >
                                                        ⭐ Give Review
                                                    </button>

                                                )}

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

                <Footer />

            </div>
                        {/* Review Modal */}

            {selectedBooking && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

                    <div className="bg-white w-[95%] max-w-lg rounded-3xl shadow-2xl p-8">

                        <h2 className="text-3xl font-bold mb-4">
                            ⭐ Rate Your Experience
                        </h2>

                        <p className="text-gray-500 mb-8">

                            Share your feedback for

                            <span className="font-semibold text-gray-800">

                                {" "}
                                {selectedBooking.providerId?.name ||
                                    "Provider"}

                            </span>

                        </p>

                        {/* Rating */}

                        <label className="block font-semibold mb-3">

                            Your Rating

                        </label>

                        <div className="flex items-center gap-2 mb-2">

                            {[1, 2, 3, 4, 5].map((star) => (

                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className="focus:outline-none transition-transform hover:scale-110"
                                >

                                    <FaStar
                                        className={
                                            star <= rating
                                                ? "text-yellow-400 text-4xl"
                                                : "text-gray-300 text-4xl"
                                        }
                                    />

                                </button>

                            ))}

                        </div>

                        <p className="text-sm text-gray-500 mb-6">

                            {rating === 0
                                ? "Click a star to give your rating"
                                : `${rating} out of 5 stars`}

                        </p>

                        {/* Review Text */}

                        <label className="block font-semibold mb-2">

                            Review

                        </label>

                        <textarea
                            rows="5"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="Tell others about your experience..."
                            className="w-full border rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {/* Buttons */}

                        <div className="flex justify-end gap-4 mt-8">

                            <button
                                type="button"
                                onClick={closeReviewModal}
                                disabled={submittingReview}
                                className="px-6 py-3 rounded-xl bg-gray-300 hover:bg-gray-400 transition disabled:opacity-50"
                            >

                                Cancel

                            </button>

                            <button
                                type="button"
                                onClick={handleReview}
                                disabled={
                                    submittingReview ||
                                    rating === 0 ||
                                    !review.trim()
                                }
                                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >

                                {submittingReview
                                    ? "Submitting..."
                                    : "Submit Review"}

                            </button>

                        </div>

                    </div>

                </div>

            )}

            </>
        );

}

export default MyBookings;