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
    FaTimes,
    FaLayerGroup,
    FaImage,
    FaArrowRight,
    FaCheckCircle
} from "react-icons/fa";

function ManageServices() {

    const [services, setServices] = useState([]);
    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);

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

            setLoading(true);

            const data = await getAllServices();

            setServices(data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

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

            } else {

                await addService(formData);

                alert("Service Added Successfully");

            }

            resetForm();

            fetchServices();

        } catch (error) {

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

        } catch (error) {

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


            <main className="min-h-screen bg-[#fcf8ff]">


                {/* =====================================================
                    HERO
                ====================================================== */}

                <section className="relative overflow-hidden bg-[#3525cd] text-white">

                    <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

                    <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-purple-400/20 blur-3xl" />


                    <div className="relative max-w-7xl mx-auto px-5 sm:px-6 py-11 sm:py-14">

                        <div className="flex items-center gap-3 text-indigo-200 text-sm font-semibold">

                            <FaTools />

                            Service Management

                        </div>


                        <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">

                            Manage Services

                        </h1>


                        <p className="mt-4 max-w-2xl text-sm sm:text-base lg:text-lg leading-7 text-indigo-100">

                            Add, update and organize the services available

                            to customers across the MultiServe platform.

                        </p>

                    </div>

                </section>


                {/* =====================================================
                    CONTENT
                ====================================================== */}

                <div className="max-w-7xl mx-auto px-5 sm:px-6 py-8 sm:py-10">


                    {/* =================================================
                        OVERVIEW
                    ================================================== */}

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">

                        <div className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-[0_8px_30px_rgba(30,27,75,0.05)]">

                            <div className="flex items-start justify-between">

                                <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-indigo-50 text-[#3525cd]">

                                    <FaLayerGroup />

                                </div>

                                <span className="hidden sm:block text-xs font-semibold text-slate-400">

                                    Platform

                                </span>

                            </div>


                            <p className="mt-5 text-xs sm:text-sm font-medium text-slate-500">

                                Total Services

                            </p>


                            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#1b1b24]">

                                {services.length}

                            </h2>


                            <p className="mt-1 text-xs sm:text-sm text-slate-400">

                                Available service categories

                            </p>

                        </div>


                        <div className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-[0_8px_30px_rgba(30,27,75,0.05)]">

                            <div className="flex items-start justify-between">

                                <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">

                                    <FaCheckCircle />

                                </div>

                                <span className="hidden sm:block text-xs font-semibold text-slate-400">

                                    Active

                                </span>

                            </div>


                            <p className="mt-5 text-xs sm:text-sm font-medium text-slate-500">

                                Services Listed

                            </p>


                            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#1b1b24]">

                                {services.length}

                            </h2>


                            <p className="mt-1 text-xs sm:text-sm text-slate-400">

                                Currently in directory

                            </p>

                        </div>


                        <div className="col-span-2 lg:col-span-1 rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-[0_8px_30px_rgba(30,27,75,0.05)]">

                            <div className="flex items-start justify-between">

                                <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">

                                    <FaImage />

                                </div>

                                <span className="hidden sm:block text-xs font-semibold text-slate-400">

                                    Media

                                </span>

                            </div>


                            <p className="mt-5 text-xs sm:text-sm font-medium text-slate-500">

                                Services With Images

                            </p>


                            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#1b1b24]">

                                {
                                    services.filter(
                                        service => service.image
                                    ).length
                                }

                            </h2>


                            <p className="mt-1 text-xs sm:text-sm text-slate-400">

                                Visual service listings

                            </p>

                        </div>

                    </div>


                    {/* =================================================
                        ADD / EDIT FORM
                    ================================================== */}

                    <section className="rounded-3xl border border-slate-100 bg-white shadow-[0_8px_30px_rgba(30,27,75,0.05)] overflow-hidden">

                        <div className="border-b border-slate-100 px-5 sm:px-7 py-5 sm:py-6">

                            <div className="flex items-start justify-between gap-4">

                                <div>

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-[#3525cd]">

                                            {editingId
                                                ? <FaEdit />
                                                : <FaPlus />
                                            }

                                        </div>

                                        <div>

                                            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1b1b24]">

                                                {editingId
                                                    ? "Edit Service"
                                                    : "Add New Service"
                                                }

                                            </h2>

                                            <p className="mt-1 text-xs sm:text-sm text-slate-500">

                                                {editingId
                                                    ? "Update the service information below."
                                                    : "Create a new service for MultiServe customers."
                                                }

                                            </p>

                                        </div>

                                    </div>

                                </div>


                                {editingId && (

                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700"
                                        aria-label="Cancel editing"
                                    >

                                        <FaTimes />

                                    </button>

                                )}

                            </div>

                        </div>


                        <form
                            onSubmit={handleSubmit}
                            className="p-5 sm:p-7"
                        >

                            <div className="grid md:grid-cols-2 gap-5">


                                {/* SERVICE NAME */}

                                <div>

                                    <label className="mb-2 block text-sm font-bold text-[#1b1b24]">

                                        Service Name

                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Example: Electrician"
                                        className="w-full rounded-xl border border-slate-200 bg-[#fcf8ff] px-4 py-3.5 text-sm text-[#1b1b24] outline-none transition focus:border-[#3525cd] focus:ring-4 focus:ring-indigo-100"
                                        required
                                    />

                                </div>


                                {/* IMAGE */}

                                <div>

                                    <label className="mb-2 block text-sm font-bold text-[#1b1b24]">

                                        Image URL

                                    </label>

                                    <input
                                        type="text"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        placeholder="https://example.com/image.jpg"
                                        className="w-full rounded-xl border border-slate-200 bg-[#fcf8ff] px-4 py-3.5 text-sm text-[#1b1b24] outline-none transition focus:border-[#3525cd] focus:ring-4 focus:ring-indigo-100"
                                    />

                                </div>

                            </div>


                            {/* DESCRIPTION */}

                            <div className="mt-5">

                                <label className="mb-2 block text-sm font-bold text-[#1b1b24]">

                                    Description

                                </label>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Describe this service..."
                                    className="w-full resize-none rounded-xl border border-slate-200 bg-[#fcf8ff] px-4 py-3.5 text-sm leading-6 text-[#1b1b24] outline-none transition focus:border-[#3525cd] focus:ring-4 focus:ring-indigo-100"
                                    required
                                />

                            </div>


                            {/* BUTTONS */}

                            <div className="mt-6 flex flex-col sm:flex-row gap-3">

                                <button
                                    type="submit"
                                    className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 ${
                                        editingId
                                            ? "bg-emerald-600 hover:bg-emerald-700"
                                            : "bg-[#3525cd] hover:bg-[#2d20b0]"
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


                                {editingId && (

                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-6 py-3.5 text-sm font-bold text-slate-600 transition hover:bg-slate-200"
                                    >

                                        <FaTimes />

                                        Cancel

                                    </button>

                                )}

                            </div>

                        </form>

                    </section>


                    {/* =================================================
                        SEARCH
                    ================================================== */}

                    <section className="mt-8">

                        <div className="rounded-3xl border border-slate-100 bg-white p-5 sm:p-6 shadow-[0_8px_30px_rgba(30,27,75,0.05)]">

                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                                <div>

                                    <p className="text-xs font-bold uppercase tracking-wider text-[#3525cd]">

                                        Service directory

                                    </p>

                                    <h2 className="mt-1 text-xl sm:text-2xl font-extrabold text-[#1b1b24]">

                                        All Services

                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">

                                        {search
                                            ? `${filteredServices.length} matching services`
                                            : `${services.length} services available`
                                        }

                                    </p>

                                </div>


                                <div className="relative w-full lg:max-w-md">

                                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                                    <input
                                        type="text"
                                        placeholder="Search services..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        className="w-full rounded-xl border border-slate-200 bg-[#fcf8ff] py-3.5 pl-11 pr-4 text-sm text-[#1b1b24] outline-none transition focus:border-[#3525cd] focus:ring-4 focus:ring-indigo-100"
                                    />

                                </div>

                            </div>

                        </div>

                    </section>


                    {/* =================================================
                        SERVICE GRID
                    ================================================== */}

                    <section className="mt-6">

                        {loading ? (

                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

                                {[1, 2, 3, 4, 5, 6].map((item) => (

                                    <div
                                        key={item}
                                        className="overflow-hidden rounded-3xl border border-slate-100 bg-white animate-pulse"
                                    >

                                        <div className="h-48 bg-slate-100" />

                                        <div className="p-6">

                                            <div className="h-6 w-36 rounded bg-slate-100" />

                                            <div className="mt-4 h-4 w-full rounded bg-slate-100" />

                                            <div className="mt-2 h-4 w-3/4 rounded bg-slate-100" />

                                            <div className="mt-6 h-11 rounded-xl bg-slate-100" />

                                        </div>

                                    </div>

                                ))}

                            </div>

                        ) : filteredServices.length === 0 ? (

                            <div className="rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">

                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-[#3525cd]">

                                    <FaTools className="text-xl" />

                                </div>

                                <h2 className="mt-5 text-xl sm:text-2xl font-extrabold text-[#1b1b24]">

                                    No Services Found

                                </h2>

                                <p className="mt-2 text-sm text-slate-500">

                                    Add a new service or try another search.

                                </p>

                            </div>

                        ) : (

                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

                                {filteredServices.map((service) => (

                                    <article
                                        key={service._id}
                                        className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_8px_30px_rgba(30,27,75,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(30,27,75,0.09)]"
                                    >

                                        {/* IMAGE */}

                                        <div className="relative h-48 overflow-hidden bg-slate-100">

                                            <img
                                                src={
                                                    service.image ||
                                                    "https://placehold.co/600x400"
                                                }
                                                alt={service.name}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />


                                            <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#3525cd] backdrop-blur">

                                                Service

                                            </div>

                                        </div>


                                        {/* CONTENT */}

                                        <div className="p-5 sm:p-6">

                                            <h2 className="text-lg sm:text-xl font-extrabold text-[#1b1b24]">

                                                {service.name}

                                            </h2>


                                            <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-500">

                                                {service.description ||
                                                    "Professional service available on MultiServe."
                                                }

                                            </p>


                                            <div className="mt-5 flex gap-2">

                                                <button
                                                    onClick={() =>
                                                        handleEdit(service)
                                                    }
                                                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700 transition hover:bg-emerald-600 hover:text-white"
                                                >

                                                    <FaEdit className="text-xs" />

                                                    Edit

                                                </button>


                                                <button
                                                    onClick={() =>
                                                        handleDelete(service._id)
                                                    }
                                                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-600 hover:text-white"
                                                >

                                                    <FaTrash className="text-xs" />

                                                    Delete

                                                </button>

                                            </div>

                                        </div>

                                    </article>

                                ))}

                            </div>

                        )}

                    </section>


                    {/* =================================================
                        FOOTER INFO
                    ================================================== */}

                    <div className="mt-8 rounded-2xl border border-indigo-100 bg-[#f5f2ff] px-5 py-4">

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                            <div className="flex items-center gap-3">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#3525cd]">

                                    <FaTools className="text-sm" />

                                </div>

                                <p className="text-xs sm:text-sm text-slate-600">

                                    Keep service names, descriptions and images

                                    accurate for the best customer experience.

                                </p>

                            </div>


                            <div className="flex items-center gap-2 text-xs font-bold text-[#3525cd]">

                                {filteredServices.length}

                                displayed

                                <FaArrowRight className="text-[9px]" />

                            </div>

                        </div>

                    </div>

                </div>

            </main>


            <Footer />

        </>

    );

}

export default ManageServices;