import { Routes, Route } from "react-router-dom";
import Blogs from "../../components/blog/Blogs";
// import AddEdit from "../../components/blog/AddEdit";

export default function BlogRoutes() {
    return (
        <Routes>
            <Route index element={<Blogs />} />
            {/* <Route path="blogs/create" element={<AddEdit />} />
            <Route path="blogs/:id/edit" element={<AddEdit />} /> */}
        </Routes>
    );
}
