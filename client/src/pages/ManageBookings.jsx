import { useEffect, useMemo, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
    getAllBookings,
    deleteBooking
} from "../api/adminBookingApi";

import {
    Search,
    CalendarDays,
    Users,
    CheckCircle2,
    Clock3,
    XCircle,
    Trash2,
    Phone,
    MapPin,
    UserRound,
    BriefcaseBusiness,
    RefreshCw,
    ClipboardList
} from "lucide-react";

function ManageBookings() {

    const [bookings, setBookings] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            setLoading(true);

            const data = await getAllBookings();

            setBookings(Array.isArray(data) ? data : []);
        }

        catch (error) {
            console.log(error);
        }

        finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this booking?"
        );

        if (!confirmDelete) return;

        try {

            setDeletingId(id);

            await deleteBooking(id);

            alert("Booking Deleted Successfully");

            await fetchBookings();

        }

        catch (error) {

            alert(
                error.response?.data?.message ||
                "Delete Failed"
            );

        }

        finally {
            setDeletingId(null);
        }
    };

    const filteredBookings = useMemo(() => {

        const query = search.toLowerCase().trim();

        if (!query) return bookings;

        return bookings.filter((booking) => {

            const service =
                booking.service?.toLowerCase() || "";

            const customer =
                booking.customerName?.toLowerCase() || "";

            const provider =
                booking.providerId?.name?.toLowerCase() || "";

            const phone =
                booking.customerPhone?.toLowerCase() || "";

            const address =
                booking.customerAddress?.toLowerCase() || "";

            const status =
                booking.status?.toLowerCase() || "";

            return (
                service.includes(query) ||
                customer.includes(query) ||
                provider.includes(query) ||
                phone.includes(query) ||
                address.includes(query) ||
                status.includes(query)
            );
        });

    }, [bookings, search]);

    const stats = useMemo(() => {

        return {
            total: bookings.length,

            pending: bookings.filter(
                (booking) => booking.status === "Pending"
            ).length,

            accepted: bookings.filter(
                (booking) => booking.status === "Accepted"
            ).length,

            completed: bookings.filter(
                (booking) => booking.status === "Completed"
            ).length,

            cancelled: bookings.filter(
                (booking) =>
                    booking.status === "Cancelled" ||
                    booking.status === "Rejected"
            ).length
        };

    }, [bookings]);

    const getStatusStyle = (status) => {

        switch (status) {

            case "Pending":
                return {
                    className:
                        "bg-amber-50 text-amber-700 border-amber-200",
                    icon: Clock3
                };

            case "Accepted":
                return {
                    className:
                        "bg-emerald-50 text-emerald-700 border-emerald-200",
                    icon: CheckCircle2
                };

            case "Completed":
                return {
                    className:
                        "bg-indigo-50 text-indigo-700 border-indigo-200",
                    icon: CheckCircle2
                };

            case "Rejected":
            case "Cancelled":
                return {
                    className:
                        "bg-red-50 text-red-700 border-red-200",
                    icon: XCircle
                };

            default:
                return {
                    className:
                        "bg-gray-50 text-gray-600 border-gray-200",
                    icon: ClipboardList
                };
        }
    };

    return (
        <div className="min-h-screen bg-[#fcf8ff]">

            <Navbar />

            {/* HERO */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#3525cd] via-[#4338ca] to-[#571ac0]">

                <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-purple-300/10 blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 sm:py-16">

                    <div className="max-w-3xl">

                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm font-medium text-white mb-5">

                            <ClipboardList size={16} />

                            Admin Management

                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">

                            Manage Bookings

                        </h1>

                        <p className="mt-4 max-w-2xl text-sm sm:text-base leading-7 text-indigo-100">

                            Monitor, search and manage all service bookings
                            across the MultiServe platform from one place.

                        </p>

                    </div>

                </div>

            </section>

            {/* MAIN CONTENT */}
            <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8 sm:py-10">

                {/* STATS */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">

                    <StatCard
                        icon={ClipboardList}
                        label="Total"
                        value={stats.total}
                        iconClass="bg-indigo-50 text-indigo-600"
                    />

                    <StatCard
                        icon={Clock3}
                        label="Pending"
                        value={stats.pending}
                        iconClass="bg-amber-50 text-amber-600"
                    />

                    <StatCard
                        icon={CheckCircle2}
                        label="Accepted"
                        value={stats.accepted}
                        iconClass="bg-emerald-50 text-emerald-600"
                    />

                    <StatCard
                        icon={CheckCircle2}
                        label="Completed"
                        value={stats.completed}
                        iconClass="bg-blue-50 text-blue-600"
                    />

                    <StatCard
                        icon={XCircle}
                        label="Cancelled"
                        value={stats.cancelled}
                        iconClass="bg-red-50 text-red-600"
                    />

                </div>

                {/* SEARCH */}
                <div className="bg-white border border-[#e9e5f2] rounded-2xl shadow-sm p-4 sm:p-5 mb-8">

                    <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">

                        <div className="relative flex-1">

                            <Search
                                size={19}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777486]"
                            />

                            <input
                                type="text"
                                placeholder="Search by service, customer, provider, phone or status..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="w-full h-12 pl-11 pr-4 rounded-xl border border-[#dedbe8] bg-[#fcfaff] text-sm text-[#1b1b24] outline-none transition focus:border-[#4f46e5] focus:ring-4 focus:ring-indigo-100"
                            />

                        </div>

                        <button
                            onClick={fetchBookings}
                            disabled={loading}
                            className="h-12 px-5 rounded-xl bg-[#f5f2ff] text-[#3525cd] font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#ebe7ff] transition disabled:opacity-60"
                        >

                            <RefreshCw
                                size={17}
                                className={loading ? "animate-spin" : ""}
                            />

                            Refresh

                        </button>

                    </div>

                    <div className="mt-4 flex items-center justify-between text-sm">

                        <p className="text-[#777486]">

                            Showing{" "}
                            <span className="font-semibold text-[#1b1b24]">
                                {filteredBookings.length}
                            </span>{" "}
                            booking{filteredBookings.length !== 1 ? "s" : ""}

                        </p>

                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className="text-[#4f46e5] font-semibold hover:underline"
                            >
                                Clear search
                            </button>
                        )}

                    </div>

                </div>

                {/* DESKTOP TABLE */}
                <div className="hidden lg:block bg-white border border-[#e9e5f2] rounded-2xl shadow-sm overflow-hidden">

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-[#f7f5ff] border-b border-[#ebe8f3]">

                                <tr>

                                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#777486]">
                                        Service
                                    </th>

                                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#777486]">
                                        Customer
                                    </th>

                                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#777486]">
                                        Provider
                                    </th>

                                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#777486]">
                                        Contact
                                    </th>

                                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#777486]">
                                        Status
                                    </th>

                                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#777486]">
                                        Date
                                    </th>

                                    <th className="text-right px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#777486]">
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-[#eeeaf4]">

                                {loading ? (

                                    Array.from({ length: 6 }).map((_, index) => (

                                        <tr key={index}>

                                            {Array.from({ length: 7 }).map((_, i) => (

                                                <td key={i} className="px-6 py-5">

                                                    <div className="h-4 bg-gray-100 rounded animate-pulse w-24" />

                                                </td>

                                            ))}

                                        </tr>

                                    ))

                                ) : filteredBookings.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="px-6 py-16 text-center"
                                        >

                                            <EmptyState
                                                search={search}
                                                onClear={() => setSearch("")}
                                            />

                                        </td>

                                    </tr>

                                ) : (

                                    filteredBookings.map((booking) => {

                                        const status =
                                            getStatusStyle(booking.status);

                                        const StatusIcon = status.icon;

                                        return (

                                            <tr
                                                key={booking._id}
                                                className="hover:bg-[#faf9ff] transition"
                                            >

                                                {/* SERVICE */}
                                                <td className="px-6 py-5">

                                                    <div className="flex items-center gap-3">

                                                        <div className="h-10 w-10 rounded-xl bg-[#f0edff] flex items-center justify-center text-[#4f46e5]">

                                                            <BriefcaseBusiness size={18} />

                                                        </div>

                                                        <div>

                                                            <p className="font-semibold text-[#1b1b24]">
                                                                {booking.service || "Service"}
                                                            </p>

                                                            <p className="text-xs text-[#777486] mt-1">
                                                                Booking #{booking._id?.slice(-6)}
                                                            </p>

                                                        </div>

                                                    </div>

                                                </td>

                                                {/* CUSTOMER */}
                                                <td className="px-6 py-5">

                                                    <div className="flex items-center gap-2">

                                                        <UserRound
                                                            size={16}
                                                            className="text-[#777486]"
                                                        />

                                                        <span className="text-sm font-medium text-[#1b1b24]">
                                                            {booking.customerName || "N/A"}
                                                        </span>

                                                    </div>

                                                </td>

                                                {/* PROVIDER */}
                                                <td className="px-6 py-5">

                                                    <div className="flex items-center gap-2">

                                                        <Users
                                                            size={16}
                                                            className="text-[#777486]"
                                                        />

                                                        <span className="text-sm text-[#464555]">
                                                            {booking.providerId?.name || "Not assigned"}
                                                        </span>

                                                    </div>

                                                </td>

                                                {/* CONTACT */}
                                                <td className="px-6 py-5">

                                                    <div className="space-y-1">

                                                        <div className="flex items-center gap-2 text-xs text-[#464555]">

                                                            <Phone size={13} />

                                                            {booking.customerPhone || "N/A"}

                                                        </div>

                                                        <div className="flex items-start gap-2 text-xs text-[#777486] max-w-[180px]">

                                                            <MapPin
                                                                size={13}
                                                                className="mt-0.5 shrink-0"
                                                            />

                                                            <span className="truncate">
                                                                {booking.customerAddress || "N/A"}
                                                            </span>

                                                        </div>

                                                    </div>

                                                </td>

                                                {/* STATUS */}
                                                <td className="px-6 py-5">

                                                    <span
                                                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold ${status.className}`}
                                                    >

                                                        <StatusIcon size={13} />

                                                        {booking.status || "Unknown"}

                                                    </span>

                                                </td>

                                                {/* DATE */}
                                                <td className="px-6 py-5">

                                                    <div className="flex items-center gap-2 text-sm text-[#464555]">

                                                        <CalendarDays
                                                            size={15}
                                                            className="text-[#777486]"
                                                        />

                                                        {booking.createdAt
                                                            ? new Date(
                                                                booking.createdAt
                                                            ).toLocaleDateString()
                                                            : "N/A"}

                                                    </div>

                                                </td>

                                                {/* ACTION */}
                                                <td className="px-6 py-5 text-right">

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                booking._id
                                                            )
                                                        }
                                                        disabled={
                                                            deletingId ===
                                                            booking._id
                                                        }
                                                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-red-50 text-red-600 border border-red-100 text-sm font-semibold hover:bg-red-100 transition disabled:opacity-50"
                                                    >

                                                        <Trash2 size={15} />

                                                        {deletingId === booking._id
                                                            ? "Deleting..."
                                                            : "Delete"}

                                                    </button>

                                                </td>

                                            </tr>

                                        );
                                    })

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

                {/* MOBILE / TABLET CARDS */}
                <div className="lg:hidden space-y-4">

                    {loading ? (

                        Array.from({ length: 5 }).map((_, index) => (

                            <div
                                key={index}
                                className="bg-white border border-[#e9e5f2] rounded-2xl p-5 shadow-sm animate-pulse"
                            >

                                <div className="h-5 bg-gray-100 rounded w-1/2 mb-4" />

                                <div className="space-y-3">

                                    <div className="h-4 bg-gray-100 rounded w-3/4" />
                                    <div className="h-4 bg-gray-100 rounded w-2/3" />
                                    <div className="h-4 bg-gray-100 rounded w-full" />

                                </div>

                            </div>

                        ))

                    ) : filteredBookings.length === 0 ? (

                        <div className="bg-white border border-[#e9e5f2] rounded-2xl p-8 shadow-sm">

                            <EmptyState
                                search={search}
                                onClear={() => setSearch("")}
                            />

                        </div>

                    ) : (

                        filteredBookings.map((booking) => {

                            const status =
                                getStatusStyle(booking.status);

                            const StatusIcon = status.icon;

                            return (

                                <div
                                    key={booking._id}
                                    className="bg-white border border-[#e9e5f2] rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                                >

                                    {/* TOP */}
                                    <div className="flex items-start justify-between gap-4">

                                        <div className="flex items-center gap-3 min-w-0">

                                            <div className="h-11 w-11 shrink-0 rounded-xl bg-[#f0edff] flex items-center justify-center text-[#4f46e5]">

                                                <BriefcaseBusiness size={19} />

                                            </div>

                                            <div className="min-w-0">

                                                <h3 className="font-bold text-[#1b1b24] truncate">
                                                    {booking.service || "Service"}
                                                </h3>

                                                <p className="text-xs text-[#777486] mt-1">
                                                    #{booking._id?.slice(-6)}
                                                </p>

                                            </div>

                                        </div>

                                        <span
                                            className={`shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full border text-[11px] font-bold ${status.className}`}
                                        >

                                            <StatusIcon size={12} />

                                            {booking.status || "Unknown"}

                                        </span>

                                    </div>

                                    {/* DETAILS */}
                                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">

                                        <InfoItem
                                            icon={UserRound}
                                            label="Customer"
                                            value={
                                                booking.customerName ||
                                                "N/A"
                                            }
                                        />

                                        <InfoItem
                                            icon={Users}
                                            label="Provider"
                                            value={
                                                booking.providerId?.name ||
                                                "Not assigned"
                                            }
                                        />

                                        <InfoItem
                                            icon={Phone}
                                            label="Phone"
                                            value={
                                                booking.customerPhone ||
                                                "N/A"
                                            }
                                        />

                                        <InfoItem
                                            icon={CalendarDays}
                                            label="Booked"
                                            value={
                                                booking.createdAt
                                                    ? new Date(
                                                        booking.createdAt
                                                    ).toLocaleDateString()
                                                    : "N/A"
                                            }
                                        />

                                    </div>

                                    {/* ADDRESS */}
                                    <div className="mt-3 p-3 rounded-xl bg-[#faf9ff] border border-[#eeeaf5]">

                                        <div className="flex items-start gap-2">

                                            <MapPin
                                                size={16}
                                                className="text-[#4f46e5] mt-0.5 shrink-0"
                                            />

                                            <div>

                                                <p className="text-[11px] font-bold uppercase tracking-wide text-[#777486]">
                                                    Address
                                                </p>

                                                <p className="text-sm text-[#464555] mt-1 leading-5">
                                                    {booking.customerAddress ||
                                                        "No address provided"}
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                    {/* ACTION */}
                                    <div className="mt-4 pt-4 border-t border-[#eeeaf4] flex items-center justify-between gap-3">

                                        <p className="text-xs text-[#777486]">

                                            Booking ID:{" "}

                                            <span className="font-semibold text-[#464555]">
                                                {booking._id?.slice(-8)}
                                            </span>

                                        </p>

                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    booking._id
                                                )
                                            }
                                            disabled={
                                                deletingId ===
                                                booking._id
                                            }
                                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 text-red-600 border border-red-100 text-sm font-semibold hover:bg-red-100 transition disabled:opacity-50"
                                        >

                                            <Trash2 size={15} />

                                            {deletingId === booking._id
                                                ? "Deleting..."
                                                : "Delete"}

                                        </button>

                                    </div>

                                </div>

                            );
                        })

                    )}

                </div>

            </main>

            <Footer />

        </div>
    );
}


/* =========================
   STAT CARD
========================= */

function StatCard({
    icon: Icon,
    label,
    value,
    iconClass
}) {

    return (

        <div className="bg-white border border-[#e9e5f2] rounded-2xl p-4 sm:p-5 shadow-sm">

            <div className="flex items-center justify-between gap-3">

                <div>

                    <p className="text-xs sm:text-sm font-medium text-[#777486]">
                        {label}
                    </p>

                    <p className="text-2xl sm:text-3xl font-bold text-[#1b1b24] mt-1">
                        {value}
                    </p>

                </div>

                <div
                    className={`h-10 w-10 sm:h-11 sm:w-11 rounded-xl flex items-center justify-center ${iconClass}`}
                >

                    <Icon size={19} />

                </div>

            </div>

        </div>
    );
}


/* =========================
   INFO ITEM
========================= */

function InfoItem({
    icon: Icon,
    label,
    value
}) {

    return (

        <div className="rounded-xl border border-[#eeeaf4] bg-[#fcfaff] p-3">

            <div className="flex items-center gap-2">

                <Icon
                    size={15}
                    className="text-[#4f46e5]"
                />

                <p className="text-[11px] uppercase tracking-wide font-bold text-[#777486]">
                    {label}
                </p>

            </div>

            <p className="mt-1.5 text-sm font-semibold text-[#1b1b24] break-words">
                {value}
            </p>

        </div>
    );
}


/* =========================
   EMPTY STATE
========================= */

function EmptyState({
    search,
    onClear
}) {

    return (

        <div className="flex flex-col items-center justify-center">

            <div className="h-14 w-14 rounded-2xl bg-[#f0edff] text-[#4f46e5] flex items-center justify-center">

                <ClipboardList size={25} />

            </div>

            <h3 className="mt-4 text-lg font-bold text-[#1b1b24]">
                No bookings found
            </h3>

            <p className="mt-2 max-w-md text-sm text-[#777486]">

                {search
                    ? "No bookings match your current search. Try another keyword."
                    : "There are no bookings available at the moment."}

            </p>

            {search && (

                <button
                    onClick={onClear}
                    className="mt-4 px-4 py-2 rounded-xl bg-[#4f46e5] text-white text-sm font-semibold hover:bg-[#3525cd] transition"
                >
                    Clear Search
                </button>

            )}

        </div>
    );
}

export default ManageBookings;