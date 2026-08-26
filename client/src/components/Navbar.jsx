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


    return (

        <nav className="
            sticky
            top-0
            z-50
            bg-white
            shadow-md
        ">

            {/* ================================================= */}
            {/* MAIN NAVBAR */}
            {/* ================================================= */}

            <div className="relative">

                <div className="
                    max-w-7xl
                    mx-auto
                    px-5
                    sm:px-6
                    lg:px-8
                    h-[92px]
                    flex
                    items-center
                    justify-between
                ">


              {/* ================= LOGO ================= */}

<Link
    to="/"
    className="
        flex
        items-center
        gap-4
        min-w-0
        flex-shrink-0
        group
    "
>

    {/* MultiServe Logo Image */}

    <div className="
        w-[72px]
        h-[72px]
        sm:w-[82px]
        sm:h-[82px]
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


    {/* Website Name */}

    <div className="leading-none">

        <div className="
            text-[36px]
            sm:text-[42px]
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
            sm:block
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
                    {/* RIGHT SIDE */}
                    {/* ================================================= */}

                    <div className="
                        flex
                        items-center
                        gap-2
                        sm:gap-4
                        lg:gap-6
                        ml-4
                    ">


                        {/* ================= HOME ================= */}

                        <Link
                            to="/"
                            className="
                                flex
                                items-center
                                gap-2
                                px-4
                                sm:px-5
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
                                hidden
                                sm:block
                                font-medium
                            ">
                                Home
                            </span>

                        </Link>


                      {/* CUSTOMER */}
{user?.role === "customer" && (
    <Link
        to="/my-bookings"
        className="
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
        "
    >
        <CalendarDays size={21} />

        <span className="text-[11px] font-medium leading-tight text-center">
            My Bookings
        </span>
    </Link>
)}


{/* PROVIDER */}
{user?.role === "provider" && (
    <Link
        to="/provider-dashboard"
        className="
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
        "
    >
        <BriefcaseBusiness size={21} />

        <span className="text-[11px] font-medium leading-tight text-center">
            Dashboard
        </span>
    </Link>
)}


{/* ADMIN */}
{(user?.role === "admin" || user?.role === "Admin") && (
    <Link
        to="/admin-dashboard"
        className="
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
        "
    >
        <ShieldCheck size={21} />

        <span className="text-[11px] font-medium leading-tight text-center">
            Dashboard
        </span>
    </Link>
)}


                        {/* ================= DIVIDER ================= */}

                        {user && (

                            <div className="
                                hidden
                                sm:block
                                h-10
                                w-px
                                bg-gray-200
                            " />

                        )}


                        {/* ================= NOTIFICATION ================= */}

                        {user && (

                            <Link
                                to="/notifications"
                                className="
                                    relative
                                    w-11
                                    h-11
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
                                    size={25}
                                    strokeWidth={2}
                                />

                                {notificationCount > 0 && (

                                    <span className="
                                        absolute
                                        -top-1
                                        -right-1
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

                        {user ? (

                            <div className="relative">

                                <button
                                    onClick={() =>
                                        setProfileOpen(
                                            !profileOpen
                                        )
                                    }
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        group
                                    "
                                >

                                    {/* PROFILE PHOTO */}

                                    <div className="
                                        w-12
                                        h-12
                                        sm:w-14
                                        sm:h-14
                                        rounded-full
                                        p-[3px]
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
                                                    size={29}
                                                    className="
                                                        text-blue-600
                                                    "
                                                />

                                            )}

                                        </div>

                                    </div>


                                    {/* DOWN ARROW */}

                                    <ChevronDown
                                        size={18}
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

                                        {/* Click outside */}

                                        <div
                                            className="
                                                fixed
                                                inset-0
                                                z-40
                                            "
                                            onClick={() =>
                                                setProfileOpen(
                                                    false
                                                )
                                            }
                                        />


                                        <div className="
                                            absolute
                                            right-0
                                            top-16
                                            w-64
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
                                                px-5
                                                py-5
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
                                                        w-11
                                                        h-11
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
                                                                size={23}
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


                                            {/* ================= MY PROFILE ================= */}

                                            <button
                                                onClick={() => {

                                                    setProfileOpen(false);

                                                    navigate("/profile");

                                                }}
                                                className="
                                                    w-full
                                                    px-5
                                                    py-4
                                                    flex
                                                    items-center
                                                    gap-4
                                                    text-left
                                                    hover:bg-blue-50
                                                    transition
                                                "
                                            >

                                                <div className="
                                                    w-10
                                                    h-10
                                                    rounded-full
                                                    bg-blue-100
                                                    flex
                                                    items-center
                                                    justify-center
                                                ">

                                                    <User
                                                        size={21}
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
                                                mx-5
                                            " />


                                            {/* ================= LOGOUT ================= */}

                                            <button
                                                onClick={logout}
                                                className="
                                                    w-full
                                                    px-5
                                                    py-4
                                                    flex
                                                    items-center
                                                    gap-4
                                                    text-left
                                                    hover:bg-red-50
                                                    transition
                                                "
                                            >

                                                <div className="
                                                    w-10
                                                    h-10
                                                    rounded-full
                                                    bg-red-100
                                                    flex
                                                    items-center
                                                    justify-center
                                                ">

                                                    <LogOut
                                                        size={21}
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

                        ) : (

                            /* ================================================= */
                            /* GUEST */
                            /* ================================================= */

                            <div className="
                                flex
                                items-center
                                gap-2
                            ">

                                <Link
                                    to="/register"
                                    className="
                                        hidden
                                        sm:block
                                        px-5
                                        py-2.5
                                        rounded-full
                                        text-blue-600
                                        font-semibold
                                        hover:bg-blue-50
                                        transition
                                    "
                                >
                                    Register
                                </Link>

                                <Link
                                    to="/login"
                                    className="
                                        bg-gradient-to-r
                                        from-blue-600
                                        to-indigo-600
                                        text-white
                                        px-5
                                        py-2.5
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

                            </div>

                        )}

                    </div>

                </div>


                {/* ================================================= */}
                {/* BLUE / PURPLE CURVED BOTTOM STRIP */}
                {/* ================================================= */}

                <div className="
                    absolute
                    bottom-0
                    left-0
                    right-0
                    h-[7px]
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