import axios from "axios";

const API = "https://multiserve-backend.onrender.com/api/providers";

export const getProviderDashboard = async (providerId) => {

    const response = await axios.get(

        `${API}/dashboard/${providerId}`

    );

    return response.data;

};