import axios from "axios";

const API = "http://localhost:5000/api/notifications";

export const getNotifications = async (userId) => {
    const res = await axios.get(`${API}/${userId}`);
    return res.data;
};

export const markAsRead = async (id) => {
    const res = await axios.put(`${API}/${id}`);
    return res.data;
};

export const markAllAsRead = async (userId) => {
    const res = await axios.put(`${API}/read-all/${userId}`);
    return res.data;
};

export const deleteNotification = async (id) => {
    const res = await axios.delete(`${API}/${id}`);
    return res.data;
};