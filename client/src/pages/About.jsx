import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {

    const navigate = useNavigate();

    return (
        <>
            <Navbar />

            <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white">

                <div className="max-w-7xl mx-auto px-6 py-24 text-center">

                    <p className="text-blue-200 font-semibold uppercase tracking-widest">

                        About MultiServe

                    </p>

                    <h1 className="text-5xl lg:text-7xl font-extrabold mt-5">

                        Making Home Services

                        <span className="text-yellow-300">
                            {" "}Simple
                        </span>

                    </h1>

                    <p className="max-w-3xl mx-auto text-xl text-blue-100 mt-7 leading-8">

                        MultiServe is a one-stop platform that connects
                        customers with trusted professionals for reliable,
                        affordable and convenient home services.

                    </p>

                </div>

            </section>

            <section className="max-w-7xl mx-auto px-6 py-24">

                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    <div>

                        <p className="text-blue-600 font-semibold uppercase tracking-wider">

                            Who We Are

                        </p>

                        <h2 className="text-4xl lg:text-5xl font-bold mt-4">

                            Your Trusted Partner for Everyday Home Services

                        </h2>

                        <p className="text-gray-600 text-lg leading-8 mt-7">

                            Finding a reliable professional for home repairs
                            and maintenance can often be difficult and time
                            consuming. MultiServe was created to make this
                            process easier.

                        </p>

                        <p className="text-gray-600 text-lg leading-8 mt-5">

                            Our platform brings different home services
                            together in one place. Customers can explore
                            services, view available professionals, compare
                            their details and book the service they need
                            with just a few clicks.

                        </p>

                        <p className="text-gray-600 text-lg leading-8 mt-5">

                            Whether you need an electrician, plumber,
                            carpenter, painter, cleaner, AC technician,
                            gardener or shifting professional, MultiServe
                            helps you find the right person for the job.

                        </p>

                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-10">

                        <div className="grid grid-cols-2 gap-6">

                            <div className="bg-white rounded-2xl p-7 text-center shadow-md">

                                <div className="text-5xl">
                                    👨‍🔧
                                </div>

                                <h3 className="text-3xl font-bold text-blue-600 mt-4">
                                    500+
                                </h3>

                                <p className="text-gray-500 mt-2">
                                    Professionals
                                </p>

                            </div>

                            <div className="bg-white rounded-2xl p-7 text-center shadow-md">

                                <div className="text-5xl">
                                    🏠
                                </div>

                                <h3 className="text-3xl font-bold text-blue-600 mt-4">
                                    35+
                                </h3>

                                <p className="text-gray-500 mt-2">
                                    Services
                                </p>

                            </div>

                            <div className="bg-white rounded-2xl p-7 text-center shadow-md">

                                <div className="text-5xl">
                                    😊
                                </div>

                                <h3 className="text-3xl font-bold text-blue-600 mt-4">
                                    10K+
                                </h3>

                                <p className="text-gray-500 mt-2">
                                    Customers
                                </p>

                            </div>

                            <div className="bg-white rounded-2xl p-7 text-center shadow-md">

                                <div className="text-5xl">
                                    ⭐
                                </div>

                                <h3 className="text-3xl font-bold text-blue-600 mt-4">
                                    4.9
                                </h3>

                                <p className="text-gray-500 mt-2">
                                    Rating
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            <section className="bg-gray-50 py-24">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="text-center mb-16">

                        <p className="text-blue-600 font-semibold uppercase tracking-wider">

                            Why MultiServe

                        </p>

                        <h2 className="text-4xl lg:text-5xl font-bold mt-3">

                            Everything You Need in One Place

                        </h2>

                        <p className="text-gray-500 max-w-2xl mx-auto mt-5 text-lg">

                            We focus on making home service booking
                            simple, transparent and convenient.

                        </p>

                    </div>

                    <div className="grid md:grid-cols-3 gap-8">

                        <div className="bg-white rounded-3xl shadow-md p-9 hover:shadow-xl transition">

                            <div className="text-5xl">
                                🛡️
                            </div>

                            <h3 className="text-2xl font-bold mt-6">
                                Trusted Professionals
                            </h3>

                            <p className="text-gray-600 mt-4 leading-7">

                                Customers can discover professionals
                                according to their required service and
                                choose the right person for their needs.

                            </p>

                        </div>

                        <div className="bg-white rounded-3xl shadow-md p-9 hover:shadow-xl transition">

                            <div className="text-5xl">
                                ⚡
                            </div>

                            <h3 className="text-2xl font-bold mt-6">
                                Easy Booking
                            </h3>

                            <p className="text-gray-600 mt-4 leading-7">

                                From selecting a service to confirming
                                a booking, MultiServe keeps the entire
                                process simple and easy to understand.

                            </p>

                        </div>

                        <div className="bg-white rounded-3xl shadow-md p-9 hover:shadow-xl transition">

                            <div className="text-5xl">
                                💰
                            </div>

                            <h3 className="text-2xl font-bold mt-6">
                                Transparent Pricing
                            </h3>

                            <p className="text-gray-600 mt-4 leading-7">

                                Customers can see the professional's
                                service and starting price before
                                making a booking.

                            </p>

                        </div>

                    </div>

                </div>

            </section>

            <section className="max-w-7xl mx-auto px-6 py-24">

                <div className="grid md:grid-cols-2 gap-10">

                    <div className="bg-blue-600 text-white rounded-3xl p-10">

                        <div className="text-5xl">
                            🎯
                        </div>

                        <h2 className="text-3xl font-bold mt-6">
                            Our Mission
                        </h2>

                        <p className="text-blue-100 mt-5 leading-8">

                            Our mission is to simplify the way people
                            find and book home services while creating
                            opportunities for skilled professionals
                            to connect with more customers.

                        </p>

                    </div>

                    <div className="bg-indigo-600 text-white rounded-3xl p-10">

                        <div className="text-5xl">
                            🚀
                        </div>

                        <h2 className="text-3xl font-bold mt-6">
                            Our Vision
                        </h2>

                        <p className="text-indigo-100 mt-5 leading-8">

                            We envision a future where anyone can find
                            a reliable home service professional quickly,
                            safely and conveniently from a single platform.

                        </p>

                    </div>

                </div>

            </section>

            <section className="max-w-7xl mx-auto px-6 pb-24">

                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl text-white text-center p-14 lg:p-20">

                    <h2 className="text-4xl lg:text-5xl font-bold">

                        Need a Professional Today?

                    </h2>

                    <p className="text-blue-100 text-lg mt-5">

                        Find the right professional and book your
                        home service in just a few clicks.

                    </p>

                    <button
                        onClick={() => navigate("/providers")}
                        className="mt-9 bg-white text-blue-700 px-10 py-4 rounded-xl font-bold hover:scale-105 transition"
                    >

                        Book a Service

                    </button>

                </div>

            </section>

            <Footer />
        </>
    );
}

export default About;