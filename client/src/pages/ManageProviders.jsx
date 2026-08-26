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
    FaUserTie
} from "react-icons/fa";

function ManageProviders() {

    const [providers, setProviders] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        fetchProviders();

    }, []);

    const fetchProviders = async () => {

        try {

            const data = await getAllProviders();

            setProviders(data);

        }
        catch (error) {

            console.log(error);

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

        }
        catch (error) {

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

    return (

        <>

            <Navbar />

            {/* Hero Section */}

            <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white">

                <div className="max-w-7xl mx-auto px-6 py-14">

                    <div className="flex items-center gap-5">

                        <div className="bg-white/20 p-5 rounded-2xl">

                            <FaUserTie className="text-5xl" />

                        </div>

                        <div>

                            <h1 className="text-5xl font-bold">

                                Manage Providers

                            </h1>

                            <p className="text-xl text-blue-100 mt-3">

                                View, search and manage all service professionals.

                            </p>

                        </div>

                    </div>

                </div>

            </section>

            <div className="max-w-7xl mx-auto px-6 py-10">

                {/* Statistics */}

                <div className="grid md:grid-cols-3 gap-6 mb-10">

                    {/* Total Providers */}

                    <div className="bg-white rounded-3xl shadow-lg p-7">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-gray-500 font-medium">

                                    Total Providers

                                </p>

                                <h2 className="text-4xl font-bold mt-3">

                                    {totalProviders}

                                </h2>

                            </div>

                            <div className="bg-blue-100 text-blue-600 p-5 rounded-2xl">

                                <FaUsers className="text-3xl" />

                            </div>

                        </div>

                    </div>

                    {/* Services */}

                    <div className="bg-white rounded-3xl shadow-lg p-7">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-gray-500 font-medium">

                                    Services Offered

                                </p>

                                <h2 className="text-4xl font-bold mt-3">

                                    {uniqueServices}

                                </h2>

                            </div>

                            <div className="bg-green-100 text-green-600 p-5 rounded-2xl">

                                <FaTools className="text-3xl" />

                            </div>

                        </div>

                    </div>

                    {/* Cities */}

                    <div className="bg-white rounded-3xl shadow-lg p-7">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-gray-500 font-medium">

                                    Cities Covered

                                </p>

                                <h2 className="text-4xl font-bold mt-3">

                                    {uniqueCities}

                                </h2>

                            </div>

                            <div className="bg-purple-100 text-purple-600 p-5 rounded-2xl">

                                <FaMapMarkerAlt className="text-3xl" />

                            </div>

                        </div>

                    </div>

                </div>

                {/* Search */}

                <div className="relative mb-10">

                    <FaSearch className="absolute left-5 top-5 text-gray-400 text-lg" />

                    <input

                        type="text"

                        placeholder="Search by provider name, service or city..."

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                        className="w-full bg-white border border-gray-200 rounded-2xl pl-14 pr-6 py-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                {/* Provider List */}

                {

                    filteredProviders.length === 0 ? (

                        <div className="bg-white rounded-3xl shadow-lg py-20 text-center">

                            <FaUserTie className="text-7xl text-gray-300 mx-auto mb-6" />

                            <h2 className="text-3xl font-bold">

                                No Providers Found

                            </h2>

                            <p className="text-gray-500 mt-3">

                                Try searching with a different name, service or city.

                            </p>

                        </div>

                    ) : (

                        <div className="grid md:grid-cols-2 gap-6">

                            {

                                filteredProviders.map((provider) => (

                                    <div
                                        key={provider._id}
                                        className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 p-7"
                                    >

                                        <div className="flex flex-col sm:flex-row gap-6">

                                            {/* Provider Image */}

                                            <div className="flex justify-center sm:block">

                                                <img

                                                    src={
                                                        provider.profileImage ||
                                                        "https://placehold.co/120x120"
                                                    }

                                                    alt={provider.name}

                                                    className="w-28 h-28 rounded-2xl object-cover border-4 border-blue-100 shadow-sm"
                                                />

                                            </div>

                                            {/* Details */}

                                            <div className="flex-1">

                                                <div className="flex justify-between gap-4">

                                                    <div>

                                                        <h2 className="text-2xl font-bold">

                                                            {provider.name}

                                                        </h2>

                                                        <p className="text-blue-600 font-semibold mt-1">

                                                            {provider.service || "Service Provider"}

                                                        </p>

                                                    </div>

                                                </div>

                                                <div className="mt-5 space-y-3 text-gray-600">

                                                    <div className="flex items-center gap-3">

                                                        <FaMapMarkerAlt className="text-red-500" />

                                                        <span>

                                                            {provider.city || "City not available"}

                                                        </span>

                                                    </div>

                                                    <div className="flex items-center gap-3">

                                                        <FaPhoneAlt className="text-blue-500" />

                                                        <span>

                                                            {provider.phone || "Phone not available"}

                                                        </span>

                                                    </div>

                                                </div>

                                                {/* Provider Information */}

                                                <div className="flex flex-wrap gap-3 mt-5">

                                                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">

                                                        <FaBriefcase className="inline mr-2" />

                                                        {provider.experience || 0} Years

                                                    </span>

                                                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">

                                                        <FaRupeeSign className="inline" />

                                                        {provider.price || 0}

                                                    </span>

                                                </div>

                                            </div>

                                        </div>

                                        {/* Delete */}

                                        <div className="border-t border-gray-100 mt-7 pt-5 flex justify-end">

                                            <button

                                                onClick={() => handleDelete(provider._id)}

                                                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition flex items-center gap-2"

                                            >

                                                <FaTrash />

                                                Delete Provider

                                            </button>

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                    )

                }

            </div>

            <Footer />

        </>

    );

}

export default ManageProviders;