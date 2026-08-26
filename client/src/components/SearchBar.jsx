import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

function SearchBar() {

    const [service, setService] = useState("");

    const navigate = useNavigate();

    const handleSearch = () => {

        if (service.trim() !== "") {

            navigate(`/providers/${service}`);

        }

    };

    return (

        <section className="bg-white">

            <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">

                <div className="bg-white rounded-3xl shadow-2xl p-8">

                    <h2 className="text-3xl font-bold text-center">

                        Find Your Service

                    </h2>

                    <p className="text-gray-500 text-center mt-3">

                        Search from 35+ professional home services

                    </p>

                    <div className="flex flex-col md:flex-row gap-5 mt-8">

                        <div className="relative flex-1">

                            <Search
                                size={22}
                                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input

                                type="text"

                                placeholder="Search Electrician, Plumber, AC Repair..."

                                value={service}

                                onChange={(e) => setService(e.target.value)}

                                onKeyDown={(e) => {

                                    if (e.key === "Enter") {

                                        handleSearch();

                                    }

                                }}

                                className="w-full pl-14 pr-5 py-5 rounded-2xl border-2 border-gray-200 focus:border-blue-600 outline-none text-lg"

                            />

                        </div>

                        <button

                            onClick={handleSearch}

                            className="bg-blue-600 hover:bg-blue-700 transition text-white px-10 rounded-2xl font-bold text-lg"

                        >

                            Search

                        </button>

                    </div>

                    {/* Popular Searches */}

                    <div className="flex flex-wrap justify-center gap-3 mt-8">

                        {[
                            "Electrician",
                            "Plumber",
                            "Cleaning",
                            "Painter",
                            "Carpenter",
                            "AC Repair",
                            "Shifting"
                        ].map((item) => (

                            <button

                                key={item}

                                onClick={() => navigate(`/providers/${item}`)}

                                className="px-5 py-2 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-full transition"

                            >

                                {item}

                            </button>

                        ))}

                    </div>

                </div>

            </div>

        </section>

    );

}

export default SearchBar;