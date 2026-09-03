import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
    ArrowLeft,
    ArrowRight,
    BadgeCheck,
    BriefcaseBusiness,
    CalendarCheck,
    CheckCircle2,
    Clock3,
    MapPin,
    MessageSquare,
    ShieldCheck,
    Star,
    Wallet,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { getProviderById } from "../api/providerApi";
import { getProviderReviews } from "../api/reviewApi";

function ProviderDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [provider, setProvider] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProvider();
        fetchReviews();
    }, [id]);

    const fetchProvider = async () => {
        try {
            setLoading(true);

            const data = await getProviderById(id);
            setProvider(data);
        } catch (error) {
            console.log("Provider loading error:", error);
            setProvider(null);
        } finally {
            setLoading(false);
        }
    };

    const fetchReviews = async () => {
        try {
            const data = await getProviderReviews(id);
            setReviews(Array.isArray(data) ? data : []);
        } catch (error) {
            console.log("Review loading error:", error);
            setReviews([]);
        }
    };

    const averageRating =
        reviews.length > 0
            ? (
                  reviews.reduce(
                      (sum, item) => sum + Number(item.rating || 0),
                      0
                  ) / reviews.length
              ).toFixed(1)
            : "0.0";

    /*
    |--------------------------------------------------------------------------
    | PROFILE IMAGE
    |--------------------------------------------------------------------------
    */

    const profileImage =
        provider?.profileImage ||
        provider?.image ||
        provider?.photo ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
            provider?.name || "Professional"
        )}&background=EEF2FF&color=4338CA&size=400`;

    /*
    |--------------------------------------------------------------------------
    | LOADING
    |--------------------------------------------------------------------------
    */

    if (loading) {
        return (
            <div className="min-h-screen bg-[#fcf8ff]">
                <Navbar />

                <main className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
                    <div className="animate-pulse">

                        <div className="h-5 w-28 rounded bg-slate-200" />

                        <div className="mt-8 overflow-hidden rounded-[30px] bg-white">
                            <div className="h-80 bg-slate-200" />

                            <div className="space-y-4 p-8">
                                <div className="h-8 w-64 rounded bg-slate-200" />
                                <div className="h-5 w-40 rounded bg-slate-200" />
                                <div className="h-20 w-full rounded bg-slate-200" />
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | PROVIDER NOT FOUND
    |--------------------------------------------------------------------------
    */

    if (!provider) {
        return (
            <div className="min-h-screen bg-[#fcf8ff]">
                <Navbar />

                <main className="flex min-h-[65vh] items-center justify-center px-5">
                    <div className="w-full max-w-lg rounded-[28px] border border-slate-200 bg-white p-10 text-center shadow-sm">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                            <ShieldCheck size={30} />
                        </div>

                        <h1 className="mt-6 text-2xl font-bold text-slate-900">
                            Professional Not Found
                        </h1>

                        <p className="mt-3 text-sm leading-6 text-slate-500">
                            We couldn't find this service professional.
                            Please return to the providers page and try again.
                        </p>

                        <button
                            type="button"
                            onClick={() => navigate("/providers")}
                            className="
                                mt-7
                                inline-flex
                                items-center
                                gap-2
                                rounded-xl
                                bg-slate-950
                                px-5
                                py-3
                                text-sm
                                font-semibold
                                text-white
                                transition
                                hover:bg-indigo-600
                            "
                        >
                            <ArrowLeft size={16} />
                            Browse Providers
                        </button>

                    </div>
                </main>

                <Footer />
            </div>
        );
    }

    const providerName = provider?.name || "Professional";
    const serviceName = provider?.service || "Home Service";
    const city = provider?.city || "Available nearby";
    const experience = provider?.experience ?? "—";
    const price = provider?.price ?? "—";

    return (
        <div className="min-h-screen bg-[#fcf8ff] text-slate-900">

            <Navbar />

            {/* =========================================================
                PAGE
            ========================================================= */}

            <main>

                {/* =====================================================
                    HERO PROFILE
                ===================================================== */}

                <section className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-900 to-violet-900 text-white">

                    {/* Background glow */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -right-32
                            -top-32
                            h-96
                            w-96
                            rounded-full
                            bg-indigo-500/20
                            blur-3xl
                        "
                    />

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -bottom-40
                            left-1/3
                            h-96
                            w-96
                            rounded-full
                            bg-violet-500/20
                            blur-3xl
                        "
                    />

                    <div className="relative mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">

                        {/* Back */}

                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="
                                mb-8
                                inline-flex
                                items-center
                                gap-2
                                rounded-xl
                                border
                                border-white/10
                                bg-white/10
                                px-4
                                py-2.5
                                text-sm
                                font-medium
                                text-indigo-100
                                backdrop-blur-sm
                                transition
                                hover:bg-white/15
                                hover:text-white
                            "
                        >
                            <ArrowLeft size={16} />
                            Back to Providers
                        </button>


                        {/* Profile */}

                        <div
                            className="
                                flex
                                flex-col
                                gap-8
                                pb-10
                                md:flex-row
                                md:items-center
                                lg:gap-12
                            "
                        >

                            {/* =================================================
                                IMAGE
                            ================================================= */}

                            <div className="relative shrink-0 self-center md:self-auto">

                                <div
                                    className="
                                        rounded-full
                                        bg-white/10
                                        p-2
                                        shadow-2xl
                                        backdrop-blur-sm
                                    "
                                >
                                    <img
                                        src={profileImage}
                                        alt={providerName}
                                        className="
                                            h-36
                                            w-36
                                            rounded-full
                                            border-4
                                            border-white/90
                                            bg-white
                                            object-cover
                                            shadow-2xl
                                            sm:h-44
                                            sm:w-44
                                            lg:h-52
                                            lg:w-52
                                        "
                                    />
                                </div>

                                <div
                                    className="
                                        absolute
                                        bottom-2
                                        right-2
                                        flex
                                        h-11
                                        w-11
                                        items-center
                                        justify-center
                                        rounded-full
                                        border-4
                                        border-indigo-900
                                        bg-white
                                        shadow-lg
                                    "
                                >
                                    <BadgeCheck
                                        size={22}
                                        className="text-indigo-600"
                                    />
                                </div>

                            </div>


                            {/* =================================================
                                INFORMATION
                            ================================================= */}

                            <div className="min-w-0 flex-1 text-center md:text-left">

                                <div
                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-full
                                        border
                                        border-white/10
                                        bg-white/10
                                        px-3
                                        py-1.5
                                        text-xs
                                        font-semibold
                                        text-indigo-100
                                        backdrop-blur-sm
                                    "
                                >
                                    <CheckCircle2
                                        size={14}
                                        className="text-emerald-300"
                                    />

                                    Verified Professional
                                </div>

                                <h1
                                    className="
                                        mt-4
                                        text-4xl
                                        font-bold
                                        tracking-[-0.04em]
                                        sm:text-5xl
                                        lg:text-6xl
                                    "
                                >
                                    {providerName}
                                </h1>

                                <p
                                    className="
                                        mt-3
                                        text-lg
                                        font-medium
                                        text-indigo-200
                                        sm:text-xl
                                    "
                                >
                                    {serviceName}
                                </p>


                                {/* Rating */}

                                <div
                                    className="
                                        mt-6
                                        flex
                                        flex-wrap
                                        items-center
                                        justify-center
                                        gap-3
                                        md:justify-start
                                    "
                                >

                                    <div
                                        className="
                                            inline-flex
                                            items-center
                                            gap-2
                                            rounded-full
                                            bg-white
                                            px-4
                                            py-2
                                            text-slate-900
                                        "
                                    >
                                        <Star
                                            size={17}
                                            fill="currentColor"
                                            className="text-amber-500"
                                        />

                                        <span className="font-bold">
                                            {averageRating}
                                        </span>

                                        <span className="text-sm text-slate-500">
                                            Rating
                                        </span>
                                    </div>


                                    <div
                                        className="
                                            inline-flex
                                            items-center
                                            gap-2
                                            rounded-full
                                            border
                                            border-white/10
                                            bg-white/10
                                            px-4
                                            py-2
                                            text-sm
                                            text-indigo-50
                                        "
                                    >
                                        <MessageSquare size={16} />

                                        {reviews.length}{" "}
                                        {reviews.length === 1
                                            ? "Review"
                                            : "Reviews"}
                                    </div>


                                    <div
                                        className="
                                            inline-flex
                                            items-center
                                            gap-2
                                            rounded-full
                                            border
                                            border-white/10
                                            bg-white/10
                                            px-4
                                            py-2
                                            text-sm
                                            text-indigo-50
                                        "
                                    >
                                        <MapPin size={16} />

                                        {city}
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                </section>


                {/* =========================================================
                    CONTENT
                ========================================================= */}

                <div
                    className="
                        mx-auto
                        max-w-7xl
                        px-5
                        py-10
                        sm:px-6
                        sm:py-12
                        lg:px-8
                        lg:py-14
                    "
                >

                    <div className="grid gap-8 lg:grid-cols-3">

                        {/* =================================================
                            LEFT CONTENT
                        ================================================= */}

                        <div className="space-y-8 lg:col-span-2">

                            {/* =================================================
                                ABOUT
                            ================================================= */}

                            <section
                                className="
                                    rounded-[28px]
                                    border
                                    border-slate-200/80
                                    bg-white
                                    p-6
                                    shadow-[0_8px_30px_rgba(15,23,42,0.05)]
                                    sm:p-8
                                "
                            >

                                <div className="flex items-center gap-3">

                                    <div
                                        className="
                                            flex
                                            h-11
                                            w-11
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-indigo-50
                                            text-indigo-600
                                        "
                                    >
                                        <BriefcaseBusiness size={21} />
                                    </div>

                                    <div>

                                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-indigo-600">
                                            Professional Profile
                                        </p>

                                        <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                                            About {providerName}
                                        </h2>

                                    </div>

                                </div>


                                <p
                                    className="
                                        mt-7
                                        text-[15px]
                                        leading-7
                                        text-slate-600
                                    "
                                >
                                    {provider.about ||
                                        "Experienced professional providing high-quality doorstep services with a strong focus on reliability, customer satisfaction, and professional service."}
                                </p>


                                {/* Quick details */}

                                <div
                                    className="
                                        mt-8
                                        grid
                                        gap-3
                                        sm:grid-cols-2
                                    "
                                >

                                    <div
                                        className="
                                            rounded-2xl
                                            border
                                            border-slate-100
                                            bg-slate-50/70
                                            p-5
                                        "
                                    >

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                                                <BriefcaseBusiness size={18} />
                                            </div>

                                            <div>

                                                <p className="text-xs text-slate-400">
                                                    Experience
                                                </p>

                                                <p className="mt-1 font-bold text-slate-800">
                                                    {experience} Years
                                                </p>

                                            </div>

                                        </div>

                                    </div>


                                    <div
                                        className="
                                            rounded-2xl
                                            border
                                            border-slate-100
                                            bg-slate-50/70
                                            p-5
                                        "
                                    >

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                                                <MapPin size={18} />
                                            </div>

                                            <div className="min-w-0">

                                                <p className="text-xs text-slate-400">
                                                    Service Location
                                                </p>

                                                <p className="mt-1 truncate font-bold text-slate-800">
                                                    {city}
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </section>


                            {/* =================================================
                                WHY CHOOSE
                            ================================================= */}

                            <section
                                className="
                                    rounded-[28px]
                                    border
                                    border-slate-200/80
                                    bg-white
                                    p-6
                                    shadow-[0_8px_30px_rgba(15,23,42,0.05)]
                                    sm:p-8
                                "
                            >

                                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-indigo-600">
                                    Why Choose This Professional
                                </p>

                                <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                                    Reliable service from start to finish
                                </h2>

                                <div
                                    className="
                                        mt-7
                                        grid
                                        gap-4
                                        sm:grid-cols-2
                                    "
                                >

                                    {[
                                        {
                                            icon: ShieldCheck,
                                            title: "Verified Professional",
                                            text: "Identity and professional details are verified.",
                                        },
                                        {
                                            icon: Star,
                                            title: "Highly Rated",
                                            text: "Customers can share ratings and service experiences.",
                                        },
                                        {
                                            icon: Clock3,
                                            title: "Quick Response",
                                            text: "Professionals are available for timely service.",
                                        },
                                        {
                                            icon: Wallet,
                                            title: "Transparent Pricing",
                                            text: "Clear starting pricing before booking.",
                                        },
                                    ].map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <div
                                                key={item.title}
                                                className="
                                                    rounded-2xl
                                                    border
                                                    border-slate-100
                                                    bg-slate-50/60
                                                    p-5
                                                "
                                            >

                                                <div className="flex items-start gap-3">

                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
                                                        <Icon size={18} />
                                                    </div>

                                                    <div>

                                                        <h3 className="font-bold text-slate-800">
                                                            {item.title}
                                                        </h3>

                                                        <p className="mt-1 text-sm leading-6 text-slate-500">
                                                            {item.text}
                                                        </p>

                                                    </div>

                                                </div>

                                            </div>
                                        );
                                    })}

                                </div>

                            </section>


                            {/* =================================================
                                REVIEWS
                            ================================================= */}

                            <section
                                className="
                                    rounded-[28px]
                                    border
                                    border-slate-200/80
                                    bg-white
                                    p-6
                                    shadow-[0_8px_30px_rgba(15,23,42,0.05)]
                                    sm:p-8
                                "
                            >

                                <div
                                    className="
                                        flex
                                        flex-col
                                        gap-4
                                        sm:flex-row
                                        sm:items-end
                                        sm:justify-between
                                    "
                                >

                                    <div>

                                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-indigo-600">
                                            Customer Feedback
                                        </p>

                                        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                                            Customer Reviews
                                        </h2>

                                    </div>


                                    <div
                                        className="
                                            flex
                                            w-fit
                                            items-center
                                            gap-2
                                            rounded-full
                                            bg-amber-50
                                            px-4
                                            py-2
                                        "
                                    >
                                        <Star
                                            size={16}
                                            fill="currentColor"
                                            className="text-amber-500"
                                        />

                                        <span className="font-bold text-slate-800">
                                            {averageRating}
                                        </span>

                                        <span className="text-sm text-slate-500">
                                            / 5
                                        </span>
                                    </div>

                                </div>


                                {reviews.length === 0 ? (

                                    <div
                                        className="
                                            mt-7
                                            rounded-2xl
                                            border
                                            border-dashed
                                            border-slate-200
                                            bg-slate-50/70
                                            px-6
                                            py-12
                                            text-center
                                        "
                                    >

                                        <div
                                            className="
                                                mx-auto
                                                flex
                                                h-12
                                                w-12
                                                items-center
                                                justify-center
                                                rounded-xl
                                                bg-white
                                                text-slate-400
                                                shadow-sm
                                            "
                                        >
                                            <MessageSquare size={21} />
                                        </div>

                                        <h3 className="mt-4 font-bold text-slate-800">
                                            No Reviews Yet
                                        </h3>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Be the first customer to share your
                                            experience.
                                        </p>

                                    </div>

                                ) : (

                                    <div className="mt-7 space-y-4">

                                        {reviews.map((item) => (

                                            <div
                                                key={item._id}
                                                className="
                                                    rounded-2xl
                                                    border
                                                    border-slate-100
                                                    bg-slate-50/60
                                                    p-5
                                                    sm:p-6
                                                "
                                            >

                                                <div
                                                    className="
                                                        flex
                                                        flex-col
                                                        gap-4
                                                        sm:flex-row
                                                        sm:items-start
                                                        sm:justify-between
                                                    "
                                                >

                                                    <div className="flex items-center gap-3">

                                                        <div
                                                            className="
                                                                flex
                                                                h-10
                                                                w-10
                                                                shrink-0
                                                                items-center
                                                                justify-center
                                                                rounded-full
                                                                bg-indigo-100
                                                                text-sm
                                                                font-bold
                                                                text-indigo-700
                                                            "
                                                        >
                                                            {(
                                                                item.customerId
                                                                    ?.name ||
                                                                "C"
                                                            )
                                                                .charAt(0)
                                                                .toUpperCase()}
                                                        </div>

                                                        <div>

                                                            <h3 className="font-bold text-slate-800">
                                                                {item.customerId
                                                                    ?.name ||
                                                                    "Customer"}
                                                            </h3>

                                                            <p className="mt-0.5 text-xs text-slate-400">
                                                                {item.createdAt
                                                                    ? new Date(
                                                                          item.createdAt
                                                                      ).toLocaleDateString()
                                                                    : ""}
                                                            </p>

                                                        </div>

                                                    </div>


                                                    <div className="flex items-center gap-1">

                                                        {[1, 2, 3, 4, 5].map(
                                                            (star) => (
                                                                <Star
                                                                    key={star}
                                                                    size={15}
                                                                    fill={
                                                                        star <=
                                                                        Number(
                                                                            item.rating ||
                                                                                0
                                                                        )
                                                                            ? "currentColor"
                                                                            : "none"
                                                                    }
                                                                    className={
                                                                        star <=
                                                                        Number(
                                                                            item.rating ||
                                                                                0
                                                                        )
                                                                            ? "text-amber-500"
                                                                            : "text-slate-300"
                                                                    }
                                                                />
                                                            )
                                                        )}

                                                    </div>

                                                </div>


                                                <p className="mt-5 text-sm leading-7 text-slate-600">
                                                    {item.review ||
                                                        "Great service experience."}
                                                </p>

                                            </div>

                                        ))}

                                    </div>

                                )}

                            </section>

                        </div>


                        {/* =================================================
                            RIGHT BOOKING CARD
                        ================================================= */}

                        <aside>

                            <div
                                className="
                                    sticky
                                    top-24
                                    overflow-hidden
                                    rounded-[28px]
                                    border
                                    border-slate-200
                                    bg-white
                                    shadow-[0_12px_40px_rgba(15,23,42,0.08)]
                                "
                            >

                                {/* Price header */}

                                <div className="bg-gradient-to-br from-indigo-50 to-violet-50 p-6 sm:p-7">

                                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-indigo-600">
                                        Service Pricing
                                    </p>

                                    <div className="mt-3 flex items-end gap-2">

                                        <span
                                            className="
                                                text-4xl
                                                font-bold
                                                tracking-tight
                                                text-indigo-700
                                            "
                                        >
                                            ₹{price}
                                        </span>

                                    </div>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Starting price
                                    </p>

                                </div>


                                <div className="p-6 sm:p-7">

                                    {/* Quick information */}

                                    <div className="space-y-5">

                                        <div className="flex items-start gap-3">

                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                                <BriefcaseBusiness size={18} />
                                            </div>

                                            <div>

                                                <p className="text-xs text-slate-400">
                                                    Experience
                                                </p>

                                                <p className="mt-1 font-bold text-slate-800">
                                                    {experience} Years
                                                </p>

                                            </div>

                                        </div>


                                        <div className="flex items-start gap-3">

                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                                                <MapPin size={18} />
                                            </div>

                                            <div className="min-w-0">

                                                <p className="text-xs text-slate-400">
                                                    City
                                                </p>

                                                <p className="mt-1 truncate font-bold text-slate-800">
                                                    {city}
                                                </p>

                                            </div>

                                        </div>


                                        <div className="flex items-start gap-3">

                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                                <CalendarCheck size={18} />
                                            </div>

                                            <div>

                                                <p className="text-xs text-slate-400">
                                                    Booking
                                                </p>

                                                <p className="mt-1 font-bold text-slate-800">
                                                    Available for booking
                                                </p>

                                            </div>

                                        </div>

                                    </div>


                                    {/* Divider */}

                                    <div className="my-6 h-px bg-slate-100" />


                                    {/* Trust */}

                                    <div className="space-y-3">

                                        <div className="flex items-center gap-2.5 text-sm text-slate-600">

                                            <CheckCircle2
                                                size={17}
                                                className="text-emerald-500"
                                            />

                                            Verified professional

                                        </div>

                                        <div className="flex items-center gap-2.5 text-sm text-slate-600">

                                            <CheckCircle2
                                                size={17}
                                                className="text-emerald-500"
                                            />

                                            Secure booking process

                                        </div>

                                        <div className="flex items-center gap-2.5 text-sm text-slate-600">

                                            <CheckCircle2
                                                size={17}
                                                className="text-emerald-500"
                                            />

                                            Transparent starting price

                                        </div>

                                    </div>


                                    {/* CTA */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            navigate(`/book/${provider._id}`)
                                        }
                                        className="
                                            mt-7
                                            flex
                                            w-full
                                            items-center
                                            justify-center
                                            gap-2
                                            rounded-xl
                                            bg-slate-950
                                            px-5
                                            py-4
                                            text-sm
                                            font-semibold
                                            text-white
                                            shadow-sm
                                            transition-all
                                            duration-300
                                            hover:bg-indigo-600
                                            hover:shadow-[0_12px_30px_rgba(79,70,229,0.25)]
                                            active:scale-[0.98]
                                        "
                                    >
                                        Book This Service

                                        <ArrowRight
                                            size={17}
                                            className="transition-transform duration-300"
                                        />
                                    </button>


                                    <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                                        You can review your booking details
                                        before confirming.
                                    </p>

                                </div>

                            </div>

                        </aside>

                    </div>

                </div>

            </main>

            <Footer />

        </div>
    );
}

export default ProviderDetails;