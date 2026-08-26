import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../api/authApi";
import { uploadProfileImage } from "../api/userApi";

function Profile() {

    const navigate = useNavigate();

    const currentUser =
        JSON.parse(localStorage.getItem("user"));

    const [user, setUser] = useState(currentUser);

    const [image, setImage] = useState(null);

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    };

    // Save profile details
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const data =
                await updateProfile(user._id, user);

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

            // Go to Home page after successful save
            navigate("/");

        }

        catch (error) {

            alert(
                error.response?.data?.message ||
                "Update Failed"
            );

        }

    };

    // Upload profile image
    const handleImageUpload = async () => {

        if (!image) {
            return;
        }

        try {

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

        }

        catch (error) {

            alert(
                error.response?.data?.message ||
                "Image Upload Failed"
            );

        }

    };

    return (

        <div className="max-w-3xl mx-auto mt-10 mb-10 bg-white shadow-xl rounded-2xl p-8">

            <h1 className="text-4xl font-bold text-center mb-8">
                My Profile
            </h1>


            {/* PROFILE IMAGE */}

            <div className="flex flex-col items-center mb-10">

                <img
                    src={
                        user?.profileImage ||
                        "https://placehold.co/200x200"
                    }
                    alt="Profile"
                    className="w-40 h-40 rounded-full object-cover border-4 border-blue-600 shadow-lg"
                />


                {/* CHOOSE IMAGE */}

                <label
                    htmlFor="profileImage"
                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg cursor-pointer transition"
                >
                    📷 Choose Image
                </label>

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


                {/* FILE NAME */}

                {image && (

                    <p className="mt-3 text-gray-600 font-medium text-center break-all">

                        {image.name}

                    </p>

                )}


                {/* UPLOAD BUTTON */}

                {image && (

                    <button
                        type="button"
                        onClick={handleImageUpload}
                        className="mt-5 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                    >

                        ⬆ Upload Image

                    </button>

                )}

            </div>


            {/* PROFILE FORM */}

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                {/* NAME */}

                <input
                    type="text"
                    name="name"
                    value={user?.name || ""}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    placeholder="Name"
                />


                {/* PHONE */}

                <input
                    type="text"
                    name="phone"
                    value={user?.phone || ""}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    placeholder="Phone"
                />


                {/* ADDRESS */}

                <input
                    type="text"
                    name="address"
                    value={user?.address || ""}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    placeholder="Address"
                />


                {/* CITY */}

                <input
                    type="text"
                    name="city"
                    value={user?.city || ""}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    placeholder="City"
                />


                {/* PROVIDER DETAILS */}

                {user?.role === "provider" && (

                    <>

                        <input
                            type="text"
                            name="service"
                            value={user?.service || ""}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                            placeholder="Service"
                        />


                        <input
                            type="number"
                            name="experience"
                            value={user?.experience || ""}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                            placeholder="Experience"
                        />


                        <input
                            type="number"
                            name="price"
                            value={user?.price || ""}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                            placeholder="Price"
                        />


                        <textarea
                            name="about"
                            value={user?.about || ""}
                            onChange={handleChange}
                            rows="4"
                            className="w-full border p-3 rounded-lg"
                            placeholder="About Yourself"
                        />

                    </>

                )}


                {/* SAVE CHANGES */}

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition"
                >

                    💾 Save Changes

                </button>

            </form>

        </div>

    );

}

export default Profile;