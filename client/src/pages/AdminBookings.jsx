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
    FaPhone
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

            const data = await getAllBookings();

            setBookings(data);

        }
        catch (error) {

            console.log(error);

        }
        finally {

            setLoading(false);

        }

    };

    const handleStatusChange = async (id, status) => {

        try {

            await updateBookingStatus(id, { status });

            alert("Booking Status Updated Successfully");

            fetchBookings();

        }
        catch (error) {

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

    const getStatusClass = (status) => {

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

            <Navbar />

            {/* Hero Section */}

            <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white">

                <div className="max-w-7xl mx-auto px-6 py-14">

                    <div className="flex items-center gap-5">

                        <div className="bg-white/20 p-5 rounded-2xl">

                            <FaCalendarAlt className="text-5xl" />

                        </div>

                        <div>

                            <h1 className="text-5xl font-bold">

                                Manage Bookings

                            </h1>

                            <p className="text-xl text-blue-100 mt-3">

                                View and manage all customer bookings.

                            </p>

                        </div>

                    </div>

                </div>

            </section>


            <div className="max-w-7xl mx-auto px-6 py-10">

                {/* Statistics */}

                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">

                    <div className="bg-white rounded-3xl shadow-lg p-6">

                        <FaCalendarAlt className="text-5xl text-blue-600" />

                        <h2 className="text-4xl font-bold mt-5">

                            {totalBookings}

                        </h2>

                        <p className="text-gray-500 mt-2">

                            Total Bookings

                        </p>

                    </div>


                    <div className="bg-white rounded-3xl shadow-lg p-6">

                        <FaClock className="text-5xl text-yellow-500" />

                        <h2 className="text-4xl font-bold mt-5">

                            {pendingBookings}

                        </h2>

                        <p className="text-gray-500 mt-2">

                            Pending

                        </p>

                    </div>


                    <div className="bg-white rounded-3xl shadow-lg p-6">

                        <FaCheckCircle className="text-5xl text-green-600" />

                        <h2 className="text-4xl font-bold mt-5">

                            {acceptedBookings}

                        </h2>

                        <p className="text-gray-500 mt-2">

                            Accepted

                        </p>

                    </div>


                    <div className="bg-white rounded-3xl shadow-lg p-6">

                        <FaCheckCircle className="text-5xl text-blue-600" />

                        <h2 className="text-4xl font-bold mt-5">

                            {completedBookings}

                        </h2>

                        <p className="text-gray-500 mt-2">

                            Completed

                        </p>

                    </div>


                    <div className="bg-white rounded-3xl shadow-lg p-6">

                        <FaBan className="text-5xl text-red-500" />

                        <h2 className="text-4xl font-bold mt-5">

                            {cancelledBookings}

                        </h2>

                        <p className="text-gray-500 mt-2">

                            Cancelled / Rejected

                        </p>

                    </div>

                </div>


                {/* Search */}

                <div className="relative mb-10">

                    <FaSearch className="absolute left-5 top-5 text-gray-400" />

                    <input

                        type="text"

                        placeholder="Search by Customer, Provider or Service..."

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                        className="w-full bg-white border border-gray-200 rounded-2xl pl-14 pr-6 py-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"

                    />

                </div>


                {/* Loading */}

                {loading ? (

                    <div className="bg-white rounded-3xl shadow-lg py-20 text-center">

                        <h2 className="text-3xl font-bold">

                            Loading Bookings...

                        </h2>

                        <p className="text-gray-500 mt-3">

                            Please wait while bookings are loaded.

                        </p>

                    </div>

                ) : filteredBookings.length === 0 ? (

                    <div className="bg-white rounded-3xl shadow-lg py-20 text-center">

                        <FaCalendarAlt className="text-7xl text-gray-300 mx-auto mb-6" />

                        <h2 className="text-3xl font-bold">

                            No Bookings Found

                        </h2>

                        <p className="text-gray-500 mt-3">

                            There are no bookings matching your search.

                        </p>

                    </div>

                ) : (

                    <div className="space-y-6">

                        {filteredBookings.map((booking) => (

                            <div

                                key={booking._id}

                                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 p-8"

                            >

                                <div className="flex flex-col lg:flex-row justify-between gap-8">

                                    {/* Customer */}

                                    <div className="flex gap-5">

                                        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">

                                            <FaUser className="text-4xl text-blue-600" />

                                        </div>

                                        <div>

                                            <h2 className="text-2xl font-bold">

                                                {booking.customerName || "Customer"}

                                            </h2>

                                            <div className="flex items-center gap-2 mt-3 text-gray-600">

                                                <FaPhone />

                                                {booking.customerPhone || "No phone"}

                                            </div>

                                            <div className="flex items-center gap-2 mt-2 text-gray-600">

                                                <FaMapMarkerAlt />

                                                {booking.customerAddress || "No address"}

                                            </div>

                                        </div>

                                    </div>


                                    {/* Provider */}

                                    <div>

                                        <div className="flex items-center gap-3">

                                            <FaUserTie className="text-purple-600 text-xl" />

                                            <span className="font-semibold">

                                                Provider

                                            </span>

                                        </div>

                                        <h3 className="text-xl font-bold mt-3">

                                            {booking.providerId?.name || "Provider"}

                                        </h3>

                                        <p className="text-gray-500">

                                            {booking.providerId?.phone || "No phone"}

                                        </p>

                                    </div>


                                    {/* Booking Info */}

                                    <div className="lg:text-right">

                                        <p className="text-gray-500">

                                            Service

                                        </p>

                                        <h3 className="text-xl font-bold mt-1">

                                            {booking.service}

                                        </h3>

                                        <p className="text-gray-500 mt-4">

                                            Booking Date

                                        </p>

                                        <p className="font-semibold mt-1">

                                            {booking.createdAt

                                                ? new Date(

                                                    booking.createdAt

                                                ).toLocaleDateString()

                                                : "N/A"}

                                        </p>

                                    </div>

                                </div>


                                {/* Bottom Section */}

                                <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-5">

                                    <div>

                                        <span

                                            className={`px-5 py-2 rounded-full font-semibold ${getStatusClass(

                                                booking.status

                                            )}`}

                                        >

                                            {booking.status || "Unknown"}

                                        </span>

                                    </div>


                                    {/* Status Controls */}

                                    <div className="flex flex-wrap gap-3">

                                        {booking.status === "Pending" && (

                                            <>

                                                <button

                                                    onClick={() =>

                                                        handleStatusChange(

                                                            booking._id,

                                                            "Accepted"

                                                        )

                                                    }

                                                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl font-semibold flex items-center gap-2"

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

                                                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl font-semibold flex items-center gap-2"

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

                                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-semibold flex items-center gap-2"

                                            >

                                                <FaCheckCircle />

                                                Mark Completed

                                            </button>

                                        )}

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>


            <Footer />

        </>

    );

}

export default AdminBookings;