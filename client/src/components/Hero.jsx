import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    CheckCircle2,
    Clock3,
    ShieldCheck,
    Star,
    Sparkles
} from "lucide-react";

function Hero() {

    const navigate = useNavigate();

    const handleExploreServices = () => {

        const servicesSection =
            document.getElementById("services");

        if (servicesSection) {

            servicesSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    };


    const handleBookService = () => {

        navigate("/providers");

    };


    return (

        <section className="
            relative
            overflow-hidden
            bg-slate-950
            text-white
        ">

            {/* ================================================= */}
            {/* BACKGROUND DECORATION */}
            {/* ================================================= */}

            <div className="
                pointer-events-none
                absolute
                -top-32
                -left-32
                h-80
                w-80
                rounded-full
                bg-blue-600/20
                blur-3xl
            " />

            <div className="
                pointer-events-none
                absolute
                -right-32
                top-20
                h-96
                w-96
                rounded-full
                bg-indigo-500/20
                blur-3xl
            " />

            <div className="
                pointer-events-none
                absolute
                bottom-0
                left-1/3
                h-64
                w-64
                rounded-full
                bg-cyan-500/10
                blur-3xl
            " />


            {/* ================================================= */}
            {/* MAIN CONTAINER */}
            {/* ================================================= */}

            <div className="
                relative
                mx-auto
                max-w-7xl
                px-4
                py-14
                sm:px-6
                sm:py-20
                lg:px-8
                lg:py-24
            ">

                <div className="
                    grid
                    items-center
                    gap-12
                    lg:grid-cols-[1.08fr_0.92fr]
                    lg:gap-16
                ">


                    {/* ================================================= */}
                    {/* LEFT CONTENT */}
                    {/* ================================================= */}

                    <div className="
                        max-w-3xl
                    ">

                        {/* TRUST BADGE */}

                        <div className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-white/10
                            bg-white/5
                            px-3
                            py-2
                            text-xs
                            font-semibold
                            text-slate-200
                            shadow-lg
                            shadow-black/10
                            backdrop-blur
                            sm:px-4
                            sm:text-sm
                        ">

                            <span className="
                                flex
                                h-6
                                w-6
                                items-center
                                justify-center
                                rounded-full
                                bg-blue-500/15
                                text-blue-300
                            ">

                                <Sparkles size={13} />

                            </span>

                            Trusted by 10,000+ customers

                        </div>


                        {/* HEADING */}

                        <h1 className="
                            mt-7
                            text-4xl
                            font-black
                            leading-[1.05]
                            tracking-[-0.04em]
                            sm:mt-8
                            sm:text-5xl
                            md:text-6xl
                            lg:text-7xl
                        ">

                            Trusted help.

                            <br />

                            <span className="
                                bg-gradient-to-r
                                from-blue-400
                                via-cyan-300
                                to-indigo-400
                                bg-clip-text
                                text-transparent
                            ">

                                Right at your doorstep.

                            </span>

                        </h1>


                        {/* DESCRIPTION */}

                        <p className="
                            mt-6
                            max-w-2xl
                            text-base
                            leading-7
                            text-slate-300
                            sm:mt-7
                            sm:text-lg
                            sm:leading-8
                        ">

                            Find verified professionals for repairs,
                            cleaning, maintenance, beauty, shifting
                            and everyday home services — all from
                            one simple platform.

                        </p>


                        {/* CTA BUTTONS */}

                        <div className="
                            mt-8
                            flex
                            flex-col
                            gap-3
                            sm:mt-9
                            sm:flex-row
                        ">

                            <button
                                onClick={handleBookService}
                                className="
                                    group
                                    inline-flex
                                    min-h-12
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    bg-white
                                    px-6
                                    text-sm
                                    font-bold
                                    text-slate-950
                                    shadow-xl
                                    shadow-black/20
                                    transition
                                    duration-200
                                    hover:-translate-y-0.5
                                    hover:shadow-2xl
                                    sm:px-7
                                    sm:text-base
                                "
                            >

                                Book a Service

                                <ArrowRight
                                    size={18}
                                    className="
                                        transition-transform
                                        duration-200
                                        group-hover:translate-x-1
                                    "
                                />

                            </button>


                            <button
                                onClick={handleExploreServices}
                                className="
                                    inline-flex
                                    min-h-12
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    border-white/15
                                    bg-white/5
                                    px-6
                                    text-sm
                                    font-bold
                                    text-white
                                    backdrop-blur
                                    transition
                                    duration-200
                                    hover:border-white/25
                                    hover:bg-white/10
                                    sm:px-7
                                    sm:text-base
                                "
                            >

                                Explore Services

                            </button>

                        </div>


                        {/* TRUST POINTS */}

                        <div className="
                            mt-9
                            grid
                            grid-cols-1
                            gap-3
                            sm:mt-10
                            sm:grid-cols-3
                            sm:gap-4
                        ">

                            <div className="
                                flex
                                items-center
                                gap-2
                                text-sm
                                text-slate-300
                            ">

                                <CheckCircle2
                                    size={17}
                                    className="text-blue-400"
                                />

                                Verified professionals

                            </div>


                            <div className="
                                flex
                                items-center
                                gap-2
                                text-sm
                                text-slate-300
                            ">

                                <Clock3
                                    size={17}
                                    className="text-cyan-400"
                                />

                                Quick booking

                            </div>


                            <div className="
                                flex
                                items-center
                                gap-2
                                text-sm
                                text-slate-300
                            ">

                                <ShieldCheck
                                    size={17}
                                    className="text-indigo-400"
                                />

                                Reliable service

                            </div>

                        </div>


                        {/* STATS */}

                        <div className="
                            mt-10
                            grid
                            grid-cols-3
                            gap-4
                            border-t
                            border-white/10
                            pt-7
                            sm:mt-12
                            sm:pt-8
                        ">

                            <div>

                                <p className="
                                    text-2xl
                                    font-black
                                    tracking-tight
                                    sm:text-3xl
                                ">

                                    500+

                                </p>

                                <p className="
                                    mt-1
                                    text-xs
                                    text-slate-400
                                    sm:text-sm
                                ">

                                    Professionals

                                </p>

                            </div>


                            <div>

                                <p className="
                                    text-2xl
                                    font-black
                                    tracking-tight
                                    sm:text-3xl
                                ">

                                    10K+

                                </p>

                                <p className="
                                    mt-1
                                    text-xs
                                    text-slate-400
                                    sm:text-sm
                                ">

                                    Customers

                                </p>

                            </div>


                            <div>

                                <p className="
                                    flex
                                    items-center
                                    gap-1
                                    text-2xl
                                    font-black
                                    tracking-tight
                                    sm:text-3xl
                                ">

                                    4.9

                                    <Star
                                        size={19}
                                        className="fill-current text-amber-400"
                                    />

                                </p>

                                <p className="
                                    mt-1
                                    text-xs
                                    text-slate-400
                                    sm:text-sm
                                ">

                                    Average rating

                                </p>

                            </div>

                        </div>

                    </div>


                    {/* ================================================= */}
                    {/* RIGHT VISUAL */}
                    {/* ================================================= */}

                    <div className="
                        relative
                        mx-auto
                        w-full
                        max-w-xl
                    ">

                        {/* MAIN CARD */}

                        <div className="
                            relative
                            overflow-hidden
                            rounded-[2rem]
                            border
                            border-white/10
                            bg-white/[0.07]
                            p-3
                            shadow-2xl
                            shadow-black/30
                            backdrop-blur-xl
                            sm:p-4
                        ">

                            {/* CARD HEADER */}

                            <div className="
                                rounded-[1.5rem]
                                bg-gradient-to-br
                                from-blue-600
                                via-indigo-600
                                to-slate-900
                                p-6
                                sm:p-7
                            ">

                                <div className="
                                    flex
                                    items-start
                                    justify-between
                                ">

                                    <div>

                                        <p className="
                                            text-xs
                                            font-semibold
                                            uppercase
                                            tracking-[0.18em]
                                            text-blue-100
                                        ">

                                            MultiServe

                                        </p>

                                        <h2 className="
                                            mt-2
                                            text-2xl
                                            font-black
                                            sm:text-3xl
                                        ">

                                            What do you need?

                                        </h2>

                                    </div>


                                    <div className="
                                        flex
                                        h-11
                                        w-11
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-white/10
                                        ring-1
                                        ring-white/10
                                    ">

                                        <Sparkles size={21} />

                                    </div>

                                </div>


                                {/* SERVICE SEARCH MOCKUP */}

                                <div className="
                                    mt-7
                                    rounded-2xl
                                    border
                                    border-white/10
                                    bg-white/10
                                    p-3
                                    backdrop-blur
                                ">

                                    <div className="
                                        flex
                                        items-center
                                        gap-3
                                    ">

                                        <div className="
                                            flex
                                            h-10
                                            w-10
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-white
                                            text-lg
                                        ">

                                            🔎

                                        </div>

                                        <div className="min-w-0">

                                            <p className="
                                                text-xs
                                                text-blue-100
                                            ">

                                                Search services

                                            </p>

                                            <p className="
                                                mt-0.5
                                                truncate
                                                text-sm
                                                font-semibold
                                                text-white
                                            ">

                                                Electrician, cleaning,
                                                plumbing...

                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* POPULAR SERVICES */}

                            <div className="
                                rounded-b-[1.5rem]
                                bg-white
                                p-5
                                sm:p-6
                            ">

                                <div className="
                                    flex
                                    items-center
                                    justify-between
                                ">

                                    <div>

                                        <p className="
                                            text-xs
                                            font-semibold
                                            uppercase
                                            tracking-wider
                                            text-blue-600
                                        ">

                                            Popular near you

                                        </p>

                                        <h3 className="
                                            mt-1
                                            text-xl
                                            font-black
                                            text-slate-900
                                        ">

                                            Book in minutes

                                        </h3>

                                    </div>

                                    <span className="
                                        rounded-full
                                        bg-emerald-50
                                        px-3
                                        py-1.5
                                        text-xs
                                        font-bold
                                        text-emerald-700
                                    ">

                                        Available

                                    </span>

                                </div>


                                {/* SERVICE ROWS */}

                                <div className="
                                    mt-5
                                    space-y-2.5
                                ">

                                    <div className="
                                        flex
                                        items-center
                                        justify-between
                                        rounded-2xl
                                        border
                                        border-slate-100
                                        bg-slate-50
                                        p-3
                                    ">

                                        <div className="
                                            flex
                                            items-center
                                            gap-3
                                        ">

                                            <div className="
                                                flex
                                                h-10
                                                w-10
                                                items-center
                                                justify-center
                                                rounded-xl
                                                bg-blue-100
                                                text-lg
                                            ">

                                                ⚡

                                            </div>

                                            <div>

                                                <p className="
                                                    text-sm
                                                    font-bold
                                                    text-slate-900
                                                ">

                                                    Electrician

                                                </p>

                                                <p className="
                                                    text-xs
                                                    text-slate-500
                                                ">

                                                    Starting from ₹299

                                                </p>

                                            </div>

                                        </div>

                                        <ArrowRight
                                            size={17}
                                            className="text-slate-400"
                                        />

                                    </div>


                                    <div className="
                                        flex
                                        items-center
                                        justify-between
                                        rounded-2xl
                                        border
                                        border-slate-100
                                        bg-slate-50
                                        p-3
                                    ">

                                        <div className="
                                            flex
                                            items-center
                                            gap-3
                                        ">

                                            <div className="
                                                flex
                                                h-10
                                                w-10
                                                items-center
                                                justify-center
                                                rounded-xl
                                                bg-cyan-100
                                                text-lg
                                            ">

                                                🚿

                                            </div>

                                            <div>

                                                <p className="
                                                    text-sm
                                                    font-bold
                                                    text-slate-900
                                                ">

                                                    Plumber

                                                </p>

                                                <p className="
                                                    text-xs
                                                    text-slate-500
                                                ">

                                                    Starting from ₹249

                                                </p>

                                            </div>

                                        </div>

                                        <ArrowRight
                                            size={17}
                                            className="text-slate-400"
                                        />

                                    </div>


                                    <div className="
                                        flex
                                        items-center
                                        justify-between
                                        rounded-2xl
                                        border
                                        border-slate-100
                                        bg-slate-50
                                        p-3
                                    ">

                                        <div className="
                                            flex
                                            items-center
                                            gap-3
                                        ">

                                            <div className="
                                                flex
                                                h-10
                                                w-10
                                                items-center
                                                justify-center
                                                rounded-xl
                                                bg-indigo-100
                                                text-lg
                                            ">

                                                ❄️

                                            </div>

                                            <div>

                                                <p className="
                                                    text-sm
                                                    font-bold
                                                    text-slate-900
                                                ">

                                                    AC Repair

                                                </p>

                                                <p className="
                                                    text-xs
                                                    text-slate-500
                                                ">

                                                    Starting from ₹499

                                                </p>

                                            </div>

                                        </div>

                                        <ArrowRight
                                            size={17}
                                            className="text-slate-400"
                                        />

                                    </div>

                                </div>


                                {/* CARD BUTTON */}

                                <button
                                    onClick={handleBookService}
                                    className="
                                        mt-5
                                        flex
                                        w-full
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-xl
                                        bg-slate-950
                                        py-3.5
                                        text-sm
                                        font-bold
                                        text-white
                                        transition
                                        hover:bg-blue-600
                                    "
                                >

                                    View all services

                                    <ArrowRight size={17} />

                                </button>

                            </div>

                        </div>


                        {/* FLOATING RATING */}

                        <div className="
                            absolute
                            -bottom-4
                            -left-3
                            hidden
                            rounded-2xl
                            border
                            border-white/10
                            bg-white
                            p-3
                            shadow-xl
                            sm:block
                            lg:-left-8
                        ">

                            <div className="
                                flex
                                items-center
                                gap-2
                            ">

                                <div className="
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-amber-50
                                    text-amber-500
                                ">

                                    <Star
                                        size={18}
                                        className="fill-current"
                                    />

                                </div>

                                <div>

                                    <p className="
                                        text-sm
                                        font-black
                                        text-slate-900
                                    ">

                                        4.9 / 5

                                    </p>

                                    <p className="
                                        text-[10px]
                                        text-slate-500
                                    ">

                                        Customer rating

                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* FLOATING VERIFIED */}

                        <div className="
                            absolute
                            -right-2
                            -top-4
                            hidden
                            items-center
                            gap-2
                            rounded-2xl
                            border
                            border-white/10
                            bg-white
                            px-4
                            py-3
                            shadow-xl
                            sm:flex
                            lg:-right-6
                        ">

                            <div className="
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-xl
                                bg-emerald-50
                                text-emerald-600
                            ">

                                <ShieldCheck size={17} />

                            </div>

                            <div>

                                <p className="
                                    text-xs
                                    font-black
                                    text-slate-900
                                ">

                                    Verified

                                </p>

                                <p className="
                                    text-[10px]
                                    text-slate-500
                                ">

                                    Professionals

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* ================================================= */}
            {/* BOTTOM EDGE */}
            {/* ================================================= */}

            <div className="
                h-px
                bg-gradient-to-r
                from-transparent
                via-blue-400/40
                to-transparent
            " />

        </section>

    );

}

export default Hero;