import { useNavigate } from "react-router-dom";

function Hero() {
    const navigate = useNavigate();

    const handleExploreServices = () => {
        const servicesSection = document.getElementById("services");

        if (servicesSection) {
            servicesSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    };

    const handleBookService = () => {
        navigate("/providers");
    };

    return (
        <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white">

            <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32">

                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    <div>

                        <span className="bg-white text-blue-700 px-4 py-2 rounded-full font-semibold text-sm">

                            ⭐ Trusted by 10,000+ Customers

                        </span>

                        <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mt-8">

                            Home Services

                            <br />

                            At Your

                            <span className="text-yellow-300">

                                {" "}Doorstep

                            </span>

                        </h1>

                        <p className="mt-8 text-xl text-blue-100 leading-8">

                            Book trusted professionals for

                            Electrician, Plumber,

                            AC Repair, Carpenter,

                            Cleaning,

                            Shifting and many more

                            services in just a few clicks.

                        </p>

                        <div className="flex flex-wrap gap-5 mt-10">

                            <button
                                onClick={handleBookService}
                                className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:scale-105 transition"
                            >

                                Book a Service

                            </button>

                            <button
                                onClick={handleExploreServices}
                                className="border-2 border-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-700 transition"
                            >

                                Explore Services

                            </button>

                        </div>

                        <div className="grid grid-cols-3 gap-8 mt-16">

                            <div>

                                <h2 className="text-4xl font-bold">

                                    500+

                                </h2>

                                <p className="text-blue-100 mt-2">

                                    Professionals

                                </p>

                            </div>

                            <div>

                                <h2 className="text-4xl font-bold">

                                    10K+

                                </h2>

                                <p className="text-blue-100 mt-2">

                                    Customers

                                </p>

                            </div>

                            <div>

                                <h2 className="text-4xl font-bold">

                                    4.9★

                                </h2>

                                <p className="text-blue-100 mt-2">

                                    Rating

                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="hidden lg:flex justify-center">

                        <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">

                            <h2 className="text-3xl font-bold text-gray-800 mb-8">

                                Popular Services

                            </h2>

                            <div className="space-y-5">

                                <div className="flex justify-between items-center bg-gray-100 rounded-xl p-4">

                                    <span className="text-lg">

                                        ⚡ Electrician

                                    </span>

                                    <span className="font-bold text-blue-600">

                                        ₹299+

                                    </span>

                                </div>

                                <div className="flex justify-between items-center bg-gray-100 rounded-xl p-4">

                                    <span className="text-lg">

                                        🚿 Plumber

                                    </span>

                                    <span className="font-bold text-blue-600">

                                        ₹249+

                                    </span>

                                </div>

                                <div className="flex justify-between items-center bg-gray-100 rounded-xl p-4">

                                    <span className="text-lg">

                                        ❄ AC Repair

                                    </span>

                                    <span className="font-bold text-blue-600">

                                        ₹499+

                                    </span>

                                </div>

                                <div className="flex justify-between items-center bg-gray-100 rounded-xl p-4">

                                    <span className="text-lg">

                                        🧹 Cleaning

                                    </span>

                                    <span className="font-bold text-blue-600">

                                        ₹399+

                                    </span>

                                </div>

                                <div className="flex justify-between items-center bg-gray-100 rounded-xl p-4">

                                    <span className="text-lg">

                                        🚚 Shifting

                                    </span>

                                    <span className="font-bold text-blue-600">

                                        ₹999+

                                    </span>

                                </div>

                            </div>

                            <button
                                onClick={handleBookService}
                                className="w-full mt-8 bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition"
                            >

                                Book Now

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default Hero;