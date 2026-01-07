import { Routes, Route } from "react-router-dom";
import AdminRoles from "../../components/admin/roles/AdminRoles";
import AddEdit from "../../components/admin/roles/AddEdit";

export default function AdminRolesRoutes() {
    return (
        <Routes>
            <Route index element={<AdminRoles />} />
            <Route path="add" element={<AddEdit />} />
            <Route path="edit-role/:id" element={<AddEdit />} />
        </Routes>
    );
}
