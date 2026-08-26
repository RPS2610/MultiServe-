import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { getDashboardStats } from "../api/adminApi";

function AdminDashboard() {

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProviders: 0,
        totalBookings: 0,
        totalRevenue: 0
    });

    useEffect(() => {

        fetchDashboard();

    }, []);

    const fetchDashboard = async () => {

        try {

            const data = await getDashboardStats();

            setStats(data);

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <>
    <Navbar />

    {/* Hero */}

    <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">

        <div className="max-w-7xl mx-auto px-6 py-16">

            <h1 className="text-5xl font-bold">

                Admin Dashboard

            </h1>

            <p className="mt-4 text-xl text-blue-100">

                Monitor users, providers, bookings and platform performance.

            </p>

        </div>

    </section>

    <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition p-8">

                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl">

                    👥

                </div>

                <p className="text-gray-500 mt-6">

                    Total Users

                </p>

                <h2 className="text-5xl font-bold mt-2">

                    {stats.totalUsers}

                </h2>

            </div>

            <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition p-8">

                <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-3xl">

                    👷

                </div>

                <p className="text-gray-500 mt-6">

                    Providers

                </p>

                <h2 className="text-5xl font-bold mt-2">

                    {stats.totalProviders}

                </h2>

            </div>

            <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition p-8">

                <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center text-3xl">

                    📅

                </div>

                <p className="text-gray-500 mt-6">

                    Bookings

                </p>

                <h2 className="text-5xl font-bold mt-2">

                    {stats.totalBookings}

                </h2>

            </div>

            <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition p-8">

                <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center text-3xl">

                    💰

                </div>

                <p className="text-gray-500 mt-6">

                    Revenue

                </p>

                <h2 className="text-5xl font-bold mt-2">

                    ₹{stats.totalRevenue}

                </h2>

            </div>

        </div>
                {/* Admin Controls */}

        <div className="mt-16">

            <div className="flex items-center justify-between mb-8">

                <div>

                    <h2 className="text-4xl font-bold">

                        Admin Controls

                    </h2>

                    <p className="text-gray-500 mt-2">

                        Manage every part of the MultiServe platform.

                    </p>

                </div>

            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                <Link
                    to="/admin/users"
                    className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 p-8 border hover:border-blue-500"
                >

                    <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl group-hover:scale-110 transition">

                        👥

                    </div>

                    <h3 className="text-2xl font-bold mt-6">

                        Users

                    </h3>

                    <p className="text-gray-500 mt-3 leading-7">

                        View, search and manage all registered customers.

                    </p>

                    <div className="mt-6 text-blue-600 font-semibold">

                        Manage →

                    </div>

                </Link>

                <Link
                    to="/admin/providers"
                    className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 p-8 border hover:border-green-500"
                >

                    <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-3xl group-hover:scale-110 transition">

                        👷

                    </div>

                    <h3 className="text-2xl font-bold mt-6">

                        Providers

                    </h3>

                    <p className="text-gray-500 mt-3 leading-7">

                        Approve, update and manage service providers.

                    </p>

                    <div className="mt-6 text-green-600 font-semibold">

                        Manage →

                    </div>

                </Link>

                <Link
                    to="/admin/services"
                    className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 p-8 border hover:border-yellow-500"
                >

                    <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center text-3xl group-hover:scale-110 transition">

                        🛠

                    </div>

                    <h3 className="text-2xl font-bold mt-6">

                        Services

                    </h3>

                    <p className="text-gray-500 mt-3 leading-7">

                        Add, edit or remove available services.

                    </p>

                    <div className="mt-6 text-yellow-600 font-semibold">

                        Manage →

                    </div>

                </Link>

                <Link
                    to="/admin/bookings"
                    className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 p-8 border hover:border-purple-500"
                >

                    <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center text-3xl group-hover:scale-110 transition">

                        📅

                    </div>

                    <h3 className="text-2xl font-bold mt-6">

                        Bookings

                    </h3>

                    <p className="text-gray-500 mt-3 leading-7">

                        Monitor and manage all customer bookings.

                    </p>

                    <div className="mt-6 text-purple-600 font-semibold">

                        Manage →

                    </div>

                </Link>

            </div>

        </div>
                    {/* Admin Controls */}

            <div className="mt-16">

                <div className="flex items-center justify-between mb-8">

                    <div>

                        <h2 className="text-4xl font-bold text-gray-900">
                            Quick Actions
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Manage every section of MultiServe from one place.
                        </p>

                    </div>

                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

                    <Link
                        to="/admin/users"
                        className="bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300 border border-gray-100 group"
                    >

                        <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">
                            👥
                        </div>

                        <h3 className="text-2xl font-bold">
                            Users
                        </h3>

                        <p className="text-gray-500 mt-3 leading-7">
                            View all customers, search accounts and remove users.
                        </p>

                        <div className="mt-6 text-blue-600 font-semibold">
                            Manage →
                        </div>

                    </Link>

                    <Link
                        to="/admin/providers"
                        className="bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300 border border-gray-100 group"
                    >

                        <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">
                            🛠️
                        </div>

                        <h3 className="text-2xl font-bold">
                            Providers
                        </h3>

                        <p className="text-gray-500 mt-3 leading-7">
                            Approve, edit and manage all service providers.
                        </p>

                        <div className="mt-6 text-green-600 font-semibold">
                            Manage →
                        </div>

                    </Link>

                    <Link
                        to="/admin/services"
                        className="bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300 border border-gray-100 group"
                    >

                        <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">
                            🏷️
                        </div>

                        <h3 className="text-2xl font-bold">
                            Services
                        </h3>

                        <p className="text-gray-500 mt-3 leading-7">
                            Add new services, update pricing and categories.
                        </p>

                        <div className="mt-6 text-orange-600 font-semibold">
                            Manage →
                        </div>

                    </Link>

                    <Link
                        to="/admin/bookings"
                        className="bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300 border border-gray-100 group"
                    >

                        <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">
                            📅
                        </div>

                        <h3 className="text-2xl font-bold">
                            Bookings
                        </h3>

                        <p className="text-gray-500 mt-3 leading-7">
                            Monitor bookings, disputes and completed services.
                        </p>

                        <div className="mt-6 text-purple-600 font-semibold">
                            Manage →
                        </div>

                    </Link>

                </div>

            </div>

        </div>

        <Footer />

    </>

);

}

export default AdminDashboard;