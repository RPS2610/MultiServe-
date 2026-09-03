import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Search,
    ArrowRight,
    Sparkles,
    Zap,
    ShieldCheck,
} from "lucide-react";

function SearchBar() {
    const [service, setService] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        const value = service.trim();

        if (value !== "") {
            navigate(`/providers/${encodeURIComponent(value)}`);
        }
    };

    const handlePopularSearch = (item) => {
        setService(item);
        navigate(`/providers/${encodeURIComponent(item)}`);
    };

    const popularServices = [
        "Electrician",
        "Plumber",
        "Cleaning",
        "Painter",
        "Carpenter",
        "AC Repair",
        "Shifting",
    ];

    return (
        <section className="relative bg-white px-4 pb-8 sm:px-6 sm:pb-12 lg:px-8">
            <div className="mx-auto max-w-6xl">

                {/* =====================================================
                    MAIN SEARCH CARD
                ===================================================== */}

                <div
                    className="
                        relative
                        -mt-8
                        overflow-hidden
                        rounded-[28px]
                        border
                        border-slate-200
                        bg-white
                        p-5
                        shadow-[0_20px_60px_rgba(15,23,42,0.10)]
                        sm:-mt-12
                        sm:p-7
                        lg:-mt-14
                        lg:p-9
                    "
                >

                    {/* Decorative background */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -right-20
                            -top-20
                            h-48
                            w-48
                            rounded-full
                            bg-indigo-100/60
                            blur-3xl
                        "
                    />

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -bottom-24
                            -left-20
                            h-48
                            w-48
                            rounded-full
                            bg-violet-100/50
                            blur-3xl
                        "
                    />


                    {/* =================================================
                        HEADING
                    ================================================= */}

                    <div className="relative text-center">

                        <div
                            className="
                                mx-auto
                                mb-3
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-indigo-100
                                bg-indigo-50
                                px-3
                                py-1.5
                                text-xs
                                font-semibold
                                text-indigo-700
                            "
                        >
                            <Sparkles size={14} />

                            Find trusted professionals
                        </div>


                        <h2
                            className="
                                text-2xl
                                font-bold
                                tracking-[-0.03em]
                                text-slate-900
                                sm:text-3xl
                                lg:text-4xl
                            "
                        >
                            Find the right service
                            <span className="text-indigo-600">
                                {" "}for you
                            </span>
                        </h2>


                        <p
                            className="
                                mx-auto
                                mt-2
                                max-w-2xl
                                text-sm
                                leading-6
                                text-slate-500
                                sm:text-base
                            "
                        >
                            Search from 35+ professional home services
                            and book trusted experts near you.
                        </p>

                    </div>


                    {/* =================================================
                        SEARCH INPUT
                    ================================================= */}

                    <div
                        className="
                            relative
                            z-10
                            mx-auto
                            mt-6
                            max-w-4xl
                            sm:mt-7
                        "
                    >

                        <div
                            className="
                                flex
                                flex-col
                                gap-3
                                rounded-2xl
                                border
                                border-slate-200
                                bg-slate-50
                                p-2
                                transition-all
                                duration-200
                                focus-within:border-indigo-300
                                focus-within:bg-white
                                focus-within:shadow-[0_10px_30px_rgba(79,70,229,0.10)]
                                sm:flex-row
                            "
                        >

                            {/* Input */}

                            <div className="relative flex-1">

                                <Search
                                    size={21}
                                    className="
                                        absolute
                                        left-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-slate-400
                                    "
                                />

                                <input
                                    type="text"
                                    placeholder="Search electrician, plumber, AC repair..."
                                    value={service}
                                    onChange={(e) =>
                                        setService(e.target.value)
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleSearch();
                                        }
                                    }}
                                    className="
                                        h-14
                                        w-full
                                        rounded-xl
                                        border-0
                                        bg-transparent
                                        pl-12
                                        pr-4
                                        text-sm
                                        font-medium
                                        text-slate-900
                                        outline-none
                                        placeholder:text-slate-400
                                        sm:text-base
                                    "
                                />

                            </div>


                            {/* Search button */}

                            <button
                                type="button"
                                onClick={handleSearch}
                                className="
                                    flex
                                    h-14
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    bg-slate-950
                                    px-7
                                    text-sm
                                    font-semibold
                                    text-white
                                    shadow-sm
                                    transition-all
                                    duration-300
                                    hover:bg-indigo-600
                                    hover:shadow-[0_10px_25px_rgba(79,70,229,0.25)]
                                    active:scale-[0.98]
                                    sm:min-w-[135px]
                                "
                            >
                                <span>Search</span>

                                <ArrowRight size={17} />
                            </button>

                        </div>

                    </div>


                    {/* =================================================
                        TRUST FEATURES
                    ================================================= */}

                    <div
                        className="
                            relative
                            z-10
                            mt-5
                            flex
                            flex-wrap
                            items-center
                            justify-center
                            gap-x-5
                            gap-y-2
                            text-xs
                            text-slate-500
                            sm:mt-6
                        "
                    >

                        <div className="flex items-center gap-1.5">
                            <ShieldCheck
                                size={14}
                                className="text-emerald-500"
                            />
                            Verified professionals
                        </div>

                        <div className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

                        <div className="flex items-center gap-1.5">
                            <Zap
                                size={14}
                                className="text-amber-500"
                            />
                            Quick booking
                        </div>

                        <div className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

                        <div className="flex items-center gap-1.5">
                            <Sparkles
                                size={14}
                                className="text-indigo-500"
                            />
                            Quality service
                        </div>

                    </div>


                    {/* =================================================
                        POPULAR SEARCHES
                    ================================================= */}

                    <div
                        className="
                            relative
                            z-10
                            mt-6
                            border-t
                            border-slate-100
                            pt-5
                            sm:mt-7
                            sm:pt-6
                        "
                    >

                        <div
                            className="
                                mb-3
                                text-center
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.14em]
                                text-slate-400
                            "
                        >
                            Popular searches
                        </div>


                        <div
                            className="
                                flex
                                flex-wrap
                                justify-center
                                gap-2
                                sm:gap-2.5
                            "
                        >

                            {popularServices.map((item) => (

                                <button
                                    key={item}
                                    type="button"
                                    onClick={() =>
                                        handlePopularSearch(item)
                                    }
                                    className="
                                        rounded-full
                                        border
                                        border-slate-200
                                        bg-white
                                        px-3.5
                                        py-2
                                        text-xs
                                        font-semibold
                                        text-slate-600
                                        transition-all
                                        duration-200
                                        hover:-translate-y-0.5
                                        hover:border-indigo-200
                                        hover:bg-indigo-50
                                        hover:text-indigo-700
                                        active:scale-95
                                        sm:px-4
                                        sm:text-sm
                                    "
                                >
                                    {item}
                                </button>

                            ))}

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}

export default SearchBar;