import React from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    CheckCircle2,
    Clock3,
    ShieldCheck,
    Star,
} from "lucide-react";

/*
|--------------------------------------------------------------------------
| AUTOMATICALLY LOAD ALL SERVICE IMAGES
|--------------------------------------------------------------------------
| This loads every image inside:
|
| src/assets/services/
|
| So you don't have to manually import each image.
*/
const serviceImages = import.meta.glob(
    "../assets/services/*.{png,jpg,jpeg,webp}",
    {
        eager: true,
        query: "?url",
        import: "default",
    }
);


/*
|--------------------------------------------------------------------------
| NORMALIZE TEXT
|--------------------------------------------------------------------------
*/
const normalizeName = (name = "") => {
    return name
        .toLowerCase()
        .trim()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
};


/*
|--------------------------------------------------------------------------
| CREATE IMAGE NAME MAP
|--------------------------------------------------------------------------
*/
const imageMap = {};

Object.entries(serviceImages).forEach(([path, imageUrl]) => {

    const fileName = path
        .split("/")
        .pop()
        .replace(/\.[^/.]+$/, "");

    const normalizedFileName = normalizeName(fileName);

    imageMap[normalizedFileName] = imageUrl;

});


/*
|--------------------------------------------------------------------------
| SPECIAL SERVICE NAME → IMAGE NAME MAPPING
|--------------------------------------------------------------------------
| These handle cases where the database service name and image filename
| are different.
|--------------------------------------------------------------------------
*/
const imageAliases = {

    // Repair services
    "ac repair": "ac repair",
    "air conditioner repair": "ac repair",

    "ro repair": "ro service",
    "ro service": "ro service",

    "refrigerator repair": "refrigerator repair",
    "fridge repair": "refrigerator repair",

    "washing machine repair": "washing machine repair",

    "tv repair": "tv repair",

    "mobile repair": "mobile repair",

    "laptop repair": "laptop repair",

    "shoe repair": "shoe repair",


    // Home services
    "home cleaning": "house cleaning",
    "house cleaning": "house cleaning",

    "bathroom cleaning": "bathroom cleaning",

    "kitchen cleaning": "kitchen cleaning",

    "sofa cleaning": "sofa cleaning",

    "pest control": "pest control",


    // Security / technical
    "cctv installation": "cctv installation",

    "security guard": "security guard",


    // Beauty
    "salon for men": "salon at home",
    "salon for women": "salon at home",

    "spa": "massage",

    "beautician": "makeup artist",

    "hair stylist": "hair cutting",

    "makeup artist": "makeup artist",

    "mehndi artist": "mehndi artist",


    // Delivery / transport
    "courier": "courier delivery",

    "courier delivery": "courier delivery",

    "bike delivery": "bike delivery",

    "driver": "driver",

    "packers movers": "movers packers",

    "packer and mover": "movers packers",

    "packers and movers": "movers packers",

    "packer mover": "movers packers",


    // Home support
    "cook": "cook",

    "food maker": "cook",

    "babysitter": "babysitter",

    "nurse": "nurse",

    "labour": "labour",

    "gardener": "gardener",

    "tailor": "tailor",

    "carpenter": "carpenter",

    "electrician": "electrician",

    "plumber": "plumber",

    "painter": "painter",


    // Additional services
    "interior designer": "interior designer",

    "photographer": "photographer",

    "videographer": "videographer",

    "car wash": "car wash",

    "water tank cleaning": "water tank cleaning",

};


/*
|--------------------------------------------------------------------------
| GET SERVICE IMAGE
|--------------------------------------------------------------------------
*/
const getServiceImage = (serviceName = "") => {

    const normalized = normalizeName(serviceName);

    /*
    | First: direct filename match
    */
    if (imageMap[normalized]) {
        return imageMap[normalized];
    }


    /*
    | Second: alias match
    */
    const alias = imageAliases[normalized];

    if (alias && imageMap[alias]) {
        return imageMap[alias];
    }


    /*
    | Third: partial matching
    */
    const matchingKey = Object.keys(imageMap).find((key) => {

        return (
            normalized.includes(key) ||
            key.includes(normalized)
        );

    });

    if (matchingKey) {
        return imageMap[matchingKey];
    }


    /*
    | No image found
    */
    return null;
};


