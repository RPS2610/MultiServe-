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
    FaUser,
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaDatabase,
    FaUserCheck
} from "react-icons/fa";

function ManageUsers() {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const currentUser = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {

        try {

            setLoading(true);

            const data = await getAllUsers();

            setUsers(data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

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

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Delete Failed"
            );

        }

    };


    const filteredUsers = users.filter((user) =>

        (user.name || "")
            .toLowerCase()
            .includes(search.toLowerCase()) ||

        (user.email || "")
            .toLowerCase()
            .includes(search.toLowerCase()) ||

        (user.role || "")
            .toLowerCase()
            .includes(search.toLowerCase())

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


    const stats = [

        {
            title: "Total Users",
            value: totalUsers,
            label: "All registered accounts",
            icon: FaUsers,
            iconBg: "bg-indigo-50",
            iconColor: "text-[#3525cd]"
        },

        {
            title: "Customers",
            value: customers,
            label: "Service customers",
            icon: FaUser,
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-600"
        },

        {
            title: "Providers",
            value: providers,
            label: "Service professionals",
            icon: FaUserTie,
            iconBg: "bg-amber-50",
            iconColor: "text-amber-600"
        },

        {
            title: "Admins",
            value: admins,
            label: "Platform administrators",
            icon: FaUserShield,
            iconBg: "bg-purple-50",
            iconColor: "text-purple-600"
        }

    ];


    const getRoleStyle = (role) => {

        switch (role?.toLowerCase()) {

            case "admin":
                return {
                    bg: "bg-purple-50",
                    text: "text-purple-700",
                    icon: FaUserShield
                };

            case "provider":
                return {
                    bg: "bg-amber-50",
                    text: "text-amber-700",
                    icon: FaUserTie
                };

            default:
                return {
                    bg: "bg-indigo-50",
                    text: "text-[#3525cd]",
                    icon: FaUser
                };

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

                    <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

                    <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-purple-400/20 blur-3xl" />

                    <div className="relative max-w-7xl mx-auto px-5 sm:px-6 py-11 sm:py-14">

                        <div className="flex items-center gap-3 text-indigo-200 text-sm font-semibold">

                            <FaUsers />

                            User Management

                        </div>

                        <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">

                            Manage Users

                        </h1>

                        <p className="mt-4 max-w-2xl text-sm sm:text-base lg:text-lg leading-7 text-indigo-100">

                            View, search and manage all registered customers,

                            providers and administrators across MultiServe.

                        </p>

                    </div>

                </section>


                {/* =====================================================
                    MAIN CONTENT
                ====================================================== */}

                <div className="max-w-7xl mx-auto px-5 sm:px-6 py-8 sm:py-10">


                    {/* =================================================
                        STATISTICS
                    ================================================== */}

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

                        {stats.map((stat) => {

                            const Icon = stat.icon;

                            return (

                                <div
                                    key={stat.title}
                                    className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-[0_8px_30px_rgba(30,27,75,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(30,27,75,0.08)]"
                                >

                                    <div className="flex items-start justify-between">

                                        <div
                                            className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconColor}`}
                                        >

                                            <Icon />

                                        </div>

                                        <FaDatabase className="hidden sm:block text-slate-200" />

                                    </div>

                                    <p className="mt-5 text-xs sm:text-sm font-medium text-slate-500">

                                        {stat.title}

                                    </p>

                                    <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#1b1b24]">

                                        {stat.value}

                                    </h2>

                                    <p className="mt-1 text-xs sm:text-sm text-slate-400">

                                        {stat.label}

                                    </p>

                                </div>

                            );

                        })}

                    </div>


                    {/* =================================================
                        SEARCH
                    ================================================== */}

                    <section className="mt-9 sm:mt-11">

                        <div className="rounded-3xl border border-slate-100 bg-white p-5 sm:p-6 shadow-[0_8px_30px_rgba(30,27,75,0.05)]">

                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                                <div>

                                    <p className="text-xs font-bold uppercase tracking-wider text-[#3525cd]">

                                        User directory

                                    </p>

                                    <h2 className="mt-1 text-xl sm:text-2xl font-extrabold text-[#1b1b24]">

                                        All Users

                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">

                                        {search
                                            ? `${filteredUsers.length} matching users`
                                            : `${totalUsers} registered users`
                                        }

                                    </p>

                                </div>


                                <div className="relative w-full lg:max-w-md">

                                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                                    <input
                                        type="text"
                                        placeholder="Search name, email or role..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 bg-[#fcf8ff] py-3.5 pl-11 pr-4 text-sm text-[#1b1b24] outline-none transition focus:border-[#3525cd] focus:ring-4 focus:ring-indigo-100"
                                    />

                                </div>

                            </div>

                        </div>

                    </section>


                    {/* =================================================
                        USERS
                    ================================================== */}

                    <section className="mt-6">

                        {loading ? (

                            <div className="grid gap-4">

                                {[1, 2, 3, 4].map((item) => (

                                    <div
                                        key={item}
                                        className="rounded-3xl border border-slate-100 bg-white p-6 animate-pulse"
                                    >

                                        <div className="flex items-center gap-5">

                                            <div className="h-16 w-16 rounded-2xl bg-slate-100" />

                                            <div className="flex-1">

                                                <div className="h-5 w-40 rounded bg-slate-100" />

                                                <div className="mt-3 h-4 w-56 rounded bg-slate-100" />

                                                <div className="mt-4 h-8 w-72 rounded bg-slate-100" />

                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        ) : filteredUsers.length === 0 ? (

                            <div className="rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-14 text-center">

                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-[#3525cd]">

                                    <FaSearch className="text-xl" />

                                </div>

                                <h3 className="mt-5 text-xl font-bold text-[#1b1b24]">

                                    No users found

                                </h3>

                                <p className="mt-2 text-sm text-slate-500">

                                    Try searching with a different name,

                                    email or role.

                                </p>

                            </div>

                        ) : (

                            <div className="grid gap-4">

                                {filteredUsers.map((user) => {

                                    const roleStyle = getRoleStyle(user.role);

                                    const RoleIcon = roleStyle.icon;

                                    const isCurrentAdmin =
                                        user._id === currentUser._id;

                                    return (

                                        <article
                                            key={user._id}
                                            className="group rounded-3xl border border-slate-100 bg-white p-5 sm:p-6 lg:p-7 shadow-[0_8px_30px_rgba(30,27,75,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(30,27,75,0.09)]"
                                        >

                                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">


                                                {/* USER INFO */}

                                                <div className="flex items-start gap-4 sm:gap-5 min-w-0">

                                                    <div className="relative shrink-0">

                                                        <img
                                                            src={
                                                                user.profileImage ||
                                                                "https://placehold.co/120x120"
                                                            }
                                                            alt={user.name || "User"}
                                                            className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover border border-slate-100 bg-slate-50"
                                                        />

                                                        {isCurrentAdmin && (

                                                            <div className="absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-emerald-500 text-white">

                                                                <FaUserCheck className="text-[10px]" />

                                                            </div>

                                                        )}

                                                    </div>


                                                    <div className="min-w-0 flex-1">

                                                        <div className="flex flex-wrap items-center gap-2">

                                                            <h3 className="truncate text-lg sm:text-xl font-bold text-[#1b1b24]">

                                                                {user.name || "Unnamed User"}

                                                            </h3>

                                                            {isCurrentAdmin && (

                                                                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">

                                                                    You

                                                                </span>

                                                            )}

                                                        </div>


                                                        <div className="mt-1 flex items-center gap-2 text-sm text-slate-500 break-all">

                                                            <FaEnvelope className="shrink-0 text-xs text-slate-400" />

                                                            {user.email || "No email"}

                                                        </div>


                                                        <div className="mt-4 flex flex-wrap gap-2">

                                                            {user.phone && (

                                                                <span className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">

                                                                    <FaPhone className="text-[10px]" />

                                                                    {user.phone}

                                                                </span>

                                                            )}


                                                            <span
                                                                className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold capitalize ${roleStyle.bg} ${roleStyle.text}`}
                                                            >

                                                                <RoleIcon className="text-[10px]" />

                                                                {user.role || "customer"}

                                                            </span>


                                                            {user.city && (

                                                                <span className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">

                                                                    <FaMapMarkerAlt className="text-[10px]" />

                                                                    {user.city}

                                                                </span>

                                                            )}

                                                        </div>

                                                    </div>

                                                </div>


                                                {/* ACTION */}

                                                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row lg:items-end xl:items-center gap-3 lg:min-w-[190px]">

                                                    <button
                                                        onClick={() => handleDelete(user._id)}
                                                        disabled={isCurrentAdmin}
                                                        className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all duration-300 ${
                                                            isCurrentAdmin
                                                                ? "cursor-not-allowed bg-slate-100 text-slate-400"
                                                                : "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"
                                                        }`}
                                                    >

                                                        <FaTrash className="text-xs" />

                                                        {isCurrentAdmin
                                                            ? "Current Admin"
                                                            : "Delete User"
                                                        }

                                                    </button>


                                                    <p className="max-w-full truncate text-[10px] text-slate-400 lg:max-w-[190px]">

                                                        ID: {user._id}

                                                    </p>

                                                </div>

                                            </div>

                                        </article>

                                    );

                                })}

                            </div>

                        )}

                    </section>


                    {/* =================================================
                        FOOTER INFO
                    ================================================== */}

                    <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-indigo-100 bg-[#f5f2ff] px-5 py-4">

                        <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#3525cd]">

                                <FaUserShield className="text-sm" />

                            </div>

                            <p className="text-xs sm:text-sm text-slate-600">

                                Admin actions are protected and cannot remove

                                the currently signed-in admin.

                            </p>

                        </div>

                        <span className="text-xs font-bold text-[#3525cd]">

                            {filteredUsers.length} users displayed

                        </span>

                    </div>

                </div>

            </main>


            <Footer />

        </>

    );

}

export default ManageUsers;