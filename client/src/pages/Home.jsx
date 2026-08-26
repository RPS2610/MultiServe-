import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import ServiceCard from "../components/ServiceCard";
import Footer from "../components/Footer";

import { getAllServices } from "../api/serviceApi";

function Home() {

    const [services, setServices] = useState([]);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {

        try {

            const data = await getAllServices();

            setServices(data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleExploreServices = () => {

        const servicesSection =
            document.getElementById("services");

        if (servicesSection) {

            servicesSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    };

    return (

        <>

            <Navbar />

            <Hero />

            <SearchBar />

            <section
                id="services"
                className="max-w-7xl mx-auto px-6 py-20 scroll-mt-24"
            >

                <div className="text-center mb-14">

                    <p className="text-blue-600 font-semibold uppercase tracking-wider">

                        What We Offer

                    </p>

                    <h2 className="text-5xl font-bold mt-3">

                        Popular Services

                    </h2>

                    <p className="text-gray-500 mt-5 max-w-2xl mx-auto">

                        Book trusted professionals for home repair,
                        maintenance, cleaning, appliance servicing,
                        beauty, shifting and much more.

                    </p>

                </div>


                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8">

                    {services.map((service) => (

                        <ServiceCard
                            key={service._id}
                            service={service}
                        />

                    ))}

                </div>

            </section>


            <section className="bg-gray-50 py-24">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="text-center mb-16">

                        <h2 className="text-5xl font-bold">

                            Why Choose MultiServe?

                        </h2>

                        <p className="text-gray-500 mt-5">

                            Reliable professionals, transparent pricing,
                            and hassle-free bookings.

                        </p>

                    </div>


                    <div className="grid md:grid-cols-3 gap-8">

                        <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition">

                            <div className="text-5xl mb-5">

                                🛡️

                            </div>

                            <h3 className="text-2xl font-bold">

                                Verified Experts

                            </h3>

                            <p className="text-gray-600 mt-4">

                                Every service provider is verified
                                before joining our platform.

                            </p>

                        </div>


                        <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition">

                            <div className="text-5xl mb-5">

                                ⚡

                            </div>

                            <h3 className="text-2xl font-bold">

                                Quick Booking

                            </h3>

                            <p className="text-gray-600 mt-4">

                                Book trusted professionals in
                                just a few clicks.

                            </p>

                        </div>


                        <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition">

                            <div className="text-5xl mb-5">

                                ⭐

                            </div>

                            <h3 className="text-2xl font-bold">

                                Top Rated Services

                            </h3>

                            <p className="text-gray-600 mt-4">

                                Highly rated professionals with
                                excellent customer reviews.

                            </p>

                        </div>

                    </div>

                </div>

            </section>


         <section
    id="services"
    className="max-w-7xl mx-auto px-6 py-20"
>

                <div className="text-center mb-16">

                    <h2 className="text-5xl font-bold">

                        How It Works

                    </h2>

                </div>


                <div className="grid md:grid-cols-3 gap-10">

                    <div className="text-center">

                        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-5xl mx-auto">

                            🔍

                        </div>

                        <h3 className="text-2xl font-bold mt-6">

                            Search

                        </h3>

                        <p className="text-gray-500 mt-3">

                            Choose the service you need.

                        </p>

                    </div>


                    <div className="text-center">

                        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-5xl mx-auto">

                            📅

                        </div>

                        <h3 className="text-2xl font-bold mt-6">

                            Book

                        </h3>

                        <p className="text-gray-500 mt-3">

                            Fill your details and confirm
                            the booking instantly.

                        </p>

                    </div>


                    <div className="text-center">

                        <div className="w-24 h-24 rounded-full bg-yellow-100 flex items-center justify-center text-5xl mx-auto">

                            🏡

                        </div>

                        <h3 className="text-2xl font-bold mt-6">

                            Relax

                        </h3>

                        <p className="text-gray-500 mt-3">

                            Our professional reaches your
                            doorstep on time.

                        </p>

                    </div>

                </div>

            </section>


            <section className="bg-blue-600 text-white py-20">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">

                        <div>

                            <h2 className="text-5xl font-bold">

                                500+

                            </h2>

                            <p className="mt-3">

                                Professionals

                            </p>

                        </div>


                        <div>

                            <h2 className="text-5xl font-bold">

                                10K+

                            </h2>

                            <p className="mt-3">

                                Happy Customers

                            </p>

                        </div>


                        <div>

                            <h2 className="text-5xl font-bold">

                                35+

                            </h2>

                            <p className="mt-3">

                                Services

                            </p>

                        </div>


                        <div>

                            <h2 className="text-5xl font-bold">

                                4.9★

                            </h2>

                            <p className="mt-3">

                                Average Rating

                            </p>

                        </div>

                    </div>

                </div>

            </section>


            <section className="max-w-7xl mx-auto py-24 px-6">

                <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-16 text-center">

                    <h2 className="text-5xl font-bold">

                        Need a Professional Today?

                    </h2>

                    <p className="mt-5 text-lg">

                        Book trusted home services within minutes.

                    </p>


                    <button
                        onClick={handleExploreServices}
                        className="
                            mt-10
                            bg-white
                            text-blue-700
                            px-10
                            py-4
                            rounded-xl
                            font-bold
                            hover:scale-105
                            transition
                        "
                    >

                        Explore Services

                    </button>

                </div>

            </section>


            <Footer />

        </>

    );

}

export default Home;