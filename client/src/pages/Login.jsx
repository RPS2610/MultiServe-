import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    CheckCircle2,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    ShieldCheck,
    Sparkles,
    X,
    XCircle,
} from "lucide-react";

import { loginUser } from "../api/authApi";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // =====================================================
    // TOAST STATE
    // =====================================================

    const [toast, setToast] = useState(null);

    /*
        toast format:

        {
            type: "success" | "error",
            title: "...",
            message: "..."
        }
    */

    // =====================================================
    // AUTO HIDE TOAST
    // =====================================================

    useEffect(() => {
        if (!toast) return;

        const timer = setTimeout(() => {
            setToast(null);
        }, 3500);

        return () => clearTimeout(timer);
    }, [toast]);

    // =====================================================
    // SAVE LOGIN
    // =====================================================

    const saveLogin = (data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Show success popup first
        setToast({
            type: "success",
            title: "Login Successful",
            message: `Welcome back, ${data.user?.name || "to MultiServe"}!`,
        });

        // Navigate after popup appears
        setTimeout(() => {
            navigate("/");
        }, 1500);
    };

    // =====================================================
    // EMAIL + PASSWORD LOGIN
    // =====================================================

    const handlePasswordLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setToast({
                type: "error",
                title: "Missing Information",
                message: "Please enter your email and password.",
            });

            return;
        }

        try {
            setLoading(true);

            const data = await loginUser({
                email,
                password,
            });

            saveLogin(data);
        } catch (error) {
            console.log("Password Login Error:", error);

            setToast({
                type: "error",
                title: "Login Failed",
                message:
                    error.response?.data?.message ||
                    "Invalid email or password. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fcf8ff] flex items-center justify-center px-4 py-10 sm:py-14">

            {/* =====================================================
                PREMIUM TOAST
            ===================================================== */}

            {toast && (
                <div
                    className="
                        fixed
                        top-5
                        right-4
                        sm:right-6
                        z-[9999]
                        w-[calc(100%-32px)]
                        max-w-[390px]
                        animate-[slideIn_.35s_ease-out]
                    "
                >
                    <div
                        className={`
                            relative
                            overflow-hidden
                            rounded-2xl
                            border
                            bg-white
                            shadow-[0_20px_60px_rgba(27,27,36,0.18)]
                            ${
                                toast.type === "success"
                                    ? "border-emerald-100"
                                    : "border-red-100"
                            }
                        `}
                    >

                        {/* Top Accent */}
                        <div
                            className={`
                                h-1
                                w-full
                                ${
                                    toast.type === "success"
                                        ? "bg-emerald-500"
                                        : "bg-red-500"
                                }
                            `}
                        />

                        <div className="flex items-start gap-4 p-4 sm:p-5">

                            {/* Icon */}
                            <div
                                className={`
                                    flex
                                    h-11
                                    w-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    ${
                                        toast.type === "success"
                                            ? "bg-emerald-50 text-emerald-600"
                                            : "bg-red-50 text-red-600"
                                    }
                                `}
                            >
                                {toast.type === "success" ? (
                                    <CheckCircle2 size={25} />
                                ) : (
                                    <XCircle size={25} />
                                )}
                            </div>

                            {/* Content */}
                            <div className="min-w-0 flex-1">

                                <h3 className="text-sm sm:text-base font-bold text-[#1b1b24]">
                                    {toast.title}
                                </h3>

                                <p className="mt-1 text-xs sm:text-sm leading-5 text-[#777486]">
                                    {toast.message}
                                </p>

                            </div>

                            {/* Close */}
                            <button
                                type="button"
                                onClick={() => setToast(null)}
                                className="
                                    shrink-0
                                    rounded-lg
                                    p-1.5
                                    text-[#9995a5]
                                    transition
                                    hover:bg-gray-100
                                    hover:text-[#1b1b24]
                                "
                                aria-label="Close notification"
                            >
                                <X size={17} />
                            </button>

                        </div>

                        {/* Progress Bar */}
                        <div
                            className={`
                                h-[3px]
                                origin-left
                                animate-[toastProgress_3.5s_linear_forwards]
                                ${
                                    toast.type === "success"
                                        ? "bg-emerald-500"
                                        : "bg-red-500"
                                }
                            `}
                        />

                    </div>
                </div>
            )}

            {/* Main Container */}
            <div className="w-full max-w-5xl">

                {/* Back to Home */}
                <div className="mb-5">

                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="
                            inline-flex
                            items-center
                            gap-2
                            text-sm
                            font-medium
                            text-[#464555]
                            transition-colors
                            hover:text-[#3525cd]
                        "
                    >
                        <span className="text-lg">←</span>
                        Back to Home
                    </button>

                </div>

                {/* Login Card */}
                <div
                    className="
                        overflow-hidden
                        rounded-[28px]
                        border
                        border-[#ece9f8]
                        bg-white
                        shadow-[0_20px_60px_rgba(53,37,205,0.10)]
                    "
                >

                    <div className="grid md:grid-cols-2">

                        {/* =================================================
                            LEFT SIDE - BRAND PANEL
                        ================================================= */}

                        <div
                            className="
                                relative
                                hidden
                                overflow-hidden
                                bg-[#3525cd]
                                p-10
                                text-white
                                md:flex
                                md:flex-col
                                md:justify-between
                                lg:p-12
                            "
                        >

                            {/* Decorative circles */}
                            <div
                                className="
                                    absolute
                                    -right-24
                                    -top-24
                                    h-64
                                    w-64
                                    rounded-full
                                    bg-white/10
                                "
                            />

                            <div
                                className="
                                    absolute
                                    -bottom-28
                                    -left-20
                                    h-72
                                    w-72
                                    rounded-full
                                    bg-white/10
                                "
                            />

                            <div className="relative z-10">

                                {/* Logo */}
                                <button
                                    type="button"
                                    onClick={() => navigate("/")}
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            h-11
                                            w-11
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-white
                                            text-[#3525cd]
                                            shadow-lg
                                        "
                                    >
                                        <Sparkles size={23} />
                                    </div>

                                    <span
                                        className="
                                            text-2xl
                                            font-bold
                                            tracking-tight
                                        "
                                    >
                                        MultiServe
                                    </span>

                                </button>

                                {/* Heading */}
                                <div className="mt-20">

                                    <p
                                        className="
                                            mb-4
                                            inline-flex
                                            items-center
                                            gap-2
                                            rounded-full
                                            bg-white/10
                                            px-4
                                            py-2
                                            text-sm
                                            font-medium
                                        "
                                    >
                                        <ShieldCheck size={16} />

                                        Trusted Service Platform
                                    </p>

                                    <h2
                                        className="
                                            max-w-md
                                            text-4xl
                                            font-bold
                                            leading-tight
                                            lg:text-5xl
                                        "
                                    >
                                        Welcome back to

                                        <span className="block text-white/80">
                                            MultiServe.
                                        </span>
                                    </h2>

                                    <p
                                        className="
                                            mt-6
                                            max-w-md
                                            text-base
                                            leading-7
                                            text-white/75
                                        "
                                    >
                                        Sign in to book trusted professionals,
                                        manage your services and keep track
                                        of all your bookings in one place.
                                    </p>

                                </div>

                            </div>

                            {/* Bottom Trust */}
                            <div
                                className="
                                    relative
                                    z-10
                                    mt-12
                                    flex
                                    items-center
                                    gap-3
                                    text-sm
                                    text-white/80
                                "
                            >

                                <div
                                    className="
                                        flex
                                        h-9
                                        w-9
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-white/10
                                    "
                                >
                                    <ShieldCheck size={18} />
                                </div>

                                <span>
                                    Secure & reliable service experience
                                </span>

                            </div>

                        </div>

                        {/* =================================================
                            RIGHT SIDE - LOGIN FORM
                        ================================================= */}

                        <div className="p-6 sm:p-9 lg:p-12">

                            {/* Mobile Logo */}
                            <div
                                className="
                                    mb-8
                                    flex
                                    items-center
                                    gap-3
                                    md:hidden
                                "
                            >

                                <div
                                    className="
                                        flex
                                        h-11
                                        w-11
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-[#3525cd]
                                        text-white
                                    "
                                >
                                    <Sparkles size={22} />
                                </div>

                                <div>

                                    <h2
                                        className="
                                            text-xl
                                            font-bold
                                            text-[#1b1b24]
                                        "
                                    >
                                        MultiServe
                                    </h2>

                                    <p className="text-xs text-[#6b6878]">
                                        Trusted service platform
                                    </p>

                                </div>

                            </div>

                            {/* Heading */}
                            <div className="mb-8">

                                <h1
                                    className="
                                        text-3xl
                                        font-bold
                                        tracking-tight
                                        text-[#1b1b24]
                                        sm:text-4xl
                                    "
                                >
                                    Sign in
                                </h1>

                                <p
                                    className="
                                        mt-2
                                        text-sm
                                        text-[#6b6878]
                                        sm:text-base
                                    "
                                >
                                    Access your MultiServe account
                                </p>

                            </div>

                            {/* =================================================
                                FORM
                            ================================================= */}

                            <form
                                onSubmit={handlePasswordLogin}
                                className="space-y-5"
                            >

                                {/* Email */}
                                <div>

                                    <label
                                        htmlFor="email"
                                        className="
                                            mb-2
                                            block
                                            text-sm
                                            font-semibold
                                            text-[#1b1b24]
                                        "
                                    >
                                        Email address
                                    </label>

                                    <div className="relative">

                                        <Mail
                                            size={19}
                                            className="
                                                absolute
                                                left-4
                                                top-1/2
                                                -translate-y-1/2
                                                text-[#777486]
                                            "
                                        />

                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            required
                                            autoComplete="email"
                                            className="
                                                h-13
                                                w-full
                                                rounded-xl
                                                border
                                                border-[#dedbea]
                                                bg-[#fcfaff]
                                                pl-12
                                                pr-4
                                                text-sm
                                                text-[#1b1b24]
                                                outline-none
                                                transition-all
                                                placeholder:text-[#9693a3]
                                                focus:border-[#3525cd]
                                                focus:bg-white
                                                focus:ring-4
                                                focus:ring-[#3525cd]/10
                                            "
                                        />

                                    </div>

                                </div>

                                {/* Password */}
                                <div>

                                    <div className="mb-2">

                                        <label
                                            htmlFor="password"
                                            className="
                                                text-sm
                                                font-semibold
                                                text-[#1b1b24]
                                            "
                                        >
                                            Password
                                        </label>

                                    </div>

                                    <div className="relative">

                                        <LockKeyhole
                                            size={19}
                                            className="
                                                absolute
                                                left-4
                                                top-1/2
                                                -translate-y-1/2
                                                text-[#777486]
                                            "
                                        />

                                        <input
                                            id="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            required
                                            autoComplete="current-password"
                                            className="
                                                h-13
                                                w-full
                                                rounded-xl
                                                border
                                                border-[#dedbea]
                                                bg-[#fcfaff]
                                                pl-12
                                                pr-12
                                                text-sm
                                                text-[#1b1b24]
                                                outline-none
                                                transition-all
                                                placeholder:text-[#9693a3]
                                                focus:border-[#3525cd]
                                                focus:bg-white
                                                focus:ring-4
                                                focus:ring-[#3525cd]/10
                                            "
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(
                                                    !showPassword
                                                )
                                            }
                                            className="
                                                absolute
                                                right-4
                                                top-1/2
                                                -translate-y-1/2
                                                text-[#777486]
                                                transition
                                                hover:text-[#3525cd]
                                            "
                                            aria-label={
                                                showPassword
                                                    ? "Hide password"
                                                    : "Show password"
                                            }
                                        >
                                            {showPassword ? (
                                                <EyeOff size={19} />
                                            ) : (
                                                <Eye size={19} />
                                            )}
                                        </button>

                                    </div>

                                </div>

                                {/* Login Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`
                                        group
                                        flex
                                        h-13
                                        w-full
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-xl
                                        px-5
                                        text-sm
                                        font-bold
                                        text-white
                                        transition-all

                                        ${
                                            loading
                                                ? `
                                                    cursor-not-allowed
                                                    bg-[#9b97b2]
                                                `
                                                : `
                                                    bg-[#3525cd]
                                                    shadow-[0_10px_25px_rgba(53,37,205,0.22)]
                                                    hover:-translate-y-0.5
                                                    hover:bg-[#2d20b0]
                                                    hover:shadow-[0_14px_30px_rgba(53,37,205,0.28)]
                                                `
                                        }
                                    `}
                                >

                                    {loading ? (
                                        <>
                                            <span
                                                className="
                                                    h-4
                                                    w-4
                                                    animate-spin
                                                    rounded-full
                                                    border-2
                                                    border-white/30
                                                    border-t-white
                                                "
                                            />

                                            Logging in...
                                        </>
                                    ) : (
                                        <>
                                            Login

                                            <ArrowRight
                                                size={18}
                                                className="
                                                    transition-transform
                                                    group-hover:translate-x-1
                                                "
                                            />
                                        </>
                                    )}

                                </button>

                            </form>

                            {/* Divider */}
                            <div className="my-7 flex items-center gap-4">

                                <div className="h-px flex-1 bg-[#e8e5f0]" />

                                <span
                                    className="
                                        text-xs
                                        font-medium
                                        text-[#9995a5]
                                    "
                                >
                                    OR
                                </span>

                                <div className="h-px flex-1 bg-[#e8e5f0]" />

                            </div>

                            {/* Register */}
                            <div
                                className="
                                    rounded-2xl
                                    border
                                    border-[#e8e5f0]
                                    bg-[#faf8ff]
                                    p-5
                                    text-center
                                "
                            >

                                <p className="text-sm text-[#6b6878]">
                                    Don't have an account?
                                </p>

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate("/register")
                                    }
                                    className="
                                        mt-2
                                        inline-flex
                                        items-center
                                        gap-1
                                        text-sm
                                        font-bold
                                        text-[#3525cd]
                                        transition
                                        hover:text-[#281ca5]
                                    "
                                >
                                    Create an account

                                    <ArrowRight size={16} />
                                </button>

                            </div>

                            {/* Security */}
                            <div
                                className="
                                    mt-6
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    text-xs
                                    text-[#8a8797]
                                "
                            >

                                <ShieldCheck size={15} />

                                <span>
                                    Your account information is protected
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Footer */}
                <p
                    className="
                        mt-6
                        text-center
                        text-xs
                        text-[#8a8797]
                    "
                >
                    © {new Date().getFullYear()} MultiServe.
                    All rights reserved.
                </p>

            </div>

            {/* =====================================================
                ANIMATION STYLES
            ===================================================== */}

            <style>
                {`
                    @keyframes slideIn {
                        from {
                            opacity: 0;
                            transform: translateX(35px);
                        }

                        to {
                            opacity: 1;
                            transform: translateX(0);
                        }
                    }

                    @keyframes toastProgress {
                        from {
                            transform: scaleX(1);
                        }

                        to {
                            transform: scaleX(0);
                        }
                    }
                `}
            </style>

        </div>
    );
}

export default Login;