import axios from "axios";

const API = "http://localhost:5000/api/providers";

export const getProviderDashboard = async (providerId) => {

    const response = await axios.get(

        `${API}/dashboard/${providerId}`

    );

    return response.data;

};