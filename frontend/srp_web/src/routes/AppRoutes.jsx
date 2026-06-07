import {
    Routes,
    Route
} from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminDashboard from "../pages/AdminDashboard";
import UserStores from "../pages/UserStores";
import OwnerDashboard from "../pages/OwnerDashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminUsers from "../pages/AdminUsers";
import AdminStores from "../pages/AdminStores";
import ChangePassword from "../pages/ChangePassword";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
             <Route
                path="/admin/dashboard"
                element={
                    <ProtectedRoute
                        allowedRole="ADMIN"
                    >
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/users"
                element={
                    <ProtectedRoute
                        allowedRole="ADMIN"
                    >
                        <AdminUsers />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/stores"
                element={
                    <ProtectedRoute
                        allowedRole="ADMIN"
                    >
                        <AdminStores />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/stores"
                element={
                    <ProtectedRoute
                        allowedRole="USER"
                    >
                        <UserStores />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/owner/dashboard"
                element={
                    <ProtectedRoute
                        allowedRole="OWNER"
                    >
                        <OwnerDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/change-password"
                element={
                    <ProtectedRoute>
                        <ChangePassword />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}


export default AppRoutes;