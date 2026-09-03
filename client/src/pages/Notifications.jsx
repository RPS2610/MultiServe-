import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Bell,
    BellRing,
    Check,
    CheckCheck,
    Clock3,
    ShieldCheck,
    Trash2,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
    getNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
} from "../api/notificationApi";

function Notifications() {
    const navigate = useNavigate();

    const currentUser = JSON.parse(
        localStorage.getItem("user")
    );

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const [readingId, setReadingId] = useState(null);

    // =====================================================
    // LOAD NOTIFICATIONS
    // =====================================================

    useEffect(() => {
        if (!currentUser?._id) {
            navigate("/login");
            return;
        }

        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);

            await markAllAsRead(currentUser._id);

            const data = await getNotifications(
                currentUser._id
            );

            setNotifications(data);
        } catch (error) {
            console.log(
                "Notification Loading Error:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    // =====================================================
    // MARK AS READ
    // =====================================================

    const handleRead = async (id) => {
        try {
            setReadingId(id);

            await markAsRead(id);

            const data = await getNotifications(
                currentUser._id
            );

            setNotifications(data);
        } catch (error) {
            console.log(
                "Mark Read Error:",
                error
            );
        } finally {
            setReadingId(null);
        }
    };

    // =====================================================
    // DELETE NOTIFICATION
    // =====================================================

    const handleDelete = async (id) => {
        try {
            setDeletingId(id);

            await deleteNotification(id);

            const data = await getNotifications(
                currentUser._id
            );

            setNotifications(data);
        } catch (error) {
            console.log(
                "Delete Notification Error:",
                error
            );
        } finally {
            setDeletingId(null);
        }
    };

    // =====================================================
    // DATE FORMATTER
    // =====================================================

    const formatDate = (date) => {
        const notificationDate = new Date(date);

        return notificationDate.toLocaleString(
            undefined,
            {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
            }
        );
    };

    // =====================================================
    // STATS
    // =====================================================

    const totalNotifications =
        notifications.length;

    const unreadNotifications =
        notifications.filter(
            (item) => !item.isRead
        ).length;

    const readNotifications =
        notifications.filter(
            (item) => item.isRead
        ).length;

    // =====================================================
    // LOADING SCREEN
    // =====================================================

    if (loading) {
        return (
            <>
                <Navbar />

                <main className="min-h-[70vh] bg-[#fcf8ff] px-4 py-10 sm:px-6 lg:px-8">

                    <div className="mx-auto max-w-5xl">

                        {/* Hero Skeleton */}

                        <div className="animate-pulse">

                            <div className="h-5 w-32 rounded bg-[#e8e4f5]" />

                            <div className="mt-4 h-10 w-72 rounded-lg bg-[#e8e4f5]" />

                            <div className="mt-3 h-5 w-96 max-w-full rounded bg-[#eeeaf7]" />

                        </div>

                        {/* Cards Skeleton */}

                        <div className="mt-8 space-y-4">

                            {[1, 2, 3].map((item) => (
                                <div
                                    key={item}
                                    className="animate-pulse rounded-2xl border border-[#ebe8f3] bg-white p-6"
                                >
                                    <div className="flex gap-4">

                                        <div className="h-12 w-12 shrink-0 rounded-xl bg-[#eeeaf7]" />

                                        <div className="flex-1">

                                            <div className="h-5 w-48 rounded bg-[#e8e4f5]" />

                                            <div className="mt-3 h-4 w-full rounded bg-[#f0edf7]" />

                                            <div className="mt-2 h-4 w-2/3 rounded bg-[#f0edf7]" />

                                        </div>

                                    </div>
                                </div>
                            ))}

                        </div>

                    </div>

                </main>

                <Footer />
            </>
        );
    }

    // =====================================================
    // UI
    // =====================================================

    return (
        <>
            <Navbar />

            <main className="min-h-[70vh] bg-[#fcf8ff] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

                <div className="mx-auto max-w-5xl">

                    {/* =================================================
                        HEADER
                    ================================================= */}

                    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

                        <div>

                            <div className="inline-flex items-center gap-2 rounded-full bg-[#eeeaff] px-3 py-1.5 text-xs font-bold text-[#3525cd]">
                                <BellRing size={14} />
                                Notification Center
                            </div>

                            <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#1b1b24] sm:text-4xl">
                                Your Notifications
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6b6878] sm:text-base">
                                Stay updated with your bookings,
                                services and important account activity.
                            </p>

                        </div>

                        {/* Back Home */}

                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="self-start rounded-xl border border-[#ddd9eb] bg-white px-4 py-2.5 text-sm font-semibold text-[#464555] transition hover:border-[#3525cd] hover:text-[#3525cd] sm:self-auto"
                        >
                            ← Back to Home
                        </button>

                    </div>

                    {/* =================================================
                        STAT CARDS
                    ================================================= */}

                    <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-5">

                        {/* Total */}

                        <div className="rounded-2xl border border-[#e9e5f2] bg-white p-4 shadow-[0_8px_25px_rgba(53,37,205,0.05)] sm:p-5">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eeeaff] text-[#3525cd]">
                                    <Bell size={19} />
                                </div>

                                <div>
                                    <p className="text-xs font-medium text-[#777486] sm:text-sm">
                                        Total
                                    </p>

                                    <p className="mt-0.5 text-xl font-bold text-[#1b1b24] sm:text-2xl">
                                        {totalNotifications}
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* Unread */}

                        <div className="rounded-2xl border border-[#e9e5f2] bg-white p-4 shadow-[0_8px_25px_rgba(53,37,205,0.05)] sm:p-5">

                            <div className="flex items-center gap-3">

                                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eefbf6] text-[#10B981]">
                                    <BellRing size={19} />

                                    {unreadNotifications > 0 && (
                                        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-[#10B981] ring-2 ring-white" />
                                    )}
                                </div>

                                <div>
                                    <p className="text-xs font-medium text-[#777486] sm:text-sm">
                                        Unread
                                    </p>

                                    <p className="mt-0.5 text-xl font-bold text-[#1b1b24] sm:text-2xl">
                                        {unreadNotifications}
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* Read */}

                        <div className="rounded-2xl border border-[#e9e5f2] bg-white p-4 shadow-[0_8px_25px_rgba(53,37,205,0.05)] sm:p-5">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f3f1f8] text-[#777486]">
                                    <CheckCheck size={19} />
                                </div>

                                <div>
                                    <p className="text-xs font-medium text-[#777486] sm:text-sm">
                                        Read
                                    </p>

                                    <p className="mt-0.5 text-xl font-bold text-[#1b1b24] sm:text-2xl">
                                        {readNotifications}
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* =================================================
                        NOTIFICATIONS
                    ================================================= */}

                    <div className="mt-8">

                        {notifications.length === 0 ? (

                            /* =========================================
                               EMPTY STATE
                            ========================================= */

                            <div className="rounded-[24px] border border-[#e8e4f1] bg-white px-6 py-16 text-center shadow-[0_10px_35px_rgba(53,37,205,0.05)]">

                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eeeaff] text-[#3525cd]">
                                    <Bell size={30} />
                                </div>

                                <h2 className="mt-5 text-xl font-bold text-[#1b1b24]">
                                    No notifications yet
                                </h2>

                                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#777486]">
                                    You're all caught up. New updates
                                    about your bookings and services
                                    will appear here.
                                </p>

                                <button
                                    type="button"
                                    onClick={() => navigate("/")}
                                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#3525cd] px-5 py-3 text-sm font-bold text-white shadow-[0_8px_20px_rgba(53,37,205,0.2)] transition hover:-translate-y-0.5 hover:bg-[#2d20b0]"
                                >
                                    Explore Services
                                    <span>→</span>
                                </button>

                            </div>

                        ) : (

                            <div className="space-y-4">

                                {notifications.map((item) => (

                                    <div
                                        key={item._id}
                                        className={`group relative overflow-hidden rounded-2xl border bg-white p-5 transition-all sm:p-6 ${
                                            item.isRead
                                                ? "border-[#e9e6f1] shadow-[0_5px_20px_rgba(27,27,36,0.03)]"
                                                : "border-[#cfc9ff] shadow-[0_10px_30px_rgba(53,37,205,0.09)]"
                                        }`}
                                    >

                                        {/* Unread indicator */}

                                        {!item.isRead && (
                                            <div className="absolute left-0 top-0 h-full w-1 bg-[#3525cd]" />
                                        )}

                                        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                                            {/* Content */}

                                            <div className="flex min-w-0 gap-4">

                                                {/* Icon */}

                                                <div
                                                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                                                        item.isRead
                                                            ? "bg-[#f2f0f7] text-[#777486]"
                                                            : "bg-[#eeeaff] text-[#3525cd]"
                                                    }`}
                                                >
                                                    {item.isRead ? (
                                                        <Bell size={20} />
                                                    ) : (
                                                        <BellRing size={20} />
                                                    )}
                                                </div>

                                                {/* Text */}

                                                <div className="min-w-0">

                                                    <div className="flex flex-wrap items-center gap-2">

                                                        <h2 className="text-base font-bold text-[#1b1b24] sm:text-lg">
                                                            {item.title}
                                                        </h2>

                                                        {!item.isRead && (
                                                            <span className="rounded-full bg-[#eeeaff] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#3525cd]">
                                                                New
                                                            </span>
                                                        )}

                                                    </div>

                                                    <p className="mt-2 text-sm leading-6 text-[#5f5c6d]">
                                                        {item.message}
                                                    </p>

                                                    <div className="mt-3 flex items-center gap-2 text-xs text-[#8a8797]">

                                                        <Clock3 size={14} />

                                                        <span>
                                                            {formatDate(
                                                                item.createdAt
                                                            )}
                                                        </span>

                                                    </div>

                                                </div>

                                            </div>

                                            {/* Actions */}

                                            <div className="flex shrink-0 items-center gap-2 pl-15 sm:pl-0">

                                                {!item.isRead && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleRead(
                                                                item._id
                                                            )
                                                        }
                                                        disabled={
                                                            readingId ===
                                                            item._id
                                                        }
                                                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#d9d5e8] bg-white px-3 py-2 text-xs font-bold text-[#464555] transition hover:border-[#10B981] hover:text-[#059669] disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
                                                    >
                                                        {readingId ===
                                                        item._id ? (
                                                            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#aaa6b6] border-t-[#3525cd]" />
                                                        ) : (
                                                            <Check size={15} />
                                                        )}

                                                        <span>
                                                            {readingId ===
                                                            item._id
                                                                ? "Saving"
                                                                : "Mark read"}
                                                        </span>
                                                    </button>
                                                )}

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDelete(
                                                            item._id
                                                        )
                                                    }
                                                    disabled={
                                                        deletingId ===
                                                        item._id
                                                    }
                                                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#f0d8d8] bg-[#fffafa] px-3 py-2 text-xs font-bold text-[#c24141] transition hover:border-[#dc2626] hover:bg-[#fff3f3] disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
                                                >
                                                    {deletingId ===
                                                    item._id ? (
                                                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#d9a7a7] border-t-[#dc2626]" />
                                                    ) : (
                                                        <Trash2 size={15} />
                                                    )}

                                                    <span>
                                                        {deletingId ===
                                                        item._id
                                                            ? "Deleting"
                                                            : "Delete"}
                                                    </span>
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>

                    {/* =================================================
                        SECURITY INFO
                    ================================================= */}

                    <div className="mt-8 flex items-start gap-3 rounded-2xl border border-[#e7e3f0] bg-white p-5">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f1efff] text-[#3525cd]">
                            <ShieldCheck size={18} />
                        </div>

                        <div>

                            <h3 className="text-sm font-bold text-[#1b1b24]">
                                Your notifications are private
                            </h3>

                            <p className="mt-1 text-xs leading-5 text-[#777486] sm:text-sm">
                                Notifications are linked to your account
                                and are only visible to you.
                            </p>

                        </div>

                    </div>

                </div>

            </main>

            <Footer />
        </>
    );
}

export default Notifications;