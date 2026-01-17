import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import PrivateRoute from "../middlewares/PrivateRoute";
const MainLayout = lazy(() => import("../layouts/MainLayout"));
const NotFound = lazy(() => import("./NotFound"));
const Dashboard = lazy(() => import("../layouts/Dashboard"));
const AdminRolesRoutes = lazy(() => import("./admin/adminRolesRoutes"));
const AdminManusRoutes = lazy(() => import("./admin/AdminManusRoutes"));
const AdminAdminsRoutes = lazy(() => import("./admin/AdminAdminsRoutes"));
export default function PrivateRoutes() {
    return (
        <PrivateRoute>
            <MainLayout>
                <Routes>
                    <Route path="/" index element={<Dashboard />} />
                    <Route path="roles/*" element={<AdminRolesRoutes />} />
                    <Route
                        path="sidebar-menus/*"
                        element={<AdminManusRoutes />}
                    />
                    <Route path="subadmin/*" element={<AdminManusRoutes />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </MainLayout>
        </PrivateRoute>
    );
}
