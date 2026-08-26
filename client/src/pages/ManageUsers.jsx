import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
    getAllUsers,
    deleteUser
} from "../api/adminUserApi";

import {
    FaUsers,
    FaSearch,
    FaTrash,
    FaUserShield,
    FaUserTie,
    FaUser
} from "react-icons/fa";

function ManageUsers() {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    const currentUser = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {

        try {

            const data = await getAllUsers();

            setUsers(data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleDelete = async (id) => {

        if (id === currentUser._id) {

            alert("You cannot delete your own admin account.");

            return;

        }

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        try {

            await deleteUser(id);

            alert("User Deleted Successfully");

            fetchUsers();

        }

        catch (error) {

            alert(
                error.response?.data?.message ||
                "Delete Failed"
            );

        }

    };

    const filteredUsers = users.filter((user) =>

    (user.name || "").toLowerCase().includes(search.toLowerCase()) ||

    (user.email || "").toLowerCase().includes(search.toLowerCase()) ||

    (user.role || "").toLowerCase().includes(search.toLowerCase())

);
    const totalUsers = users.length;

    const customers = users.filter(
        u => u.role === "customer"
    ).length;

    const providers = users.filter(
        u => u.role === "provider"
    ).length;

    const admins = users.filter(
        u =>
            u.role === "admin" ||
            u.role === "Admin"
    ).length;

return (

    <>

        <Navbar />

        {/* Hero */}

        <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white">

            <div className="max-w-7xl mx-auto px-6 py-14">

                <h1 className="text-5xl font-bold">

                    Manage Users

                </h1>

                <p className="text-xl text-blue-100 mt-4">

                    View, search and manage all registered users.

                </p>

            </div>

        </section>

        <div className="max-w-7xl mx-auto px-6 py-10">

            {/* Statistics */}

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

                <div className="bg-white rounded-3xl shadow-lg p-6">

                    <FaUsers className="text-5xl text-blue-600" />

                    <h2 className="text-4xl font-bold mt-5">

                        {totalUsers}

                    </h2>

                    <p className="text-gray-500">

                        Total Users

                    </p>

                </div>

                <div className="bg-white rounded-3xl shadow-lg p-6">

                    <FaUser className="text-5xl text-green-600" />

                    <h2 className="text-4xl font-bold mt-5">

                        {customers}

                    </h2>

                    <p className="text-gray-500">

                        Customers

                    </p>

                </div>

                <div className="bg-white rounded-3xl shadow-lg p-6">

                    <FaUserTie className="text-5xl text-yellow-500" />

                    <h2 className="text-4xl font-bold mt-5">

                        {providers}

                    </h2>

                    <p className="text-gray-500">

                        Providers

                    </p>

                </div>

                <div className="bg-white rounded-3xl shadow-lg p-6">

                    <FaUserShield className="text-5xl text-purple-600" />

                    <h2 className="text-4xl font-bold mt-5">

                        {admins}

                    </h2>

                    <p className="text-gray-500">

                        Admins

                    </p>

                </div>

            </div>

            {/* Search */}

            <div className="relative mb-10">

                <FaSearch className="absolute left-5 top-4 text-gray-400 text-lg" />

                <input

                    type="text"

                    placeholder="Search by Name, Email or Role..."

                    value={search}

                    onChange={(e) => setSearch(e.target.value)}

                    className="w-full bg-white border rounded-2xl pl-14 pr-6 py-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"

                />

            </div>
                        {/* Users List */}

            <div className="grid gap-6">

                {

                    filteredUsers.map((user) => (

                        <div
                            key={user._id}
                            className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 p-8"
                        >

                            <div className="flex flex-col lg:flex-row justify-between gap-8">

                                {/* Left */}

                                <div className="flex gap-6">

                                    <img
                                        src={
                                            user.profileImage ||
                                            "https://placehold.co/120x120"
                                        }
                                        alt={user.name}
                                        className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
                                    />

                                    <div>

                                        <h2 className="text-2xl font-bold">

                                            {user.name}

                                        </h2>

                                        <p className="text-gray-500 mt-1">

                                            {user.email}

                                        </p>

                                        <div className="flex flex-wrap gap-4 mt-5">

                                            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">

                                                📞 {user.phone}

                                            </span>

                                            <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full capitalize">

                                                👤 {user.role}

                                            </span>

                                            {

                                                user.city &&

                                                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">

                                                    📍 {user.city}

                                                </span>

                                            }

                                        </div>

                                    </div>

                                </div>

                                {/* Right */}

                                <div className="flex flex-col justify-between items-end">

                                    <button

                                        onClick={() => handleDelete(user._id)}

                                        disabled={user._id === currentUser._id}

                                        className={`px-6 py-3 rounded-xl font-semibold transition ${
                                            user._id === currentUser._id
                                                ? "bg-gray-300 cursor-not-allowed"
                                                : "bg-red-600 hover:bg-red-700 text-white"
                                        }`}

                                    >

                                        {user._id === currentUser._id

                                            ? "Current Admin"

                                            : "Delete User"}

                                    </button>

                                    <p className="text-sm text-gray-400 mt-5">

                                        ID: {user._id}

                                    </p>

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

        <Footer />

    </>

);

}

export default ManageUsers;
