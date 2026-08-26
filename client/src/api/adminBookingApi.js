import axios from "axios";

const API = "http://localhost:5000/api/admin";

// Get all bookings
export const getAllBookings = async () => {

    const response = await axios.get(`${API}/bookings`);

    return response.data;

};


// Delete booking
export const deleteBooking = async (id) => {

    const response = await axios.delete(
        `${API}/bookings/${id}`
    );

    return response.data;

};


// Update booking status
export const updateBookingStatus = async (id, data) => {

    const response = await axios.put(
        `${API}/bookings/${id}`,
        data
    );

    return response.data;

};