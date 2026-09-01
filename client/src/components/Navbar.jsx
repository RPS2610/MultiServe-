import { Link, useNavigate } from "react-router-dom";
import {
    Bell,
    User,
    LogOut,
    ChevronDown,
    Home as HomeIcon,
    CalendarDays,
    BriefcaseBusiness,
    ShieldCheck
} from "lucide-react";
import { useEffect, useState } from "react";
import { getNotifications } from "../api/notificationApi";

import logo from "../assets/multiserve-logo.png";

function Navbar() {

    const navigate = useNavigate();

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user"))
    );

    const [notificationCount, setNotificationCount] = useState(0);
    const [profileOpen, setProfileOpen] = useState(false);

    /* ================= NOTIFICATIONS ================= */

    useEffect(() => {

        const loadNotifications = async () => {

            if (!user?._id) return;

            try {

                const data = await getNotifications(user._id);

                const unread = data.filter(
                    item => !item.isRead
                ).length;

                setNotificationCount(unread);

            } catch (error) {

                console.log(error);

            }

        };

        loadNotifications();

    }, [user]);


    /* ================= UPDATE USER ================= */

    useEffect(() => {

        const updateUser = () => {

            const updatedUser =
                JSON.parse(localStorage.getItem("user"));

            setUser(updatedUser);

        };

        window.addEventListener(
            "userUpdated",
            updateUser
        );

        window.addEventListener(
            "storage",
            updateUser
        );

        return () => {

            window.removeEventListener(
                "userUpdated",
                updateUser
            );

            window.removeEventListener(
                "storage",
                updateUser
            );

        };

    }, []);


    /* ================= LOGOUT ================= */

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
        setProfileOpen(false);

        navigate("/");

    };


    /* ================= PROFILE IMAGE ================= */

    const profileImage =
        user?.profileImage || null;


    /* ================= DASHBOARD LINK ================= */

    const DashboardLink = ({ mobile = false }) => {

        if (user?.role === "customer") {

            return (
                <Link
                    to="/my-bookings"
                    className={
                        mobile
                            ? `
                                flex
                                items-center
                                justify-center
                                w-10
                                h-10
                                rounded-full
                                text-gray-800
                                hover:text-blue-600
                                hover:bg-blue-50
                                transition
                              `
                            : `
                                flex
                                flex-col
                                items-center
                                justify-center
                                w-[70px]
                                py-1
                                rounded-xl
                                text-gray-800
                                hover:text-blue-600
                                hover:bg-blue-50
                                transition
                              `
                    }
                >

                    <CalendarDays
                        size={mobile ? 22 : 21}
                    />

                    {!mobile && (
                        <span className="
                            text-[11px]
                            font-medium
                            leading-tight
                            text-center
                        ">
                            My Bookings
                        </span>
                    )}

                </Link>
            );

        }


        if (user?.role === "provider") {

            return (
                <Link
                    to="/provider-dashboard"
                    className={
                        mobile
                            ? `
                                flex
                                items-center
                                justify-center
                                w-10
                                h-10
                                rounded-full
                                text-gray-800
                                hover:text-blue-600
                                hover:bg-blue-50
                                transition
                              `
                            : `
                                flex
                                flex-col
                                items-center
                                justify-center
                                w-[70px]
                                py-1
                                rounded-xl
                                text-gray-800
                                hover:text-blue-600
                                hover:bg-blue-50
                                transition
                              `
                    }
                >

                    <BriefcaseBusiness
                        size={mobile ? 22 : 21}
                    />

                    {!mobile && (
                        <span className="
                            text-[11px]
                            font-medium
                            leading-tight
                            text-center
                        ">
                            Dashboard
                        </span>
                    )}

                </Link>
            );

        }


        if (
            user?.role === "admin" ||
            user?.role === "Admin"
        ) {

            return (
                <Link
                    to="/admin-dashboard"
                    className={
                        mobile
                            ? `
                                flex
                                items-center
                                justify-center
                                w-10
                                h-10
                                rounded-full
                                text-gray-800
                                hover:text-blue-600
                                hover:bg-blue-50
                                transition
                              `
                            : `
                                flex
                                flex-col
                                items-center
                                justify-center
                                w-[70px]
                                py-1
                                rounded-xl
                                text-gray-800
                                hover:text-blue-600
                                hover:bg-blue-50
                                transition
                              `
                    }
                >

                    <ShieldCheck
                        size={mobile ? 22 : 21}
                    />

                    {!mobile && (
                        <span className="
                            text-[11px]
                            font-medium
                            leading-tight
                            text-center
                        ">
                            Dashboard
                        </span>
                    )}

                </Link>
            );

        }

        return null;

    };


    return (

        <nav className="
            sticky
            top-0
            z-50
            bg-white
            shadow-md
        ">

            <div className="relative">

                {/* ================================================= */}
                {/* MAIN NAVBAR */}
                {/* ================================================= */}

                <div className="
                    max-w-7xl
                    mx-auto
                    px-3
                    sm:px-5
                    lg:px-8
                    h-[70px]
                    sm:h-[80px]
                    lg:h-[92px]
                    flex
                    items-center
                    justify-between
                ">


                    {/* ================================================= */}
                    {/* LOGO */}
                    {/* ================================================= */}

                    <Link
                        to="/"
                        className="
                            flex
                            items-center
                            gap-2
                            sm:gap-3
                            lg:gap-4
                            min-w-0
                            flex-shrink-0
                            group
                        "
                    >

                        <div className="
                            w-12
                            h-12
                            sm:w-16
                            sm:h-16
                            lg:w-[72px]
                            lg:h-[72px]
                            flex-shrink-0
                            flex
                            items-center
                            justify-center
                        ">

                            <img
                                src={logo}
                                alt="MultiServe Logo"
                                className="
                                    w-full
                                    h-full
                                    object-contain
                                    transition-transform
                                    duration-300
                                    group-hover:scale-105
                                "
                            />

                        </div>


                        <div className="leading-none">

                            <div className="
                                text-[25px]
                                sm:text-[32px]
                                lg:text-[42px]
                                font-black
                                tracking-tight
                                italic
                                whitespace-nowrap
                            ">

                                <span className="text-gray-900">
                                    Multi
                                </span>

                                <span className="
                                    text-transparent
                                    bg-clip-text
                                    bg-gradient-to-r
                                    from-blue-600
                                    to-indigo-600
                                ">
                                    Serve
                                </span>

                            </div>


                            <p className="
                                hidden
                                lg:block
                                text-[11px]
                                tracking-[0.30em]
                                text-gray-500
                                mt-2
                            ">
                                ONE STOP. ALL SERVICES.
                            </p>

                        </div>

                    </Link>


                    {/* ================================================= */}
                    {/* DESKTOP NAVIGATION */}
                    {/* ================================================= */}

                    {user && (
<div className="
    hidden
    md:flex
    items-center
    gap-5
    ml-10
    mr-auto
">

                            {/* HOME */}

                            <Link
                                to="/"
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    px-3
                                    lg:px-4
                                    py-3
                                    rounded-full
                                    text-gray-800
                                    hover:text-blue-600
                                    hover:bg-blue-50
                                    transition
                                    whitespace-nowrap
                                "
                            >

                                <HomeIcon
                                    size={21}
                                    strokeWidth={2}
                                />

                                <span className="
                                    font-medium
                                ">
                                    Home
                                </span>

                            </Link>


                            {/* DASHBOARD */}

                            <DashboardLink />

                        </div>

                    )}


                    {/* ================================================= */}
                    {/* RIGHT SIDE */}
                    {/* ================================================= */}

                   <div className="
    flex
    items-center
    gap-5
    ml-6
">


                        {/* ================================================= */}
                        {/* MOBILE HOME */}
                        {/* ================================================= */}

                        {user && (

                            <Link
                                to="/"
                                className="
                                    md:hidden
                                    flex
                                    items-center
                                    justify-center
                                    w-10
                                    h-10
                                    rounded-full
                                    text-gray-800
                                    hover:text-blue-600
                                    hover:bg-blue-50
                                    transition
                                    flex-shrink-0
                                "
                            >

                                <HomeIcon
                                    size={22}
                                    strokeWidth={2}
                                />

                            </Link>

                        )}




                        {/* ================================================= */}
                        {/* DESKTOP REGISTER */}
                        {/* ================================================= */}

                        {!user && (

                            <Link
                                to="/register"
                                className="
                                    hidden
                                    sm:block
                                    px-4
                                    lg:px-5
                                    py-2
                                    lg:py-2.5
                                    rounded-full
                                    text-blue-600
                                    font-semibold
                                    hover:bg-blue-50
                                    transition
                                    whitespace-nowrap
                                "
                            >
                                Register
                            </Link>

                        )}


                        {/* ================================================= */}
                        {/* LOGIN */}
                        {/* ================================================= */}

                        {!user && (

                            <Link
                                to="/login"
                                className="
                                    bg-gradient-to-r
                                    from-blue-600
                                    to-indigo-600
                                    text-white
                                    px-4
                                    sm:px-5
                                    py-2
                                    sm:py-2.5
                                    rounded-full
                                    font-semibold
                                    shadow-md
                                    hover:shadow-lg
                                    transition
                                    whitespace-nowrap
                                "
                            >
                                Login
                            </Link>

                        )}


                        {/* ================================================= */}
                        {/* NOTIFICATION */}
                        {/* ================================================= */}

                        {user && (

                            <Link
                                to="/notifications"
                                className="
                                    relative
                                    w-10
                                    h-10
                                    sm:w-11
                                    sm:h-11
                                    flex
                                    items-center
                                    justify-center
                                    rounded-full
                                    hover:bg-blue-50
                                    text-gray-800
                                    hover:text-blue-600
                                    transition
                                    flex-shrink-0
                                "
                            >

                                <Bell
                                    size={23}
                                    strokeWidth={2}
                                />

                                {notificationCount > 0 && (

                                    <span className="
                                        absolute
                                        -top-0.5
                                        -right-0.5
                                        min-w-5
                                        h-5
                                        px-1
                                        rounded-full
                                        bg-gradient-to-r
                                        from-blue-600
                                        to-indigo-600
                                        text-white
                                        text-[10px]
                                        font-bold
                                        flex
                                        items-center
                                        justify-center
                                        border-2
                                        border-white
                                    ">

                                        {notificationCount}

                                    </span>

                                )}

                            </Link>

                        )}


                        {/* ================================================= */}
                        {/* PROFILE */}
                        {/* ================================================= */}

                        {user && (

                            <div className="
                                relative
                                flex-shrink-0
                            ">

                                <button
                                    onClick={() =>
                                        setProfileOpen(
                                            !profileOpen
                                        )
                                    }
                                    className="
                                        flex
                                        items-center
                                        gap-1
                                        sm:gap-2
                                    "
                                >

                                    <div className="
                                        w-10
                                        h-10
                                        sm:w-12
                                        sm:h-12
                                        lg:w-14
                                        lg:h-14
                                        rounded-full
                                        p-[2px]
                                        sm:p-[3px]
                                        bg-gradient-to-r
                                        from-blue-600
                                        to-indigo-600
                                        flex-shrink-0
                                    ">

                                        <div className="
                                            w-full
                                            h-full
                                            rounded-full
                                            bg-white
                                            overflow-hidden
                                            flex
                                            items-center
                                            justify-center
                                        ">

                                            {profileImage ? (

                                                <img
                                                    src={profileImage}
                                                    alt="Profile"
                                                    className="
                                                        w-full
                                                        h-full
                                                        object-cover
                                                    "
                                                />

                                            ) : (

                                                <User
                                                    size={24}
                                                    className="
                                                        text-blue-600
                                                    "
                                                />

                                            )}

                                        </div>

                                    </div>


                                    <ChevronDown
                                        size={17}
                                        className={`
                                            hidden
                                            sm:block
                                            text-gray-700
                                            transition-transform
                                            ${
                                                profileOpen
                                                    ? "rotate-180"
                                                    : ""
                                            }
                                        `}
                                    />

                                </button>


                                {/* ================================================= */}
                                {/* PROFILE DROPDOWN */}
                                {/* ================================================= */}

                                {profileOpen && (

                                    <>

                                        <div
                                            className="
                                                fixed
                                                inset-0
                                                z-40
                                            "
                                            onClick={() =>
                                                setProfileOpen(false)
                                            }
                                        />


                                        <div className="
                                            absolute
                                            right-0
                                            top-12
                                            sm:top-14
                                            lg:top-16
                                            w-[calc(100vw-24px)]
                                            max-w-64
                                            bg-white
                                            rounded-2xl
                                            shadow-2xl
                                            border
                                            border-gray-100
                                            overflow-hidden
                                            z-50
                                        ">


                                            {/* USER INFO */}

                                            <div className="
                                                px-4
                                                sm:px-5
                                                py-4
                                                sm:py-5
                                                bg-gradient-to-r
                                                from-blue-50
                                                to-indigo-50
                                            ">

                                                <div className="
                                                    flex
                                                    items-center
                                                    gap-3
                                                ">

                                                    <div className="
                                                        w-10
                                                        h-10
                                                        sm:w-11
                                                        sm:h-11
                                                        rounded-full
                                                        overflow-hidden
                                                        bg-white
                                                        border-2
                                                        border-blue-500
                                                        flex
                                                        items-center
                                                        justify-center
                                                    ">

                                                        {profileImage ? (

                                                            <img
                                                                src={profileImage}
                                                                alt="Profile"
                                                                className="
                                                                    w-full
                                                                    h-full
                                                                    object-cover
                                                                "
                                                            />

                                                        ) : (

                                                            <User
                                                                size={22}
                                                                className="
                                                                    text-blue-600
                                                                "
                                                            />

                                                        )}

                                                    </div>


                                                    <div className="
                                                        min-w-0
                                                    ">

                                                        <p className="
                                                            font-bold
                                                            text-gray-900
                                                            truncate
                                                        ">
                                                            {user.name}
                                                        </p>

                                                        <p className="
                                                            text-xs
                                                            text-gray-500
                                                            capitalize
                                                        ">
                                                            {user.role}
                                                        </p>

                                                    </div>

                                                </div>

                                            </div>


                                            {/* ================================================= */}
                                            {/* DASHBOARD INSIDE PROFILE */}
                                            {/* ================================================= */}

                                            <button
                                                onClick={() => {

                                                    setProfileOpen(false);

                                                    if (
                                                        user?.role ===
                                                        "customer"
                                                    ) {

                                                        navigate(
                                                            "/my-bookings"
                                                        );

                                                    } else if (
                                                        user?.role ===
                                                        "provider"
                                                    ) {

                                                        navigate(
                                                            "/provider-dashboard"
                                                        );

                                                    } else if (
                                                        user?.role ===
                                                            "admin" ||
                                                        user?.role ===
                                                            "Admin"
                                                    ) {

                                                        navigate(
                                                            "/admin-dashboard"
                                                        );

                                                    }

                                                }}
                                                className="
                                                    w-full
                                                    px-4
                                                    sm:px-5
                                                    py-3
                                                    sm:py-4
                                                    flex
                                                    items-center
                                                    gap-3
                                                    sm:gap-4
                                                    text-left
                                                    hover:bg-blue-50
                                                    transition
                                                "
                                            >

                                                <div className="
                                                    w-9
                                                    h-9
                                                    sm:w-10
                                                    sm:h-10
                                                    rounded-full
                                                    bg-indigo-100
                                                    flex
                                                    items-center
                                                    justify-center
                                                ">

                                                    {user?.role ===
                                                    "customer" ? (

                                                        <CalendarDays
                                                            size={20}
                                                            className="
                                                                text-indigo-600
                                                            "
                                                        />

                                                    ) : user?.role ===
                                                        "provider" ? (

                                                        <BriefcaseBusiness
                                                            size={20}
                                                            className="
                                                                text-indigo-600
                                                            "
                                                        />

                                                    ) : (

                                                        <ShieldCheck
                                                            size={20}
                                                            className="
                                                                text-indigo-600
                                                            "
                                                        />

                                                    )}

                                                </div>


                                                <span className="
                                                    font-medium
                                                    text-gray-800
                                                ">

                                                    {user?.role ===
                                                    "customer"
                                                        ? "My Bookings"
                                                        : "Dashboard"}

                                                </span>

                                            </button>


                                            {/* DIVIDER */}

                                            <div className="
                                                h-px
                                                bg-gray-100
                                                mx-4
                                                sm:mx-5
                                            " />


                                            {/* ================================================= */}
                                            {/* MY PROFILE */}
                                            {/* ================================================= */}

                                            <button
                                                onClick={() => {

                                                    setProfileOpen(false);

                                                    navigate(
                                                        "/profile"
                                                    );

                                                }}
                                                className="
                                                    w-full
                                                    px-4
                                                    sm:px-5
                                                    py-3
                                                    sm:py-4
                                                    flex
                                                    items-center
                                                    gap-3
                                                    sm:gap-4
                                                    text-left
                                                    hover:bg-blue-50
                                                    transition
                                                "
                                            >

                                                <div className="
                                                    w-9
                                                    h-9
                                                    sm:w-10
                                                    sm:h-10
                                                    rounded-full
                                                    bg-blue-100
                                                    flex
                                                    items-center
                                                    justify-center
                                                ">

                                                    <User
                                                        size={20}
                                                        className="
                                                            text-blue-600
                                                        "
                                                    />

                                                </div>

                                                <span className="
                                                    font-medium
                                                    text-gray-800
                                                ">
                                                    My Profile
                                                </span>

                                            </button>


                                            {/* DIVIDER */}

                                            <div className="
                                                h-px
                                                bg-gray-100
                                                mx-4
                                                sm:mx-5
                                            " />


                                            {/* ================================================= */}
                                            {/* LOGOUT */}
                                            {/* ================================================= */}

                                            <button
                                                onClick={logout}
                                                className="
                                                    w-full
                                                    px-4
                                                    sm:px-5
                                                    py-3
                                                    sm:py-4
                                                    flex
                                                    items-center
                                                    gap-3
                                                    sm:gap-4
                                                    text-left
                                                    hover:bg-red-50
                                                    transition
                                                "
                                            >

                                                <div className="
                                                    w-9
                                                    h-9
                                                    sm:w-10
                                                    sm:h-10
                                                    rounded-full
                                                    bg-red-100
                                                    flex
                                                    items-center
                                                    justify-center
                                                ">

                                                    <LogOut
                                                        size={20}
                                                        className="
                                                            text-red-600
                                                        "
                                                    />

                                                </div>

                                                <span className="
                                                    font-medium
                                                    text-red-600
                                                ">
                                                    Logout
                                                </span>

                                            </button>

                                        </div>

                                    </>

                                )}

                            </div>

                        )}

                    </div>

                </div>


                {/* ================================================= */}
                {/* CURVED BOTTOM STRIP */}
                {/* ================================================= */}

                <div className="
                    absolute
                    bottom-0
                    left-0
                    right-0
                    h-[5px]
                    sm:h-[7px]
                    overflow-hidden
                    pointer-events-none
                ">

                    <div className="
                        absolute
                        inset-0
                        bg-gradient-to-r
                        from-blue-600
                        via-indigo-600
                        to-purple-600
                    " />

                    <div className="
                        absolute
                        -top-4
                        left-[-2%]
                        w-[104%]
                        h-7
                        bg-white
                        rounded-[50%]
                    " />

                </div>

            </div>

        </nav>

    );

}

export default Navbar;