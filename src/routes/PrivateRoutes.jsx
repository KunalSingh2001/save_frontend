import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../middlewares/PrivateRoute";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../layouts/Dashboard";
import NotFound from "./NotFound";
import AdminRolesRoutes from "./admin/adminRolesRoutes";
import AdminManusRoutes from "./admin/AdminManusRoutes";

export default function PrivateRoutes() {
    return (
        <PrivateRoute>
            <MainLayout>
                <Routes>
                    <Route path="/" index element={<Dashboard />} />
                    <Route path="roles/*" element={<AdminRolesRoutes />} />
                    <Route path="manus/*" element={<AdminManusRoutes />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </MainLayout>
        </PrivateRoute>
    );
}
