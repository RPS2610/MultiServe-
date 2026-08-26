import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Providers from "./pages/Providers";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import ProviderDashboard from "./pages/ProviderDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProviderDetails from "./pages/ProviderDetails";
import AdminDashboard from "./pages/AdminDashboard";
import ManageUsers from "./pages/ManageUsers";
import ManageProviders from "./pages/ManageProviders";
import ManageBookings from "./pages/ManageBookings";
import ManageServices from "./pages/ManageServices";
import Notifications from "./pages/Notifications";
import About from "./pages/About";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Home />}
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
                    path="/my-bookings"
                    element={
                        <ProtectedRoute role="customer">
                            <MyBookings />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/provider-dashboard"
                    element={
                        <ProtectedRoute role="provider">
                            <ProviderDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

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

                <Route
                    path="/notifications"
                    element={<Notifications />}
                />
               <Route
                     path="/about"
                     element={<About />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;