import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    Award,
    CheckCircle2,
    Clock3,
    IndianRupee,
    Rocket,
    ShieldCheck,
    Sparkles,
    Target,
    Users,
    Wrench,
    Zap,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-[#fcf8ff]">

                {/* =====================================================
                    HERO
                ===================================================== */}

                <section className="relative overflow-hidden bg-[#3525cd] text-white">

                    {/* Decorative shapes */}

                    <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10" />
                    <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-[#571ac0]/40" />

                    <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">

                        <div className="mx-auto max-w-4xl text-center">

                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-indigo-100 backdrop-blur-sm">
                                <Sparkles size={14} />
                                About MultiServe
                            </div>

                            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
                                Making Home Services
                                <span className="block text-[#FACC15]">
                                    Simple & Reliable
                                </span>
                            </h1>

                            <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-indigo-100 sm:text-lg sm:leading-8 lg:text-xl">
                                MultiServe is a one-stop platform that
                                connects customers with trusted
                                professionals for reliable, affordable
                                and convenient home services.
                            </p>

                            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">

                                <button
                                    onClick={() =>
                                        navigate("/providers")
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#3525cd] shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                                >
                                    Find a Professional
                                    <ArrowRight size={17} />
                                </button>

                                <button
                                    onClick={() =>
                                        navigate("/")}
                                    className="rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/15"
                                >
                                    Explore MultiServe
                                </button>

                            </div>

                        </div>

                    </div>

                </section>

                {/* =====================================================
                    WHO WE ARE
                ===================================================== */}

                <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

                    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

                        {/* Content */}

                        <div>

                            <div className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#3525cd]">
                                <span className="h-1.5 w-7 rounded-full bg-[#3525cd]" />
                                Who We Are
                            </div>

                            <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#1b1b24] sm:text-4xl lg:text-5xl">
                                Your Trusted Partner for Everyday Home Services
                            </h2>

                            <p className="mt-6 text-base leading-7 text-[#656273] sm:text-lg sm:leading-8">
                                Finding a reliable professional for home
                                repairs and maintenance can often be
                                difficult and time consuming. MultiServe
                                was created to make this process easier.
                            </p>

                            <p className="mt-5 text-base leading-7 text-[#656273] sm:text-lg sm:leading-8">
                                Our platform brings different home services
                                together in one place. Customers can
                                explore services, view available
                                professionals, compare their details and
                                book the service they need with just a few
                                clicks.
                            </p>

                            <p className="mt-5 text-base leading-7 text-[#656273] sm:text-lg sm:leading-8">
                                Whether you need an electrician, plumber,
                                carpenter, painter, cleaner, AC technician,
                                gardener or shifting professional,
                                MultiServe helps you find the right person
                                for the job.
                            </p>

                            <div className="mt-7 flex flex-wrap gap-3">

                                <div className="inline-flex items-center gap-2 rounded-full bg-[#f0edff] px-4 py-2 text-xs font-bold text-[#3525cd]">
                                    <CheckCircle2 size={15} />
                                    Easy Booking
                                </div>

                                <div className="inline-flex items-center gap-2 rounded-full bg-[#f0edff] px-4 py-2 text-xs font-bold text-[#3525cd]">
                                    <ShieldCheck size={15} />
                                    Trusted Professionals
                                </div>

                                <div className="inline-flex items-center gap-2 rounded-full bg-[#f0edff] px-4 py-2 text-xs font-bold text-[#3525cd]">
                                    <IndianRupee size={15} />
                                    Transparent Pricing
                                </div>

                            </div>

                        </div>

                        {/* Stats */}

                        <div className="relative">

                            <div className="rounded-[28px] border border-[#e7e3f1] bg-[#f3f0ff] p-4 sm:p-6">

                                <div className="grid grid-cols-2 gap-4 sm:gap-5">

                                    {/* Professionals */}

                                    <div className="rounded-2xl bg-white p-5 shadow-[0_8px_25px_rgba(53,37,205,0.07)] sm:p-6">

                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eeeaff] text-[#3525cd]">
                                            <Users size={22} />
                                        </div>

                                        <h3 className="mt-5 text-2xl font-extrabold text-[#3525cd] sm:text-3xl">
                                            500+
                                        </h3>

                                        <p className="mt-1 text-sm font-medium text-[#777486]">
                                            Professionals
                                        </p>

                                    </div>

                                    {/* Services */}

                                    <div className="rounded-2xl bg-white p-5 shadow-[0_8px_25px_rgba(53,37,205,0.07)] sm:p-6">

                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eeeaff] text-[#3525cd]">
                                            <Wrench size={22} />
                                        </div>

                                        <h3 className="mt-5 text-2xl font-extrabold text-[#3525cd] sm:text-3xl">
                                            35+
                                        </h3>

                                        <p className="mt-1 text-sm font-medium text-[#777486]">
                                            Services
                                        </p>

                                    </div>

                                    {/* Customers */}

                                    <div className="rounded-2xl bg-white p-5 shadow-[0_8px_25px_rgba(53,37,205,0.07)] sm:p-6">

                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eeeaff] text-[#3525cd]">
                                            <Award size={22} />
                                        </div>

                                        <h3 className="mt-5 text-2xl font-extrabold text-[#3525cd] sm:text-3xl">
                                            10K+
                                        </h3>

                                        <p className="mt-1 text-sm font-medium text-[#777486]">
                                            Customers
                                        </p>

                                    </div>

                                    {/* Rating */}

                                    <div className="rounded-2xl bg-white p-5 shadow-[0_8px_25px_rgba(53,37,205,0.07)] sm:p-6">

                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff7d6] text-[#d99a00]">
                                            <span className="text-xl">
                                                ★
                                            </span>
                                        </div>

                                        <h3 className="mt-5 text-2xl font-extrabold text-[#3525cd] sm:text-3xl">
                                            4.9
                                        </h3>

                                        <p className="mt-1 text-sm font-medium text-[#777486]">
                                            Average Rating
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>

                {/* =====================================================
                    WHY MULTISERVE
                ===================================================== */}

                <section className="border-y border-[#ebe7f3] bg-[#f5f2ff] py-16 sm:py-20 lg:py-24">

                    <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">

                            <div className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#3525cd]">
                                <span className="h-1.5 w-7 rounded-full bg-[#3525cd]" />
                                Why MultiServe
                            </div>

                            <h2 className="text-3xl font-bold tracking-tight text-[#1b1b24] sm:text-4xl lg:text-5xl">
                                Everything You Need in One Place
                            </h2>

                            <p className="mt-4 text-sm leading-6 text-[#777486] sm:text-base sm:leading-7">
                                We focus on making home service booking
                                simple, transparent and convenient.
                            </p>

                        </div>

                        <div className="grid gap-5 md:grid-cols-3">

                            {/* Trusted */}

                            <div className="group rounded-[24px] border border-[#e7e3f0] bg-white p-7 shadow-[0_8px_25px_rgba(53,37,205,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(53,37,205,0.10)] sm:p-8">

                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eeeaff] text-[#3525cd] transition group-hover:scale-105">
                                    <ShieldCheck size={27} />
                                </div>

                                <h3 className="mt-6 text-xl font-bold text-[#1b1b24]">
                                    Trusted Professionals
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-[#6e6b7a] sm:text-base sm:leading-7">
                                    Customers can discover professionals
                                    according to their required service
                                    and choose the right person for their
                                    needs.
                                </p>

                                <div className="mt-6 flex items-center gap-2 text-xs font-bold text-[#3525cd]">
                                    <CheckCircle2 size={15} />
                                    Find the right expert
                                </div>

                            </div>

                            {/* Booking */}

                            <div className="group rounded-[24px] border border-[#e7e3f0] bg-white p-7 shadow-[0_8px_25px_rgba(53,37,205,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(53,37,205,0.10)] sm:p-8">

                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eeeaff] text-[#3525cd] transition group-hover:scale-105">
                                    <Zap size={27} />
                                </div>

                                <h3 className="mt-6 text-xl font-bold text-[#1b1b24]">
                                    Easy Booking
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-[#6e6b7a] sm:text-base sm:leading-7">
                                    From selecting a service to confirming
                                    a booking, MultiServe keeps the entire
                                    process simple and easy to understand.
                                </p>

                                <div className="mt-6 flex items-center gap-2 text-xs font-bold text-[#3525cd]">
                                    <Clock3 size={15} />
                                    Save time and effort
                                </div>

                            </div>

                            {/* Pricing */}

                            <div className="group rounded-[24px] border border-[#e7e3f0] bg-white p-7 shadow-[0_8px_25px_rgba(53,37,205,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(53,37,205,0.10)] sm:p-8">

                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eeeaff] text-[#3525cd] transition group-hover:scale-105">
                                    <IndianRupee size={27} />
                                </div>

                                <h3 className="mt-6 text-xl font-bold text-[#1b1b24]">
                                    Transparent Pricing
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-[#6e6b7a] sm:text-base sm:leading-7">
                                    Customers can see the professional's
                                    service and starting price before
                                    making a booking.
                                </p>

                                <div className="mt-6 flex items-center gap-2 text-xs font-bold text-[#3525cd]">
                                    <CheckCircle2 size={15} />
                                    Know before you book
                                </div>

                            </div>

                        </div>

                    </div>

                </section>

                {/* =====================================================
                    MISSION + VISION
                ===================================================== */}

                <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

                    <div className="grid gap-6 lg:grid-cols-2">

                        {/* Mission */}

                        <div className="relative overflow-hidden rounded-[28px] bg-[#3525cd] p-7 text-white sm:p-10">

                            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />

                            <div className="relative">

                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                                    <Target size={28} />
                                </div>

                                <p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-indigo-200">
                                    Our Mission
                                </p>

                                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                                    Making service discovery effortless.
                                </h2>

                                <p className="mt-5 text-sm leading-7 text-indigo-100 sm:text-base sm:leading-8">
                                    Our mission is to simplify the way
                                    people find and book home services
                                    while creating opportunities for
                                    skilled professionals to connect with
                                    more customers.
                                </p>

                            </div>

                        </div>

                        {/* Vision */}

                        <div className="relative overflow-hidden rounded-[28px] bg-[#571ac0] p-7 text-white sm:p-10">

                            <div className="absolute -bottom-20 -right-10 h-52 w-52 rounded-full bg-white/10" />

                            <div className="relative">

                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                                    <Rocket size={28} />
                                </div>

                                <p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-purple-200">
                                    Our Vision
                                </p>

                                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                                    A simpler future for every home.
                                </h2>

                                <p className="mt-5 text-sm leading-7 text-purple-100 sm:text-base sm:leading-8">
                                    We envision a future where anyone can
                                    find a reliable home service
                                    professional quickly, safely and
                                    conveniently from a single platform.
                                </p>

                            </div>

                        </div>

                    </div>

                </section>

                {/* =====================================================
                    HOW MULTISERVE HELPS
                ===================================================== */}

                <section className="bg-white py-16 sm:py-20">

                    <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">

                            <div>

                                <div className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#3525cd]">
                                    <span className="h-1.5 w-7 rounded-full bg-[#3525cd]" />
                                    Simple Process
                                </div>

                                <h2 className="text-3xl font-bold tracking-tight text-[#1b1b24] sm:text-4xl">
                                    From problem to solution in a few simple steps.
                                </h2>

                                <p className="mt-5 text-sm leading-7 text-[#777486] sm:text-base">
                                    MultiServe brings the complete service
                                    discovery and booking journey together
                                    in one convenient platform.
                                </p>

                            </div>

                            <div className="grid gap-4 sm:grid-cols-3">

                                <div className="rounded-2xl border border-[#e8e4f1] bg-[#fcfaff] p-5">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3525cd] text-sm font-extrabold text-white">
                                        01
                                    </div>

                                    <h3 className="mt-5 font-bold text-[#1b1b24]">
                                        Choose
                                    </h3>

                                    <p className="mt-2 text-xs leading-5 text-[#777486]">
                                        Find the service you need.
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-[#e8e4f1] bg-[#fcfaff] p-5">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3525cd] text-sm font-extrabold text-white">
                                        02
                                    </div>

                                    <h3 className="mt-5 font-bold text-[#1b1b24]">
                                        Compare
                                    </h3>

                                    <p className="mt-2 text-xs leading-5 text-[#777486]">
                                        Explore professionals and pricing.
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-[#e8e4f1] bg-[#fcfaff] p-5">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3525cd] text-sm font-extrabold text-white">
                                        03
                                    </div>

                                    <h3 className="mt-5 font-bold text-[#1b1b24]">
                                        Book
                                    </h3>

                                    <p className="mt-2 text-xs leading-5 text-[#777486]">
                                        Confirm your service in minutes.
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </section>

                {/* =====================================================
                    CTA
                ===================================================== */}

                <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

                    <div className="relative overflow-hidden rounded-[30px] bg-[#3525cd] px-6 py-14 text-center text-white sm:px-10 sm:py-16 lg:px-20 lg:py-20">

                        <div className="absolute -left-20 -top-24 h-64 w-64 rounded-full bg-white/10" />
                        <div className="absolute -bottom-28 -right-20 h-72 w-72 rounded-full bg-[#571ac0]/50" />

                        <div className="relative">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                                <Wrench size={27} />
                            </div>

                            <h2 className="mt-6 text-3xl font-bold sm:text-4xl lg:text-5xl">
                                Need a Professional Today?
                            </h2>

                            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-indigo-100 sm:text-base">
                                Find the right professional and book your
                                home service in just a few clicks.
                            </p>

                            <button
                                onClick={() =>
                                    navigate("/providers")
                                }
                                className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-[#3525cd] shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                            >
                                Book a Service
                                <ArrowRight size={17} />
                            </button>

                        </div>

                    </div>

                </section>

            </main>

            <Footer />
        </>
    );
}

export default About;