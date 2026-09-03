import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    Search,
    SlidersHorizontal,
    Users,
    ShieldCheck,
    MapPin,
    Sparkles,
    RefreshCw,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProviderCard from "../components/ProviderCard";

import {
    getProviders,
    getProvidersByService,
} from "../api/providerApi";

function Providers() {
    const { service } = useParams();

    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        loadProviders();
    }, [service]);

    const loadProviders = async () => {
        try {
            setLoading(true);

            let data;

            if (service) {
                data = await getProvidersByService(service);
            } else {
                data = await getProviders();
            }

            setProviders(Array.isArray(data) ? data : []);
        } catch (error) {
            console.log("Provider loading error:", error);
            setProviders([]);
        } finally {
            setLoading(false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | SEARCH
    |--------------------------------------------------------------------------
    */

    const filteredProviders = providers.filter((provider) => {
        const search = searchTerm.toLowerCase().trim();

        if (!search) return true;

        return (
            provider?.name?.toLowerCase().includes(search) ||
            provider?.service?.toLowerCase().includes(search) ||
            provider?.city?.toLowerCase().includes(search)
        );
    });

    const pageTitle = service
        ? `${service} Professionals`
        : "Trusted Service Professionals";

    const pageDescription = service
        ? `Find reliable ${service} professionals ready to help you.`
        : "Connect with trusted professionals for your everyday home service needs.";

    return (
        <div className="min-h-screen bg-[#fcf8ff] text-slate-900">
            <Navbar />

            {/* =========================================================
                HERO
            ========================================================= */}

            <section className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-900 to-violet-900 text-white">

                {/* Ambient background */}

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
                        left-1/4
                        h-96
                        w-96
                        rounded-full
                        bg-violet-500/20
                        blur-3xl
                    "
                />

                <div
                    className="
                        relative
                        mx-auto
                        max-w-7xl
                        px-5
                        py-14
                        sm:px-6
                        sm:py-16
                        lg:px-8
                        lg:py-20
                    "
                >

                    {/* Breadcrumb-style label */}

                    <div
                        className="
                            mb-5
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-white/10
                            bg-white/10
                            px-4
                            py-2
                            text-xs
                            font-semibold
                            text-indigo-100
                            backdrop-blur-sm
                        "
                    >
                        <Sparkles size={14} />

                        MultiServe Professionals
                    </div>


                    <div className="max-w-3xl">

                        <h1
                            className="
                                text-4xl
                                font-bold
                                tracking-[-0.04em]
                                sm:text-5xl
                                lg:text-6xl
                            "
                        >
                            {pageTitle}
                        </h1>

                        <p
                            className="
                                mt-5
                                max-w-2xl
                                text-base
                                leading-7
                                text-indigo-100
                                sm:text-lg
                                sm:leading-8
                            "
                        >
                            {pageDescription}
                        </p>

                    </div>


                    {/* Hero stats */}

                    <div
                        className="
                            mt-9
                            flex
                            flex-wrap
                            gap-3
                        "
                    >

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-white/10
                                bg-white/10
                                px-4
                                py-2.5
                                text-sm
                                text-indigo-50
                                backdrop-blur-sm
                            "
                        >
                            <ShieldCheck
                                size={16}
                                className="text-emerald-300"
                            />

                            Verified professionals
                        </div>

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-white/10
                                bg-white/10
                                px-4
                                py-2.5
                                text-sm
                                text-indigo-50
                                backdrop-blur-sm
                            "
                        >
                            <Users size={16} />

                            Trusted by customers
                        </div>

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-white/10
                                bg-white/10
                                px-4
                                py-2.5
                                text-sm
                                text-indigo-50
                                backdrop-blur-sm
                            "
                        >
                            <MapPin size={16} />

                            Local professionals
                        </div>

                    </div>

                </div>

            </section>


            {/* =========================================================
                MAIN CONTENT
            ========================================================= */}

            <main
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

                {/* =====================================================
                    TOOLBAR
                ===================================================== */}

                <div
                    className="
                        mb-8
                        flex
                        flex-col
                        gap-5
                        lg:flex-row
                        lg:items-end
                        lg:justify-between
                    "
                >

                    <div>

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                text-sm
                                font-semibold
                                text-indigo-600
                            "
                        >
                            <Users size={17} />

                            PROFESSIONALS
                        </div>

                        <h2
                            className="
                                mt-2
                                text-2xl
                                font-bold
                                tracking-tight
                                text-slate-900
                                sm:text-3xl
                            "
                        >
                            {service
                                ? `Available ${service} Professionals`
                                : "Available Professionals"}
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            {loading
                                ? "Finding the best professionals for you..."
                                : `${filteredProviders.length} professional${
                                      filteredProviders.length !== 1
                                          ? "s"
                                          : ""
                                  } available`}
                        </p>

                    </div>


                    {/* Search */}

                    <div
                        className="
                            flex
                            w-full
                            items-center
                            gap-3
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                            p-2
                            shadow-[0_6px_24px_rgba(15,23,42,0.05)]
                            lg:max-w-md
                        "
                    >

                        <div
                            className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-indigo-50
                                text-indigo-600
                            "
                        >
                            <Search size={18} />
                        </div>

                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(e.target.value)
                            }
                            placeholder="Search professionals..."
                            className="
                                min-w-0
                                flex-1
                                bg-transparent
                                px-1
                                text-sm
                                text-slate-800
                                outline-none
                                placeholder:text-slate-400
                            "
                        />

                        {searchTerm && (
                            <button
                                type="button"
                                onClick={() => setSearchTerm("")}
                                className="
                                    rounded-lg
                                    px-2
                                    py-1
                                    text-xs
                                    font-semibold
                                    text-slate-400
                                    transition
                                    hover:bg-slate-100
                                    hover:text-slate-700
                                "
                            >
                                Clear
                            </button>
                        )}

                    </div>

                </div>


                {/* =====================================================
                    FILTER / RESULT BAR
                ===================================================== */}

                {!loading && providers.length > 0 && (
                    <div
                        className="
                            mb-7
                            flex
                            flex-col
                            gap-3
                            rounded-2xl
                            border
                            border-slate-200/80
                            bg-white/80
                            p-4
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                        "
                    >

                        <div
                            className="
                                flex
                                items-center
                                gap-3
                            "
                        >

                            <div
                                className="
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-indigo-50
                                    text-indigo-600
                                "
                            >
                                <SlidersHorizontal size={17} />
                            </div>

                            <div>

                                <p
                                    className="
                                        text-sm
                                        font-semibold
                                        text-slate-800
                                    "
                                >
                                    Showing {filteredProviders.length} of{" "}
                                    {providers.length}
                                </p>

                                <p className="text-xs text-slate-400">
                                    Browse professionals that match your
                                    requirements
                                </p>

                            </div>

                        </div>


                        {searchTerm && (
                            <div
                                className="
                                    inline-flex
                                    w-fit
                                    items-center
                                    rounded-full
                                    bg-indigo-50
                                    px-3
                                    py-1.5
                                    text-xs
                                    font-semibold
                                    text-indigo-700
                                "
                            >
                                Search: "{searchTerm}"
                            </div>
                        )}

                    </div>
                )}


                {/* =====================================================
                    LOADING STATE
                ===================================================== */}

                {loading ? (
                    <div
                        className="
                            grid
                            gap-6
                        "
                    >

                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="
                                    overflow-hidden
                                    rounded-[26px]
                                    border
                                    border-slate-200
                                    bg-white
                                    shadow-sm
                                "
                            >

                                <div className="flex flex-col lg:flex-row">

                                    <div
                                        className="
                                            h-64
                                            animate-pulse
                                            bg-slate-100
                                            lg:w-[270px]
                                            lg:h-[360px]
                                        "
                                    />

                                    <div className="flex-1 p-7">

                                        <div className="h-5 w-28 animate-pulse rounded bg-slate-100" />

                                        <div className="mt-4 h-9 w-56 animate-pulse rounded bg-slate-100" />

                                        <div className="mt-4 h-5 w-36 animate-pulse rounded bg-slate-100" />

                                        <div
                                            className="
                                                mt-8
                                                grid
                                                gap-3
                                                sm:grid-cols-2
                                            "
                                        >
                                            <div className="h-20 animate-pulse rounded-2xl bg-slate-100" />
                                            <div className="h-20 animate-pulse rounded-2xl bg-slate-100" />
                                        </div>

                                        <div className="mt-7 h-8 w-72 animate-pulse rounded-full bg-slate-100" />

                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>

                ) : filteredProviders.length === 0 ? (

                    /* =================================================
                       EMPTY STATE
                    ================================================= */

                    <div
                        className="
                            rounded-[28px]
                            border
                            border-slate-200
                            bg-white
                            px-6
                            py-16
                            text-center
                            shadow-[0_8px_30px_rgba(15,23,42,0.05)]
                            sm:px-12
                        "
                    >

                        <div
                            className="
                                mx-auto
                                flex
                                h-16
                                w-16
                                items-center
                                justify-center
                                rounded-2xl
                                bg-indigo-50
                                text-indigo-600
                            "
                        >
                            <Users size={28} />
                        </div>

                        <h2
                            className="
                                mt-6
                                text-2xl
                                font-bold
                                tracking-tight
                                text-slate-900
                            "
                        >
                            {searchTerm
                                ? "No matching professionals"
                                : "No professionals found"}
                        </h2>

                        <p
                            className="
                                mx-auto
                                mt-3
                                max-w-md
                                text-sm
                                leading-6
                                text-slate-500
                            "
                        >
                            {searchTerm
                                ? "Try searching with a different name, service, or city."
                                : "There are currently no professionals available for this service. Please check again later."}
                        </p>

                        {searchTerm ? (
                            <button
                                type="button"
                                onClick={() => setSearchTerm("")}
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
                                <RefreshCw size={16} />

                                Clear Search
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={loadProviders}
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
                                <RefreshCw size={16} />

                                Try Again
                            </button>
                        )}

                    </div>

                ) : (

                    /* =================================================
                       PROVIDER CARDS
                    ================================================= */

                    <div className="grid gap-6">

                        {filteredProviders.map((provider) => (
                            <ProviderCard
                                key={provider._id}
                                provider={provider}
                            />
                        ))}

                    </div>
                )}

            </main>


            {/* =========================================================
                FOOTER
            ========================================================= */}

            <Footer />
        </div>
    );
}

export default Providers;