/*
|--------------------------------------------------------------------------
| SERVICE DESCRIPTIONS
|--------------------------------------------------------------------------
*/
const getServiceDescription = (name = "") => {

    const service = normalizeName(name);

    const descriptions = {

        electrician:
            "Professional electrical repair, installation and maintenance.",

        plumber:
            "Reliable plumbing repairs, fittings and leak solutions.",

        painter:
            "Transform your space with professional painting services.",

        carpenter:
            "Skilled carpentry, furniture repair and custom woodwork.",

        "ac repair":
            "Fast and reliable AC servicing, repair and maintenance.",

        "ro repair":
            "Complete RO servicing, filter replacement and repair.",

        "ro service":
            "Complete RO servicing, filter replacement and repair.",

        "refrigerator repair":
            "Expert refrigerator repair and maintenance at your doorstep.",

        "washing machine repair":
            "Professional washing machine diagnosis and repair.",

        "tv repair":
            "Trusted TV repair and installation for major brands.",

        "mobile repair":
            "Quality smartphone repair and replacement services.",

        "laptop repair":
            "Professional laptop diagnosis, repair and upgrades.",

        "cctv installation":
            "Professional CCTV installation for home and business security.",

        "home cleaning":
            "Complete home cleaning by trained professionals.",

        "house cleaning":
            "Complete home cleaning by trained professionals.",

        "bathroom cleaning":
            "Deep bathroom cleaning for a fresh and hygienic space.",

        "kitchen cleaning":
            "Detailed kitchen cleaning for a fresh and hygienic space.",

        "sofa cleaning":
            "Deep sofa and upholstery cleaning by trained professionals.",

        "pest control":
            "Effective pest control solutions for a safer home.",

        "salon for men":
            "Professional grooming and salon services at your doorstep.",

        "salon for women":
            "Professional beauty and salon services at your doorstep.",

        spa:
            "Relaxing spa and massage services from trained professionals.",

        beautician:
            "Professional beauty and grooming services at home.",

        "hair stylist":
            "Professional hair cutting and styling at your doorstep.",

        "makeup artist":
            "Professional party, bridal and occasion makeup services.",

        tailor:
            "Professional tailoring and clothing alteration services.",

        "shoe repair":
            "Careful shoe repair, restoration and maintenance.",

        courier:
            "Fast and convenient courier pickup and delivery services.",

        driver:
            "Reliable personal and professional driver services.",

        cook:
            "Experienced cooks providing convenient home cooking services.",

        "food maker":
            "Homemade food preparation by trusted professionals.",

        babysitter:
            "Trusted childcare and babysitting services at home.",

        nurse:
            "Professional home nursing and healthcare assistance.",

        "security guard":
            "Professional security personnel for homes and businesses.",

        labour:
            "Reliable general labour and assistance services.",

        gardener:
            "Garden maintenance, trimming and plant care services.",

        "packers and movers":
            "Safe packing, moving and relocation assistance.",

        "packers movers":
            "Safe packing, moving and relocation assistance.",

        photographer:
            "Professional photography services for your special moments.",

        videographer:
            "Professional video shooting and event coverage.",

        "interior designer":
            "Creative interior design solutions for modern spaces.",

        "car wash":
            "Convenient professional car cleaning and washing.",

        "water tank cleaning":
            "Professional water tank cleaning and maintenance.",

    };

    return (
        descriptions[service] ||
        "Trusted professionals ready to provide quality service at your doorstep."
    );
};


