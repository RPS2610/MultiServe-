import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../api/authApi";

function Login() {

    const navigate = useNavigate();

    // =====================================================
    // EMAIL LOGIN
    // =====================================================

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    // =====================================================
    // LOADING
    // =====================================================

    const [loading, setLoading] =
        useState(false);

    // =====================================================
    // SAVE LOGIN
    // =====================================================

    const saveLogin = (data) => {

        localStorage.setItem(
            "token",
            data.token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );

        navigate("/");
    };

    // =====================================================
    // EMAIL + PASSWORD LOGIN
    // =====================================================

    const handlePasswordLogin =
        async (e) => {

            e.preventDefault();

            if (!email || !password) {

                alert(
                    "Email and password are required"
                );

                return;
            }

            try {

                setLoading(true);

                const data =
                    await loginUser({
                        email,
                        password
                    });

                saveLogin(data);

            } catch (error) {

                console.log(
                    "Password Login Error:",
                    error
                );

                alert(
                    error.response?.data?.message ||
                    "Invalid email or password"
                );

            } finally {

                setLoading(false);

            }
        };

    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <div className="bg-white p-8 rounded-xl shadow-lg w-96">

                <h1 className="text-3xl font-bold text-center mb-6">
                    Login
                </h1>

                {/* =================================================
                    EMAIL + PASSWORD LOGIN
                ================================================= */}

                <form
                    onSubmit={
                        handlePasswordLogin
                    }
                >

                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full border p-3 rounded mb-4"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                            required
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full border p-3 rounded mb-4"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            required
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full text-white py-3 rounded-lg ${
                                loading
                                    ? "bg-gray-400"
                                    : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >

                            {loading
                                ? "Logging in..."
                                : "Login"}

                        </button>

                    </form>

                {/* =================================================
                    REGISTER
                ================================================= */}

                <p className="text-center mt-6 text-gray-600">

                    Don't have an account?{" "}

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/register")
                        }
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Register
                    </button>

                </p>

            </div>

        </div>
    );
}

export default Login;