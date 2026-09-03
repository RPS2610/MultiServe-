import { useNavigate } from "react-router-dom";
import {
    MapPin,
    Star,
    BriefcaseBusiness,
    ArrowRight,
    ShieldCheck,
    Clock3,
    BadgeCheck,
} from "lucide-react";

function ProviderCard({ provider }) {
    const navigate = useNavigate();

    const handleBookNow = () => {
        navigate(`/provider/${provider._id}`);
    };

    const providerName = provider?.name || "Professional";
    const serviceName = provider?.service || "Home Service";
    const price = provider?.price ?? "—";
    const experience = provider?.experience ?? "—";
    const city = provider?.city || "Available nearby";

    /*
    |--------------------------------------------------------------------------
    | PROFILE IMAGE
    |--------------------------------------------------------------------------
    | Uses provider image if available.
    | Falls back to a clean generated avatar.
    |--------------------------------------------------------------------------
    */

    const profileImage =
        provider?.profileImage ||
        provider?.image ||
        provider?.photo ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
            providerName
        )}&background=EEF2FF&color=4338CA&size=240`;

    return (
        <article
            className="
                group
                overflow-hidden
                rounded-[26px]
                border
                border-slate-200/80
                bg-white
                shadow-[0_8px_30px_rgba(15,23,42,0.06)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-indigo-100
                hover:shadow-[0_20px_50px_rgba(49,46,129,0.12)]
            "
        >
            <div className="flex flex-col lg:flex-row">

                {/* =====================================================
                    LEFT PROFILE SECTION
                ===================================================== */}

                <div
                    className="
                        relative
                        flex
                        min-h-[260px]
                        items-center
                        justify-center
                        overflow-hidden
                        bg-gradient-to-br
                        from-indigo-950
                        via-indigo-900
                        to-violet-900
                        p-7
                        sm:p-9
                        lg:w-[270px]
                        lg:min-h-[360px]
                        lg:p-8
                    "
                >

                    {/* Background glow */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -right-16
                            -top-16
                            h-44
                            w-44
                            rounded-full
                            bg-indigo-400/20
                            blur-3xl
                        "
                    />

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -bottom-20
                            -left-16
                            h-48
                            w-48
                            rounded-full
                            bg-violet-400/20
                            blur-3xl
                        "
                    />


                    {/* Availability badge */}

                    <div
                        className="
                            absolute
                            left-5
                            top-5
                            z-10
                            flex
                            items-center
                            gap-1.5
                            rounded-full
                            border
                            border-white/10
                            bg-white/10
                            px-3
                            py-1.5
                            text-xs
                            font-semibold
                            text-white
                            backdrop-blur-md
                        "
                    >
                        <span
                            className="
                                h-1.5
                                w-1.5
                                rounded-full
                                bg-emerald-400
                            "
                        />

                        Available
                    </div>


                    {/* Profile image */}

                    <div className="relative z-10">

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
                                    transition-transform
                                    duration-500
                                    group-hover:scale-105
                                    sm:h-40
                                    sm:w-40
                                "
                            />

                        </div>


                        {/* Verified icon */}

                        <div
                            className="
                                absolute
                                bottom-1
                                right-1
                                flex
                                h-10
                                w-10
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
                                size={21}
                                className="text-indigo-600"
                            />
                        </div>

                    </div>


                    {/* Desktop trust text */}

                    <div
                        className="
                            absolute
                            bottom-6
                            left-0
                            right-0
                            hidden
                            text-center
                            lg:block
                        "
                    >
                        <p
                            className="
                                text-xs
                                font-medium
                                tracking-wide
                                text-indigo-200
                            "
                        >
                            VERIFIED PROFESSIONAL
                        </p>
                    </div>

                </div>


                {/* =====================================================
                    RIGHT CONTENT
                ===================================================== */}

                <div
                    className="
                        flex
                        flex-1
                        flex-col
                        p-5
                        sm:p-7
                        lg:p-8
                    "
                >

                    {/* =================================================
                        TOP INFORMATION
                    ================================================= */}

                    <div
                        className="
                            flex
                            flex-col
                            gap-5
                            sm:flex-row
                            sm:items-start
                            sm:justify-between
                        "
                    >

                        <div className="min-w-0">

                            {/* Service */}

                            <div
                                className="
                                    mb-2
                                    inline-flex
                                    items-center
                                    rounded-full
                                    bg-indigo-50
                                    px-3
                                    py-1
                                    text-xs
                                    font-semibold
                                    text-indigo-700
                                "
                            >
                                {serviceName}
                            </div>


                            {/* Provider name */}

                            <h2
                                className="
                                    text-2xl
                                    font-bold
                                    tracking-[-0.03em]
                                    text-slate-900
                                    sm:text-3xl
                                "
                            >
                                {providerName}
                            </h2>


                            {/* Rating */}

                            <div
                                className="
                                    mt-3
                                    flex
                                    flex-wrap
                                    items-center
                                    gap-2
                                "
                            >

                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-1.5
                                        rounded-full
                                        bg-amber-50
                                        px-3
                                        py-1.5
                                    "
                                >
                                    <Star
                                        size={15}
                                        fill="currentColor"
                                        className="text-amber-500"
                                    />

                                    <span
                                        className="
                                            text-sm
                                            font-bold
                                            text-slate-800
                                        "
                                    >
                                        4.8
                                    </span>
                                </div>

                                <span className="text-sm text-slate-400">
                                    250+ reviews
                                </span>

                            </div>

                        </div>


                        {/* =================================================
                            PRICE
                        ================================================= */}

                        <div
                            className="
                                rounded-2xl
                                border
                                border-indigo-100
                                bg-indigo-50/60
                                px-5
                                py-4
                                sm:min-w-[150px]
                                sm:text-right
                            "
                        >

                            <p
                                className="
                                    text-[11px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.12em]
                                    text-slate-400
                                "
                            >
                                Starting from
                            </p>

                            <p
                                className="
                                    mt-1
                                    text-2xl
                                    font-bold
                                    tracking-tight
                                    text-indigo-700
                                "
                            >
                                ₹{price}
                            </p>

                            <p
                                className="
                                    mt-0.5
                                    text-xs
                                    text-slate-400
                                "
                            >
                                per service
                            </p>

                        </div>

                    </div>


                    {/* =================================================
                        DETAILS
                    ================================================= */}

                    <div
                        className="
                            mt-7
                            grid
                            grid-cols-1
                            gap-3
                            sm:grid-cols-2
                        "
                    >

                        {/* Experience */}

                        <div
                            className="
                                rounded-2xl
                                border
                                border-slate-100
                                bg-slate-50/70
                                p-4
                                transition-colors
                                duration-200
                                group-hover:bg-indigo-50/40
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
                                        rounded-xl
                                        bg-indigo-100
                                        text-indigo-600
                                    "
                                >
                                    <BriefcaseBusiness size={19} />
                                </div>

                                <div className="min-w-0">

                                    <p
                                        className="
                                            text-xs
                                            font-medium
                                            text-slate-400
                                        "
                                    >
                                        Experience
                                    </p>

                                    <p
                                        className="
                                            mt-0.5
                                            truncate
                                            text-sm
                                            font-bold
                                            text-slate-800
                                        "
                                    >
                                        {experience} Years
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* Location */}

                        <div
                            className="
                                rounded-2xl
                                border
                                border-slate-100
                                bg-slate-50/70
                                p-4
                                transition-colors
                                duration-200
                                group-hover:bg-indigo-50/40
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
                                        rounded-xl
                                        bg-violet-100
                                        text-violet-600
                                    "
                                >
                                    <MapPin size={19} />
                                </div>

                                <div className="min-w-0">

                                    <p
                                        className="
                                            text-xs
                                            font-medium
                                            text-slate-400
                                        "
                                    >
                                        Location
                                    </p>

                                    <p
                                        className="
                                            mt-0.5
                                            truncate
                                            text-sm
                                            font-bold
                                            text-slate-800
                                        "
                                    >
                                        {city}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        TRUST BADGES
                    ================================================= */}

                    <div
                        className="
                            mt-6
                            flex
                            flex-wrap
                            gap-2
                        "
                    >

                        <span
                            className="
                                inline-flex
                                items-center
                                gap-1.5
                                rounded-full
                                bg-emerald-50
                                px-3
                                py-1.5
                                text-xs
                                font-semibold
                                text-emerald-700
                            "
                        >
                            <ShieldCheck size={14} />
                            Verified
                        </span>


                        <span
                            className="
                                inline-flex
                                items-center
                                gap-1.5
                                rounded-full
                                bg-amber-50
                                px-3
                                py-1.5
                                text-xs
                                font-semibold
                                text-amber-700
                            "
                        >
                            <Star
                                size={13}
                                fill="currentColor"
                            />
                            Top Rated
                        </span>


                        <span
                            className="
                                inline-flex
                                items-center
                                gap-1.5
                                rounded-full
                                bg-indigo-50
                                px-3
                                py-1.5
                                text-xs
                                font-semibold
                                text-indigo-700
                            "
                        >
                            <Clock3 size={14} />
                            Quick Response
                        </span>

                    </div>


                    {/* =================================================
                        BOTTOM ACTION
                    ================================================= */}

                    <div
                        className="
                            mt-7
                            flex
                            flex-col
                            gap-4
                            border-t
                            border-slate-100
                            pt-6
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                        "
                    >

                        {/* Response time */}

                        <div>

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                "
                            >

                                <span
                                    className="
                                        flex
                                        h-8
                                        w-8
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-emerald-50
                                    "
                                >
                                    <Clock3
                                        size={15}
                                        className="text-emerald-600"
                                    />
                                </span>

                                <div>

                                    <p
                                        className="
                                            text-[11px]
                                            font-medium
                                            uppercase
                                            tracking-wide
                                            text-slate-400
                                        "
                                    >
                                        Response time
                                    </p>

                                    <p
                                        className="
                                            text-sm
                                            font-bold
                                            text-emerald-600
                                        "
                                    >
                                        Usually within 15 minutes
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* CTA */}

                        <button
                            type="button"
                            onClick={handleBookNow}
                            className="
                                group/button
                                flex
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-slate-950
                                px-6
                                py-3.5
                                text-sm
                                font-semibold
                                text-white
                                shadow-sm
                                transition-all
                                duration-300
                                hover:bg-indigo-600
                                hover:shadow-[0_12px_28px_rgba(79,70,229,0.25)]
                                active:scale-[0.98]
                                sm:w-auto
                            "
                        >

                            View Profile &amp; Book

                            <ArrowRight
                                size={17}
                                className="
                                    transition-transform
                                    duration-300
                                    group-hover/button:translate-x-1
                                "
                            />

                        </button>

                    </div>

                </div>

            </div>
        </article>
    );
}

export default ProviderCard;