const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const Service = require("../models/Service");

mongoose.connect(process.env.MONGO_URI)
.then(async () => {

    console.log("✅ MongoDB Connected");

    await Service.deleteMany();

    await Service.insertMany([

        { name: "Electrician", icon: "electrician.png", description: "All types of electrical repair services" },
        { name: "Plumber", icon: "plumber.png", description: "Plumbing installation and repair" },
        { name: "Painter", icon: "painter.png", description: "Home and office painting services" },
        { name: "Carpenter", icon: "carpenter.png", description: "Furniture and wood work" },
        { name: "AC Repair", icon: "ac.png", description: "AC installation and repair" },
        { name: "RO Repair", icon: "ro.png", description: "RO installation and servicing" },
        { name: "Refrigerator Repair", icon: "fridge.png", description: "Fridge repair services" },
        { name: "Washing Machine Repair", icon: "washingmachine.png", description: "Washing machine repair" },
        { name: "TV Repair", icon: "tv.png", description: "LED and Smart TV repair" },
        { name: "Laptop Repair", icon: "laptop.png", description: "Laptop repair and servicing" },
        { name: "Mobile Repair", icon: "mobile.png", description: "Mobile repair services" },
        { name: "CCTV Installation", icon: "cctv.png", description: "CCTV installation services" },
        { name: "Home Cleaning", icon: "cleaning.png", description: "Complete home cleaning" },
        { name: "Bathroom Cleaning", icon: "bathroom.png", description: "Bathroom deep cleaning" },
        { name: "Kitchen Cleaning", icon: "kitchen.png", description: "Kitchen deep cleaning" },
        { name: "Sofa Cleaning", icon: "sofa.png", description: "Professional sofa cleaning" },
        { name: "Pest Control", icon: "pest.png", description: "Home pest control services" },
        { name: "Salon for Men", icon: "men.png", description: "Men salon services at home" },
        { name: "Salon for Women", icon: "women.png", description: "Women beauty salon services" },
        { name: "Spa", icon: "spa.png", description: "Home spa and massage services" },
        { name: "Beautician", icon: "beautician.png", description: "Professional beautician services" },
        { name: "Hair Stylist", icon: "hair.png", description: "Hair cutting and styling" },
        { name: "Makeup Artist", icon: "makeup.png", description: "Party and bridal makeup" },
        { name: "Tailor", icon: "tailor.png", description: "Tailoring services" },
        { name: "Shoe Repair", icon: "shoe.png", description: "Shoe repair services" },
        { name: "Courier", icon: "courier.png", description: "Courier pickup and delivery" },
        { name: "Driver", icon: "driver.png", description: "Personal driver services" },
        { name: "Cook", icon: "cook.png", description: "Home cooking services" },
        { name: "Food Maker", icon: "food.png", description: "Homemade food services" },
        { name: "Babysitter", icon: "baby.png", description: "Child care services" },
        { name: "Nurse", icon: "nurse.png", description: "Home nursing services" },
        { name: "Security Guard", icon: "guard.png", description: "Security guard services" },
        { name: "Labour", icon: "labour.png", description: "General labour services" },
        { name: "Gardener", icon: "gardener.png", description: "Garden maintenance services" },
        { name: "Packers & Movers", icon: "packers.png", description: "Home shifting services" }

    ]);

    console.log("🎉 All Services Added Successfully");

    process.exit();

})
.catch(err => {
    console.log(err);
    process.exit(1);
});