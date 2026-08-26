import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../api/authApi";

function Register() {
    const navigate = useNavigate();

    // =====================================================
    // FORM DATA
    // =====================================================

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "customer"
    });

    // =====================================================
    // LOADING
    // =====================================================

    const [loading, setLoading] = useState(false);

    // =====================================================
    // HANDLE INPUT CHANGE
    // =====================================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        // ---------------------------------------------
        // PHONE NUMBER
        // ---------------------------------------------

        if (name === "phone") {
            const phone = value
                .replace(/\D/g, "")
                .slice(0, 10);

            setFormData({
                ...formData,
                phone
            });

            return;
        }

        // ---------------------------------------------
        // OTHER INPUTS
        // ---------------------------------------------

        setFormData({
            ...formData,
            [name]: value
        });
    };

    // =====================================================
    // REGISTER USER
    // =====================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ---------------------------------------------
        // NAME VALIDATION
        // ---------------------------------------------

        if (!formData.name.trim()) {
            alert("Please enter your name");
            return;
        }

        // ---------------------------------------------
        // EMAIL VALIDATION
        // ---------------------------------------------

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email)) {
            alert("Please enter a valid email address");
            return;
        }

        // ---------------------------------------------
        // PHONE VALIDATION
        // ---------------------------------------------

        const phoneRegex =
            /^[6-9][0-9]{9}$/;

        if (!phoneRegex.test(formData.phone)) {
            alert(
                "Please enter a valid 10-digit Indian mobile number"
            );
            return;
        }

        // ---------------------------------------------
        // PASSWORD VALIDATION
        // ---------------------------------------------

        if (formData.password.length < 6) {
            alert(
                "Password must be at least 6 characters"
            );
            return;
        }

        try {
            setLoading(true);

            // ---------------------------------------------
            // ADD +91
            // ---------------------------------------------

            const phoneWithCountryCode =
                "+91" + formData.phone;

            // ---------------------------------------------
            // DATA TO SEND
            // ---------------------------------------------

            const dataToSend = {
                name: formData.name.trim(),

                email:
                    formData.email
                        .trim()
                        .toLowerCase(),

                phone:
                    phoneWithCountryCode,

                password:
                    formData.password,

                role:
                    formData.role
            };

            // Do NOT print password
            console.log(
                "Registering user:",
                {
                    ...dataToSend,
                    password: "********"
                }
            );

            // ---------------------------------------------
            // REGISTER
            // ---------------------------------------------

            await registerUser(dataToSend);

            // ---------------------------------------------
            // SUCCESS
            // ---------------------------------------------

            alert(
                "Registration Successful!"
            );

            navigate("/login");

        } catch (error) {
            console.log(
                "Registration Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };

    // =====================================================
    // UI
    // =====================================================

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-lg w-96"
            >

                {/* =================================================
                    TITLE
                ================================================= */}

                <h1 className="text-3xl font-bold text-center mb-6">
                    Register
                </h1>

                {/* =================================================
                    NAME
                ================================================= */}

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full border p-3 rounded mb-4"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                {/* =================================================
                    EMAIL
                ================================================= */}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full border p-3 rounded mb-4"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                {/* =================================================
                    PHONE NUMBER
                ================================================= */}

                <div className="flex w-full border rounded mb-4 overflow-hidden">

                    <div className="bg-gray-100 px-4 flex items-center text-gray-700 font-semibold">
                        +91
                    </div>

                    <input
                        type="text"
                        name="phone"
                        placeholder="10-digit mobile number"
                        className="flex-1 p-3 outline-none"
                        value={formData.phone}
                        onChange={handleChange}
                        maxLength="10"
                        inputMode="numeric"
                        required
                    />

                </div>

                {/* =================================================
                    PASSWORD
                ================================================= */}

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full border p-3 rounded mb-4"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                {/* =================================================
                    ROLE
                ================================================= */}

                <select
                    name="role"
                    className="w-full border p-3 rounded mb-4"
                    value={formData.role}
                    onChange={handleChange}
                >

                    <option value="customer">
                        Customer
                    </option>

                    <option value="provider">
                        Provider
                    </option>

                </select>

                {/* =================================================
                    REGISTER BUTTON
                ================================================= */}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full text-white py-3 rounded-lg ${
                        loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >

                    {loading
                        ? "Registering..."
                        : "Register"}

                </button>

                {/* =================================================
                    LOGIN
                ================================================= */}

                <p className="text-center mt-6 text-gray-600">

                    Already have an account?{" "}

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/login")
                        }
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Login
                    </button>

                </p>

            </form>

        </div>
    );
}

export default Register;