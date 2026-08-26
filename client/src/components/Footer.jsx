import { useNavigate } from "react-router-dom";

import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaTwitter,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt
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

        <footer className="bg-slate-900 text-white mt-20">

            <div className="max-w-7xl mx-auto px-6 py-16">

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

                    <div>

                        <h2
                            onClick={goHome}
                            className="text-3xl font-bold text-blue-400 cursor-pointer"
                        >
                            MultiServe
                        </h2>

                        <p className="mt-6 text-gray-300 leading-7">

                            MultiServe is your trusted platform for
                            finding and booking verified home service
                            professionals. From repairs and cleaning
                            to shifting and maintenance, we make
                            everyday home services simple and convenient.

                        </p>

                        <div className="flex gap-4 mt-8">

                            <div className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full cursor-pointer transition">

                                <FaFacebookF />

                            </div>

                            <div className="bg-pink-600 hover:bg-pink-700 p-3 rounded-full cursor-pointer transition">

                                <FaInstagram />

                            </div>

                            <div className="bg-sky-500 hover:bg-sky-600 p-3 rounded-full cursor-pointer transition">

                                <FaTwitter />

                            </div>

                            <div className="bg-blue-800 hover:bg-blue-900 p-3 rounded-full cursor-pointer transition">

                                <FaLinkedinIn />

                            </div>

                        </div>

                    </div>

                    <div>

                        <h3 className="text-2xl font-bold mb-6">

                            Popular Services

                        </h3>

                        <ul className="space-y-4 text-gray-300">

                            <li
                                onClick={() => goToService("Electrician")}
                                className="hover:text-white cursor-pointer transition"
                            >
                                ⚡ Electrician
                            </li>

                            <li
                                onClick={() => goToService("Plumber")}
                                className="hover:text-white cursor-pointer transition"
                            >
                                🚿 Plumber
                            </li>

                            <li
                                onClick={() => goToService("AC Repair")}
                                className="hover:text-white cursor-pointer transition"
                            >
                                ❄ AC Repair
                            </li>

                            <li
                                onClick={() => goToService("Carpenter")}
                                className="hover:text-white cursor-pointer transition"
                            >
                                🪚 Carpenter
                            </li>

                            <li
                                onClick={() => goToService("Painter")}
                                className="hover:text-white cursor-pointer transition"
                            >
                                🎨 Painter
                            </li>

                            <li
                                onClick={() => goToService("Cleaning")}
                                className="hover:text-white cursor-pointer transition"
                            >
                                🧹 Home Cleaning
                            </li>

                            <li
                                onClick={() => goToService("Shifting")}
                                className="hover:text-white cursor-pointer transition"
                            >
                                🚚 House Shifting
                            </li>

                        </ul>

                    </div>

                    <div>

                        <h3 className="text-2xl font-bold mb-6">

                            Quick Links

                        </h3>

                        <ul className="space-y-4 text-gray-300">

                            <li
                                onClick={goHome}
                                className="hover:text-white cursor-pointer transition"
                            >
                                Home
                            </li>

                            <li
                                onClick={goToServices}
                                className="hover:text-white cursor-pointer transition"
                            >
                                Services
                            </li>

                            <li
                                onClick={goToAbout}
                                className="hover:text-white cursor-pointer transition"
                            >
                                About Us
                            </li>

                            <li className="hover:text-white cursor-pointer">
                                  Contact
                            </li>

                            <li className="hover:text-white cursor-pointer transition">

                                Privacy Policy

                            </li>

                            <li className="hover:text-white cursor-pointer transition">

                                Terms & Conditions

                            </li>

                        </ul>

                    </div>

                    <div>

                        <h3 className="text-2xl font-bold mb-6">

                            Contact Us

                        </h3>

                        <div className="space-y-5 text-gray-300">

                            <div className="flex items-center gap-4">

                                <FaPhoneAlt className="text-blue-400" />

                                +91 9876543210

                            </div>

                            <div className="flex items-center gap-4">

                                <FaEnvelope className="text-blue-400" />

                                support@multiserve.com

                            </div>

                            <div className="flex items-start gap-4">

                                <FaMapMarkerAlt className="text-blue-400 mt-1" />

                                Varanasi,
                                Uttar Pradesh,
                                India

                            </div>

                        </div>

                    </div>

                </div>

                <div className="border-t border-slate-700 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center">

                    <p className="text-gray-400">

                        © 2026 MultiServe. All Rights Reserved.

                    </p>

                    <p className="text-gray-400 mt-4 md:mt-0">

                        Made with ❤️ by Team MultiServe

                    </p>

                </div>

            </div>

        </footer>

    );
}

export default Footer;