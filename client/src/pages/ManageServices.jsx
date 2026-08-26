import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
    getAllServices,
    addService,
    updateService,
    deleteService
} from "../api/adminServiceApi";

import {
    FaTools,
    FaSearch,
    FaPlus,
    FaEdit,
    FaTrash,
    FaTimes
} from "react-icons/fa";

function ManageServices() {

    const [services, setServices] = useState([]);

    const [search, setSearch] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: ""
    });

    useEffect(() => {

        fetchServices();

    }, []);

    const fetchServices = async () => {

        try {

            const data = await getAllServices();

            setServices(data);

        }
        catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const resetForm = () => {

        setFormData({

            name: "",
            description: "",
            image: ""

        });

        setEditingId(null);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingId) {

                await updateService(
                    editingId,
                    formData
                );

                alert("Service Updated Successfully");

            }
            else {

                await addService(formData);

                alert("Service Added Successfully");

            }

            resetForm();

            fetchServices();

        }
        catch (error) {

            alert(
                error.response?.data?.message ||
                "Operation Failed"
            );

        }

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this service?"
        );

        if (!confirmDelete) return;

        try {

            await deleteService(id);

            alert("Service Deleted Successfully");

            fetchServices();

        }
        catch (error) {

            alert(
                error.response?.data?.message ||
                "Delete Failed"
            );

        }

    };

    const handleEdit = (service) => {

        setEditingId(service._id);

        setFormData({

            name: service.name || "",

            description: service.description || "",

            image: service.image || ""

        });

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    };

    const filteredServices = services.filter(
        (service) =>
            (service.name || "")
                .toLowerCase()
                .includes(search.toLowerCase())
    );
        return (

        <>

            <Navbar />

            {/* Hero */}

            <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white">

                <div className="max-w-7xl mx-auto px-6 py-14">

                    <div className="flex items-center gap-5">

                        <div className="bg-white/20 p-5 rounded-2xl">

                            <FaTools className="text-5xl" />

                        </div>

                        <div>

                            <h1 className="text-5xl font-bold">

                                Manage Services

                            </h1>

                            <p className="text-xl text-blue-100 mt-3">

                                Add, update and manage all services offered on MultiServe.

                            </p>

                        </div>

                    </div>

                </div>

            </section>

            <div className="max-w-7xl mx-auto px-6 py-10">

                {/* Add / Edit Service */}

                <div className="bg-white rounded-3xl shadow-xl p-8 mb-10">

                    <div className="flex justify-between items-center mb-7">

                        <div>

                            <h2 className="text-3xl font-bold">

                                {editingId
                                    ? "Edit Service"
                                    : "Add New Service"}

                            </h2>

                            <p className="text-gray-500 mt-2">

                                {editingId
                                    ? "Update the service information below."
                                    : "Create a new service for customers."}

                            </p>

                        </div>

                        {

                            editingId && (

                                <button

                                    type="button"

                                    onClick={resetForm}

                                    className="bg-gray-200 hover:bg-gray-300 p-3 rounded-xl"

                                >

                                    <FaTimes />

                                </button>

                            )

                        }

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="grid md:grid-cols-2 gap-6">

                            <div>

                                <label className="block font-semibold mb-2">

                                    Service Name

                                </label>

                                <input

                                    type="text"

                                    name="name"

                                    value={formData.name}

                                    onChange={handleChange}

                                    placeholder="Example: Electrician"

                                    className="w-full border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"

                                    required

                                />

                            </div>

                            <div>

                                <label className="block font-semibold mb-2">

                                    Image URL

                                </label>

                                <input

                                    type="text"

                                    name="image"

                                    value={formData.image}

                                    onChange={handleChange}

                                    placeholder="https://example.com/image.jpg"

                                    className="w-full border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"

                                />

                            </div>

                        </div>

                        <div className="mt-6">

                            <label className="block font-semibold mb-2">

                                Description

                            </label>

                            <textarea

                                name="description"

                                value={formData.description}

                                onChange={handleChange}

                                rows="4"

                                placeholder="Describe this service..."

                                className="w-full border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"

                                required

                            />

                        </div>

                        <div className="flex gap-4 mt-6">

                            <button

                                type="submit"

                                className={`px-7 py-3 rounded-xl text-white font-semibold flex items-center gap-2 ${
                                    editingId
                                        ? "bg-green-600 hover:bg-green-700"
                                        : "bg-blue-600 hover:bg-blue-700"
                                }`}

                            >

                                {editingId ? (

                                    <>

                                        <FaEdit />

                                        Update Service

                                    </>

                                ) : (

                                    <>

                                        <FaPlus />

                                        Add Service

                                    </>

                                )}

                            </button>

                            {

                                editingId && (

                                    <button

                                        type="button"

                                        onClick={resetForm}

                                        className="px-7 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 font-semibold"

                                    >

                                        Cancel

                                    </button>

                                )

                            }

                        </div>

                    </form>

                </div>
                                {/* Search */}

                <div className="relative mb-10">

                    <FaSearch className="absolute left-5 top-5 text-gray-400" />

                    <input

                        type="text"

                        placeholder="Search services..."

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                        className="w-full bg-white border border-gray-200 rounded-2xl pl-14 pr-6 py-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"

                    />

                </div>

                {/* Services */}

                {

                    filteredServices.length === 0 ? (

                        <div className="bg-white rounded-3xl shadow-lg py-20 text-center">

                            <FaTools className="text-7xl text-gray-300 mx-auto mb-6" />

                            <h2 className="text-3xl font-bold">

                                No Services Found

                            </h2>

                            <p className="text-gray-500 mt-3">

                                Add a new service or try another search.

                            </p>

                        </div>

                    ) : (

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">

                            {

                                filteredServices.map((service) => (

                                    <div

                                        key={service._id}

                                        className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden"

                                    >

                                        {/* Image */}

                                        <div className="h-48 bg-gray-100">

                                            <img

                                                src={

                                                    service.image ||

                                                    "https://placehold.co/600x400"

                                                }

                                                alt={service.name}

                                                className="w-full h-full object-cover"

                                            />

                                        </div>

                                        {/* Content */}

                                        <div className="p-6">

                                            <h2 className="text-2xl font-bold">

                                                {service.name}

                                            </h2>

                                            <p className="text-gray-500 mt-3 min-h-[60px]">

                                                {service.description ||
                                                    "Professional service available on MultiServe."}

                                            </p>

                                            <div className="flex gap-3 mt-6">

                                                <button

                                                    onClick={() =>
                                                        handleEdit(service)
                                                    }

                                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"

                                                >

                                                    <FaEdit />

                                                    Edit

                                                </button>

                                                <button

                                                    onClick={() =>
                                                        handleDelete(service._id)
                                                    }

                                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"

                                                >

                                                    <FaTrash />

                                                    Delete

                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                    )

                }

            </div>

            <Footer />

        </>

    );

}

export default ManageServices;