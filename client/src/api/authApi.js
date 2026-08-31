import axios from "axios";

const API_URL = "https://multiserve-backend.onrender.com/api/auth";

// =====================================================
// REGISTER USER
// =====================================================

export const registerUser = async (userData) => {
    const response = await axios.post(
        `${API_URL}/register`,
        userData
    );

    return response.data;
};

// =====================================================
// LOGIN WITH EMAIL + PASSWORD
// =====================================================

export const loginUser = async (data) => {
    const response = await axios.post(
        `${API_URL}/login`,
        data
    );

    return response.data;
};

// =====================================================
// UPDATE PROFILE
// =====================================================

export const updateProfile = async (id, data) => {
    const response = await axios.put(
        `${API_URL}/profile/${id}`,
        data
    );

    return response.data;
};