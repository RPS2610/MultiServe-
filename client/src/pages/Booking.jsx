import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { getProviderById } from "../api/providerApi";
import { createBooking } from "../api/bookingApi";

import {
    FaUser,
    FaPhone,
    FaMapMarkerAlt,
    FaCheckCircle,
    FaBriefcase,
    FaRupeeSign,
    FaShieldAlt,
    FaArrowLeft,
    FaCalendarCheck,
    FaClock
} from "react-icons/fa";

function Booking() {
    const { providerId } = useParams();
    const navigate = useNavigate();

    const [provider, setProvider] = useState(null);
    const [loading, setLoading] = useState(false);
    const [providerLoading, setProviderLoading] = useState(true);

    const currentUser = JSON.parse(localStorage.getItem("user"));

    const [formData, setFormData] = useState({
        customerName: currentUser?.name || "",
        phone: currentUser?.phone || "",
        address: currentUser?.address || ""
    });

    useEffect(() => {
        loadProvider();
    }, [providerId]);

    const loadProvider = async () => {
        try {
            setProviderLoading(true);

            const data = await getProviderById(providerId);
            setProvider(data);
        } catch (error) {
            console.log(error);
        } finally {
            setProviderLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentUser?._id) {
            alert("Please login before booking a service.");
            navigate("/login");
            return;
        }

        if (!provider) {
            alert("Provider information is not available.");
            return;
        }

        setLoading(true);

        try {
            await createBooking({
                customerId: currentUser._id,
                providerId,
                customerName: formData.customerName,
                customerPhone: formData.phone,
                customerAddress: formData.address,
                service: provider.service
            });

            alert("✅ Booking Confirmed Successfully");
            navigate("/my-bookings");
        } catch (error) {
            console.log(error);
            alert("Booking Failed");
        } finally {
            setLoading(false);
        }
    };

    const profileImage =
        provider?.profileImage ||
        provider?.image ||
        provider?.photo ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
            provider?.name || "Professional"
        )}&background=EEF2FF&color=4338CA&size=400`;

    return (
        <>
            <Navbar />

            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#3125c9] via-[#4036d8] to-[#571ac0] text-white">
                <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-purple-400/20 blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition mb-7"
                    >
                        <FaArrowLeft />
                        Back
                    </button>

                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-semibold mb-5">
                            <FaCalendarCheck />
                            Secure Service Booking
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                            Confirm Your Booking
                        </h1>

                        <p className="mt-4 text-base sm:text-lg text-indigo-100 leading-relaxed">
                            Enter your details below and book a trusted professional
                            for your service.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main */}
            <main className="bg-[#fcf8ff] min-h-screen">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 sm:py-14">

                    {providerLoading ? (
                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-indigo-50 animate-pulse">
                                <div className="h-8 bg-slate-100 rounded-lg w-64 mb-10" />

                                <div className="space-y-7">
                                    <div className="h-16 bg-slate-100 rounded-2xl" />
                                    <div className="h-16 bg-slate-100 rounded-2xl" />
                                    <div className="h-32 bg-slate-100 rounded-2xl" />
                                    <div className="h-14 bg-slate-100 rounded-2xl" />
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-indigo-50 animate-pulse">
                                <div className="w-28 h-28 bg-slate-100 rounded-full mx-auto" />
                                <div className="h-6 bg-slate-100 rounded-lg w-40 mx-auto mt-5" />
                                <div className="h-4 bg-slate-100 rounded-lg w-28 mx-auto mt-3" />
                                <div className="space-y-4 mt-8">
                                    <div className="h-5 bg-slate-100 rounded" />
                                    <div className="h-5 bg-slate-100 rounded" />
                                    <div className="h-5 bg-slate-100 rounded" />
                                </div>
                            </div>
                        </div>
                    ) : !provider ? (
                        <div className="max-w-xl mx-auto text-center bg-white rounded-3xl p-10 shadow-sm border border-indigo-50">
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-red-50 text-red-500 flex items-center justify-center text-2xl">
                                !
                            </div>

                            <h2 className="text-2xl font-bold text-[#1b1b24] mt-5">
                                Provider Not Found
                            </h2>

                            <p className="text-slate-500 mt-2">
                                We couldn't load this provider's information.
                                Please try again.
                            </p>

                            <button
                                onClick={() => navigate("/providers")}
                                className="mt-7 px-6 py-3 rounded-xl bg-[#3525cd] text-white font-semibold hover:bg-[#2d20b5] transition"
                            >
                                Browse Providers
                            </button>
                        </div>
                    ) : (
                        <div className="grid lg:grid-cols-3 gap-8 xl:gap-10">

                            {/* Booking Form */}
                            <div className="lg:col-span-2">
                                <div className="bg-white rounded-3xl shadow-[0_12px_40px_rgba(53,37,205,0.08)] border border-indigo-50 p-6 sm:p-8 lg:p-10">

                                    <div className="flex items-start gap-4 mb-8">
                                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#3525cd] flex items-center justify-center text-lg shrink-0">
                                            <FaUser />
                                        </div>

                                        <div>
                                            <h2 className="text-2xl sm:text-3xl font-bold text-[#1b1b24]">
                                                Customer Information
                                            </h2>

                                            <p className="text-sm sm:text-base text-slate-500 mt-1">
                                                Tell us where and how we can reach you.
                                            </p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit}>
                                        <div className="space-y-6">

                                            {/* Name */}
                                            <div>
                                                <label className="block text-sm font-bold text-[#1b1b24] mb-2">
                                                    Full Name
                                                </label>

                                                <div className="group flex items-center rounded-2xl border border-slate-200 bg-white px-4 transition focus-within:border-[#3525cd] focus-within:ring-4 focus-within:ring-indigo-50">
                                                    <FaUser className="text-slate-400 group-focus-within:text-[#3525cd] transition" />

                                                    <input
                                                        type="text"
                                                        name="customerName"
                                                        value={formData.customerName}
                                                        onChange={handleChange}
                                                        placeholder="Enter your full name"
                                                        className="w-full px-4 py-4 outline-none text-[#1b1b24] placeholder:text-slate-400 bg-transparent"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            {/* Phone */}
                                            <div>
                                                <label className="block text-sm font-bold text-[#1b1b24] mb-2">
                                                    Phone Number
                                                </label>

                                                <div className="group flex items-center rounded-2xl border border-slate-200 bg-white px-4 transition focus-within:border-[#3525cd] focus-within:ring-4 focus-within:ring-indigo-50">
                                                    <FaPhone className="text-slate-400 group-focus-within:text-[#3525cd] transition" />

                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        placeholder="Enter your phone number"
                                                        className="w-full px-4 py-4 outline-none text-[#1b1b24] placeholder:text-slate-400 bg-transparent"
                                                        required
                                                    />
                                                </div>

                                                <p className="text-xs text-slate-400 mt-2 ml-1">
                                                    We'll use this number to coordinate your service.
                                                </p>
                                            </div>

                                            {/* Address */}
                                            <div>
                                                <label className="block text-sm font-bold text-[#1b1b24] mb-2">
                                                    Service Address
                                                </label>

                                                <div className="group flex items-start rounded-2xl border border-slate-200 bg-white px-4 transition focus-within:border-[#3525cd] focus-within:ring-4 focus-within:ring-indigo-50">
                                                    <FaMapMarkerAlt className="text-slate-400 group-focus-within:text-[#3525cd] transition mt-5" />

                                                    <textarea
                                                        rows="5"
                                                        name="address"
                                                        value={formData.address}
                                                        onChange={handleChange}
                                                        placeholder="Enter the complete address where the service is required"
                                                        className="w-full px-4 py-4 outline-none text-[#1b1b24] placeholder:text-slate-400 bg-transparent resize-none"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            {/* Security Notice */}
                                            <div className="flex gap-4 p-4 sm:p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100">
                                                <div className="w-10 h-10 rounded-xl bg-white text-[#3525cd] flex items-center justify-center shrink-0 shadow-sm">
                                                    <FaShieldAlt />
                                                </div>

                                                <div>
                                                    <h3 className="font-bold text-[#1b1b24] text-sm sm:text-base">
                                                        Your information is secure
                                                    </h3>

                                                    <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                                                        Your contact and address details are used only
                                                        to process and coordinate your service booking.
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Submit */}
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full flex items-center justify-center gap-3 bg-[#3525cd] hover:bg-[#2d20b5] disabled:bg-indigo-300 text-white py-4 rounded-2xl text-base sm:text-lg font-bold shadow-lg shadow-indigo-200 hover:shadow-xl transition-all duration-200 disabled:cursor-not-allowed"
                                            >
                                                {loading ? (
                                                    <>
                                                        <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                                        Processing Booking...
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaCalendarCheck />
                                                        Confirm Booking
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Summary */}
                            <aside>
                                <div className="bg-white rounded-3xl shadow-[0_12px_40px_rgba(53,37,205,0.09)] border border-indigo-50 overflow-hidden lg:sticky lg:top-24">

                                    {/* Summary Header */}
                                    <div className="bg-gradient-to-br from-[#3525cd] to-[#571ac0] text-white p-6">
                                        <p className="text-xs uppercase tracking-widest text-indigo-200 font-bold">
                                            Service Summary
                                        </p>

                                        <h2 className="text-2xl font-bold mt-1">
                                            Booking Details
                                        </h2>
                                    </div>

                                    <div className="p-6 sm:p-8">

                                        {/* Provider */}
                                        <div className="text-center">
                                            <div className="relative inline-block">
                                                <img
                                                    src={profileImage}
                                                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-indigo-50 shadow-md"
                                                    alt={provider.name || "Provider"}
                                                />

                                                <span className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-emerald-500 border-4 border-white flex items-center justify-center">
                                                    <FaCheckCircle className="text-white text-sm" />
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-bold text-[#1b1b24] mt-5">
                                                {provider.name}
                                            </h3>

                                            <p className="text-[#3525cd] font-semibold mt-1">
                                                {provider.service}
                                            </p>
                                        </div>

                                        {/* Details */}
                                        <div className="mt-8 space-y-4">

                                            <div className="flex items-center gap-4 p-3 rounded-2xl bg-[#f8f7ff]">
                                                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-[#3525cd] flex items-center justify-center">
                                                    <FaBriefcase />
                                                </div>

                                                <div>
                                                    <p className="text-xs text-slate-400 font-medium">
                                                        Experience
                                                    </p>
                                                    <p className="font-bold text-[#1b1b24]">
                                                        {provider.experience || 0} Years
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 p-3 rounded-2xl bg-[#f8f7ff]">
                                                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-[#3525cd] flex items-center justify-center">
                                                    <FaMapMarkerAlt />
                                                </div>

                                                <div>
                                                    <p className="text-xs text-slate-400 font-medium">
                                                        Service Location
                                                    </p>
                                                    <p className="font-bold text-[#1b1b24]">
                                                        {provider.city || "Available locally"}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 p-3 rounded-2xl bg-[#f8f7ff]">
                                                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                                    <FaRupeeSign />
                                                </div>

                                                <div>
                                                    <p className="text-xs text-slate-400 font-medium">
                                                        Service Price
                                                    </p>
                                                    <p className="font-bold text-[#1b1b24]">
                                                        ₹{provider.price || "Contact Provider"}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 p-3 rounded-2xl bg-[#f8f7ff]">
                                                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
                                                    <FaClock />
                                                </div>

                                                <div>
                                                    <p className="text-xs text-slate-400 font-medium">
                                                        Booking Type
                                                    </p>
                                                    <p className="font-bold text-[#1b1b24]">
                                                        Instant Request
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Trust */}
                                        <div className="border-t border-slate-100 mt-7 pt-6">
                                            <p className="text-sm font-bold text-[#1b1b24] mb-4">
                                                Why book with MultiServe?
                                            </p>

                                            <div className="space-y-3">

                                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                                    <FaCheckCircle className="text-emerald-500 shrink-0" />
                                                    Verified professionals
                                                </div>

                                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                                    <FaCheckCircle className="text-emerald-500 shrink-0" />
                                                    Secure booking process
                                                </div>

                                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                                    <FaCheckCircle className="text-emerald-500 shrink-0" />
                                                    No hidden charges
                                                </div>

                                            </div>
                                        </div>

                                        {/* Final Note */}
                                        <div className="mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                                            <div className="flex gap-3">
                                                <FaShieldAlt className="text-emerald-600 mt-0.5 shrink-0" />

                                                <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
                                                    Your booking request will be sent directly to
                                                    the selected professional.
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </aside>

                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
}

export default Booking;