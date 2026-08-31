import axios from "axios";

const API = "https://multiserve-backend.onrender.com/api/admin";

export const getDashboardStats = async () => {

    const response = await axios.get(`${API}/dashboard`);

    return response.data;

};
