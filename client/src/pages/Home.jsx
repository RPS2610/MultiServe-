import { useEffect, useState } from "react";
import {
    ShieldCheck,
    Zap,
    Star,
    Search,
    CalendarDays,
    Home as HomeIcon,
    ArrowRight,
    CheckCircle2,
    Users,
    Sparkles,
    Clock3,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import ServiceCard from "../components/ServiceCard";
import Footer from "../components/Footer";

import { getAllServices } from "../api/serviceApi";


function Home() {

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);


    /* =========================================================
       LOAD SERVICES
    ========================================================= */

    useEffect(() => {

        let isMounted = true;

        const fetchServices = async (attempt = 1) => {

            try {

                const data = await getAllServices();

                if (!isMounted) return;

                if (Array.isArray(data)) {

                    setServices(data);

                } else {

                    console.log(
                        "Unexpected services response:",
                        data
                    );

                }

                setLoading(false);

            } catch (error) {

                console.error(
                    `Failed to load services. Attempt ${attempt}:`,
                    error
                );

                /*
                 * Render can sometimes take a few seconds
                 * to wake up. Retry automatically.
                 */

                if (attempt < 3 && isMounted) {

                    setTimeout(() => {

                        fetchServices(attempt + 1);

                    }, 2000);

                } else if (isMounted) {

                    setLoading(false);

                }

            }

        };

        fetchServices();

        return () => {

            isMounted = false;

        };

    }, []);


    /* =========================================================
       SCROLL TO SERVICES
    ========================================================= */

    const handleExploreServices = () => {

        const servicesSection =
            document.getElementById("services");

        if (servicesSection) {

            servicesSection.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });

        }

    };


    return (

        <div className="min-h-screen bg-[#fcf8ff] text-[#1b1b24]">

            <Navbar />

            {/* =====================================================
                HERO
            ===================================================== */}

            <Hero />


            {/* =====================================================
                SEARCH
            ===================================================== */}

            <SearchBar />


            {/* =====================================================
                TRUST STRIP
            ===================================================== */}

            <section className="px-4 sm:px-6 lg:px-8 -mt-2 relative z-10">

                <div
                    className="
                        max-w-[1120px]
                        mx-auto
                        bg-white
                        rounded-2xl
                        border
                        border-[#ebe8f5]
                        shadow-[0_10px_35px_rgba(53,37,205,0.07)]
                        px-5
                        sm:px-8
                        py-5
                    "
                >

                    <div
                        className="
                            grid
                            grid-cols-1
                            sm:grid-cols-3
                            gap-5
                            sm:gap-8
                        "
                    >

                        {/* VERIFIED */}

                        <div
                            className="
                                flex
                                items-center
                                justify-center
                                sm:justify-start
                                gap-3
                            "
                        >

                            <div
                                className="
                                    w-10
                                    h-10
                                    rounded-xl
                                    bg-[#eeeaff]
                                    flex
                                    items-center
                                    justify-center
                                    flex-shrink-0
                                "
                            >

                                <ShieldCheck
                                    size={20}
                                    className="text-[#3525cd]"
                                />

                            </div>

                            <div>

                                <p className="text-sm font-bold">
                                    Verified Professionals
                                </p>

                                <p className="text-xs text-[#777486] mt-0.5">
                                    Trusted & screened experts
                                </p>

                            </div>

                        </div>


                        {/* FAST */}

                        <div
                            className="
                                flex
                                items-center
                                justify-center
                                sm:justify-start
                                gap-3
                            "
                        >

                            <div
                                className="
                                    w-10
                                    h-10
                                    rounded-xl
                                    bg-[#f0ecff]
                                    flex
                                    items-center
                                    justify-center
                                    flex-shrink-0
                                "
                            >

                                <Zap
                                    size={20}
                                    className="text-[#571ac0]"
                                />

                            </div>

                            <div>

                                <p className="text-sm font-bold">
                                    Quick & Easy
                                </p>

                                <p className="text-xs text-[#777486] mt-0.5">
                                    Book in just a few clicks
                                </p>

                            </div>

                        </div>


                        {/* SUPPORT */}

                        <div
                            className="
                                flex
                                items-center
                                justify-center
                                sm:justify-start
                                gap-3
                            "
                        >

                            <div
                                className="
                                    w-10
                                    h-10
                                    rounded-xl
                                    bg-[#f5f2ff]
                                    flex
                                    items-center
                                    justify-center
                                    flex-shrink-0
                                "
                            >

                                <Clock3
                                    size={20}
                                    className="text-[#3525cd]"
                                />

                            </div>

                            <div>

                                <p className="text-sm font-bold">
                                    Reliable Service
                                </p>

                                <p className="text-xs text-[#777486] mt-0.5">
                                    Professionals at your doorstep
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                POPULAR SERVICES
            ===================================================== */}

            <section
                id="services"
                className="
                    max-w-[1280px]
                    mx-auto
                    px-4
                    sm:px-6
                    lg:px-8
                    pt-20
                    sm:pt-24
                    pb-20
                    scroll-mt-24
                "
            >

                {/* SECTION HEADING */}

                <div
                    className="
                        flex
                        flex-col
                        md:flex-row
                        md:items-end
                        md:justify-between
                        gap-5
                        mb-10
                    "
                >

                    <div>

                        <div
                            className="
                                inline-flex
                                items-center
                                gap-2
                                px-3
                                py-1.5
                                rounded-full
                                bg-[#eeeaff]
                                text-[#3525cd]
                                text-xs
                                font-bold
                                uppercase
                                tracking-[0.12em]
                            "
                        >

                            <Sparkles size={14} />

                            What We Offer

                        </div>


                        <h2
                            className="
                                text-3xl
                                sm:text-4xl
                                lg:text-[46px]
                                font-extrabold
                                tracking-[-0.04em]
                                mt-4
                            "
                        >

                            Popular Services

                        </h2>


                        <p
                            className="
                                text-[#777486]
                                text-sm
                                sm:text-base
                                max-w-2xl
                                mt-3
                                leading-7
                            "
                        >

                            Book trusted professionals for repairs,
                            cleaning, maintenance, beauty, delivery
                            and everyday services — all in one place.

                        </p>

                    </div>


                    <button
                        onClick={handleExploreServices}
                        className="
                            hidden
                            sm:inline-flex
                            items-center
                            gap-2
                            text-sm
                            font-bold
                            text-[#3525cd]
                            hover:gap-3
                            transition-all
                        "
                    >

                        Explore all

                        <ArrowRight size={17} />

                    </button>

                </div>


                {/* SERVICES */}

                {loading && services.length === 0 ? (

                    <div
                        className="
                            grid
                            grid-cols-2
                            md:grid-cols-3
                            lg:grid-cols-4
                            gap-4
                            sm:gap-6
                        "
                    >

                        {[1, 2, 3, 4, 5, 6, 7, 8].map(
                            (item) => (

                                <div
                                    key={item}
                                    className="
                                        bg-white
                                        rounded-2xl
                                        border
                                        border-[#ebe8f5]
                                        p-4
                                        animate-pulse
                                    "
                                >

                                    <div
                                        className="
                                            aspect-square
                                            rounded-xl
                                            bg-[#f0edf7]
                                        "
                                    />

                                    <div
                                        className="
                                            h-4
                                            bg-[#f0edf7]
                                            rounded
                                            mt-4
                                            w-3/4
                                        "
                                    />

                                    <div
                                        className="
                                            h-3
                                            bg-[#f0edf7]
                                            rounded
                                            mt-2
                                            w-1/2
                                        "
                                    />

                                </div>

                            )
                        )}

                    </div>

                ) : services.length > 0 ? (

                    <div
                        className="
                            grid
                            grid-cols-2
                            md:grid-cols-3
                            lg:grid-cols-4
                            gap-4
                            sm:gap-6
                        "
                    >

                        {services.map((service) => (

                            <ServiceCard
                                key={service._id}
                                service={service}
                            />

                        ))}

                    </div>

                ) : (

                    <div
                        className="
                            bg-white
                            border
                            border-[#ebe8f5]
                            rounded-3xl
                            px-6
                            py-16
                            text-center
                        "
                    >

                        <div
                            className="
                                w-14
                                h-14
                                rounded-2xl
                                bg-[#f5f2ff]
                                mx-auto
                                flex
                                items-center
                                justify-center
                            "
                        >

                            <Search
                                size={24}
                                className="text-[#3525cd]"
                            />

                        </div>

                        <h3 className="font-bold text-lg mt-5">
                            Services are temporarily unavailable
                        </h3>

                        <p className="text-sm text-[#777486] mt-2">
                            Please refresh the page and try again.
                        </p>

                    </div>

                )}

            </section>


            {/* =====================================================
                WHY CHOOSE MULTISERVE
            ===================================================== */}

            <section
                className="
                    bg-[#f5f2ff]
                    py-20
                    sm:py-24
                "
            >

                <div
                    className="
                        max-w-[1280px]
                        mx-auto
                        px-4
                        sm:px-6
                        lg:px-8
                    "
                >

                    <div className="text-center max-w-2xl mx-auto">

                        <div
                            className="
                                inline-flex
                                items-center
                                gap-2
                                px-3
                                py-1.5
                                rounded-full
                                bg-white
                                text-[#3525cd]
                                text-xs
                                font-bold
                                uppercase
                                tracking-[0.12em]
                                border
                                border-[#ebe8f5]
                            "
                        >

                            <Star size={14} />

                            Why MultiServe

                        </div>


                        <h2
                            className="
                                text-3xl
                                sm:text-4xl
                                lg:text-[44px]
                                font-extrabold
                                tracking-[-0.04em]
                                mt-4
                            "
                        >
                            Service you can trust.
                        </h2>


                        <p
                            className="
                                text-[#777486]
                                mt-4
                                leading-7
                                text-sm
                                sm:text-base
                            "
                        >
                            We make finding and booking reliable
                            professionals simple, transparent and
                            stress-free.
                        </p>

                    </div>


                    <div
                        className="
                            grid
                            md:grid-cols-3
                            gap-5
                            lg:gap-7
                            mt-12
                        "
                    >

                        {/* VERIFIED */}

                        <div
                            className="
                                bg-white
                                rounded-3xl
                                border
                                border-[#ebe8f5]
                                p-7
                                sm:p-8
                                hover:-translate-y-1
                                hover:shadow-[0_20px_45px_rgba(53,37,205,0.09)]
                                transition-all
                                duration-300
                            "
                        >

                            <div
                                className="
                                    w-12
                                    h-12
                                    rounded-2xl
                                    bg-[#eeeaff]
                                    flex
                                    items-center
                                    justify-center
                                "
                            >

                                <ShieldCheck
                                    size={25}
                                    className="text-[#3525cd]"
                                />

                            </div>


                            <h3
                                className="
                                    text-xl
                                    font-extrabold
                                    mt-6
                                "
                            >
                                Verified Experts
                            </h3>


                            <p
                                className="
                                    text-sm
                                    text-[#777486]
                                    leading-6
                                    mt-3
                                "
                            >
                                Connect with professionals who are
                                verified and ready to deliver quality
                                service at your doorstep.
                            </p>


                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    mt-5
                                    text-xs
                                    font-semibold
                                    text-[#3525cd]
                                "
                            >

                                <CheckCircle2 size={15} />

                                Trusted professionals

                            </div>

                        </div>


                        {/* QUICK */}

                        <div
                            className="
                                bg-white
                                rounded-3xl
                                border
                                border-[#ebe8f5]
                                p-7
                                sm:p-8
                                hover:-translate-y-1
                                hover:shadow-[0_20px_45px_rgba(53,37,205,0.09)]
                                transition-all
                                duration-300
                            "
                        >

                            <div
                                className="
                                    w-12
                                    h-12
                                    rounded-2xl
                                    bg-[#f0ecff]
                                    flex
                                    items-center
                                    justify-center
                                "
                            >

                                <Zap
                                    size={25}
                                    className="text-[#571ac0]"
                                />

                            </div>


                            <h3
                                className="
                                    text-xl
                                    font-extrabold
                                    mt-6
                                "
                            >
                                Quick Booking
                            </h3>


                            <p
                                className="
                                    text-sm
                                    text-[#777486]
                                    leading-6
                                    mt-3
                                "
                            >
                                Find the right professional and book
                                your service in just a few simple
                                steps.
                            </p>


                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    mt-5
                                    text-xs
                                    font-semibold
                                    text-[#571ac0]
                                "
                            >

                                <CheckCircle2 size={15} />

                                Simple & convenient

                            </div>

                        </div>


                        {/* RATED */}

                        <div
                            className="
                                bg-white
                                rounded-3xl
                                border
                                border-[#ebe8f5]
                                p-7
                                sm:p-8
                                hover:-translate-y-1
                                hover:shadow-[0_20px_45px_rgba(53,37,205,0.09)]
                                transition-all
                                duration-300
                            "
                        >

                            <div
                                className="
                                    w-12
                                    h-12
                                    rounded-2xl
                                    bg-[#fff8dc]
                                    flex
                                    items-center
                                    justify-center
                                "
                            >

                                <Star
                                    size={25}
                                    className="text-[#d5a800]"
                                />

                            </div>


                            <h3
                                className="
                                    text-xl
                                    font-extrabold
                                    mt-6
                                "
                            >
                                Top Rated
                            </h3>


                            <p
                                className="
                                    text-sm
                                    text-[#777486]
                                    leading-6
                                    mt-3
                                "
                            >
                                Choose from highly rated professionals
                                backed by real customer reviews and
                                experiences.
                            </p>


                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    mt-5
                                    text-xs
                                    font-semibold
                                    text-[#9b7800]
                                "
                            >

                                <Star
                                    size={15}
                                    fill="currentColor"
                                />

                                Quality you can count on

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                HOW IT WORKS
            ===================================================== */}

            <section
                id="how-it-works"
                className="
                    max-w-[1280px]
                    mx-auto
                    px-4
                    sm:px-6
                    lg:px-8
                    py-20
                    sm:py-24
                "
            >

                <div className="text-center max-w-2xl mx-auto">

                    <p
                        className="
                            text-[#3525cd]
                            text-xs
                            font-bold
                            uppercase
                            tracking-[0.15em]
                        "
                    >
                        Simple Process
                    </p>


                    <h2
                        className="
                            text-3xl
                            sm:text-4xl
                            lg:text-[44px]
                            font-extrabold
                            tracking-[-0.04em]
                            mt-3
                        "
                    >
                        How it works
                    </h2>


                    <p
                        className="
                            text-[#777486]
                            mt-4
                            text-sm
                            sm:text-base
                        "
                    >
                        Get the help you need in three simple steps.
                    </p>

                </div>


                <div
                    className="
                        grid
                        md:grid-cols-3
                        gap-10
                        lg:gap-16
                        mt-14
                    "
                >

                    {/* STEP 1 */}

                    <div className="text-center relative">

                        <div
                            className="
                                w-20
                                h-20
                                rounded-3xl
                                bg-[#eeeaff]
                                mx-auto
                                flex
                                items-center
                                justify-center
                                text-[#3525cd]
                            "
                        >

                            <Search size={32} />

                        </div>


                        <div
                            className="
                                inline-flex
                                items-center
                                justify-center
                                w-7
                                h-7
                                rounded-full
                                bg-[#3525cd]
                                text-white
                                text-xs
                                font-bold
                                mt-5
                            "
                        >
                            01
                        </div>


                        <h3
                            className="
                                text-xl
                                font-extrabold
                                mt-4
                            "
                        >
                            Search
                        </h3>


                        <p
                            className="
                                text-sm
                                text-[#777486]
                                leading-6
                                mt-2
                                max-w-xs
                                mx-auto
                            "
                        >
                            Choose the service you need and
                            explore available professionals.
                        </p>

                    </div>


                    {/* STEP 2 */}

                    <div className="text-center relative">

                        <div
                            className="
                                w-20
                                h-20
                                rounded-3xl
                                bg-[#f0ecff]
                                mx-auto
                                flex
                                items-center
                                justify-center
                                text-[#571ac0]
                            "
                        >

                            <CalendarDays size={32} />

                        </div>


                        <div
                            className="
                                inline-flex
                                items-center
                                justify-center
                                w-7
                                h-7
                                rounded-full
                                bg-[#571ac0]
                                text-white
                                text-xs
                                font-bold
                                mt-5
                            "
                        >
                            02
                        </div>


                        <h3
                            className="
                                text-xl
                                font-extrabold
                                mt-4
                            "
                        >
                            Book
                        </h3>


                        <p
                            className="
                                text-sm
                                text-[#777486]
                                leading-6
                                mt-2
                                max-w-xs
                                mx-auto
                            "
                        >
                            Select a professional, choose a time
                            and confirm your booking.
                        </p>

                    </div>


                    {/* STEP 3 */}

                    <div className="text-center">

                        <div
                            className="
                                w-20
                                h-20
                                rounded-3xl
                                bg-[#f5f2ff]
                                mx-auto
                                flex
                                items-center
                                justify-center
                                text-[#3525cd]
                            "
                        >

                            <HomeIcon size={32} />

                        </div>


                        <div
                            className="
                                inline-flex
                                items-center
                                justify-center
                                w-7
                                h-7
                                rounded-full
                                bg-[#3525cd]
                                text-white
                                text-xs
                                font-bold
                                mt-5
                            "
                        >
                            03
                        </div>


                        <h3
                            className="
                                text-xl
                                font-extrabold
                                mt-4
                            "
                        >
                            Relax
                        </h3>


                        <p
                            className="
                                text-sm
                                text-[#777486]
                                leading-6
                                mt-2
                                max-w-xs
                                mx-auto
                            "
                        >
                            Your professional arrives at your
                            doorstep and gets the job done.
                        </p>

                    </div>

                </div>

            </section>


            {/* =====================================================
                STATS
            ===================================================== */}

            <section
                className="
                    bg-gradient-to-br
                    from-[#3525cd]
                    via-[#4436d8]
                    to-[#571ac0]
                    text-white
                    py-16
                    sm:py-20
                "
            >

                <div
                    className="
                        max-w-[1100px]
                        mx-auto
                        px-4
                        sm:px-6
                    "
                >

                    <div
                        className="
                            grid
                            grid-cols-2
                            lg:grid-cols-4
                            gap-y-10
                            lg:gap-6
                        "
                    >

                        {/* PROFESSIONALS */}

                        <div className="text-center">

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                "
                            >

                                <Users size={20} />

                                <h2
                                    className="
                                        text-3xl
                                        sm:text-4xl
                                        font-extrabold
                                    "
                                >
                                    500+
                                </h2>

                            </div>

                            <p
                                className="
                                    text-sm
                                    text-white/75
                                    mt-2
                                "
                            >
                                Professionals
                            </p>

                        </div>


                        {/* CUSTOMERS */}

                        <div className="text-center">

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-center
                                "
                            >

                                <h2
                                    className="
                                        text-3xl
                                        sm:text-4xl
                                        font-extrabold
                                    "
                                >
                                    10K+
                                </h2>

                            </div>

                            <p
                                className="
                                    text-sm
                                    text-white/75
                                    mt-2
                                "
                            >
                                Happy Customers
                            </p>

                        </div>


                        {/* SERVICES */}

                        <div className="text-center">

                            <h2
                                className="
                                    text-3xl
                                    sm:text-4xl
                                    font-extrabold
                                "
                            >
                                35+
                            </h2>

                            <p
                                className="
                                    text-sm
                                    text-white/75
                                    mt-2
                                "
                            >
                                Services
                            </p>

                        </div>


                        {/* RATING */}

                        <div className="text-center">

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-center
                                    gap-1.5
                                "
                            >

                                <h2
                                    className="
                                        text-3xl
                                        sm:text-4xl
                                        font-extrabold
                                    "
                                >
                                    4.9
                                </h2>

                                <Star
                                    size={21}
                                    fill="currentColor"
                                />

                            </div>

                            <p
                                className="
                                    text-sm
                                    text-white/75
                                    mt-2
                                "
                            >
                                Average Rating
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                CTA
            ===================================================== */}

            <section
                className="
                    max-w-[1280px]
                    mx-auto
                    px-4
                    sm:px-6
                    lg:px-8
                    py-16
                    sm:py-24
                "
            >

                <div
                    className="
                        relative
                        overflow-hidden
                        rounded-[28px]
                        bg-gradient-to-br
                        from-[#3525cd]
                        to-[#571ac0]
                        text-white
                        px-6
                        sm:px-12
                        lg:px-16
                        py-12
                        sm:py-16
                        text-center
                    "
                >

                    {/* DECORATIVE CIRCLES */}

                    <div
                        className="
                            absolute
                            -top-20
                            -right-20
                            w-56
                            h-56
                            rounded-full
                            bg-white/10
                        "
                    />

                    <div
                        className="
                            absolute
                            -bottom-24
                            -left-16
                            w-64
                            h-64
                            rounded-full
                            bg-white/10
                        "
                    />


                    <div className="relative z-10">

                        <div
                            className="
                                inline-flex
                                items-center
                                gap-2
                                px-3
                                py-1.5
                                rounded-full
                                bg-white/10
                                border
                                border-white/15
                                text-xs
                                font-semibold
                            "
                        >

                            <Sparkles size={14} />

                            Your trusted service marketplace

                        </div>


                        <h2
                            className="
                                text-3xl
                                sm:text-4xl
                                lg:text-5xl
                                font-extrabold
                                tracking-[-0.04em]
                                mt-5
                            "
                        >
                            Need a professional today?
                        </h2>


                        <p
                            className="
                                mt-4
                                text-white/75
                                text-sm
                                sm:text-base
                                max-w-xl
                                mx-auto
                                leading-7
                            "
                        >
                            Find trusted professionals and book
                            reliable home services in just a few clicks.
                        </p>


                        <button
                            onClick={handleExploreServices}
                            className="
                                mt-8
                                inline-flex
                                items-center
                                justify-center
                                gap-2
                                bg-white
                                text-[#3525cd]
                                px-6
                                sm:px-8
                                py-3.5
                                rounded-xl
                                font-bold
                                text-sm
                                shadow-lg
                                hover:-translate-y-0.5
                                hover:shadow-xl
                                transition-all
                            "
                        >

                            Explore Services

                            <ArrowRight size={18} />

                        </button>

                    </div>

                </div>

            </section>


            {/* =====================================================
                FOOTER
            ===================================================== */}

            <Footer />

        </div>

    );

}


export default Home;