import axios from "axios";

const API = "http://localhost:5000/api/reviews";

export const addReview = async (reviewData) => {

    const token = localStorage.getItem("token");

    const response = await axios.post(
        API,
        reviewData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;

};

export const getProviderReviews = async (providerId) => {

    const response = await axios.get(`${API}/${providerId}`);

    return response.data;

};