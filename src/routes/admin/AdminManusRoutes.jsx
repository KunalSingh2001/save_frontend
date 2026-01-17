import { Routes, Route } from "react-router-dom";
import AdminMenus from "../../components/admin/admins/AdminAdmins";
import AddEdit from "../../components/admin/admins/AddEdit";

export default function AdminMenusRoutes() {
    return (
        <Routes>
            <Route index element={<AdminMenus />} />
            <Route path="add" element={<AddEdit />} />
            <Route path="edit-menu/:id" element={<AddEdit />} />
        </Routes>
    );
}
