import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
    getAllProviders,
    deleteProvider
} from "../api/adminProviderApi";

import {
    FaUsers,
    FaSearch,
    FaTrash,
    FaTools,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaBriefcase,
    FaRupeeSign,
    FaUserTie,
    FaEnvelope,
    FaDatabase,
    FaArrowRight
} from "react-icons/fa";

function ManageProviders() {

    const [providers, setProviders] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProviders();
    }, []);

    const fetchProviders = async () => {

        try {

            setLoading(true);

            const data = await getAllProviders();

            setProviders(data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };


    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this provider?"
        );

        if (!confirmDelete) return;

        try {

            await deleteProvider(id);

            alert("Provider Deleted Successfully");

            fetchProviders();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Delete Failed"
            );

        }

    };


    const filteredProviders = providers.filter((provider) => {

        const name = (provider.name || "").toLowerCase();
        const service = (provider.service || "").toLowerCase();
        const city = (provider.city || "").toLowerCase();

        const searchText = search.toLowerCase();

        return (
            name.includes(searchText) ||
            service.includes(searchText) ||
            city.includes(searchText)
        );

    });


    const totalProviders = providers.length;

    const uniqueServices = new Set(
        providers
            .map(provider => provider.service)
            .filter(Boolean)
    ).size;

    const uniqueCities = new Set(
        providers
            .map(provider => provider.city)
            .filter(Boolean)
    ).size;


    const stats = [

        {
            title: "Total Providers",
            value: totalProviders,
            label: "Registered professionals",
            icon: FaUsers,
            bg: "bg-indigo-50",
            color: "text-[#3525cd]"
        },

        {
            title: "Services Offered",
            value: uniqueServices,
            label: "Different services",
            icon: FaTools,
            bg: "bg-emerald-50",
            color: "text-emerald-600"
        },

        {
            title: "Cities Covered",
            value: uniqueCities,
            label: "Service locations",
            icon: FaMapMarkerAlt,
            bg: "bg-purple-50",
            color: "text-purple-600"
        }

    ];


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

                        <div className="flex items-center gap-3 text-indigo-200 text-sm font-semibold">

                            <FaUserTie />

                            Provider Management

                        </div>

                        <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">

                            Manage Providers

                        </h1>

                        <p className="mt-4 max-w-2xl text-sm sm:text-base lg:text-lg leading-7 text-indigo-100">

                            View, search and manage all service professionals

                            registered on the MultiServe platform.

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

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

                        {stats.map((stat) => {

                            const Icon = stat.icon;

                            return (

                                <div
                                    key={stat.title}
                                    className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-[0_8px_30px_rgba(30,27,75,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(30,27,75,0.08)]"
                                >

                                    <div className="flex items-start justify-between">

                                        <div
                                            className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}
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
                        SEARCH HEADER
                    ================================================== */}

                    <section className="mt-9 sm:mt-11">

                        <div className="rounded-3xl border border-slate-100 bg-white p-5 sm:p-6 shadow-[0_8px_30px_rgba(30,27,75,0.05)]">

                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                                <div>

                                    <p className="text-xs font-bold uppercase tracking-wider text-[#3525cd]">

                                        Provider directory

                                    </p>

                                    <h2 className="mt-1 text-xl sm:text-2xl font-extrabold text-[#1b1b24]">

                                        All Providers

                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">

                                        {search
                                            ? `${filteredProviders.length} matching providers`
                                            : `${totalProviders} registered providers`
                                        }

                                    </p>

                                </div>


                                <div className="relative w-full lg:max-w-md">

                                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                                    <input
                                        type="text"
                                        placeholder="Search name, service or city..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 bg-[#fcf8ff] py-3.5 pl-11 pr-4 text-sm text-[#1b1b24] outline-none transition focus:border-[#3525cd] focus:ring-4 focus:ring-indigo-100"
                                    />

                                </div>

                            </div>

                        </div>

                    </section>


                    {/* =================================================
                        PROVIDER LIST
                    ================================================== */}

                    <section className="mt-6">

                        {loading ? (

                            <div className="grid md:grid-cols-2 gap-5">

                                {[1, 2, 3, 4].map((item) => (

                                    <div
                                        key={item}
                                        className="rounded-3xl border border-slate-100 bg-white p-6 animate-pulse"
                                    >

                                        <div className="flex gap-5">

                                            <div className="h-24 w-24 rounded-2xl bg-slate-100 shrink-0" />

                                            <div className="flex-1">

                                                <div className="h-5 w-36 rounded bg-slate-100" />

                                                <div className="mt-3 h-4 w-28 rounded bg-slate-100" />

                                                <div className="mt-5 h-3 w-40 rounded bg-slate-100" />

                                                <div className="mt-3 h-3 w-32 rounded bg-slate-100" />

                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        ) : filteredProviders.length === 0 ? (

                            <div className="rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">

                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-[#3525cd]">

                                    <FaUserTie className="text-xl" />

                                </div>

                                <h2 className="mt-5 text-xl sm:text-2xl font-extrabold text-[#1b1b24]">

                                    No Providers Found

                                </h2>

                                <p className="mt-2 text-sm text-slate-500">

                                    Try searching with a different provider,

                                    service or city.

                                </p>

                            </div>

                        ) : (

                            <div className="grid md:grid-cols-2 gap-5">

                                {filteredProviders.map((provider) => (

                                    <article
                                        key={provider._id}
                                        className="group rounded-3xl border border-slate-100 bg-white p-5 sm:p-6 shadow-[0_8px_30px_rgba(30,27,75,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(30,27,75,0.09)]"
                                    >

                                        {/* =================================================
                                            PROVIDER INFORMATION
                                        ================================================== */}

                                        <div className="flex flex-col sm:flex-row gap-5">

                                            {/* IMAGE */}

                                            <div className="flex justify-center sm:block shrink-0">

                                                <img
                                                    src={
                                                        provider.profileImage ||
                                                        "https://placehold.co/120x120"
                                                    }
                                                    alt={provider.name || "Provider"}
                                                    className="h-24 w-24 rounded-2xl object-cover border border-slate-100 bg-slate-50 shadow-sm"
                                                />

                                            </div>


                                            {/* DETAILS */}

                                            <div className="min-w-0 flex-1">

                                                <h2 className="text-xl font-extrabold text-[#1b1b24]">

                                                    {provider.name || "Unnamed Provider"}

                                                </h2>


                                                <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-[#3525cd]">

                                                    <FaTools className="text-[10px]" />

                                                    {provider.service || "Service Provider"}

                                                </div>


                                                <div className="mt-5 space-y-2.5">

                                                    <div className="flex items-center gap-3 text-sm text-slate-500">

                                                        <FaMapMarkerAlt className="shrink-0 text-xs text-purple-500" />

                                                        <span>

                                                            {provider.city || "City not available"}

                                                        </span>

                                                    </div>


                                                    <div className="flex items-center gap-3 text-sm text-slate-500">

                                                        <FaPhoneAlt className="shrink-0 text-xs text-indigo-500" />

                                                        <span>

                                                            {provider.phone || "Phone not available"}

                                                        </span>

                                                    </div>


                                                    {provider.email && (

                                                        <div className="flex items-center gap-3 text-sm text-slate-500 break-all">

                                                            <FaEnvelope className="shrink-0 text-xs text-slate-400" />

                                                            <span>

                                                                {provider.email}

                                                            </span>

                                                        </div>

                                                    )}

                                                </div>

                                            </div>

                                        </div>


                                        {/* =================================================
                                            PROVIDER META
                                        ================================================== */}

                                        <div className="mt-6 flex flex-wrap gap-2">

                                            <span className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600">

                                                <FaBriefcase className="text-[10px]" />

                                                {provider.experience || 0} Years Experience

                                            </span>


                                            <span className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">

                                                <FaRupeeSign className="text-[10px]" />

                                                {provider.price || 0}

                                            </span>

                                        </div>


                                        {/* =================================================
                                            DELETE ACTION
                                        ================================================== */}

                                        <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-5">

                                            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">

                                                <FaUserTie />

                                                Service Professional

                                            </div>


                                            <button
                                                onClick={() => handleDelete(provider._id)}
                                                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-red-50 px-5 py-3 text-sm font-bold text-red-600 transition-all duration-300 hover:bg-red-600 hover:text-white"
                                            >

                                                <FaTrash className="text-xs" />

                                                Delete Provider

                                                <FaArrowRight className="text-[10px] opacity-60" />

                                            </button>

                                        </div>

                                    </article>

                                ))}

                            </div>

                        )}

                    </section>


                    {/* =================================================
                        SECURITY INFO
                    ================================================== */}

                    <div className="mt-8 rounded-2xl border border-indigo-100 bg-[#f5f2ff] px-5 py-4">

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                            <div className="flex items-center gap-3">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#3525cd]">

                                    <FaUserTie className="text-sm" />

                                </div>

                                <p className="text-xs sm:text-sm text-slate-600">

                                    Provider records are managed from the

                                    MultiServe administration panel.

                                </p>

                            </div>

                            <span className="text-xs font-bold text-[#3525cd]">

                                {filteredProviders.length} displayed

                            </span>

                        </div>

                    </div>

                </div>

            </main>


            <Footer />

        </>

    );

}

export default ManageProviders;