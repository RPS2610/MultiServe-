import axios from "axios";

const API = "http://localhost:5000/api/admin";

export const getAllProviders = async () => {

    const response = await axios.get(`${API}/providers`);

    return response.data;

};

export const deleteProvider = async (id) => {

    const response = await axios.delete(`${API}/users/${id}`);

    return response.data;

};