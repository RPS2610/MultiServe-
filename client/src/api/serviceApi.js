import axios from "axios";

const API = "http://localhost:5000/api/services";

export const getAllServices = async () => {
    const response = await axios.get(API);
    return response.data;
};