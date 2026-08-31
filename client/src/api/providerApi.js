import axios from "axios";

const API = "https://multiserve-backend.onrender.com/api/providers";

export const getProviders = async () => {

    const response = await axios.get(API);

    return response.data;

};

export const getProvidersByService = async (service) => {

    const response = await axios.get(
        `${API}/service/${encodeURIComponent(service)}`
    );

    return response.data;

};

export const getProviderById = async (id) => {

    const response = await axios.get(
        `${API}/${id}`
    );

    return response.data;

};