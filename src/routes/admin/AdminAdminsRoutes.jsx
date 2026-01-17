import { Routes, Route } from "react-router-dom";
import AdminAdmins from "../../components/admin/admins/AdminAdmins";
import AddEdit from "../../components/admin/admins/AddEdit";

export default function AdminAdminsRoutes() {
    return (
        <Routes>
            <Route index element={<AdminAdmins />} />
            <Route path="add" element={<AddEdit />} />
            <Route path="edit-admin/:id" element={<AddEdit />} />
        </Routes>
    );
}
