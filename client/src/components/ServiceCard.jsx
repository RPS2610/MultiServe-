import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

// ================= SERVICE IMAGES =================

import electrician from "../assets/services/electrician.png";
import plumber from "../assets/services/plumber.png";
import painter from "../assets/services/painter.png";
import carpenter from "../assets/services/carpenter.png";
import acRepair from "../assets/services/ac-repair.png";
import refrigeratorRepair from "../assets/services/refrigerator-repair.png";
import washingMachineRepair from "../assets/services/washing-machine-repair.png";
import roService from "../assets/services/ro-service.png";
import tvRepair from "../assets/services/tv-repair.png";
import mobileRepair from "../assets/services/mobile-repair.png";
import laptopRepair from "../assets/services/laptop-repair.png";
import shoeRepair from "../assets/services/shoe-repair.png";
import houseCleaning from "../assets/services/house-cleaning.png";
import bathroomCleaning from "../assets/services/bathroom-cleaning.png";
import kitchenCleaning from "../assets/services/kitchen-cleaning.png";
import sofaCleaning from "../assets/services/sofa-cleaning.png";
import pestControl from "../assets/services/pest-control.png";
import salonAtHome from "../assets/services/salon-at-home.png";
import hairCutting from "../assets/services/hair-cutting.png";
import makeupArtist from "../assets/services/makeup-artist.png";
import mehndiArtist from "../assets/services/mehndi-artist.png";
import massage from "../assets/services/massage.png";
import courierDelivery from "../assets/services/courier-delivery.png";
import bikeDelivery from "../assets/services/bike-delivery.png";
import labour from "../assets/services/labour.png";
import cook from "../assets/services/cook.png";
import maid from "../assets/services/maid.png";
import babysitter from "../assets/services/babysitter.png";
import tutor from "../assets/services/tutor.png";
import photographer from "../assets/services/photographer.png";
import videographer from "../assets/services/videographer.png";
import driver from "../assets/services/driver.png";
import moversPackers from "../assets/services/movers-packers.png";
import waterTankCleaning from "../assets/services/water-tank-cleaning.png";
import cctvInstallation from "../assets/services/cctv-installation.png";
import interiorDesigner from "../assets/services/interior-designer.png";
import tailor from "../assets/services/tailor.png";
import nurse from "../assets/services/nurse.png";
import securityGuard from "../assets/services/security-guard.png";
import gardener from "../assets/services/gardener.png";
import carWash from "../assets/services/car-wash.png";


