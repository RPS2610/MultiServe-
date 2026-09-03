import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Camera,
    CheckCircle2,
    MapPin,
    Phone,
    Save,
    ShieldCheck,
    User,
    BriefcaseBusiness,
    IndianRupee,
    Clock3,
    FileText,
    Upload,
    X,
} from "lucide-react";

import { updateProfile } from "../api/authApi";
import { uploadProfileImage } from "../api/userApi";

function Profile() {
    const navigate = useNavigate();

    const currentUser = JSON.parse(
        localStorage.getItem("user")
    );

    const [user, setUser] = useState(currentUser);
    const [image, setImage] = useState(null);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    // =====================================================
    // HANDLE INPUT CHANGE
    // =====================================================

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    // =====================================================
    // SAVE PROFILE DETAILS
    // =====================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            const data = await updateProfile(
                user._id,
                user
            );

            // Update localStorage
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            // Update page
            setUser(data.user);

            // Tell Navbar that user data changed
            window.dispatchEvent(
                new Event("userUpdated")
            );

            // Return to Home
            navigate("/");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                    "Update Failed"
            );
        } finally {
            setSaving(false);
        }
    };

    // =====================================================
    // UPLOAD PROFILE IMAGE
    // =====================================================

    const handleImageUpload = async () => {
        if (!image) {
            return;
        }

        try {
            setUploading(true);

            const data =
                await uploadProfileImage(image);

            // Save updated user
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            // Update profile page
            setUser(data.user);

            // Clear selected file
            setImage(null);

            // Tell Navbar to update profile photo
            window.dispatchEvent(
                new Event("userUpdated")
            );
        } catch (error) {
            alert(
                error.response?.data?.message ||
                    "Image Upload Failed"
            );
        } finally {
            setUploading(false);
        }
    };

    // =====================================================
    // REMOVE SELECTED IMAGE
    // =====================================================

    const handleCancelImage = () => {
        setImage(null);
    };

    // =====================================================
    // PROFILE IMAGE
    // =====================================================

    const profileImage =
        user?.profileImage ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user?.name || "User"
        )}&background=3525cd&color=ffffff&size=256`;

    // =====================================================
    // UI
    // =====================================================

    return (
        <div className="min-h-screen bg-[#fcf8ff]">

            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <main className="px-4 py-8 sm:px-6 lg:px-8">

                <div className="mx-auto max-w-6xl">

                    {/* =================================================
                        TOP NAVIGATION
                    ================================================= */}

                    <div className="mb-6 flex items-center justify-between">

                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#464555] transition hover:text-[#3525cd]"
                        >
                            <ArrowLeft size={18} />
                            Back to Home
                        </button>

                        <div className="hidden items-center gap-2 text-xs font-medium text-[#777486] sm:flex">
                            <ShieldCheck size={15} />
                            Secure Profile
                        </div>

                    </div>

                    {/* =================================================
                        PAGE HEADER
                    ================================================= */}

                    <div className="mb-8">

                        <div className="inline-flex items-center gap-2 rounded-full bg-[#eeeaff] px-3 py-1.5 text-xs font-bold text-[#3525cd]">
                            <User size={14} />
                            Account Settings
                        </div>

                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#1b1b24] sm:text-4xl">
                            My Profile
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6b6878] sm:text-base">
                            Manage your personal information and
                            keep your MultiServe profile up to date.
                        </p>

                    </div>

                    {/* =================================================
                        PROFILE LAYOUT
                    ================================================= */}

                    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">

                        {/* =================================================
                            LEFT PROFILE CARD
                        ================================================= */}

                        <aside className="h-fit overflow-hidden rounded-[24px] border border-[#e8e4f1] bg-white shadow-[0_10px_35px_rgba(53,37,205,0.06)]">

                            {/* Purple Header */}

                            <div className="relative h-28 overflow-hidden bg-[#3525cd]">

                                <div className="absolute -right-12 -top-16 h-40 w-40 rounded-full bg-white/10" />

                                <div className="absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-white/10" />

                            </div>

                            {/* Profile Content */}

                            <div className="px-6 pb-6">

                                {/* Profile Image */}

                                <div className="-mt-14 flex justify-center">

                                    <div className="relative">

                                        <img
                                            src={profileImage}
                                            alt="Profile"
                                            className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-[0_8px_25px_rgba(27,27,36,0.15)]"
                                        />

                                        <label
                                            htmlFor="profileImage"
                                            className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[#3525cd] text-white shadow-md transition hover:bg-[#2d20b0]"
                                            title="Choose profile image"
                                        >
                                            <Camera size={16} />
                                        </label>

                                    </div>

                                </div>

                                {/* Hidden File Input */}

                                <input
                                    id="profileImage"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const selectedFile =
                                            e.target.files?.[0];

                                        if (selectedFile) {
                                            setImage(selectedFile);
                                        }
                                    }}
                                />

                                {/* Name */}

                                <div className="mt-4 text-center">

                                    <h2 className="text-xl font-bold text-[#1b1b24]">
                                        {user?.name || "User"}
                                    </h2>

                                    <p className="mt-1 text-sm text-[#777486]">
                                        {user?.email || ""}
                                    </p>

                                </div>

                                {/* Role */}

                                <div className="mt-4 flex justify-center">

                                    <span className="inline-flex items-center gap-2 rounded-full bg-[#eeeaff] px-3 py-1.5 text-xs font-bold capitalize text-[#3525cd]">

                                        <CheckCircle2 size={14} />

                                        {user?.role === "provider"
                                            ? "Service Provider"
                                            : "Customer"}

                                    </span>

                                </div>

                                {/* Selected Image */}

                                {image && (
                                    <div className="mt-5 rounded-xl border border-[#e6e2f0] bg-[#faf8ff] p-3">

                                        <div className="flex items-start gap-3">

                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eeeaff] text-[#3525cd]">
                                                <Upload size={16} />
                                            </div>

                                            <div className="min-w-0 flex-1">

                                                <p className="text-xs font-bold text-[#1b1b24]">
                                                    New profile image
                                                </p>

                                                <p className="mt-1 truncate text-xs text-[#777486]">
                                                    {image.name}
                                                </p>

                                            </div>

                                            <button
                                                type="button"
                                                onClick={
                                                    handleCancelImage
                                                }
                                                className="text-[#8a8797] transition hover:text-[#dc2626]"
                                                aria-label="Cancel selected image"
                                            >
                                                <X size={16} />
                                            </button>

                                        </div>

                                        <button
                                            type="button"
                                            onClick={
                                                handleImageUpload
                                            }
                                            disabled={uploading}
                                            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-[#10B981] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#059669] disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            {uploading ? (
                                                <>
                                                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                                    Uploading...
                                                </>
                                            ) : (
                                                <>
                                                    <Upload size={15} />
                                                    Upload Image
                                                </>
                                            )}
                                        </button>

                                    </div>
                                )}

                                {/* Profile Summary */}

                                <div className="mt-6 space-y-3 border-t border-[#eeeaf4] pt-5">

                                    {user?.phone && (
                                        <div className="flex items-center gap-3">

                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f4f2fa] text-[#777486]">
                                                <Phone size={16} />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-[11px] font-medium text-[#8a8797]">
                                                    Phone
                                                </p>

                                                <p className="truncate text-sm font-semibold text-[#464555]">
                                                    {user.phone}
                                                </p>
                                            </div>

                                        </div>
                                    )}

                                    {user?.city && (
                                        <div className="flex items-center gap-3">

                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f4f2fa] text-[#777486]">
                                                <MapPin size={16} />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-[11px] font-medium text-[#8a8797]">
                                                    Location
                                                </p>

                                                <p className="truncate text-sm font-semibold text-[#464555]">
                                                    {user.city}
                                                </p>
                                            </div>

                                        </div>
                                    )}

                                </div>

                            </div>

                        </aside>

                        {/* =================================================
                            RIGHT FORM
                        ================================================= */}

                        <section className="rounded-[24px] border border-[#e8e4f1] bg-white p-5 shadow-[0_10px_35px_rgba(53,37,205,0.06)] sm:p-7 lg:p-8">

                            {/* Form Header */}

                            <div className="mb-7 border-b border-[#eeeaf4] pb-6">

                                <h2 className="text-xl font-bold text-[#1b1b24]">
                                    Personal Information
                                </h2>

                                <p className="mt-1 text-sm text-[#777486]">
                                    Update the information associated
                                    with your account.
                                </p>

                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >

                                {/* =================================================
                                    BASIC INFORMATION
                                ================================================= */}

                                <div>

                                    <div className="mb-4 flex items-center gap-2">

                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#eeeaff] text-[#3525cd]">
                                            <User size={16} />
                                        </div>

                                        <h3 className="text-sm font-bold text-[#1b1b24]">
                                            Basic Details
                                        </h3>

                                    </div>

                                    <div className="grid gap-5 sm:grid-cols-2">

                                        {/* NAME */}

                                        <div>

                                            <label
                                                htmlFor="name"
                                                className="mb-2 block text-sm font-semibold text-[#1b1b24]"
                                            >
                                                Full name
                                            </label>

                                            <div className="relative">

                                                <User
                                                    size={17}
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8797]"
                                                />

                                                <input
                                                    id="name"
                                                    type="text"
                                                    name="name"
                                                    value={
                                                        user?.name ||
                                                        ""
                                                    }
                                                    onChange={
                                                        handleChange
                                                    }
                                                    className="h-12 w-full rounded-xl border border-[#dedbea] bg-[#fcfaff] pl-11 pr-4 text-sm text-[#1b1b24] outline-none transition-all placeholder:text-[#9693a3] focus:border-[#3525cd] focus:bg-white focus:ring-4 focus:ring-[#3525cd]/10"
                                                    placeholder="Your full name"
                                                />

                                            </div>

                                        </div>

                                        {/* EMAIL */}

                                        <div>

                                            <label
                                                htmlFor="email"
                                                className="mb-2 block text-sm font-semibold text-[#1b1b24]"
                                            >
                                                Email address
                                            </label>

                                            <input
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={
                                                    user?.email ||
                                                    ""
                                                }
                                                readOnly
                                                className="h-12 w-full rounded-xl border border-[#dedbea] bg-[#f5f3f9] px-4 text-sm text-[#777486] outline-none cursor-not-allowed"
                                            />

                                            <p className="mt-1.5 text-xs text-[#9995a5]">
                                                Email address cannot be changed here.
                                            </p>

                                        </div>

                                        {/* PHONE */}

                                        <div>

                                            <label
                                                htmlFor="phone"
                                                className="mb-2 block text-sm font-semibold text-[#1b1b24]"
                                            >
                                                Phone number
                                            </label>

                                            <div className="relative">

                                                <Phone
                                                    size={17}
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8797]"
                                                />

                                                <input
                                                    id="phone"
                                                    type="text"
                                                    name="phone"
                                                    value={
                                                        user?.phone ||
                                                        ""
                                                    }
                                                    onChange={
                                                        handleChange
                                                    }
                                                    className="h-12 w-full rounded-xl border border-[#dedbea] bg-[#fcfaff] pl-11 pr-4 text-sm text-[#1b1b24] outline-none transition-all focus:border-[#3525cd] focus:bg-white focus:ring-4 focus:ring-[#3525cd]/10"
                                                    placeholder="Phone number"
                                                />

                                            </div>

                                        </div>

                                        {/* CITY */}

                                        <div>

                                            <label
                                                htmlFor="city"
                                                className="mb-2 block text-sm font-semibold text-[#1b1b24]"
                                            >
                                                City
                                            </label>

                                            <div className="relative">

                                                <MapPin
                                                    size={17}
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8797]"
                                                />

                                                <input
                                                    id="city"
                                                    type="text"
                                                    name="city"
                                                    value={
                                                        user?.city ||
                                                        ""
                                                    }
                                                    onChange={
                                                        handleChange
                                                    }
                                                    className="h-12 w-full rounded-xl border border-[#dedbea] bg-[#fcfaff] pl-11 pr-4 text-sm text-[#1b1b24] outline-none transition-all focus:border-[#3525cd] focus:bg-white focus:ring-4 focus:ring-[#3525cd]/10"
                                                    placeholder="Your city"
                                                />

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                {/* =================================================
                                    ADDRESS
                                ================================================= */}

                                <div>

                                    <div className="mb-4 flex items-center gap-2">

                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f3f1f8] text-[#777486]">
                                            <MapPin size={16} />
                                        </div>

                                        <h3 className="text-sm font-bold text-[#1b1b24]">
                                            Address
                                        </h3>

                                    </div>

                                    <textarea
                                        name="address"
                                        value={
                                            user?.address || ""
                                        }
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full resize-none rounded-xl border border-[#dedbea] bg-[#fcfaff] px-4 py-3 text-sm text-[#1b1b24] outline-none transition-all placeholder:text-[#9693a3] focus:border-[#3525cd] focus:bg-white focus:ring-4 focus:ring-[#3525cd]/10"
                                        placeholder="Enter your complete address"
                                    />

                                </div>

                                {/* =================================================
                                    PROVIDER DETAILS
                                ================================================= */}

                                {user?.role === "provider" && (
                                    <div>

                                        <div className="mb-4 flex items-center gap-2">

                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#eeeaff] text-[#3525cd]">
                                                <BriefcaseBusiness size={16} />
                                            </div>

                                            <div>

                                                <h3 className="text-sm font-bold text-[#1b1b24]">
                                                    Professional Details
                                                </h3>

                                                <p className="text-xs text-[#8a8797]">
                                                    Information customers see about your services.
                                                </p>

                                            </div>

                                        </div>

                                        <div className="grid gap-5 sm:grid-cols-2">

                                            {/* SERVICE */}

                                            <div>

                                                <label
                                                    htmlFor="service"
                                                    className="mb-2 block text-sm font-semibold text-[#1b1b24]"
                                                >
                                                    Service
                                                </label>

                                                <div className="relative">

                                                    <BriefcaseBusiness
                                                        size={17}
                                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8797]"
                                                    />

                                                    <input
                                                        id="service"
                                                        type="text"
                                                        name="service"
                                                        value={
                                                            user?.service ||
                                                            ""
                                                        }
                                                        onChange={
                                                            handleChange
                                                        }
                                                        className="h-12 w-full rounded-xl border border-[#dedbea] bg-[#fcfaff] pl-11 pr-4 text-sm text-[#1b1b24] outline-none transition-all focus:border-[#3525cd] focus:bg-white focus:ring-4 focus:ring-[#3525cd]/10"
                                                        placeholder="e.g. Electrician"
                                                    />

                                                </div>

                                            </div>

                                            {/* EXPERIENCE */}

                                            <div>

                                                <label
                                                    htmlFor="experience"
                                                    className="mb-2 block text-sm font-semibold text-[#1b1b24]"
                                                >
                                                    Experience
                                                </label>

                                                <div className="relative">

                                                    <Clock3
                                                        size={17}
                                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8797]"
                                                    />

                                                    <input
                                                        id="experience"
                                                        type="number"
                                                        name="experience"
                                                        value={
                                                            user?.experience ??
                                                            ""
                                                        }
                                                        onChange={
                                                            handleChange
                                                        }
                                                        min="0"
                                                        className="h-12 w-full rounded-xl border border-[#dedbea] bg-[#fcfaff] pl-11 pr-14 text-sm text-[#1b1b24] outline-none transition-all focus:border-[#3525cd] focus:bg-white focus:ring-4 focus:ring-[#3525cd]/10"
                                                        placeholder="Years"
                                                    />

                                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-[#8a8797]">
                                                        years
                                                    </span>

                                                </div>

                                            </div>

                                            {/* PRICE */}

                                            <div>

                                                <label
                                                    htmlFor="price"
                                                    className="mb-2 block text-sm font-semibold text-[#1b1b24]"
                                                >
                                                    Starting price
                                                </label>

                                                <div className="relative">

                                                    <IndianRupee
                                                        size={17}
                                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8797]"
                                                    />

                                                    <input
                                                        id="price"
                                                        type="number"
                                                        name="price"
                                                        value={
                                                            user?.price ??
                                                            ""
                                                        }
                                                        onChange={
                                                            handleChange
                                                        }
                                                        min="0"
                                                        className="h-12 w-full rounded-xl border border-[#dedbea] bg-[#fcfaff] pl-11 pr-4 text-sm text-[#1b1b24] outline-none transition-all focus:border-[#3525cd] focus:bg-white focus:ring-4 focus:ring-[#3525cd]/10"
                                                        placeholder="Service price"
                                                    />

                                                </div>

                                            </div>

                                            {/* ABOUT */}

                                            <div className="sm:col-span-2">

                                                <label
                                                    htmlFor="about"
                                                    className="mb-2 block text-sm font-semibold text-[#1b1b24]"
                                                >
                                                    About yourself
                                                </label>

                                                <div className="relative">

                                                    <FileText
                                                        size={17}
                                                        className="absolute left-4 top-4 text-[#8a8797]"
                                                    />

                                                    <textarea
                                                        id="about"
                                                        name="about"
                                                        value={
                                                            user?.about ||
                                                            ""
                                                        }
                                                        onChange={
                                                            handleChange
                                                        }
                                                        rows="5"
                                                        className="w-full resize-none rounded-xl border border-[#dedbea] bg-[#fcfaff] py-3 pl-11 pr-4 text-sm text-[#1b1b24] outline-none transition-all placeholder:text-[#9693a3] focus:border-[#3525cd] focus:bg-white focus:ring-4 focus:ring-[#3525cd]/10"
                                                        placeholder="Tell customers about your experience, expertise and service..."
                                                    />

                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                )}

                                {/* =================================================
                                    SAVE ACTIONS
                                ================================================= */}

                                <div className="flex flex-col-reverse gap-3 border-t border-[#eeeaf4] pt-6 sm:flex-row sm:justify-end">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            navigate("/")
                                        }
                                        className="rounded-xl border border-[#ddd9e8] bg-white px-5 py-3 text-sm font-bold text-[#464555] transition hover:border-[#3525cd] hover:text-[#3525cd]"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3525cd] px-6 py-3 text-sm font-bold text-white shadow-[0_8px_20px_rgba(53,37,205,0.2)] transition hover:-translate-y-0.5 hover:bg-[#2d20b0] disabled:cursor-not-allowed disabled:bg-[#9b97b2]"
                                    >
                                        {saving ? (
                                            <>
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save size={17} />
                                                Save Changes
                                            </>
                                        )}
                                    </button>

                                </div>

                            </form>

                        </section>

                    </div>

                    {/* =================================================
                        SECURITY FOOTER
                    ================================================= */}

                    <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#e7e3f0] bg-white p-5">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f1efff] text-[#3525cd]">
                            <ShieldCheck size={18} />
                        </div>

                        <div>

                            <h3 className="text-sm font-bold text-[#1b1b24]">
                                Your information is secure
                            </h3>

                            <p className="mt-1 text-xs leading-5 text-[#777486] sm:text-sm">
                                Your profile information is used to
                                provide a better MultiServe experience
                                and is handled securely.
                            </p>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default Profile;