import { useNavigate } from "react-router-dom";

import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaTwitter,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaArrowRight,
    FaCheckCircle
} from "react-icons/fa";

function Footer() {

    const navigate = useNavigate();

    const goHome = () => {

        navigate("/");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };

    const goToServices = () => {

        if (window.location.pathname === "/") {

            document.getElementById("services")?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        } else {

            navigate("/");

            setTimeout(() => {

                document.getElementById("services")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }, 300);

        }

    };

    const goToService = (service) => {

        navigate(`/providers/${encodeURIComponent(service)}`);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };

    const goToAbout = () => {

        navigate("/about");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };

    return (

        <footer className="mt-24 bg-[#11111a] text-white">

            {/* ================= TOP CTA ================= */}

            <div className="max-w-7xl mx-auto px-5 sm:px-6 pt-14 sm:pt-16">

                <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#3525cd] via-[#4338ca] to-[#571ac0] px-6 py-10 sm:px-10 sm:py-12">

                    {/* Decorative elements */}

                    <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-white/10 blur-2xl" />

                    <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

                    <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

                        <div className="max-w-2xl">

                            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm">

                                <FaCheckCircle className="text-white" />

                                Trusted home services

                            </div>

                            <h2 className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">

                                Get reliable help for your home,

                                <span className="block text-white/80">

                                    whenever you need it.

                                </span>

                            </h2>

                            <p className="mt-4 max-w-xl text-sm sm:text-base leading-7 text-white/80">

                                Find verified professionals, compare services,

                                and book the right expert for your needs with

                                MultiServe.

                            </p>

                        </div>

                        <button
                            onClick={goToServices}
                            className="group inline-flex w-full sm:w-fit items-center justify-center gap-3 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#3525cd] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f5f2ff]"
                        >

                            Explore Services

                            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />

                        </button>

                    </div>

                </div>

            </div>


            {/* ================= MAIN FOOTER ================= */}

            <div className="max-w-7xl mx-auto px-5 sm:px-6 py-14 sm:py-16">

                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

                    {/* ================= BRAND ================= */}

                    <div className="lg:pr-8">

                        <button
                            onClick={goHome}
                            className="text-left"
                        >

                            <span className="text-3xl font-extrabold tracking-tight">

                                Multi<span className="text-[#6d63f5]">Serve</span>

                            </span>

                        </button>

                        <p className="mt-5 text-sm leading-7 text-white/60">

                            Your trusted platform for finding and booking

                            reliable home service professionals. From repairs

                            and cleaning to maintenance and shifting, we make

                            everyday services simple and convenient.

                        </p>


                        {/* Social Icons */}

                        <div className="mt-7 flex items-center gap-3">

                            <a
                                href="#"
                                aria-label="Facebook"
                                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/60 transition-all duration-300 hover:-translate-y-1 hover:bg-[#3525cd] hover:text-white"
                            >
                                <FaFacebookF />
                            </a>

                            <a
                                href="#"
                                aria-label="Instagram"
                                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/60 transition-all duration-300 hover:-translate-y-1 hover:bg-[#3525cd] hover:text-white"
                            >
                                <FaInstagram />
                            </a>

                            <a
                                href="#"
                                aria-label="Twitter"
                                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/60 transition-all duration-300 hover:-translate-y-1 hover:bg-[#3525cd] hover:text-white"
                            >
                                <FaTwitter />
                            </a>

                            <a
                                href="#"
                                aria-label="LinkedIn"
                                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/60 transition-all duration-300 hover:-translate-y-1 hover:bg-[#3525cd] hover:text-white"
                            >
                                <FaLinkedinIn />
                            </a>

                        </div>

                    </div>


                    {/* ================= POPULAR SERVICES ================= */}

                    <div>

                        <h3 className="text-sm font-bold uppercase tracking-wider text-white">

                            Popular Services

                        </h3>

                        <ul className="mt-6 space-y-4">

                            <li>

                                <button
                                    onClick={() => goToService("Electrician")}
                                    className="group flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
                                >

                                    <span>Electrician</span>

                                    <FaArrowRight className="text-[10px] opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />

                                </button>

                            </li>

                            <li>

                                <button
                                    onClick={() => goToService("Plumber")}
                                    className="group flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
                                >

                                    <span>Plumber</span>

                                    <FaArrowRight className="text-[10px] opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />

                                </button>

                            </li>

                            <li>

                                <button
                                    onClick={() => goToService("AC Repair")}
                                    className="group flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
                                >

                                    <span>AC Repair</span>

                                    <FaArrowRight className="text-[10px] opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />

                                </button>

                            </li>

                            <li>

                                <button
                                    onClick={() => goToService("Carpenter")}
                                    className="group flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
                                >

                                    <span>Carpenter</span>

                                    <FaArrowRight className="text-[10px] opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />

                                </button>

                            </li>

                            <li>

                                <button
                                    onClick={() => goToService("Painter")}
                                    className="group flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
                                >

                                    <span>Painter</span>

                                    <FaArrowRight className="text-[10px] opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />

                                </button>

                            </li>

                            <li>

                                <button
                                    onClick={() => goToService("Cleaning")}
                                    className="group flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
                                >

                                    <span>Home Cleaning</span>

                                    <FaArrowRight className="text-[10px] opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />

                                </button>

                            </li>

                            <li>

                                <button
                                    onClick={() => goToService("Shifting")}
                                    className="group flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
                                >

                                    <span>House Shifting</span>

                                    <FaArrowRight className="text-[10px] opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />

                                </button>

                            </li>

                        </ul>

                    </div>


                    {/* ================= QUICK LINKS ================= */}

                    <div>

                        <h3 className="text-sm font-bold uppercase tracking-wider text-white">

                            Quick Links

                        </h3>

                        <ul className="mt-6 space-y-4">

                            <li>

                                <button
                                    onClick={goHome}
                                    className="text-sm text-white/60 transition hover:text-white"
                                >

                                    Home

                                </button>

                            </li>

                            <li>

                                <button
                                    onClick={goToServices}
                                    className="text-sm text-white/60 transition hover:text-white"
                                >

                                    Services

                                </button>

                            </li>

                            <li>

                                <button
                                    onClick={goToAbout}
                                    className="text-sm text-white/60 transition hover:text-white"
                                >

                                    About Us

                                </button>

                            </li>

                            <li>

                                <button
                                    onClick={() => window.scrollTo({
                                        top: 0,
                                        behavior: "smooth"
                                    })}
                                    className="text-sm text-white/60 transition hover:text-white"
                                >

                                    Contact

                                </button>

                            </li>

                            <li>

                                <button
                                    className="text-sm text-white/60 transition hover:text-white"
                                >

                                    Privacy Policy

                                </button>

                            </li>

                            <li>

                                <button
                                    className="text-sm text-white/60 transition hover:text-white"
                                >

                                    Terms & Conditions

                                </button>

                            </li>

                        </ul>

                    </div>


                    {/* ================= CONTACT ================= */}

                    <div>

                        <h3 className="text-sm font-bold uppercase tracking-wider text-white">

                            Contact Us

                        </h3>

                        <div className="mt-6 space-y-5">

                            <div className="flex items-start gap-4">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#3525cd]/15 text-[#8b84ff]">

                                    <FaPhoneAlt className="text-sm" />

                                </div>

                                <div>

                                    <p className="text-xs text-white/40">

                                        Phone

                                    </p>

                                    <p className="mt-1 text-sm text-white/70">

                                        +91 9876543210

                                    </p>

                                </div>

                            </div>


                            <div className="flex items-start gap-4">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#3525cd]/15 text-[#8b84ff]">

                                    <FaEnvelope className="text-sm" />

                                </div>

                                <div>

                                    <p className="text-xs text-white/40">

                                        Email

                                    </p>

                                    <p className="mt-1 text-sm text-white/70 break-all">

                                        support@multiserve.com

                                    </p>

                                </div>

                            </div>


                            <div className="flex items-start gap-4">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#3525cd]/15 text-[#8b84ff]">

                                    <FaMapMarkerAlt className="text-sm" />

                                </div>

                                <div>

                                    <p className="text-xs text-white/40">

                                        Location

                                    </p>

                                    <p className="mt-1 text-sm leading-6 text-white/70">

                                        Varanasi, Uttar Pradesh, India

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ================= BOTTOM ================= */}

                <div className="mt-14 border-t border-white/10 pt-7">

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                        <p className="text-xs sm:text-sm text-white/40">

                            © 2026 MultiServe. All Rights Reserved.

                        </p>

                        <p className="text-xs sm:text-sm text-white/40">

                            Made with <span className="text-red-400">♥</span> by Team MultiServe

                        </p>

                    </div>

                </div>

            </div>

        </footer>

    );

}

export default Footer;