function ServiceCard({ service }) {

    const navigate = useNavigate();


    // ================= SERVICE IMAGE MAP =================

    const serviceImages = {

    // ================= EXISTING SERVICES =================

    "electrician": electrician,
    "plumber": plumber,
    "painter": painter,
    "carpenter": carpenter,

    "ac repair": acRepair,
    "refrigerator repair": refrigeratorRepair,
    "washing machine repair": washingMachineRepair,
    "ro service": roService,
    "tv repair": tvRepair,
    "mobile repair": mobileRepair,
    "laptop repair": laptopRepair,
    "shoe repair": shoeRepair,

    "house cleaning": houseCleaning,
    "home cleaning": houseCleaning,

    "bathroom cleaning": bathroomCleaning,
    "kitchen cleaning": kitchenCleaning,
    "sofa cleaning": sofaCleaning,
    "pest control": pestControl,

    "ro repair": roService,
    "ro service": roService,


    "tailor": tailor,
"nurse": nurse,
"security guard": securityGuard,
"gardener": gardener,
"gardner": gardener,
"car wash": carWash,
"car washing": carWash,
    // ================= SALON / BEAUTY =================

    "salon at home": salonAtHome,
    "salon for men": salonAtHome,
    "salon for women": salonAtHome,

    "hair cutting": hairCutting,
    "hair stylist": hairCutting,

    "makeup artist": makeupArtist,
    "beautician": makeupArtist,

    "mehndi artist": mehndiArtist,
    "massage": massage,
    "spa": massage,

    // ================= DELIVERY =================

    "courier delivery": courierDelivery,
    "courier": courierDelivery,

    "bike delivery": bikeDelivery,

    // ================= HOME / PERSONAL SERVICES =================

    "labour": labour,
    "cook": cook,
    "food maker": cook,
    "maid": maid,
    "babysitter": babysitter,
    "tutor": tutor,

    // ================= PROFESSIONAL SERVICES =================

    "photographer": photographer,
    "videographer": videographer,
    "driver": driver,

    // ================= MOVING =================

    "movers & packers": moversPackers,
"movers and packers": moversPackers,
"packers & movers": moversPackers,
"packers and movers": moversPackers,
"packer and mover": moversPackers,
"packers and mover": moversPackers,
"packer & mover": moversPackers,
"packers & mover": moversPackers,

    // ================= OTHER SERVICES =================

    "water tank cleaning": waterTankCleaning,
    "cctv installation": cctvInstallation,
    "interior designer": interiorDesigner

};

    // ================= NORMALIZE SERVICE NAME =================

    const serviceName = String(service?.name || "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");


    const serviceImage = serviceImages[serviceName];


    // ================= NAVIGATION =================

    const handleServiceClick = () => {

        navigate(
            `/providers/${encodeURIComponent(service.name)}`
        );

    };


    return (

        <div
            onClick={handleServiceClick}
            className="
                group
                bg-white
                rounded-3xl
                border
                border-gray-200
                shadow-md
                hover:shadow-2xl
                hover:-translate-y-3
                transition-all
                duration-300
                cursor-pointer
                overflow-hidden
            "
        >

            {/* ================= SERVICE IMAGE ================= */}

            <div
                className="
                    h-32
                    bg-gray-50
                    overflow-hidden
                    flex
                    items-center
                    justify-center
                    p-2
                "
            >

                {serviceImage ? (

                    <img
                        src={serviceImage}
                        alt={service.name}
                        className="
                            max-w-full
                            max-h-full
                            w-auto
                            h-auto
                            object-contain
                            group-hover:scale-105
                            transition-transform
                            duration-500
                        "
                    />

                ) : (

                    <div className="
                        text-gray-400
                        text-sm
                        text-center
                    ">
                        Service Image
                    </div>

                )}

            </div>


            {/* ================= SERVICE DETAILS ================= */}

            <div className="p-7">

                <h2 className="text-2xl font-bold text-center">

                    {service.name}

                </h2>


                <p
                    className="
                        text-gray-500
                        text-center
                        mt-4
                        leading-7
                    "
                >

                    {service.description ||
                        "Verified professionals ready to serve you at your doorstep."
                    }

                </p>


                {/* ================= FEATURES ================= */}

                <div
                    className="
                        mt-6
                        space-y-3
                        text-sm
                        text-gray-600
                    "
                >

                    <div className="flex items-center gap-2">

                        <span>✅</span>

                        <span>
                            Verified Professionals
                        </span>

                    </div>


                    <div className="flex items-center gap-2">

                        <span>⭐</span>

                        <span>
                            Top Rated Service
                        </span>

                    </div>


                    <div className="flex items-center gap-2">

                        <span>⚡</span>

                        <span>
                            Fast Booking
                        </span>

                    </div>

                </div>


                {/* ================= VIEW PROVIDERS ================= */}

                <button
                    type="button"
                    onClick={(e) => {

                        e.stopPropagation();

                        handleServiceClick();

                    }}
                    className="
                        w-full
                        mt-8
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        py-3
                        rounded-xl
                        font-semibold
                        flex
                        items-center
                        justify-center
                        gap-2
                        transition
                    "
                >

                    View Providers

                    <FaArrowRight />

                </button>

            </div>

        </div>

    );

}

export default ServiceCard;