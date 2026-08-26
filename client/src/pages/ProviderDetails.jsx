import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { getProviderById } from "../api/providerApi";
import { getProviderReviews } from "../api/reviewApi";

import {
    FaMapMarkerAlt,
    FaBriefcase,
    FaStar,
    FaRupeeSign,
    FaCheckCircle
} from "react-icons/fa";

function ProviderDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [provider, setProvider] = useState(null);

    const [reviews, setReviews] = useState([]);

    useEffect(() => {

        fetchProvider();

        fetchReviews();

    }, []);

    const fetchProvider = async () => {

        try {

            const data = await getProviderById(id);

            setProvider(data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const fetchReviews = async () => {

        try {

            const data = await getProviderReviews(id);

            setReviews(data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const averageRating =
        reviews.length > 0
            ? (
                  reviews.reduce(
                      (sum, item) => sum + item.rating,
                      0
                  ) / reviews.length
              ).toFixed(1)
            : "0.0";

    if (!provider) {

        return (
            <>
                <Navbar />

                <div className="text-center py-32">

                    <h1 className="text-3xl font-bold">

                        Loading...

                    </h1>

                </div>

            </>
        );

    }

    return (

        <>

            <Navbar />

            {/* Hero */}

            <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">

                <div className="max-w-7xl mx-auto px-6 py-16">

                    <div className="flex flex-col lg:flex-row items-center gap-12">

                        <img

                            src="https://placehold.co/250x250"

                            alt={provider.name}

                            className="w-60 h-60 rounded-full border-4 border-white shadow-2xl"

                        />

                        <div className="flex-1">

                            <h1 className="text-5xl font-bold">

                                {provider.name}

                            </h1>

                            <p className="text-2xl mt-3 text-blue-100">

                                {provider.service}

                            </p>

                            <div className="flex flex-wrap gap-5 mt-8">

                                <div className="bg-white text-gray-900 rounded-xl px-5 py-3">

                                    ⭐ {averageRating} Rating

                                </div>

                                <div className="bg-white text-gray-900 rounded-xl px-5 py-3">

                                    {reviews.length} Reviews

                                </div>

                                <div className="bg-white text-gray-900 rounded-xl px-5 py-3">

                                    Verified Professional

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            <div className="max-w-7xl mx-auto px-6 py-14">

                <div className="grid lg:grid-cols-3 gap-10">

                    {/* Left */}

                    <div className="lg:col-span-2">

                        <div className="bg-white rounded-3xl shadow-lg p-8">

                            <h2 className="text-3xl font-bold mb-8">

                                About Professional

                            </h2>

                            <p className="text-gray-600 leading-8">

                                {provider.about || "Experienced professional providing high-quality doorstep services with customer satisfaction."}

                            </p>

                        </div>

                        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

                            <h2 className="text-3xl font-bold mb-8">

                                Customer Reviews

                            </h2>

                            {

                                reviews.length === 0 ?

                                    (

                                        <div className="text-gray-500">

                                            No Reviews Yet

                                        </div>

                                    )

                                    :

                                    <div className="space-y-6">

                                        {

                                            reviews.map((item) => (

                                                <div

                                                    key={item._id}

                                                    className="border rounded-2xl p-6"

                                                >

                                                    <div className="flex justify-between">

                                                        <div>

                                                            <h3 className="font-bold text-xl">

                                                                {item.customerId?.name}

                                                            </h3>

                                                            <p className="text-gray-500 mt-1">

                                                                {new Date(item.createdAt).toLocaleDateString()}

                                                            </p>

                                                        </div>

                                                        <div className="text-yellow-500 font-bold">

                                                            {"⭐".repeat(item.rating)}

                                                        </div>

                                                    </div>

                                                    <p className="mt-5 text-gray-700">

                                                        {item.review}

                                                    </p>

                                                </div>

                                            ))

                                        }

                                    </div>

                            }

                        </div>

                    </div>

                    {/* Right */}

                    <div>

                        <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-24">

                            <h2 className="text-4xl font-bold text-blue-700">

                                ₹{provider.price}

                            </h2>

                            <p className="text-gray-500">

                                Starting Price

                            </p>

                            <div className="space-y-6 mt-10">

                                <div className="flex items-center gap-4">

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

                                <div className="flex items-center gap-4">

                                    <FaMapMarkerAlt className="text-red-500 text-xl" />

                                    <div>

                                        <p className="text-gray-500">

                                            City

                                        </p>

                                        <h4 className="font-bold">

                                            {provider.city}

                                        </h4>

                                    </div>

                                </div>

                                <div className="flex items-center gap-4">

                                    <FaRupeeSign className="text-green-600 text-xl" />

                                    <div>

                                        <p className="text-gray-500">

                                            Address

                                        </p>

                                        <h4 className="font-bold">

                                            {provider.address}

                                        </h4>

                                    </div>

                                </div>

                            </div>

                            <div className="mt-10 space-y-3">

                                <div className="flex items-center gap-3">

                                    <FaCheckCircle className="text-green-600" />

                                    Verified Professional

                                </div>

                                <div className="flex items-center gap-3">

                                    <FaCheckCircle className="text-green-600" />

                                    Secure Booking

                                </div>

                                <div className="flex items-center gap-3">

                                    <FaCheckCircle className="text-green-600" />

                                    Affordable Pricing

                                </div>

                            </div>

                            <button

                                onClick={() => navigate(`/book/${provider._id}`)}

                                className="w-full mt-10 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-lg font-semibold transition"

                            >

                                Book Service

                            </button>

                        </div>

                    </div>

                </div>

            </div>

            <Footer />

        </>

    );

}

export default ProviderDetails;