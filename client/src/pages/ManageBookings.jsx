import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
    getAllBookings,
    deleteBooking
} from "../api/adminBookingApi";

function ManageBookings() {

    const [bookings, setBookings] = useState([]);
    const [search, setSearch] = useState("");

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

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this booking?"
        );

        if (!confirmDelete) return;

        try {

            await deleteBooking(id);

            alert("Booking Deleted Successfully");

            fetchBookings();

        }

        catch (error) {

            alert(error.response?.data?.message || "Delete Failed");

        }

    };

    const filteredBookings = bookings.filter((booking) =>

        booking.service?.toLowerCase().includes(search.toLowerCase()) ||

        booking.customerName?.toLowerCase().includes(search.toLowerCase()) ||

        booking.providerId?.name?.toLowerCase().includes(search.toLowerCase())

    );

    return (

        <>
            <Navbar />

            <div className="max-w-7xl mx-auto py-10 px-6">

                <h1 className="text-4xl font-bold text-center mb-8">

                    Manage Bookings

                </h1>

                <input
                    type="text"
                    placeholder="Search by Service, Customer or Provider..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border rounded-lg p-3 mb-8"
                />

                <div className="overflow-x-auto">

                    <table className="w-full bg-white shadow-lg rounded-xl">

                        <thead>

                            <tr className="bg-blue-600 text-white">

                                <th className="p-4">Service</th>

                                <th className="p-4">Customer</th>

                                <th className="p-4">Provider</th>

                                <th className="p-4">Phone</th>

                                <th className="p-4">Address</th>

                                <th className="p-4">Status</th>

                                <th className="p-4">Date</th>

                                <th className="p-4">Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredBookings.map((booking) => (

                                    <tr
                                        key={booking._id}
                                        className="border-b hover:bg-gray-100"
                                    >

                                        <td className="p-4">

                                            {booking.service}

                                        </td>

                                        <td className="p-4">

                                            {booking.customerName}

                                        </td>

                                        <td className="p-4">

                                            {booking.providerId?.name}

                                        </td>

                                        <td className="p-4">

                                            {booking.customerPhone}

                                        </td>

                                        <td className="p-4">

                                            {booking.customerAddress}

                                        </td>

                                        <td className="p-4">

                                            <span
                                                className={`px-3 py-1 rounded-full text-white
                                                ${
                                                    booking.status === "Pending"
                                                        ? "bg-yellow-500"
                                                        : booking.status === "Accepted"
                                                        ? "bg-green-600"
                                                        : booking.status === "Completed"
                                                        ? "bg-blue-600"
                                                        : "bg-red-600"
                                                }`}
                                            >
                                                {booking.status}
                                            </span>

                                        </td>

                                        <td className="p-4">

                                            {

                                                new Date(
                                                    booking.createdAt
                                                ).toLocaleDateString()

                                            }

                                        </td>

                                        <td className="p-4">

                                            <button
                                                onClick={() => handleDelete(booking._id)}
                                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>

            <Footer />

        </>

    );

}

export default ManageBookings;