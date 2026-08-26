const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// =====================================================
// FORMAT INDIAN PHONE NUMBER
// =====================================================

const formatIndianPhone = (phone) => {
    if (!phone) {
        return "";
    }

    let formattedPhone = phone.toString().trim();

    // Remove spaces
    formattedPhone = formattedPhone.replace(/\s/g, "");

    // Remove -
    formattedPhone = formattedPhone.replace(/-/g, "");

    // 9876543210 -> +919876543210
    if (
        formattedPhone.length === 10 &&
        /^[6-9][0-9]{9}$/.test(formattedPhone)
    ) {
        formattedPhone = "+91" + formattedPhone;
    }

    // 09876543210 -> +919876543210
    else if (
        formattedPhone.length === 11 &&
        formattedPhone.startsWith("0")
    ) {
        const numberWithoutZero =
            formattedPhone.substring(1);

        if (/^[6-9][0-9]{9}$/.test(numberWithoutZero)) {
            formattedPhone = "+91" + numberWithoutZero;
        }
    }

    return formattedPhone;
};

// =====================================================
// REGISTER USER
// NO OTP REQUIRED
// =====================================================

const register = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            password,
            role,
            service,
            city,
            address,
            experience,
            price,
            about
        } = req.body;

        // ---------------------------------------------
        // REQUIRED FIELDS
        // ---------------------------------------------

        if (!name || !email || !phone || !password) {
            return res.status(400).json({
                message:
                    "Name, email, phone and password are required"
            });
        }

        // ---------------------------------------------
        // EMAIL VALIDATION
        // ---------------------------------------------

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message:
                    "Please enter a valid email address"
            });
        }

        // ---------------------------------------------
        // FORMAT PHONE
        // ---------------------------------------------

        const formattedPhone =
            formatIndianPhone(phone);

        // ---------------------------------------------
        // PHONE VALIDATION
        // ---------------------------------------------

        const phoneRegex =
            /^\+91[6-9][0-9]{9}$/;

        if (!phoneRegex.test(formattedPhone)) {
            return res.status(400).json({
                message:
                    "Please enter a valid Indian mobile number"
            });
        }

        // ---------------------------------------------
        // PASSWORD VALIDATION
        // ---------------------------------------------

        if (password.length < 6) {
            return res.status(400).json({
                message:
                    "Password must be at least 6 characters"
            });
        }

        // ---------------------------------------------
        // CHECK EXISTING USER
        // ---------------------------------------------

        const existingUser =
            await User.findOne({
                $or: [
                    {
                        email:
                            email.toLowerCase()
                    },
                    {
                        phone:
                            formattedPhone
                    }
                ]
            });

        if (existingUser) {
            return res.status(400).json({
                message:
                    "Email or phone number is already registered"
            });
        }

        // ---------------------------------------------
        // HASH PASSWORD
        // ---------------------------------------------

        const hashedPassword =
            await bcrypt.hash(password, 10);

        // ---------------------------------------------
        // CREATE USER
        // ---------------------------------------------

        const newUser =
            new User({
                name: name.trim(),

                email:
                    email.trim().toLowerCase(),

                phone:
                    formattedPhone,

                password:
                    hashedPassword,

                role:
                    role || "customer",

                service,
                city,
                address,
                experience,
                price,
                about
            });

        await newUser.save();

        // ---------------------------------------------
        // REMOVE PASSWORD FROM RESPONSE
        // ---------------------------------------------

        const userResponse =
            newUser.toObject();

        delete userResponse.password;

        // ---------------------------------------------
        // RESPONSE
        // ---------------------------------------------

        return res.status(201).json({
            message:
                "User Registered Successfully",

            user:
                userResponse
        });

    } catch (error) {
        console.log(
            "Register Error:",
            error
        );

        return res.status(500).json({
            message:
                error.message ||
                "Registration failed"
        });
    }
};

// =====================================================
// LOGIN WITH EMAIL + PASSWORD
// =====================================================

const loginUser = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        // ---------------------------------------------
        // REQUIRED FIELDS
        // ---------------------------------------------

        if (!email || !password) {
            return res.status(400).json({
                message:
                    "Email and password are required"
            });
        }

        // ---------------------------------------------
        // FIND USER BY EMAIL
        // ---------------------------------------------

        const user =
            await User.findOne({
                email:
                    email.trim().toLowerCase()
            });

        if (!user) {
            return res.status(401).json({
                message:
                    "Invalid email or password"
            });
        }

        // ---------------------------------------------
        // CHECK PASSWORD
        // ---------------------------------------------

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {
            return res.status(401).json({
                message:
                    "Invalid email or password"
            });
        }

        // ---------------------------------------------
        // JWT SECRET
        // ---------------------------------------------

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({
                message:
                    "JWT_SECRET is not configured"
            });
        }

        // ---------------------------------------------
        // CREATE JWT
        // ---------------------------------------------

        const token =
            jwt.sign(
                {
                    id: user._id,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "7d"
                }
            );

        // ---------------------------------------------
        // REMOVE PASSWORD
        // ---------------------------------------------

        const userResponse =
            user.toObject();

        delete userResponse.password;

        // ---------------------------------------------
        // RESPONSE
        // ---------------------------------------------

        return res.status(200).json({
            message:
                "Login successful",

            token,

            user:
                userResponse
        });

    } catch (error) {
        console.log(
            "Login Error:",
            error
        );

        return res.status(500).json({
            message:
                "Login failed. Please try again."
        });
    }
};

// =====================================================
// UPDATE PROFILE
// =====================================================

const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedUser =
            await User.findByIdAndUpdate(
                id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!updatedUser) {
            return res.status(404).json({
                message:
                    "User not found"
            });
        }

        const userResponse =
            updatedUser.toObject();

        delete userResponse.password;

        return res.json({
            message:
                "Profile Updated Successfully",

            user:
                userResponse
        });

    } catch (error) {
        console.log(
            "Update Profile Error:",
            error
        );

        return res.status(500).json({
            message:
                error.message
        });
    }
};

// =====================================================
// EXPORT FUNCTIONS
// =====================================================

module.exports = {
    register,
    loginUser,
    updateProfile
};