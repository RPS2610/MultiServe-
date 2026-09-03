import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

// Public Pages
import Home from "./pages/Home";
import Providers from "./pages/Providers";
import ProviderDetails from "./pages/ProviderDetails";
import Booking from "./pages/Booking";
import Register from "./pages/Register";
import Login from "./pages/Login";
import About from "./pages/About";

// Customer Pages
import MyBookings from "./pages/MyBookings";

// Provider Pages
import ProviderDashboard from "./pages/ProviderDashboard";

// Shared Pages
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import ManageUsers from "./pages/ManageUsers";
import ManageProviders from "./pages/ManageProviders";
import ManageBookings from "./pages/ManageBookings";
import ManageServices from "./pages/ManageServices";

// Authentication
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
    return (
        <BrowserRouter>
<ScrollToTop />
            <Routes>

                {/* =====================================================
                    PUBLIC ROUTES
                ===================================================== */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/about"
                    element={<About />}
                />

                <Route
                    path="/providers"
                    element={<Providers />}
                />

                <Route
                    path="/providers/:service"
                    element={<Providers />}
                />

                <Route
                    path="/provider/:id"
                    element={<ProviderDetails />}
                />

                <Route
                    path="/book/:providerId"
                    element={<Booking />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* =====================================================
                    CUSTOMER ROUTES
                ===================================================== */}

                <Route
                    path="/my-bookings"
                    element={
                        <ProtectedRoute role="customer">
                            <MyBookings />
                        </ProtectedRoute>
                    }
                />


                {/* =====================================================
                    PROVIDER ROUTES
                ===================================================== */}

                <Route
                    path="/provider-dashboard"
                    element={
                        <ProtectedRoute role="provider">
                            <ProviderDashboard />
                        </ProtectedRoute>
                    }
                />


                {/* =====================================================
                    USER ROUTES
                ===================================================== */}

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/notifications"
                    element={
                        <ProtectedRoute>
                            <Notifications />
                        </ProtectedRoute>
                    }
                />


                {/* =====================================================
                    ADMIN ROUTES
                ===================================================== */}

                <Route
                    path="/admin-dashboard"
                    element={<AdminDashboard />}
                />

                <Route
                    path="/admin/users"
                    element={<ManageUsers />}
                />

                <Route
                    path="/admin/providers"
                    element={<ManageProviders />}
                />

                <Route
                    path="/admin/bookings"
                    element={<ManageBookings />}
                />

                <Route
                    path="/admin/services"
                    element={<ManageServices />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;