/*
|--------------------------------------------------------------------------
| SERVICE CARD
|--------------------------------------------------------------------------
*/
const ServiceCard = ({ service }) => {

    const navigate = useNavigate();

    const serviceName =
        service?.name ||
        service?.title ||
        service?.serviceName ||
        "Service";

    const image = getServiceImage(serviceName);


    /*
    |--------------------------------------------------------------------------
    | EXPLORE SERVICE
    |--------------------------------------------------------------------------
    */
    const handleExplore = () => {

        navigate(
            `/providers/${encodeURIComponent(serviceName)}`
        );

    };


    return (

        <article
            className="
                group
                relative
                flex
                h-full
                flex-col
                overflow-hidden
                rounded-[24px]
                border
                border-slate-200/80
                bg-white
                shadow-[0_8px_30px_rgba(30,41,59,0.06)]
                transition-all
                duration-300
                hover:-translate-y-1.5
                hover:border-indigo-100
                hover:shadow-[0_18px_45px_rgba(49,46,129,0.13)]
            "
        >

            {/* ========================================================= */}
            {/* IMAGE AREA */}
            {/* ========================================================= */}

            <div
                className="
                    relative
                    mx-3
                    mt-3
                    overflow-hidden
                    rounded-[20px]
                    bg-gradient-to-br
                    from-indigo-50
                    via-white
                    to-violet-50
                "
            >

                {/* Decorative glow */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        -right-10
                        -top-10
                        h-28
                        w-28
                        rounded-full
                        bg-indigo-200/30
                        blur-2xl
                    "
                />

                <div
                    className="
                        pointer-events-none
                        absolute
                        -bottom-12
                        -left-8
                        h-28
                        w-28
                        rounded-full
                        bg-violet-200/30
                        blur-2xl
                    "
                />


                {/* Verified */}

                <div
                    className="
                        absolute
                        left-3
                        top-3
                        z-10
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-full
                        border
                        border-white/80
                        bg-white/90
                        px-2.5
                        py-1.5
                        text-[11px]
                        font-semibold
                        text-slate-700
                        shadow-sm
                        backdrop-blur-md
                    "
                >

                    <CheckCircle2
                        size={13}
                        className="text-emerald-500"
                    />

                    Verified

                </div>


                {/* ===================================================== */}
                {/* SERVICE IMAGE */}
                {/* ===================================================== */}

                <div
                    className="
                        flex
                        h-40
                        items-center
                        justify-center
                        p-5
                        sm:h-44
                        lg:h-48
                    "
                >

                    {image ? (

                        <img
                            src={image}
                            alt={serviceName}
                            loading="lazy"
                            className="
                                h-full
                                w-full
                                object-contain
                                drop-shadow-[0_12px_18px_rgba(15,23,42,0.10)]
                                transition-transform
                                duration-500
                                group-hover:scale-105
                            "
                        />

                    ) : (

                        /*
                        | Fallback if database contains a service for which
                        | there is genuinely no matching image.
                        */

                        <div
                            className="
                                flex
                                h-full
                                w-full
                                items-center
                                justify-center
                                rounded-2xl
                                bg-indigo-50
                                px-4
                                text-center
                                text-sm
                                font-semibold
                                text-indigo-600
                            "
                        >

                            {serviceName}

                        </div>

                    )}

                </div>

            </div>


            {/* ========================================================= */}
            {/* CONTENT */}
            {/* ========================================================= */}

            <div
                className="
                    flex
                    flex-1
                    flex-col
                    px-5
                    pb-5
                    pt-4
                    sm:px-6
                    sm:pb-6
                "
            >

                {/* Rating + Availability */}

                <div
                    className="
                        mb-3
                        flex
                        items-center
                        justify-between
                        gap-3
                    "
                >

                    <div className="flex items-center gap-1.5">

                        <div
                            className="
                                flex
                                items-center
                                gap-1
                                rounded-full
                                bg-amber-50
                                px-2.5
                                py-1
                            "
                        >

                            <Star
                                size={13}
                                fill="currentColor"
                                className="text-amber-500"
                            />

                            <span
                                className="
                                    text-xs
                                    font-bold
                                    text-slate-700
                                "
                            >
                                4.8
                            </span>

                        </div>

                        <span
                            className="
                                hidden
                                text-xs
                                text-slate-400
                                sm:inline
                            "
                        >
                            Trusted service
                        </span>

                    </div>


                    <div
                        className="
                            flex
                            items-center
                            gap-1
                            text-xs
                            font-medium
                            text-emerald-600
                        "
                    >

                        <Clock3 size={13} />

                        Available

                    </div>

                </div>


                {/* Service name */}

                <h3
                    className="
                        text-xl
                        font-bold
                        tracking-[-0.02em]
                        text-slate-900
                        transition-colors
                        duration-200
                        group-hover:text-indigo-700
                        sm:text-[21px]
                    "
                >
                    {serviceName}
                </h3>


                {/* Description */}

                <p
                    className="
                        mt-2
                        line-clamp-2
                        min-h-[42px]
                        text-sm
                        leading-5
                        text-slate-500
                    "
                >
                    {service?.description ||
                        getServiceDescription(serviceName)}
                </p>


                {/* Trust row */}

                <div
                    className="
                        mt-4
                        flex
                        items-center
                        gap-2
                        border-t
                        border-slate-100
                        pt-4
                    "
                >

                    <ShieldCheck
                        size={16}
                        className="
                            shrink-0
                            text-indigo-500
                        "
                    />

                    <span
                        className="
                            text-xs
                            font-medium
                            text-slate-500
                        "
                    >
                        Professional &amp; reliable experts
                    </span>

                </div>


                {/* ===================================================== */}
                {/* BUTTON */}
                {/* ===================================================== */}

                <button
                    type="button"
                    onClick={handleExplore}
                    className="
                        mt-5
                        flex
                        w-full
                        items-center
                        justify-between
                        rounded-xl
                        bg-slate-950
                        px-4
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        shadow-sm
                        transition-all
                        duration-300
                        hover:bg-indigo-600
                        hover:shadow-[0_10px_25px_rgba(79,70,229,0.25)]
                        active:scale-[0.98]
                    "
                >

                    <span>
                        Explore Service
                    </span>

                    <span
                        className="
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-lg
                            bg-white/10
                            transition-transform
                            duration-300
                            group-hover:translate-x-0.5
                        "
                    >

                        <ArrowRight size={16} />

                    </span>

                </button>

            </div>

        </article>
    );
};

export default ServiceCard;