import axios from "axios";

const API = "http://localhost:5000/api/admin";

export const getAllServices = async () => {

    const response = await axios.get(`${API}/services`);

    return response.data;

};

export const addService = async (serviceData) => {

    const response = await axios.post(`${API}/services`, serviceData);

    return response.data;

};

export const updateService = async (id, serviceData) => {

    const response = await axios.put(`${API}/services/${id}`, serviceData);

    return response.data;

};

export const deleteService = async (id) => {

    const response = await axios.delete(`${API}/services/${id}`);

    return response.data;

};