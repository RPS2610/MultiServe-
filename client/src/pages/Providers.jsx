import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProviderCard from "../components/ProviderCard";

import {
    getProviders,
    getProvidersByService
} from "../api/providerApi";

function Providers() {

    const { service } = useParams();

    const [providers, setProviders] = useState([]);

    const [loading, setLoading] = useState(true);

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

            setProviders(data);

        } catch (error) {

            console.log("Provider loading error:", error);

            setProviders([]);

        } finally {

            setLoading(false);

        }

    };

    return (
        <>
            <Navbar />

            <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white">

                <div className="max-w-7xl mx-auto px-6 py-16">

                    <h1 className="text-5xl font-bold">

                        {service || "All Service Providers"}

                    </h1>

                    <p className="mt-4 text-xl text-blue-100">

                        {service
                            ? `Find trusted ${service} professionals near you`
                            : "Find trusted professionals for all home services"
                        }

                    </p>

                </div>

            </section>

            <div className="max-w-7xl mx-auto px-6 py-14">

                <div className="mb-10">

                    <h2 className="text-3xl font-bold">

                        {service
                            ? `Available ${service} Professionals`
                            : "Available Professionals"
                        }

                    </h2>

                    <p className="text-gray-500 mt-2">

                        {providers.length} Provider(s) Found

                    </p>

                </div>

                {loading ? (

                    <div className="text-center py-20">

                        <div className="text-2xl font-semibold text-gray-700">

                            Loading Providers...

                        </div>

                    </div>

                ) : providers.length === 0 ? (

                    <div className="bg-white rounded-3xl shadow-lg p-16 text-center">

                        <h2 className="text-3xl font-bold">

                            No Providers Found

                        </h2>

                        <p className="mt-4 text-gray-500">

                            No professionals are currently available.

                        </p>

                    </div>

                ) : (

                    <div className="grid gap-8">

                        {providers.map((provider) => (

                            <ProviderCard
                                key={provider._id}
                                provider={provider}
                            />

                        ))}

                    </div>

                )}

            </div>

            <Footer />
        </>
    );
}

export default Providers;