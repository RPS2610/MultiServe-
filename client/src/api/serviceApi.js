import axios from "axios";

const API = "https://multiserve-backend.onrender.com/api/services";

export const getAllServices = async () => {
    const response = await axios.get(API);
    return response.data;
};