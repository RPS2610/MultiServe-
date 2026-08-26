import { useNavigate } from "react-router-dom";

import {
    FaMapMarkerAlt,
    FaStar,
    FaBriefcase,
    FaArrowRight
} from "react-icons/fa";

function ProviderCard({ provider }) {

    const navigate = useNavigate();

    const handleBookNow = () => {

        navigate(`/provider/${provider._id}`);

    };

    return (

        <div className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 overflow-hidden">

            <div className="flex flex-col md:flex-row">

                <div className="md:w-64 bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center p-8">

                    <img
                        src="https://placehold.co/180x180"
                        alt={provider.name}
                        className="w-40 h-40 rounded-full border-4 border-white shadow-xl"
                    />

                </div>

                <div className="flex-1 p-8">

                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">

                        <div>

                            <h2 className="text-3xl font-bold">

                                {provider.name}

                            </h2>

                            <p className="text-blue-600 font-semibold mt-2">

                                {provider.service}

                            </p>

                            <div className="flex items-center gap-2 mt-4">

                                <FaStar className="text-yellow-500" />

                                <span className="font-semibold">

                                    4.8

                                </span>

                                <span className="text-gray-500">

                                    (250+ Reviews)

                                </span>

                            </div>

                        </div>

                        <div className="mt-6 lg:mt-0 text-right">

                            <h3 className="text-4xl font-bold text-blue-700">

                                ₹{provider.price}

                            </h3>

                            <p className="text-gray-500">

                                Starting Price

                            </p>

                        </div>

                    </div>

                    <div className="grid md:grid-cols-2 gap-5 mt-8">

                        <div className="bg-gray-50 rounded-xl p-4">

                            <div className="flex items-center gap-3">

                                <FaBriefcase className="text-blue-600 text-xl" />

                                <div>

                                    <p className="text-gray-500">

                                        Experience

                                    </p>

                                    <h4 className="font-bold">

                                        {provider.experience} Years

                                    </h4>

                                </div>

                            </div>

                        </div>

                        <div className="bg-gray-50 rounded-xl p-4">

                            <div className="flex items-center gap-3">

                                <FaMapMarkerAlt className="text-red-500 text-xl" />

                                <div>

                                    <p className="text-gray-500">

                                        Location

                                    </p>

                                    <h4 className="font-bold">

                                        {provider.city}

                                    </h4>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="flex flex-wrap gap-3 mt-8">

                        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">

                            ✔ Verified Professional

                        </span>

                        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">

                            ⭐ Top Rated

                        </span>

                        <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">

                            ⚡ Quick Service

                        </span>

                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center mt-10">

                        <div>

                            <p className="text-gray-500">

                                Usually responds within

                            </p>

                            <h4 className="text-green-600 font-bold text-lg">

                                15 Minutes

                            </h4>

                        </div>

                        <button
                            onClick={handleBookNow}
                            className="mt-5 md:mt-0 bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-3"
                        >

                            Book Now

                            <FaArrowRight />

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default ProviderCard;