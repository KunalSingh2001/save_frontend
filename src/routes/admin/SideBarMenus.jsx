import { Routes, Route } from "react-router-dom";
import AdminRoles from "../../components/admin/roles/AdminRoles";
import AddEdit from "../../components/admin/roles/AddEdit";

export default function AdminRolesRoutes() {
    return (
        <Routes>
            <Route index element={<AdminRoles />} />
            <Route path="menus/create" element={<AddEdit />} />
            <Route path="menus/:id/edit" element={<AddEdit />} />
        </Routes>
    );
}
