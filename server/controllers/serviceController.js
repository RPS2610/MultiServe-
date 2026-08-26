const Service = require("../models/Service");

const addService = async (req, res) => {

    try {

        const { name, icon, description } = req.body;

        const existing = await Service.findOne({ name });

        if (existing) {
            return res.status(400).json({
                message: "Service already exists"
            });
        }

        const service = new Service({
            name,
            icon,
            description
        });

        await service.save();

        res.status(201).json({
            message: "Service Added Successfully",
            service
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const getServices = async (req, res) => {

    try {

        const services = await Service.find();

        res.json(services);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const addDefaultServices = async (req, res) => {

    try {

        const services = [
            { name: "Electrician" },
            { name: "Plumber" },
            { name: "Painter" },
            { name: "Carpenter" },
            { name: "AC Repair" },
            { name: "Refrigerator Repair" },
            { name: "Washing Machine Repair" },
            { name: "RO Service" },
            { name: "TV Repair" },
            { name: "Mobile Repair" },
            { name: "Laptop Repair" },
            { name: "Shoe Repair" },
            { name: "House Cleaning" },
            { name: "Bathroom Cleaning" },
            { name: "Kitchen Cleaning" },
            { name: "Sofa Cleaning" },
            { name: "Pest Control" },
            { name: "Salon at Home" },
            { name: "Hair Cutting" },
            { name: "Makeup Artist" },
            { name: "Mehndi Artist" },
            { name: "Massage" },
            { name: "Courier Delivery" },
            { name: "Bike Delivery" },
            { name: "Labour" },
            { name: "Cook" },
            { name: "Maid" },
            { name: "Babysitter" },
            { name: "Tutor" },
            { name: "Photographer" },
            { name: "Videographer" },
            { name: "Driver" },
            { name: "Movers & Packers" },
            { name: "Water Tank Cleaning" },
            { name: "CCTV Installation" },
            { name: "Interior Designer" }
        ];

        await Service.insertMany(services, { ordered: false });

        res.json({
            message: "Default Services Added Successfully"
        });

    } catch (error) {

        res.json({
            message: "Some services already exist."
        });

    }

};

module.exports = {
    addService,
    getServices,
    addDefaultServices
};