import { Routes, Route } from "react-router-dom";
import PublicRoute from "../middlewares/PublicRoutes";
import BeforeLoginLayout from "../layouts/BeforeLoginLayout";
import Login from "../components/Login";
import NotFound from "./NotFound";

export default function PublicRoutes() {
    return (
        <PublicRoute>
            <BeforeLoginLayout>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BeforeLoginLayout>
        </PublicRoute>
    );
}
