const User = require("../models/User");

const uploadProfileImage = async (req, res) => {

    try {

        const image = req.file.path;

        const user = await User.findByIdAndUpdate(

            req.user.id,

            {

                profileImage: image

            },

            {

                new: true

            }

        );

        res.json({

            message: "Profile Image Uploaded Successfully",

            user

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    uploadProfileImage

};