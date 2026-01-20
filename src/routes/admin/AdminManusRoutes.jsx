import { Routes, Route } from "react-router-dom";
import AdminMenus from "../../components/admin/sidebars/AdminMenus";
import AddEdit from "../../components/admin/sidebars/AddEdit";

export default function AdminMenusRoutes() {
    return (
        <Routes>
            <Route index element={<AdminMenus />} />
            <Route path="add" element={<AddEdit />} />
            <Route path="edit-menu/:id" element={<AddEdit />} />
        </Routes>
    );
}
