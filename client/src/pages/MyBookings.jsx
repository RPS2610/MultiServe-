import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    FaStar,
    FaShieldAlt,
    FaArrowRight,
    FaTimes,
    FaClipboardList
} from "react-icons/fa";

function MyBookings() {
    const navigate = useNavigate();

    const currentUser = JSON.parse(localStorage.getItem("user"));

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [submittingReview, setSubmittingReview] = useState(false);

    useEffect(() => {
        if (currentUser?._id) {
            fetchBookings();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchBookings = async () => {
        try {
            setLoading(true);

            const data = await getMyBookings(currentUser._id);
            setBookings(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
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

    const pending = bookings.filter(
        item => item.status === "Pending"
    ).length;

    const completed = bookings.filter(
        item => item.status === "Completed"
    ).length;

    const cancelled = bookings.filter(
        item => item.status === "Cancelled"
    ).length;

    const getStatusConfig = (status) => {
        switch (status) {
            case "Pending":
                return {
                    className: "bg-amber-50 text-amber-700 border-amber-200",
                    dot: "bg-amber-500",
                    icon: FaClock
                };

            case "Accepted":
                return {
                    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
                    dot: "bg-emerald-500",
                    icon: FaCheckCircle
                };

            case "Completed":
                return {
                    className: "bg-indigo-50 text-indigo-700 border-indigo-200",
                    dot: "bg-indigo-500",
                    icon: FaCheckCircle
                };

            case "Rejected":
                return {
                    className: "bg-red-50 text-red-700 border-red-200",
                    dot: "bg-red-500",
                    icon: FaBan
                };

            case "Cancelled":
                return {
                    className: "bg-slate-100 text-slate-600 border-slate-200",
                    dot: "bg-slate-400",
                    icon: FaBan
                };

            default:
                return {
                    className: "bg-slate-50 text-slate-600 border-slate-200",
                    dot: "bg-slate-400",
                    icon: FaClipboardList
                };
        }
    };

    const getProviderImage = (provider) => {
        return (
            provider?.profileImage ||
            provider?.image ||
            provider?.photo ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                provider?.name || "Provider"
            )}&background=EEF2FF&color=4338CA&size=400`
        );
    };

    return (
        <>
            <Navbar />

            {/* =====================================================
                HERO
            ====================================================== */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#3125c9] via-[#4036d8] to-[#571ac0] text-white">

                <div className="absolute -top-28 -right-24 w-80 h-80 rounded-full bg-white/10 blur-3xl" />

                <div className="absolute -bottom-36 -left-24 w-96 h-96 rounded-full bg-purple-400/20 blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 sm:py-16">

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-semibold mb-5">
                        <FaClipboardList />
                        Service Management
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                        My Bookings
                    </h1>

                    <p className="text-indigo-100 text-base sm:text-lg mt-4 max-w-2xl leading-relaxed">
                        Track your service requests, manage bookings and
                        share your experience with trusted professionals.
                    </p>
                </div>
            </section>

            {/* =====================================================
                MAIN
            ====================================================== */}
            <main className="bg-[#fcf8ff] min-h-screen">

                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 sm:py-14">

                    {/* =================================================
                        STATS
                    ================================================== */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">

                        {/* Total */}
                        <div className="bg-white rounded-3xl border border-indigo-50 shadow-[0_8px_30px_rgba(53,37,205,0.06)] p-5 sm:p-6">

                            <div className="flex items-start justify-between">

                                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-indigo-50 text-[#3525cd] flex items-center justify-center text-lg sm:text-xl">
                                    <FaCalendarAlt />
                                </div>

                                <span className="hidden sm:block text-xs font-bold text-slate-400 uppercase tracking-wider">
                                    All time
                                </span>
                            </div>

                            <p className="text-3xl sm:text-4xl font-bold text-[#1b1b24] mt-5">
                                {totalBookings}
                            </p>

                            <p className="text-sm sm:text-base text-slate-500 mt-1">
                                Total Bookings
                            </p>
                        </div>

                        {/* Pending */}
                        <div className="bg-white rounded-3xl border border-indigo-50 shadow-[0_8px_30px_rgba(53,37,205,0.06)] p-5 sm:p-6">

                            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center text-lg sm:text-xl">
                                <FaClock />
                            </div>

                            <p className="text-3xl sm:text-4xl font-bold text-[#1b1b24] mt-5">
                                {pending}
                            </p>

                            <p className="text-sm sm:text-base text-slate-500 mt-1">
                                Pending
                            </p>
                        </div>

                        {/* Completed */}
                        <div className="bg-white rounded-3xl border border-indigo-50 shadow-[0_8px_30px_rgba(53,37,205,0.06)] p-5 sm:p-6">

                            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-lg sm:text-xl">
                                <FaCheckCircle />
                            </div>

                            <p className="text-3xl sm:text-4xl font-bold text-[#1b1b24] mt-5">
                                {completed}
                            </p>

                            <p className="text-sm sm:text-base text-slate-500 mt-1">
                                Completed
                            </p>
                        </div>

                        {/* Cancelled */}
                        <div className="bg-white rounded-3xl border border-indigo-50 shadow-[0_8px_30px_rgba(53,37,205,0.06)] p-5 sm:p-6">

                            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center text-lg sm:text-xl">
                                <FaBan />
                            </div>

                            <p className="text-3xl sm:text-4xl font-bold text-[#1b1b24] mt-5">
                                {cancelled}
                            </p>

                            <p className="text-sm sm:text-base text-slate-500 mt-1">
                                Cancelled
                            </p>
                        </div>

                    </div>

                    {/* =================================================
                        SECTION HEADER
                    ================================================== */}
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-7">

                        <div>
                            <p className="text-sm font-bold uppercase tracking-widest text-[#3525cd]">
                                Your activity
                            </p>

                            <h2 className="text-2xl sm:text-3xl font-bold text-[#1b1b24] mt-1">
                                Recent Bookings
                            </h2>
                        </div>

                        {bookings.length > 0 && (
                            <p className="text-sm text-slate-500">
                                {bookings.length}{" "}
                                {bookings.length === 1
                                    ? "booking"
                                    : "bookings"}{" "}
                                found
                            </p>
                        )}

                    </div>

                    {/* =================================================
                        LOADING
                    ================================================== */}
                    {loading ? (
                        <div className="space-y-6">

                            {[1, 2].map((item) => (
                                <div
                                    key={item}
                                    className="bg-white rounded-3xl border border-indigo-50 p-6 sm:p-8 animate-pulse"
                                >
                                    <div className="flex flex-col lg:flex-row gap-6">

                                        <div className="w-28 h-28 rounded-2xl bg-slate-100 mx-auto lg:mx-0" />

                                        <div className="flex-1 space-y-4">
                                            <div className="h-6 bg-slate-100 rounded-lg w-48" />
                                            <div className="h-4 bg-slate-100 rounded-lg w-32" />
                                            <div className="h-4 bg-slate-100 rounded-lg w-72 max-w-full" />
                                            <div className="h-4 bg-slate-100 rounded-lg w-60 max-w-full" />
                                        </div>

                                        <div className="lg:w-48 space-y-4">
                                            <div className="h-6 bg-slate-100 rounded-full w-24" />
                                            <div className="h-11 bg-slate-100 rounded-xl" />
                                        </div>

                                    </div>
                                </div>
                            ))}

                        </div>
                    ) : bookings.length === 0 ? (

                        /* =================================================
                           EMPTY STATE
                        ================================================== */
                        <div className="bg-white rounded-3xl border border-indigo-50 shadow-[0_10px_40px_rgba(53,37,205,0.06)] py-16 sm:py-20 px-6 text-center">

                            <div className="w-20 h-20 mx-auto rounded-3xl bg-indigo-50 text-[#3525cd] flex items-center justify-center text-3xl">
                                <FaCalendarAlt />
                            </div>

                            <h2 className="text-2xl sm:text-3xl font-bold text-[#1b1b24] mt-7">
                                No Bookings Yet
                            </h2>

                            <p className="text-slate-500 mt-3 max-w-md mx-auto leading-relaxed">
                                You haven't booked any services yet.
                                Find a trusted professional and get your
                                first service booked today.
                            </p>

                            <button
                                onClick={() => navigate("/providers")}
                                className="mt-7 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#3525cd] hover:bg-[#2d20b5] text-white font-bold shadow-lg shadow-indigo-200 transition"
                            >
                                Browse Services
                                <FaArrowRight />
                            </button>

                        </div>

                    ) : (

                        /* =================================================
                           BOOKINGS
                        ================================================== */
                        <div className="space-y-6">

                            {bookings.map((booking) => {

                                const status = getStatusConfig(
                                    booking.status
                                );

                                const StatusIcon = status.icon;

                                return (
                                    <article
                                        key={booking._id}
                                        className="bg-white rounded-3xl border border-indigo-50 shadow-[0_10px_35px_rgba(53,37,205,0.06)] hover:shadow-[0_16px_45px_rgba(53,37,205,0.10)] transition-all duration-300 overflow-hidden"
                                    >

                                        <div className="p-5 sm:p-7 lg:p-8">

                                            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

                                                {/* =========================
                                                    PROVIDER
                                                ========================== */}
                                                <div className="flex flex-row lg:flex-col items-center lg:justify-center gap-4 lg:w-36 shrink-0">

                                                    <img
                                                        src={getProviderImage(
                                                            booking.providerId
                                                        )}
                                                        alt={
                                                            booking.providerId?.name ||
                                                            "Provider"
                                                        }
                                                        className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-2xl object-cover border-4 border-indigo-50 shadow-sm"
                                                    />

                                                    <div className="lg:text-center">

                                                        <div className="flex items-center gap-1.5 justify-start lg:justify-center">
                                                            <FaCheckCircle className="text-emerald-500 text-xs" />

                                                            <span className="text-xs font-bold text-slate-500">
                                                                Verified
                                                            </span>
                                                        </div>

                                                    </div>

                                                </div>

                                                {/* =========================
                                                    DETAILS
                                                ========================== */}
                                                <div className="flex-1 min-w-0">

                                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">

                                                        <div>
                                                            <p className="text-xs font-bold uppercase tracking-widest text-[#3525cd]">
                                                                Service
                                                            </p>

                                                            <h3 className="text-xl sm:text-2xl font-bold text-[#1b1b24] mt-1">
                                                                {booking.providerId?.name ||
                                                                    "Provider"}
                                                            </h3>

                                                            <p className="text-[#3525cd] font-semibold mt-1">
                                                                {booking.service}
                                                            </p>
                                                        </div>

                                                        {/* Status */}
                                                        <span
                                                            className={`inline-flex items-center gap-2 w-fit px-3.5 py-2 rounded-full border text-xs sm:text-sm font-bold ${status.className}`}
                                                        >
                                                            <span
                                                                className={`w-2 h-2 rounded-full ${status.dot}`}
                                                            />

                                                            <StatusIcon className="text-xs" />

                                                            {booking.status}
                                                        </span>

                                                    </div>

                                                    {/* Information Grid */}
                                                    <div className="grid sm:grid-cols-2 gap-3 mt-6">

                                                        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#f8f7ff]">

                                                            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-[#3525cd] flex items-center justify-center shrink-0">
                                                                <FaPhoneAlt className="text-sm" />
                                                            </div>

                                                            <div className="min-w-0">
                                                                <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                                                                    Provider Phone
                                                                </p>

                                                                <p className="text-sm font-semibold text-slate-700 mt-0.5 truncate">
                                                                    {booking.providerId?.phone ||
                                                                        "Not available"}
                                                                </p>
                                                            </div>

                                                        </div>

                                                        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#f8f7ff]">

                                                            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-[#3525cd] flex items-center justify-center shrink-0">
                                                                <FaMapMarkerAlt className="text-sm" />
                                                            </div>

                                                            <div className="min-w-0">
                                                                <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                                                                    Location
                                                                </p>

                                                                <p className="text-sm font-semibold text-slate-700 mt-0.5 truncate">
                                                                    {booking.providerId?.city ||
                                                                        "Not available"}
                                                                </p>
                                                            </div>

                                                        </div>

                                                        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#f8f7ff]">

                                                            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-[#3525cd] flex items-center justify-center shrink-0">
                                                                <FaUserCircle className="text-sm" />
                                                            </div>

                                                            <div className="min-w-0">
                                                                <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                                                                    Customer
                                                                </p>

                                                                <p className="text-sm font-semibold text-slate-700 mt-0.5 truncate">
                                                                    {booking.customerName ||
                                                                        currentUser?.name ||
                                                                        "Customer"}
                                                                </p>
                                                            </div>

                                                        </div>

                                                        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#f8f7ff]">

                                                            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-[#3525cd] flex items-center justify-center shrink-0">
                                                                <FaMapMarkerAlt className="text-sm" />
                                                            </div>

                                                            <div className="min-w-0">
                                                                <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                                                                    Service Address
                                                                </p>

                                                                <p className="text-sm font-semibold text-slate-700 mt-0.5 line-clamp-2">
                                                                    {booking.customerAddress ||
                                                                        "Address not available"}
                                                                </p>
                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>

                                                {/* =========================
                                                    RIGHT PANEL
                                                ========================== */}
                                                <div className="lg:w-52 shrink-0 lg:border-l lg:border-slate-100 lg:pl-7 flex flex-col justify-between">

                                                    <div>

                                                        <p className="text-xs uppercase tracking-wider font-bold text-slate-400">
                                                            Booking Date
                                                        </p>

                                                        <p className="text-base font-bold text-[#1b1b24] mt-1">
                                                            {booking.createdAt
                                                                ? new Date(
                                                                    booking.createdAt
                                                                ).toLocaleDateString(
                                                                    "en-IN",
                                                                    {
                                                                        day: "numeric",
                                                                        month: "short",
                                                                        year: "numeric"
                                                                    }
                                                                )
                                                                : "Not available"}
                                                        </p>

                                                    </div>

                                                    <div className="space-y-3 mt-6">

                                                        {/* Cancel */}
                                                        {booking.status === "Pending" && (
                                                            <button
                                                                onClick={() =>
                                                                    handleCancel(
                                                                        booking._id
                                                                    )
                                                                }
                                                                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 font-bold text-sm transition"
                                                            >
                                                                <FaBan />
                                                                Cancel Booking
                                                            </button>
                                                        )}

                                                        {/* Review */}
                                                        {booking.status === "Completed" && (
                                                            <button
                                                                onClick={() =>
                                                                    openReviewModal(
                                                                        booking
                                                                    )
                                                                }
                                                                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#3525cd] hover:bg-[#2d20b5] text-white font-bold text-sm shadow-md shadow-indigo-100 transition"
                                                            >
                                                                <FaStar />
                                                                Give Review
                                                            </button>
                                                        )}

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                        {/* Bottom Trust Bar */}
                                        <div className="px-5 sm:px-7 lg:px-8 py-3.5 bg-[#faf9ff] border-t border-indigo-50">

                                            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-slate-500">

                                                <span className="inline-flex items-center gap-2">
                                                    <FaShieldAlt className="text-emerald-500" />
                                                    Secure booking
                                                </span>

                                                <span className="hidden sm:inline text-slate-300">
                                                    •
                                                </span>

                                                <span className="inline-flex items-center gap-2">
                                                    <FaCheckCircle className="text-emerald-500" />
                                                    MultiServe protected
                                                </span>

                                            </div>

                                        </div>

                                    </article>
                                );
                            })}

                        </div>
                    )}

                </div>
            </main>

            <Footer />

            {/* =====================================================
                REVIEW MODAL
            ====================================================== */}
            {selectedBooking && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
                        onClick={
                            submittingReview
                                ? undefined
                                : closeReviewModal
                        }
                    />

                    {/* Modal */}
                    <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">

                        {/* Modal Header */}
                        <div className="relative bg-gradient-to-br from-[#3525cd] to-[#571ac0] text-white p-6 sm:p-7">

                            <button
                                type="button"
                                onClick={closeReviewModal}
                                disabled={submittingReview}
                                className="absolute top-5 right-5 w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition disabled:opacity-50"
                            >
                                <FaTimes />
                            </button>

                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-xl mb-4">
                                <FaStar />
                            </div>

                            <h2 className="text-2xl sm:text-3xl font-bold">
                                Rate Your Experience
                            </h2>

                            <p className="text-indigo-100 text-sm mt-2 pr-8">
                                Your feedback helps other customers
                                choose the right professional.
                            </p>

                        </div>

                        <div className="p-6 sm:p-7">

                            {/* Provider */}
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#f8f7ff] mb-7">

                                <img
                                    src={getProviderImage(
                                        selectedBooking.providerId
                                    )}
                                    alt={
                                        selectedBooking.providerId?.name ||
                                        "Provider"
                                    }
                                    className="w-14 h-14 rounded-xl object-cover"
                                />

                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                        Reviewing
                                    </p>

                                    <p className="font-bold text-[#1b1b24] mt-1">
                                        {selectedBooking.providerId?.name ||
                                            "Provider"}
                                    </p>

                                    <p className="text-sm text-[#3525cd] font-medium">
                                        {selectedBooking.service}
                                    </p>
                                </div>

                            </div>

                            {/* Rating */}
                            <div>

                                <label className="block text-sm font-bold text-[#1b1b24] mb-3">
                                    Your Rating
                                </label>

                                <div className="flex items-center gap-2">

                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() =>
                                                setRating(star)
                                            }
                                            disabled={submittingReview}
                                            className="group focus:outline-none transition-transform hover:scale-110 disabled:cursor-not-allowed"
                                        >
                                            <FaStar
                                                className={`text-3xl sm:text-4xl transition ${
                                                    star <= rating
                                                        ? "text-amber-400"
                                                        : "text-slate-200 group-hover:text-amber-200"
                                                }`}
                                            />
                                        </button>
                                    ))}

                                </div>

                                <p className="text-sm text-slate-500 mt-2">
                                    {rating === 0
                                        ? "Select a rating from 1 to 5"
                                        : `${rating} out of 5 stars`}
                                </p>

                            </div>

                            {/* Review */}
                            <div className="mt-6">

                                <label className="block text-sm font-bold text-[#1b1b24] mb-2">
                                    Share your experience
                                </label>

                                <textarea
                                    rows="5"
                                    value={review}
                                    onChange={(e) =>
                                        setReview(e.target.value)
                                    }
                                    disabled={submittingReview}
                                    placeholder="Tell others about the service quality, professionalism and your overall experience..."
                                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm text-[#1b1b24] placeholder:text-slate-400 outline-none resize-none transition focus:border-[#3525cd] focus:ring-4 focus:ring-indigo-50 disabled:bg-slate-50"
                                />

                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col-reverse sm:flex-row gap-3 mt-7">

                                <button
                                    type="button"
                                    onClick={closeReviewModal}
                                    disabled={submittingReview}
                                    className="flex-1 py-3.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold transition disabled:opacity-50"
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
                                    className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#3525cd] hover:bg-[#2d20b5] text-white font-bold shadow-md shadow-indigo-100 transition disabled:bg-indigo-300 disabled:cursor-not-allowed"
                                >
                                    {submittingReview ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <FaStar />
                                            Submit Review
                                        </>
                                    )}
                                </button>

                            </div>

                        </div>

                    </div>
                </div>
            )}
        </>
    );
}

export default MyBookings;