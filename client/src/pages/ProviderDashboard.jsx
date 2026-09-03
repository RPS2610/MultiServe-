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
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaArrowRight,
    FaCalendarAlt,
    FaUser,
    FaBriefcase,
    FaChartLine
} from "react-icons/fa";

function ProviderDashboard() {

    const currentUser = JSON.parse(localStorage.getItem("user"));

    const [bookings, setBookings] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);

    useEffect(() => {

        if (currentUser?._id) {
            loadDashboard();
        } else {
            setLoading(false);
        }

    }, []);

    const loadDashboard = async () => {

        try {

            const bookingData =
                await getProviderBookings(currentUser._id);

            const reviewData =
                await getProviderReviews(currentUser._id);

            setBookings(bookingData || []);
            setReviews(reviewData || []);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    const updateStatus = async (id, status) => {

        try {

            setUpdatingId(id);

            await updateBookingStatus(id, status);

            await loadDashboard();

        } catch (err) {

            console.log(err);

        } finally {

            setUpdatingId(null);
        }

    };

    const totalBookings = bookings.length;

    const pendingBookings =
        bookings.filter(
            item => item.status === "Pending"
        ).length;

    const acceptedBookings =
        bookings.filter(
            item => item.status === "Accepted"
        ).length;

    const completedBookings =
        bookings.filter(
            item => item.status === "Completed"
        ).length;

    const totalEarnings =
        bookings
            .filter(item => item.status === "Completed")
            .reduce(
                (sum, item) =>
                    sum +
                    (item.price ||
                        currentUser?.price ||
                        0),
                0
            );

    const averageRating =
        reviews.length > 0
            ? (
                reviews.reduce(
                    (sum, item) =>
                        sum + Number(item.rating || 0),
                    0
                ) / reviews.length
            ).toFixed(1)
            : "0.0";


    const getStatusStyle = (status) => {

        switch (status) {

            case "Pending":
                return "bg-amber-50 text-amber-700 border-amber-200";

            case "Accepted":
                return "bg-emerald-50 text-emerald-700 border-emerald-200";

            case "Completed":
                return "bg-indigo-50 text-indigo-700 border-indigo-200";

            case "Rejected":
                return "bg-red-50 text-red-700 border-red-200";

            case "Cancelled":
                return "bg-slate-100 text-slate-600 border-slate-200";

            default:
                return "bg-slate-100 text-slate-600 border-slate-200";

        }

    };


    if (loading) {

        return (

            <>

                <Navbar />

                <main className="min-h-screen bg-[#fcf8ff]">

                    <section className="bg-[#3525cd]">

                        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-12">

                            <div className="h-4 w-28 rounded-full bg-white/20 animate-pulse" />

                            <div className="mt-5 h-10 sm:h-12 w-72 sm:w-96 rounded-xl bg-white/20 animate-pulse" />

                            <div className="mt-4 h-5 w-80 max-w-full rounded-full bg-white/10 animate-pulse" />

                        </div>

                    </section>

                    <div className="max-w-7xl mx-auto px-5 sm:px-6 py-10">

                        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">

                            {[1, 2, 3, 4, 5].map(item => (

                                <div
                                    key={item}
                                    className="h-40 rounded-2xl bg-white border border-slate-100 animate-pulse"
                                />

                            ))}

                        </div>

                        <div className="mt-10 h-80 rounded-3xl bg-white border border-slate-100 animate-pulse" />

                    </div>

                </main>

            </>

        );

    }


    return (

        <>

            <Navbar />

            <main className="min-h-screen bg-[#fcf8ff]">


                {/* =====================================================
                    HERO
                ====================================================== */}

                <section className="relative overflow-hidden bg-[#3525cd] text-white">

                    <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

                    <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-purple-400/20 blur-3xl" />

                    <div className="relative max-w-7xl mx-auto px-5 sm:px-6 py-10 sm:py-14">

                        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

                            <div>

                                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs sm:text-sm font-semibold text-white/90">

                                    <FaBriefcase />

                                    Provider Dashboard

                                </div>

                                <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">

                                    Welcome back,

                                    <span className="block text-indigo-200">

                                        {currentUser?.name || "Provider"}

                                    </span>

                                </h1>

                                <p className="mt-4 max-w-2xl text-sm sm:text-base lg:text-lg leading-7 text-indigo-100">

                                    Manage your bookings, connect with customers,

                                    track your work and monitor your earnings.

                                </p>

                            </div>


                            <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-md">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">

                                        <FaChartLine />

                                    </div>

                                    <div>

                                        <p className="text-xs text-indigo-200">

                                            Completed Jobs

                                        </p>

                                        <p className="mt-1 text-xl font-bold">

                                            {completedBookings}

                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                {/* =====================================================
                    STATISTICS
                ====================================================== */}

                <section className="max-w-7xl mx-auto px-5 sm:px-6 py-8 sm:py-10">

                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">

                        {/* Total */}

                        <div className="group rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-[0_8px_30px_rgba(30,27,75,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(30,27,75,0.09)]">

                            <div className="flex items-center justify-between">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-[#3525cd]">

                                    <FaClipboardList />

                                </div>

                                <span className="text-xs font-semibold text-slate-400">

                                    All time

                                </span>

                            </div>

                            <h2 className="mt-5 text-3xl font-extrabold text-[#1b1b24]">

                                {totalBookings}

                            </h2>

                            <p className="mt-1 text-sm text-slate-500">

                                Total Bookings

                            </p>

                        </div>


                        {/* Pending */}

                        <div className="group rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-[0_8px_30px_rgba(30,27,75,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(30,27,75,0.09)]">

                            <div className="flex items-center justify-between">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">

                                    <FaClock />

                                </div>

                                <span className="text-xs font-semibold text-slate-400">

                                    Action

                                </span>

                            </div>

                            <h2 className="mt-5 text-3xl font-extrabold text-[#1b1b24]">

                                {pendingBookings}

                            </h2>

                            <p className="mt-1 text-sm text-slate-500">

                                Pending Requests

                            </p>

                        </div>


                        {/* Accepted */}

                        <div className="group rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-[0_8px_30px_rgba(30,27,75,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(30,27,75,0.09)]">

                            <div className="flex items-center justify-between">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">

                                    <FaCheckCircle />

                                </div>

                                <span className="text-xs font-semibold text-slate-400">

                                    Active

                                </span>

                            </div>

                            <h2 className="mt-5 text-3xl font-extrabold text-[#1b1b24]">

                                {acceptedBookings}

                            </h2>

                            <p className="mt-1 text-sm text-slate-500">

                                Accepted Jobs

                            </p>

                        </div>


                        {/* Earnings */}

                        <div className="group rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-[0_8px_30px_rgba(30,27,75,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(30,27,75,0.09)]">

                            <div className="flex items-center justify-between">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">

                                    <FaMoneyBillWave />

                                </div>

                                <span className="text-xs font-semibold text-slate-400">

                                    Completed

                                </span>

                            </div>

                            <h2 className="mt-5 text-2xl sm:text-3xl font-extrabold text-[#1b1b24]">

                                ₹{totalEarnings.toLocaleString("en-IN")}

                            </h2>

                            <p className="mt-1 text-sm text-slate-500">

                                Total Earnings

                            </p>

                        </div>


                        {/* Rating */}

                        <div className="group rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-[0_8px_30px_rgba(30,27,75,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(30,27,75,0.09)]">

                            <div className="flex items-center justify-between">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-500">

                                    <FaStar />

                                </div>

                                <span className="text-xs font-semibold text-slate-400">

                                    Reviews

                                </span>

                            </div>

                            <h2 className="mt-5 text-3xl font-extrabold text-[#1b1b24]">

                                {averageRating}

                            </h2>

                            <p className="mt-1 text-sm text-slate-500">

                                Average Rating

                            </p>

                        </div>

                    </div>


                    {/* =================================================
                        BOOKINGS
                    ================================================== */}

                    <section className="mt-12">

                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">

                            <div>

                                <p className="text-sm font-semibold text-[#3525cd]">

                                    Manage your work

                                </p>

                                <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#1b1b24]">

                                    Customer Bookings

                                </h2>

                                <p className="mt-2 text-sm text-slate-500">

                                    Review requests and update their status.

                                </p>

                            </div>

                            <div className="inline-flex items-center gap-2 self-start rounded-full bg-white border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600">

                                <FaClipboardList className="text-[#3525cd]" />

                                {totalBookings} total

                            </div>

                        </div>


                        {bookings.length === 0 ? (

                            <div className="rounded-3xl border border-slate-100 bg-white px-6 py-14 sm:px-10 text-center shadow-[0_8px_30px_rgba(30,27,75,0.05)]">

                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-2xl text-[#3525cd]">

                                    <FaClipboardList />

                                </div>

                                <h3 className="mt-5 text-xl font-bold text-[#1b1b24]">

                                    No bookings yet

                                </h3>

                                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">

                                    Once customers book your service,

                                    their requests will appear here.

                                </p>

                            </div>

                        ) : (

                            <div className="space-y-5">

                                {bookings.map((booking) => (

                                    <article
                                        key={booking._id}
                                        className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_8px_30px_rgba(30,27,75,0.05)] transition-all duration-300 hover:shadow-[0_16px_45px_rgba(30,27,75,0.09)]"
                                    >

                                        <div className="p-5 sm:p-7">

                                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

                                                {/* Customer */}

                                                <div className="flex gap-4 sm:gap-5 min-w-0">

                                                    <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 text-xl sm:text-2xl text-[#3525cd]">

                                                        <FaUser />

                                                    </div>

                                                    <div className="min-w-0">

                                                        <h3 className="text-lg sm:text-xl font-bold text-[#1b1b24] truncate">

                                                            {booking.customerName || "Customer"}

                                                        </h3>

                                                        <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">

                                                            <FaPhoneAlt className="shrink-0 text-xs text-[#3525cd]" />

                                                            <span className="truncate">

                                                                {booking.customerPhone || "Phone not available"}

                                                            </span>

                                                        </div>

                                                        <div className="mt-2 flex items-start gap-2 text-sm text-slate-500">

                                                            <FaMapMarkerAlt className="mt-1 shrink-0 text-xs text-[#3525cd]" />

                                                            <span className="leading-5">

                                                                {booking.customerAddress || "Address not available"}

                                                            </span>

                                                        </div>

                                                    </div>

                                                </div>


                                                {/* Status */}

                                                <div className="flex items-center justify-between lg:flex-col lg:items-end gap-3">

                                                    <span className={`inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-bold ${getStatusStyle(booking.status)}`}>

                                                        {booking.status}

                                                    </span>

                                                    <div className="flex items-center gap-2 text-xs text-slate-400">

                                                        <FaCalendarAlt />

                                                        {booking.createdAt
                                                            ? new Date(booking.createdAt).toLocaleDateString()
                                                            : "Date unavailable"
                                                        }

                                                    </div>

                                                </div>

                                            </div>


                                            {/* Booking details */}

                                            <div className="mt-6 grid gap-3 sm:grid-cols-2">

                                                <div className="rounded-2xl bg-[#f8f7ff] p-4">

                                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">

                                                        Service

                                                    </p>

                                                    <p className="mt-1 font-bold text-[#3525cd]">

                                                        {booking.service || "Service"}

                                                    </p>

                                                </div>

                                                <div className="rounded-2xl bg-slate-50 p-4">

                                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">

                                                        Booking amount

                                                    </p>

                                                    <p className="mt-1 font-bold text-[#1b1b24]">

                                                        ₹{(
                                                            booking.price ||
                                                            currentUser?.price ||
                                                            0
                                                        ).toLocaleString("en-IN")}

                                                    </p>

                                                </div>

                                            </div>


                                            {/* Actions */}

                                            {booking.status === "Pending" && (

                                                <div className="mt-6 flex flex-col sm:flex-row gap-3">

                                                    <button
                                                        onClick={() =>
                                                            updateStatus(
                                                                booking._id,
                                                                "Accepted"
                                                            )
                                                        }
                                                        disabled={updatingId === booking._id}
                                                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#3525cd] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2d20b0] disabled:cursor-not-allowed disabled:opacity-60"
                                                    >

                                                        <FaCheckCircle />

                                                        {updatingId === booking._id
                                                            ? "Updating..."
                                                            : "Accept Booking"
                                                        }

                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            updateStatus(
                                                                booking._id,
                                                                "Rejected"
                                                            )
                                                        }
                                                        disabled={updatingId === booking._id}
                                                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-3.5 text-sm font-bold text-red-600 transition-all duration-300 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                                                    >

                                                        Reject Booking

                                                    </button>

                                                </div>

                                            )}


                                            {booking.status === "Accepted" && (

                                                <div className="mt-6">

                                                    <button
                                                        onClick={() =>
                                                            updateStatus(
                                                                booking._id,
                                                                "Completed"
                                                            )
                                                        }
                                                        disabled={updatingId === booking._id}
                                                        className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#3525cd] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2d20b0] disabled:cursor-not-allowed disabled:opacity-60"
                                                    >

                                                        <FaCheckCircle />

                                                        {updatingId === booking._id
                                                            ? "Updating..."
                                                            : "Mark as Completed"
                                                        }

                                                        <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />

                                                    </button>

                                                </div>

                                            )}

                                        </div>

                                    </article>

                                ))}

                            </div>

                        )}

                    </section>


                    {/* =================================================
                        REVIEWS
                    ================================================== */}

                    <section className="mt-14 sm:mt-16">

                        <div className="mb-6">

                            <p className="text-sm font-semibold text-[#3525cd]">

                                Customer feedback

                            </p>

                            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#1b1b24]">

                                Customer Reviews

                            </h2>

                            <p className="mt-2 text-sm text-slate-500">

                                See what customers are saying about your service.

                            </p>

                        </div>


                        {reviews.length === 0 ? (

                            <div className="rounded-3xl border border-slate-100 bg-white px-6 py-14 text-center shadow-[0_8px_30px_rgba(30,27,75,0.05)]">

                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-2xl text-amber-500">

                                    <FaStar />

                                </div>

                                <h3 className="mt-5 text-xl font-bold text-[#1b1b24]">

                                    No reviews yet

                                </h3>

                                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">

                                    Reviews from your customers will appear here

                                    after they complete a booking.

                                </p>

                            </div>

                        ) : (

                            <div className="grid gap-5 lg:grid-cols-2">

                                {reviews.map((review) => (

                                    <article
                                        key={review._id}
                                        className="rounded-3xl border border-slate-100 bg-white p-5 sm:p-7 shadow-[0_8px_30px_rgba(30,27,75,0.05)] transition-all duration-300 hover:shadow-[0_16px_40px_rgba(30,27,75,0.08)]"
                                    >

                                        <div className="flex items-start justify-between gap-4">

                                            <div className="flex items-center gap-3 sm:gap-4 min-w-0">

                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[#3525cd]">

                                                    <FaUser />

                                                </div>

                                                <div className="min-w-0">

                                                    <h3 className="font-bold text-[#1b1b24] truncate">

                                                        {review.customerId?.name || "Customer"}

                                                    </h3>

                                                    <p className="mt-1 text-xs text-slate-400">

                                                        {review.createdAt
                                                            ? new Date(review.createdAt).toLocaleDateString()
                                                            : "Date unavailable"
                                                        }

                                                    </p>

                                                </div>

                                            </div>


                                            <div className="flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-600">

                                                <FaStar />

                                                {review.rating}

                                            </div>

                                        </div>


                                        <div className="mt-5 flex gap-1 text-sm text-amber-400">

                                            {[1, 2, 3, 4, 5].map(star => (

                                                <FaStar
                                                    key={star}
                                                    className={
                                                        star <= Number(review.rating)
                                                            ? "text-amber-400"
                                                            : "text-slate-200"
                                                    }
                                                />

                                            ))}

                                        </div>


                                        <p className="mt-5 text-sm leading-7 text-slate-600">

                                            {review.review || "No written review provided."}

                                        </p>

                                    </article>

                                ))}

                            </div>

                        )}

                    </section>

                </section>

            </main>

            <Footer />

        </>

    );

}

export default ProviderDashboard;