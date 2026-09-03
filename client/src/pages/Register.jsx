import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    Phone,
    ShieldCheck,
    Sparkles,
    User,
    UserRoundCheck,
} from "lucide-react";

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
        role: "customer",
    });

    // =====================================================
    // UI STATES
    // =====================================================

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // =====================================================
    // HANDLE INPUT CHANGE
    // =====================================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "phone") {
            const phone = value
                .replace(/\D/g, "")
                .slice(0, 10);

            setFormData({
                ...formData,
                phone,
            });

            return;
        }

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // =====================================================
    // REGISTER USER
    // =====================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        // -------------------------------------------------
        // NAME VALIDATION
        // -------------------------------------------------

        if (!formData.name.trim()) {
            alert("Please enter your name");
            return;
        }

        // -------------------------------------------------
        // EMAIL VALIDATION
        // -------------------------------------------------

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email.trim())) {
            alert("Please enter a valid email address");
            return;
        }

        // -------------------------------------------------
        // PHONE VALIDATION
        // -------------------------------------------------

        const phoneRegex =
            /^[6-9][0-9]{9}$/;

        if (!phoneRegex.test(formData.phone)) {
            alert(
                "Please enter a valid 10-digit Indian mobile number"
            );
            return;
        }

        // -------------------------------------------------
        // PASSWORD VALIDATION
        // -------------------------------------------------

        if (formData.password.length < 6) {
            alert(
                "Password must be at least 6 characters"
            );
            return;
        }

        try {
            setLoading(true);

            // -------------------------------------------------
            // ADD +91
            // -------------------------------------------------

            const phoneWithCountryCode =
                "+91" + formData.phone;

            // -------------------------------------------------
            // DATA TO SEND
            // -------------------------------------------------

            const dataToSend = {
                name: formData.name.trim(),
                email: formData.email
                    .trim()
                    .toLowerCase(),
                phone: phoneWithCountryCode,
                password: formData.password,
                role: formData.role,
            };

            // Do NOT print password
            console.log("Registering user:", {
                ...dataToSend,
                password: "********",
            });

            // -------------------------------------------------
            // REGISTER
            // -------------------------------------------------

            await registerUser(dataToSend);

            // -------------------------------------------------
            // SUCCESS
            // -------------------------------------------------

            alert("Registration Successful!");

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
        <div className="min-h-screen bg-[#fcf8ff] flex items-center justify-center px-4 py-8 sm:py-12">

            <div className="w-full max-w-5xl">

                {/* =================================================
                    BACK TO HOME
                ================================================= */}

                <div className="mb-5">
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="inline-flex items-center gap-2 text-sm font-medium text-[#464555] hover:text-[#3525cd] transition-colors"
                    >
                        <span className="text-lg">←</span>
                        Back to Home
                    </button>
                </div>

                {/* =================================================
                    MAIN CARD
                ================================================= */}

                <div className="overflow-hidden rounded-[28px] bg-white border border-[#ece9f8] shadow-[0_20px_60px_rgba(53,37,205,0.10)]">

                    <div className="grid md:grid-cols-2">

                        {/* =================================================
                            LEFT BRAND PANEL
                        ================================================= */}

                        <div className="relative hidden md:flex flex-col justify-between overflow-hidden bg-[#3525cd] p-10 lg:p-12 text-white">

                            {/* Decorative circles */}

                            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10" />

                            <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-white/10" />

                            <div className="relative z-10">

                                {/* Logo */}

                                <button
                                    type="button"
                                    onClick={() => navigate("/")}
                                    className="flex items-center gap-3"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#3525cd] shadow-lg">
                                        <Sparkles size={23} />
                                    </div>

                                    <span className="text-2xl font-bold tracking-tight">
                                        MultiServe
                                    </span>
                                </button>

                                {/* Heading */}

                                <div className="mt-16">

                                    <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium">
                                        <UserRoundCheck size={16} />
                                        Join MultiServe
                                    </p>

                                    <h2 className="max-w-md text-4xl lg:text-5xl font-bold leading-tight">
                                        Get started with
                                        <span className="block text-white/80">
                                            MultiServe.
                                        </span>
                                    </h2>

                                    <p className="mt-6 max-w-md text-base leading-7 text-white/75">
                                        Create your account and connect
                                        with trusted professionals for
                                        reliable services whenever you
                                        need them.
                                    </p>

                                </div>

                                {/* Benefits */}

                                <div className="mt-10 space-y-4">

                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                                            <ShieldCheck size={18} />
                                        </div>

                                        <span className="text-sm text-white/85">
                                            Trusted service professionals
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                                            <UserRoundCheck size={18} />
                                        </div>

                                        <span className="text-sm text-white/85">
                                            Simple and secure booking
                                        </span>
                                    </div>

                                </div>

                            </div>

                            {/* Bottom */}

                            <div className="relative z-10 mt-10 text-sm text-white/65">
                                Your services. Your choice. One platform.
                            </div>

                        </div>

                        {/* =================================================
                            RIGHT REGISTER FORM
                        ================================================= */}

                        <div className="p-6 sm:p-9 lg:p-12">

                            {/* Mobile Logo */}

                            <div className="mb-7 flex items-center gap-3 md:hidden">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#3525cd] text-white">
                                    <Sparkles size={22} />
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-[#1b1b24]">
                                        MultiServe
                                    </h2>

                                    <p className="text-xs text-[#6b6878]">
                                        Trusted service platform
                                    </p>
                                </div>

                            </div>

                            {/* Heading */}

                            <div className="mb-7">

                                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1b1b24]">
                                    Create account
                                </h1>

                                <p className="mt-2 text-sm sm:text-base text-[#6b6878]">
                                    Join MultiServe and get started today
                                </p>

                            </div>

                            {/* =================================================
                                FORM
                            ================================================= */}

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-4"
                            >

                                {/* -------------------------------------------------
                                    NAME
                                ------------------------------------------------- */}

                                <div>

                                    <label
                                        htmlFor="name"
                                        className="mb-2 block text-sm font-semibold text-[#1b1b24]"
                                    >
                                        Full name
                                    </label>

                                    <div className="relative">

                                        <User
                                            size={18}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777486]"
                                        />

                                        <input
                                            id="name"
                                            type="text"
                                            name="name"
                                            placeholder="Enter your full name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            autoComplete="name"
                                            className="h-12 w-full rounded-xl border border-[#dedbea] bg-[#fcfaff] pl-12 pr-4 text-sm text-[#1b1b24] outline-none transition-all placeholder:text-[#9693a3] focus:border-[#3525cd] focus:bg-white focus:ring-4 focus:ring-[#3525cd]/10"
                                        />

                                    </div>

                                </div>

                                {/* -------------------------------------------------
                                    EMAIL
                                ------------------------------------------------- */}

                                <div>

                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-semibold text-[#1b1b24]"
                                    >
                                        Email address
                                    </label>

                                    <div className="relative">

                                        <Mail
                                            size={18}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777486]"
                                        />

                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            autoComplete="email"
                                            className="h-12 w-full rounded-xl border border-[#dedbea] bg-[#fcfaff] pl-12 pr-4 text-sm text-[#1b1b24] outline-none transition-all placeholder:text-[#9693a3] focus:border-[#3525cd] focus:bg-white focus:ring-4 focus:ring-[#3525cd]/10"
                                        />

                                    </div>

                                </div>

                                {/* -------------------------------------------------
                                    PHONE
                                ------------------------------------------------- */}

                                <div>

                                    <label
                                        htmlFor="phone"
                                        className="mb-2 block text-sm font-semibold text-[#1b1b24]"
                                    >
                                        Mobile number
                                    </label>

                                    <div className="flex h-12 overflow-hidden rounded-xl border border-[#dedbea] bg-[#fcfaff] transition-all focus-within:border-[#3525cd] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#3525cd]/10">

                                        <div className="flex items-center gap-2 border-r border-[#dedbea] bg-[#f4f1ff] px-3 text-sm font-semibold text-[#464555]">

                                            <Phone size={16} />

                                            <span>+91</span>

                                        </div>

                                        <input
                                            id="phone"
                                            type="text"
                                            name="phone"
                                            placeholder="10-digit mobile number"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            maxLength="10"
                                            inputMode="numeric"
                                            autoComplete="tel"
                                            required
                                            className="min-w-0 flex-1 bg-transparent px-4 text-sm text-[#1b1b24] outline-none placeholder:text-[#9693a3]"
                                        />

                                    </div>

                                </div>

                                {/* -------------------------------------------------
                                    PASSWORD
                                ------------------------------------------------- */}

                                <div>

                                    <label
                                        htmlFor="password"
                                        className="mb-2 block text-sm font-semibold text-[#1b1b24]"
                                    >
                                        Password
                                    </label>

                                    <div className="relative">

                                        <LockKeyhole
                                            size={18}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777486]"
                                        />

                                        <input
                                            id="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            name="password"
                                            placeholder="Create a password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            minLength={6}
                                            autoComplete="new-password"
                                            className="h-12 w-full rounded-xl border border-[#dedbea] bg-[#fcfaff] pl-12 pr-12 text-sm text-[#1b1b24] outline-none transition-all placeholder:text-[#9693a3] focus:border-[#3525cd] focus:bg-white focus:ring-4 focus:ring-[#3525cd]/10"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(
                                                    !showPassword
                                                )
                                            }
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#777486] transition hover:text-[#3525cd]"
                                            aria-label={
                                                showPassword
                                                    ? "Hide password"
                                                    : "Show password"
                                            }
                                        >
                                            {showPassword ? (
                                                <EyeOff size={18} />
                                            ) : (
                                                <Eye size={18} />
                                            )}
                                        </button>

                                    </div>

                                    <p className="mt-1.5 text-xs text-[#8a8797]">
                                        Password must contain at least 6 characters.
                                    </p>

                                </div>

                                {/* -------------------------------------------------
                                    ROLE
                                ------------------------------------------------- */}

                                <div>

                                    <label
                                        htmlFor="role"
                                        className="mb-2 block text-sm font-semibold text-[#1b1b24]"
                                    >
                                        Account type
                                    </label>

                                    <div className="relative">

                                        <UserRoundCheck
                                            size={18}
                                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#777486]"
                                        />

                                        <select
                                            id="role"
                                            name="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            className="h-12 w-full appearance-none rounded-xl border border-[#dedbea] bg-[#fcfaff] pl-12 pr-10 text-sm font-medium text-[#1b1b24] outline-none transition-all focus:border-[#3525cd] focus:bg-white focus:ring-4 focus:ring-[#3525cd]/10"
                                        >
                                            <option value="customer">
                                                Customer
                                            </option>

                                            <option value="provider">
                                                Service Provider
                                            </option>
                                        </select>

                                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#777486]">
                                            ▼
                                        </span>

                                    </div>

                                </div>

                                {/* -------------------------------------------------
                                    REGISTER BUTTON
                                ------------------------------------------------- */}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`group mt-2 flex h-13 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold text-white transition-all ${
                                        loading
                                            ? "cursor-not-allowed bg-[#9b97b2]"
                                            : "bg-[#3525cd] shadow-[0_10px_25px_rgba(53,37,205,0.22)] hover:-translate-y-0.5 hover:bg-[#2d20b0] hover:shadow-[0_14px_30px_rgba(53,37,205,0.28)]"
                                    }`}
                                >
                                    {loading ? (
                                        <>
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                            Creating account...
                                        </>
                                    ) : (
                                        <>
                                            Create account

                                            <ArrowRight
                                                size={18}
                                                className="transition-transform group-hover:translate-x-1"
                                            />
                                        </>
                                    )}
                                </button>

                            </form>

                            {/* =================================================
                                DIVIDER
                            ================================================= */}

                            <div className="my-6 flex items-center gap-4">

                                <div className="h-px flex-1 bg-[#e8e5f0]" />

                                <span className="text-xs font-medium text-[#9995a5]">
                                    OR
                                </span>

                                <div className="h-px flex-1 bg-[#e8e5f0]" />

                            </div>

                            {/* =================================================
                                LOGIN
                            ================================================= */}

                            <div className="rounded-2xl border border-[#e8e5f0] bg-[#faf8ff] p-5 text-center">

                                <p className="text-sm text-[#6b6878]">
                                    Already have an account?
                                </p>

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate("/login")
                                    }
                                    className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-[#3525cd] transition hover:text-[#281ca5]"
                                >
                                    Login to your account
                                    <ArrowRight size={16} />
                                </button>

                            </div>

                            {/* Security */}

                            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#8a8797]">

                                <ShieldCheck size={15} />

                                <span>
                                    Your personal information is protected
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

                {/* =================================================
                    FOOTER
                ================================================= */}

                <p className="mt-5 text-center text-xs text-[#8a8797]">
                    © {new Date().getFullYear()} MultiServe. All rights reserved.
                </p>

            </div>

        </div>
    );
}

export default Register;