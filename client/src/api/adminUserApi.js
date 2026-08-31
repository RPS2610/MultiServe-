import axios from "axios";

const API = "https://multiserve-backend.onrender.com/api/admin";

export const getAllUsers = async () => {

    const response = await axios.get(`${API}/users`);

    return response.data;

};

export const deleteUser = async (id) => {

    const response = await axios.delete(`${API}/users/${id}`);

    return response.data;

};