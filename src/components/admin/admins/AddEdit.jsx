import api from "../../../api/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useApi from "../../../api/hooks/useApi";
import { ADMIN_ROUTES } from "../../../api/routes/admin.routes";
import { successToast } from "../../../utils/tost";
function AddEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const [menus, setMenus] = useState([]);
    const [openMenus, setOpenMenus] = useState([]);
    const [selectedMenus, setSelectedMenus] = useState([]);

    const [roles, setRoles] = useState([]);

    /* ---------------- FETCH DATA ---------------- */

    function fetchAdminById() {
        api.get(`/admin/sub-admin/get-by-id/${id}`).then((res) => {
            const data = res.data?.data;
            setName(data?.name || "");
            setEmail(data?.email || "");
            setPhone(data?.phone || "");
            setRole(data?.role || "");
            setSelectedMenus(
                data?.permissions?.access_ids
                    ? data.permissions.access_ids.split(",").map(Number)
                    : [],
            );
            console.log("testing for menu data", selectedMenus);
        });
    }

    function fetchAllMenus() {
        api.get(ADMIN_ROUTES.fetchRolesMenus).then((res) => {
            setRoles(res.data?.roles || []);
            setMenus(res.data?.menus || []);
        });
    }

    useEffect(() => {
        if (id) fetchAdminById();
        fetchAllMenus();
    }, [id]);

    /* ---------------- TOGGLES ---------------- */

    const toggleOpen = (id) => {
        setOpenMenus((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
        );
    };

    const toggleSelect = (parentId, childId) => {
        setSelectedMenus((prev) => {
            const updated = new Set(prev);

            if (updated.has(childId)) {
                updated.delete(childId);
                const parent = menus.find((m) => m.id === parentId);
                const anyChildSelected = parent.children.some((c) =>
                    updated.has(c.id),
                );
                if (!anyChildSelected) {
                    updated.delete(parentId);
                }
            } else {
                updated.add(childId);
                updated.add(parentId);
            }

            return Array.from(updated);
        });
    };

    const { request: addEditAdmin } = useApi(null, { method: "POST" });

    async function addEditFormSubmitHandler(e) {
        e.preventDefault();

        const payload = {
            name,
            email,
            phone,
            password,
            role,
            menus: selectedMenus.join(","),
        };
        const url = id ? ADMIN_ROUTES.UPDATE(id) : ADMIN_ROUTES.CREATE;
        const res = await addEditAdmin(payload, { url });
        console.log("success message", res?.data?.message);
        successToast(res?.data?.message);
        navigate("/subadmin");
    }

    return (
        <div className="row">
            <div className="col-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Sub Admin Form</h4>

                        <form
                            className="forms-sample"
                            onSubmit={addEditFormSubmitHandler}
                        >
                            {/* BASIC INFO */}
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Phone</label>
                                <input
                                    className="form-control"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>

                            {/* ROLE */}
                            <div className="form-group">
                                <label>Role</label>
                                <select
                                    className="form-select"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="">Select Role</option>
                                    {roles.map((r) => (
                                        <option key={r.id} value={r.id}>
                                            {r.designation}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* MENU ACCESS */}
                            <div className="form-group">
                                <label>Menu Access</label>
                                <div className="border p-3 rounded">
                                    {menus.map((menu) => {
                                        const isOpen = openMenus.includes(
                                            menu.id,
                                        );

                                        return (
                                            <div key={menu.id} className="mb-2">
                                                <div
                                                    style={{
                                                        cursor: "pointer",
                                                        fontWeight: 600,
                                                    }}
                                                    onClick={() =>
                                                        toggleOpen(menu.id)
                                                    }
                                                >
                                                    {isOpen ? "▼" : "▶"}{" "}
                                                    {menu.text}
                                                </div>

                                                {isOpen &&
                                                    menu.children?.map(
                                                        (child) => (
                                                            <div
                                                                key={child.id}
                                                                className="form-check ms-4 mt-1"
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    checked={selectedMenus.includes(
                                                                        child.id,
                                                                    )}
                                                                    onChange={() =>
                                                                        toggleSelect(
                                                                            menu.id,
                                                                            child.id,
                                                                        )
                                                                    }
                                                                />
                                                                <label className="form-check-label">
                                                                    {child.text}
                                                                </label>
                                                            </div>
                                                        ),
                                                    )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-gradient-primary me-2"
                            >
                                Submit
                            </button>
                            <button type="button" className="btn btn-light">
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddEdit;
