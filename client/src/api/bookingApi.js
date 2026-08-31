import axios from "axios";

const API = "https://multiserve-backend.onrender.com/api/bookings";

export const createBooking = async (bookingData) => {

    const response = await axios.post(

        `${API}/create`,

        bookingData

    );

    return response.data;

};

export const getAllBookings = async () => {

    const response = await axios.get(API);

    return response.data;

};

export const getProviderBookings = async (providerId) => {

    const response = await axios.get(

        `${API}/provider/${providerId}`

    );

    return response.data;

};

export const getMyBookings = async (customerId) => {

    const response = await axios.get(

        `${API}/customer/${customerId}`

    );

    return response.data;

};

export const updateBookingStatus = async (id, status) => {

    const response = await axios.put(

        `${API}/${id}/status`,

        { status }

    );

    return response.data;

};

export const acceptBooking = async (id) => {

    return updateBookingStatus(id, "Accepted");

};

export const rejectBooking = async (id) => {

    return updateBookingStatus(id, "Rejected");

};

export const completeBooking = async (id) => {

    return updateBookingStatus(id, "Completed");

};



export const cancelBooking = async (id) => {

    const response = await axios.put(

        `${API}/cancel/${id}`

    );

    return response.data;

};