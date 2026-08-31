import axios from "axios";

const API = "https://multiserve-backend.onrender.com/api/users";

export const uploadProfileImage = async (image) => {

    const formData = new FormData();

    formData.append("image", image);

    const token = localStorage.getItem("token");

    const response = await axios.put(

        `${API}/upload`,

        formData,

        {

            headers: {

                Authorization: `Bearer ${token}`,

                "Content-Type": "multipart/form-data"

            }

        }

    );

    return response.data;

};