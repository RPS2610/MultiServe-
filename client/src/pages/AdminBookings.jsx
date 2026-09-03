import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
    getAllBookings,
    updateBookingStatus
} from "../api/adminBookingApi";

import {
    FaCalendarAlt,
    FaSearch,
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
    FaBan,
    FaUser,
    FaUserTie,
    FaMapMarkerAlt,
    FaPhone,
    FaClipboardList,
    FaArrowRight
} from "react-icons/fa";

function AdminBookings() {

    const [bookings, setBookings] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchBookings();
    }, []);


    const fetchBookings = async () => {

        try {

            setLoading(true);

            const data = await getAllBookings();

            setBookings(data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };


    const handleStatusChange = async (id, status) => {

        try {

            await updateBookingStatus(id, { status });

            alert("Booking Status Updated Successfully");

            fetchBookings();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to update booking"
            );

        }

    };


    const filteredBookings = bookings.filter((booking) => {

        const customerName =
            booking.customerName || "";

        const providerName =
            booking.providerId?.name || "";

        const service =
            booking.service || "";

        const searchText =
            search.toLowerCase();

        return (
            customerName
                .toLowerCase()
                .includes(searchText)
            ||
            providerName
                .toLowerCase()
                .includes(searchText)
            ||
            service
                .toLowerCase()
                .includes(searchText)
        );

    });


    const totalBookings = bookings.length;

    const pendingBookings =
        bookings.filter(
            booking => booking.status === "Pending"
        ).length;

    const acceptedBookings =
        bookings.filter(
            booking => booking.status === "Accepted"
        ).length;

    const completedBookings =
        bookings.filter(
            booking => booking.status === "Completed"
        ).length;

    const cancelledBookings =
        bookings.filter(
            booking =>
                booking.status === "Cancelled" ||
                booking.status === "Rejected"
        ).length;


    const getStatusStyle = (status) => {

        switch (status) {

            case "Pending":
                return "bg-amber-50 text-amber-700 border-amber-100";

            case "Accepted":
                return "bg-emerald-50 text-emerald-700 border-emerald-100";

            case "Completed":
                return "bg-indigo-50 text-indigo-700 border-indigo-100";

            case "Rejected":
                return "bg-red-50 text-red-700 border-red-100";

            case "Cancelled":
                return "bg-slate-100 text-slate-600 border-slate-200";

            default:
                return "bg-slate-100 text-slate-600 border-slate-200";

        }

    };


    const getStatusIcon = (status) => {

        switch (status) {

            case "Pending":
                return <FaClock />;

            case "Accepted":
                return <FaCheckCircle />;

            case "Completed":
                return <FaCheckCircle />;

            case "Rejected":
                return <FaTimesCircle />;

            case "Cancelled":
                return <FaBan />;

            default:
                return <FaClipboardList />;

        }

    };


    return (

        <>

            <Navbar />


            <main className="min-h-screen bg-[#fcf8ff]">


                {/* =====================================================
                    HERO
                ====================================================== */}

                <section className="relative overflow-hidden bg-[#3525cd] text-white">

                    <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

                    <div className="absolute -bottom-36 left-1/3 h-96 w-96 rounded-full bg-purple-400/20 blur-3xl" />


                    <div className="relative max-w-7xl mx-auto px-5 sm:px-6 py-11 sm:py-14">

                        <div className="flex items-center gap-3 text-indigo-200 text-sm font-semibold">

                            <FaCalendarAlt />

                            Booking Management

                        </div>


                        <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">

                            Manage Bookings

                        </h1>


                        <p className="mt-4 max-w-2xl text-sm sm:text-base lg:text-lg leading-7 text-indigo-100">

                            Monitor customer bookings, manage booking status,

                            and keep the MultiServe service process running smoothly.

                        </p>

                    </div>

                </section>


                {/* =====================================================
                    CONTENT
                ====================================================== */}

                <div className="max-w-7xl mx-auto px-5 sm:px-6 py-8 sm:py-10">


                    {/* =================================================
                        STATISTICS
                    ================================================== */}

                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 mb-8">


                        {/* TOTAL */}

                        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_8px_30px_rgba(30,27,75,0.05)]">

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-[#3525cd]">

                                <FaCalendarAlt />

                            </div>

                            <p className="mt-4 text-xs sm:text-sm font-semibold text-slate-500">

                                Total Bookings

                            </p>

                            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#1b1b24]">

                                {totalBookings}

                            </h2>

                        </div>


                        {/* PENDING */}

                        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_8px_30px_rgba(30,27,75,0.05)]">

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">

                                <FaClock />

                            </div>

                            <p className="mt-4 text-xs sm:text-sm font-semibold text-slate-500">

                                Pending

                            </p>

                            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#1b1b24]">

                                {pendingBookings}

                            </h2>

                        </div>


                        {/* ACCEPTED */}

                        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_8px_30px_rgba(30,27,75,0.05)]">

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">

                                <FaCheckCircle />

                            </div>

                            <p className="mt-4 text-xs sm:text-sm font-semibold text-slate-500">

                                Accepted

                            </p>

                            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#1b1b24]">

                                {acceptedBookings}

                            </h2>

                        </div>


                        {/* COMPLETED */}

                        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_8px_30px_rgba(30,27,75,0.05)]">

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">

                                <FaCheckCircle />

                            </div>

                            <p className="mt-4 text-xs sm:text-sm font-semibold text-slate-500">

                                Completed

                            </p>

                            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#1b1b24]">

                                {completedBookings}

                            </h2>

                        </div>


                        {/* CANCELLED */}

                        <div className="col-span-2 lg:col-span-1 rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_8px_30px_rgba(30,27,75,0.05)]">

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">

                                <FaBan />

                            </div>

                            <p className="mt-4 text-xs sm:text-sm font-semibold text-slate-500">

                                Cancelled / Rejected

                            </p>

                            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#1b1b24]">

                                {cancelledBookings}

                            </h2>

                        </div>

                    </div>


                    {/* =================================================
                        SEARCH
                    ================================================== */}

                    <section className="rounded-3xl border border-slate-100 bg-white p-5 sm:p-6 shadow-[0_8px_30px_rgba(30,27,75,0.05)]">

                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                            <div>

                                <p className="text-xs font-bold uppercase tracking-wider text-[#3525cd]">

                                    Booking directory

                                </p>

                                <h2 className="mt-1 text-xl sm:text-2xl font-extrabold text-[#1b1b24]">

                                    All Bookings

                                </h2>

                                <p className="mt-1 text-sm text-slate-500">

                                    {search
                                        ? `${filteredBookings.length} matching bookings`
                                        : `${bookings.length} bookings available`
                                    }

                                </p>

                            </div>


                            <div className="relative w-full lg:max-w-md">

                                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                                <input
                                    type="text"
                                    placeholder="Search customer, provider or service..."
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    className="w-full rounded-xl border border-slate-200 bg-[#fcf8ff] py-3.5 pl-11 pr-4 text-sm text-[#1b1b24] outline-none transition focus:border-[#3525cd] focus:ring-4 focus:ring-indigo-100"
                                />

                            </div>

                        </div>

                    </section>


                    {/* =================================================
                        BOOKINGS
                    ================================================== */}

                    <section className="mt-6">


                        {loading ? (

                            <div className="grid gap-5">

                                {[1, 2, 3].map((item) => (

                                    <div
                                        key={item}
                                        className="overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 animate-pulse"
                                    >

                                        <div className="flex flex-col lg:flex-row gap-6">

                                            <div className="h-16 w-16 shrink-0 rounded-2xl bg-slate-100" />

                                            <div className="flex-1">

                                                <div className="h-6 w-44 rounded bg-slate-100" />

                                                <div className="mt-3 h-4 w-64 rounded bg-slate-100" />

                                                <div className="mt-2 h-4 w-52 rounded bg-slate-100" />

                                            </div>

                                            <div className="h-10 w-28 rounded-full bg-slate-100" />

                                        </div>

                                    </div>

                                ))}

                            </div>


                        ) : filteredBookings.length === 0 ? (

                            <div className="rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">

                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-[#3525cd]">

                                    <FaCalendarAlt className="text-xl" />

                                </div>


                                <h2 className="mt-5 text-xl sm:text-2xl font-extrabold text-[#1b1b24]">

                                    No Bookings Found

                                </h2>


                                <p className="mt-2 text-sm text-slate-500">

                                    There are no bookings matching your search.

                                </p>

                            </div>


                        ) : (

                            <div className="space-y-5">

                                {filteredBookings.map((booking) => (

                                    <article
                                        key={booking._id}
                                        className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_8px_30px_rgba(30,27,75,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(30,27,75,0.09)]"
                                    >


                                        {/* =================================================
                                            BOOKING HEADER
                                        ================================================== */}

                                        <div className="border-b border-slate-100 px-5 sm:px-7 py-5">

                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">


                                                <div className="flex items-center gap-3">

                                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-[#3525cd]">

                                                        <FaClipboardList />

                                                    </div>

                                                    <div>

                                                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">

                                                            Booking

                                                        </p>

                                                        <p className="text-sm font-bold text-[#1b1b24]">

                                                            #{booking._id?.slice(-8) || "N/A"}

                                                        </p>

                                                    </div>

                                                </div>


                                                <span
                                                    className={`inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-bold ${getStatusStyle(
                                                        booking.status
                                                    )}`}
                                                >

                                                    {getStatusIcon(booking.status)}

                                                    {booking.status || "Unknown"}

                                                </span>

                                            </div>

                                        </div>


                                        {/* =================================================
                                            MAIN INFORMATION
                                        ================================================== */}

                                        <div className="p-5 sm:p-7">

                                            <div className="grid lg:grid-cols-3 gap-7">


                                                {/* CUSTOMER */}

                                                <div>

                                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">

                                                        <FaUser />

                                                        Customer

                                                    </div>


                                                    <div className="mt-4 flex gap-4">

                                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-[#3525cd]">

                                                            <FaUser className="text-xl" />

                                                        </div>


                                                        <div className="min-w-0">

                                                            <h3 className="truncate text-base sm:text-lg font-extrabold text-[#1b1b24]">

                                                                {booking.customerName || "Customer"}

                                                            </h3>


                                                            <div className="mt-2 flex items-center gap-2 text-xs sm:text-sm text-slate-500">

                                                                <FaPhone className="shrink-0 text-[11px]" />

                                                                <span className="truncate">

                                                                    {booking.customerPhone || "No phone"}

                                                                </span>

                                                            </div>


                                                            <div className="mt-2 flex items-start gap-2 text-xs sm:text-sm text-slate-500">

                                                                <FaMapMarkerAlt className="mt-0.5 shrink-0 text-[11px]" />

                                                                <span>

                                                                    {booking.customerAddress || "No address"}

                                                                </span>

                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>


                                                {/* PROVIDER */}

                                                <div>

                                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">

                                                        <FaUserTie />

                                                        Provider

                                                    </div>


                                                    <div className="mt-4 flex gap-4">

                                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">

                                                            <FaUserTie className="text-xl" />

                                                        </div>


                                                        <div className="min-w-0">

                                                            <h3 className="truncate text-base sm:text-lg font-extrabold text-[#1b1b24]">

                                                                {booking.providerId?.name || "Provider"}

                                                            </h3>


                                                            <div className="mt-2 flex items-center gap-2 text-xs sm:text-sm text-slate-500">

                                                                <FaPhone className="shrink-0 text-[11px]" />

                                                                <span className="truncate">

                                                                    {booking.providerId?.phone || "No phone"}

                                                                </span>

                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>


                                                {/* SERVICE */}

                                                <div>

                                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">

                                                        <FaTools />

                                                        Service

                                                    </div>


                                                    <div className="mt-4">

                                                        <h3 className="text-lg sm:text-xl font-extrabold text-[#1b1b24]">

                                                            {booking.service || "Service"}

                                                        </h3>


                                                        <div className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#f5f2ff] px-3.5 py-2 text-xs sm:text-sm font-semibold text-[#3525cd]">

                                                            <FaCalendarAlt />

                                                            {booking.createdAt

                                                                ? new Date(
                                                                    booking.createdAt
                                                                ).toLocaleDateString()

                                                                : "N/A"
                                                            }

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>


                                            {/* =================================================
                                                ACTION AREA
                                            ================================================== */}

                                            <div className="mt-7 flex flex-col md:flex-row md:items-center md:justify-between gap-5 border-t border-slate-100 pt-6">


                                                <div>

                                                    <p className="text-xs text-slate-400">

                                                        Booking status

                                                    </p>

                                                    <div
                                                        className={`mt-2 inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-bold ${getStatusStyle(
                                                            booking.status
                                                        )}`}
                                                    >

                                                        {getStatusIcon(booking.status)}

                                                        {booking.status || "Unknown"}

                                                    </div>

                                                </div>


                                                {/* STATUS CONTROLS */}

                                                <div className="flex flex-wrap gap-2.5">


                                                    {booking.status === "Pending" && (

                                                        <>

                                                            <button
                                                                onClick={() =>
                                                                    handleStatusChange(
                                                                        booking._id,
                                                                        "Accepted"
                                                                    )
                                                                }
                                                                className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-xs sm:text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-emerald-700"
                                                            >

                                                                <FaCheckCircle />

                                                                Accept

                                                            </button>


                                                            <button
                                                                onClick={() =>
                                                                    handleStatusChange(
                                                                        booking._id,
                                                                        "Rejected"
                                                                    )
                                                                }
                                                                className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-xs sm:text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-red-700"
                                                            >

                                                                <FaTimesCircle />

                                                                Reject

                                                            </button>

                                                        </>

                                                    )}


                                                    {booking.status === "Accepted" && (

                                                        <button
                                                            onClick={() =>
                                                                handleStatusChange(
                                                                    booking._id,
                                                                    "Completed"
                                                                )
                                                            }
                                                            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#3525cd] px-5 py-3 text-xs sm:text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#2d20b0]"
                                                        >

                                                            <FaCheckCircle />

                                                            Mark Completed

                                                            <FaArrowRight className="text-[10px]" />

                                                        </button>

                                                    )}

                                                </div>

                                            </div>

                                        </div>

                                    </article>

                                ))}

                            </div>

                        )}

                    </section>


                    {/* =================================================
                        INFO FOOTER
                    ================================================== */}

                    <div className="mt-8 rounded-2xl border border-indigo-100 bg-[#f5f2ff] px-5 py-4">

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                            <div className="flex items-center gap-3">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#3525cd]">

                                    <FaCalendarAlt className="text-sm" />

                                </div>

                                <p className="text-xs sm:text-sm text-slate-600">

                                    Keep booking statuses updated to maintain

                                    an accurate and reliable service workflow.

                                </p>

                            </div>


                            <div className="text-xs font-bold text-[#3525cd]">

                                {filteredBookings.length} displayed

                            </div>

                        </div>

                    </div>

                </div>

            </main>


            <Footer />

        </>

    );

}

export default AdminBookings;