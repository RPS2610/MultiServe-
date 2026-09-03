import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { getDashboardStats } from "../api/adminApi";

import {
    FaUsers,
    FaUserTie,
    FaCalendarAlt,
    FaRupeeSign,
    FaArrowRight,
    FaChartLine,
    FaCogs,
    FaShieldAlt,
    FaClipboardList
} from "react-icons/fa";

function AdminDashboard() {

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProviders: 0,
        totalBookings: 0,
        totalRevenue: 0
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchDashboard();

    }, []);

    const fetchDashboard = async () => {

        try {

            const data = await getDashboardStats();

            setStats(data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };


    const statCards = [

        {
            title: "Total Users",
            value: stats.totalUsers,
            label: "Registered customers",
            icon: FaUsers,
            iconBg: "bg-indigo-50",
            iconColor: "text-[#3525cd]"
        },

        {
            title: "Providers",
            value: stats.totalProviders,
            label: "Service professionals",
            icon: FaUserTie,
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-600"
        },

        {
            title: "Bookings",
            value: stats.totalBookings,
            label: "Total service requests",
            icon: FaCalendarAlt,
            iconBg: "bg-amber-50",
            iconColor: "text-amber-600"
        },

        {
            title: "Revenue",
            value: `₹${Number(stats.totalRevenue || 0).toLocaleString("en-IN")}`,
            label: "Platform revenue",
            icon: FaRupeeSign,
            iconBg: "bg-purple-50",
            iconColor: "text-purple-600"
        }

    ];


    const adminActions = [

        {
            title: "Manage Users",
            description:
                "View, search and manage registered customer accounts across the platform.",
            path: "/admin/users",
            icon: FaUsers,
            iconBg: "bg-indigo-50",
            iconColor: "text-[#3525cd]"
        },

        {
            title: "Manage Providers",
            description:
                "Review, approve and manage service professionals on MultiServe.",
            path: "/admin/providers",
            icon: FaUserTie,
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-600"
        },

        {
            title: "Manage Services",
            description:
                "Add, update and organize the services available to customers.",
            path: "/admin/services",
            icon: FaCogs,
            iconBg: "bg-amber-50",
            iconColor: "text-amber-600"
        },

        {
            title: "Manage Bookings",
            description:
                "Monitor customer bookings, service status and platform activity.",
            path: "/admin/bookings",
            icon: FaClipboardList,
            iconBg: "bg-purple-50",
            iconColor: "text-purple-600"
        }

    ];


    if (loading) {

        return (

            <>

                <Navbar />

                <main className="min-h-screen bg-[#fcf8ff]">

                    <section className="bg-[#3525cd]">

                        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-12 sm:py-14">

                            <div className="h-5 w-32 rounded-full bg-white/20 animate-pulse" />

                            <div className="mt-5 h-10 sm:h-12 w-72 sm:w-96 rounded-xl bg-white/20 animate-pulse" />

                            <div className="mt-4 h-5 w-full max-w-xl rounded-full bg-white/10 animate-pulse" />

                        </div>

                    </section>


                    <div className="max-w-7xl mx-auto px-5 sm:px-6 py-10">

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

                            {[1, 2, 3, 4].map(item => (

                                <div
                                    key={item}
                                    className="h-40 rounded-2xl bg-white border border-slate-100 animate-pulse"
                                />

                            ))}

                        </div>


                        <div className="mt-12">

                            <div className="h-8 w-52 rounded-lg bg-slate-200 animate-pulse" />

                            <div className="mt-3 h-4 w-80 rounded-lg bg-slate-100 animate-pulse" />

                            <div className="mt-7 grid md:grid-cols-2 xl:grid-cols-4 gap-5">

                                {[1, 2, 3, 4].map(item => (

                                    <div
                                        key={item}
                                        className="h-64 rounded-3xl bg-white border border-slate-100 animate-pulse"
                                    />

                                ))}

                            </div>

                        </div>

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


                    <div className="relative max-w-7xl mx-auto px-5 sm:px-6 py-11 sm:py-14">

                        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

                            <div>

                                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs sm:text-sm font-semibold text-indigo-100">

                                    <FaShieldAlt />

                                    Platform Administration

                                </div>


                                <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">

                                    Admin Dashboard

                                </h1>


                                <p className="mt-4 max-w-2xl text-sm sm:text-base lg:text-lg leading-7 text-indigo-100">

                                    Monitor users, providers, bookings and

                                    overall MultiServe platform performance

                                    from one place.

                                </p>

                            </div>


                            <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-md">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">

                                        <FaChartLine />

                                    </div>

                                    <div>

                                        <p className="text-xs text-indigo-200">

                                            Platform Overview

                                        </p>

                                        <p className="mt-1 text-sm font-bold">

                                            Live dashboard statistics

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

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

                        {statCards.map((card) => {

                            const Icon = card.icon;

                            return (

                                <div
                                    key={card.title}
                                    className="group rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-[0_8px_30px_rgba(30,27,75,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(30,27,75,0.09)]"
                                >

                                    <div className="flex items-start justify-between gap-3">

                                        <div className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl ${card.iconBg} ${card.iconColor}`}>

                                            <Icon className="text-lg" />

                                        </div>

                                        <span className="hidden sm:block text-[11px] font-semibold uppercase tracking-wide text-slate-400">

                                            Overview

                                        </span>

                                    </div>


                                    <p className="mt-5 text-xs sm:text-sm font-medium text-slate-500">

                                        {card.title}

                                    </p>


                                    <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#1b1b24] break-words">

                                        {card.value}

                                    </h2>


                                    <p className="mt-1 text-xs sm:text-sm text-slate-400">

                                        {card.label}

                                    </p>

                                </div>

                            );

                        })}

                    </div>


                    {/* =================================================
                        ADMIN CONTROLS
                    ================================================== */}

                    <section className="mt-12 sm:mt-14">

                        <div className="mb-7">

                            <p className="text-sm font-semibold text-[#3525cd]">

                                Platform management

                            </p>

                            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#1b1b24]">

                                Admin Controls

                            </h2>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">

                                Manage every important section of MultiServe

                                from one centralized workspace.

                            </p>

                        </div>


                        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">

                            {adminActions.map((action) => {

                                const Icon = action.icon;

                                return (

                                    <Link
                                        key={action.title}
                                        to={action.path}
                                        className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 sm:p-7 shadow-[0_8px_30px_rgba(30,27,75,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-[0_18px_45px_rgba(30,27,75,0.09)]"
                                    >

                                        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${action.iconBg} ${action.iconColor} transition-transform duration-300 group-hover:scale-105`}>

                                            <Icon className="text-xl" />

                                        </div>


                                        <h3 className="mt-6 text-lg sm:text-xl font-bold text-[#1b1b24]">

                                            {action.title}

                                        </h3>


                                        <p className="mt-3 text-sm leading-6 text-slate-500">

                                            {action.description}

                                        </p>


                                        <div className="mt-6 flex items-center gap-2 text-sm font-bold text-[#3525cd]">

                                            Manage

                                            <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />

                                        </div>


                                        <div className="absolute -right-10 -bottom-10 h-28 w-28 rounded-full bg-indigo-50/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                    </Link>

                                );

                            })}

                        </div>

                    </section>


                    {/* =================================================
                        PLATFORM SUMMARY
                    ================================================== */}

                    <section className="mt-12 sm:mt-14">

                        <div className="relative overflow-hidden rounded-3xl bg-[#f5f2ff] border border-indigo-100 p-6 sm:p-8 lg:p-10">

                            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-indigo-100/60" />

                            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7">

                                <div className="max-w-2xl">

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#3525cd] shadow-sm">

                                            <FaChartLine />

                                        </div>

                                        <div>

                                            <p className="text-xs font-bold uppercase tracking-wider text-[#3525cd]">

                                                Platform health

                                            </p>

                                            <h3 className="mt-1 text-xl sm:text-2xl font-extrabold text-[#1b1b24]">

                                                Everything in one workspace

                                            </h3>

                                        </div>

                                    </div>


                                    <p className="mt-5 text-sm leading-7 text-slate-600">

                                        Use the management tools above to keep

                                        users, providers, services and bookings

                                        organized and up to date.

                                    </p>

                                </div>


                                <Link
                                    to="/admin/bookings"
                                    className="group inline-flex w-full sm:w-fit shrink-0 items-center justify-center gap-3 rounded-xl bg-[#3525cd] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2d20b0]"
                                >

                                    View Bookings

                                    <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />

                                </Link>

                            </div>

                        </div>

                    </section>

                </section>

            </main>


            <Footer />

        </>

    );

}

export default AdminDashboard;