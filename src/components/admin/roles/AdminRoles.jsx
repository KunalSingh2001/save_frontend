import { useEffect, useState } from "react";
import api from "../../../api/axiosInstance";
import { Link } from "react-router-dom";

function AdminRoles() {
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        async function fetchRoles() {
            try {
                const res = await api.get("/admin/role/index");
                console.log('Data', res.data.data);
                setRoles(res.data.data || []);
            } catch (error) {
                console.error("Failed to fetch roles", error);
            }
        }
        fetchRoles();
    }, []);

    return (
        <div className="row">
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Admin Roles</h4>
                        <div className="table-responsive">
                            <Link to="add" className="btn btn-gradient-success btn-fw">Add</Link>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Designation</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roles.map((role, index) => (
                                        <tr key={role.id}>
                                            <td>{index + 1}</td>
                                            <td>{role.designation}</td>
                                            <td>{role.status === 1 ? <label class="badge badge-gradient-success">Active</label> : <label class="badge badge-gradient-danger">Inactive</label>}</td>
                                            <td>
                                                <Link
                                                    to={`edit-role/${role.id}`}
                                                    className="btn btn-gradient-primary btn-fw"
                                                >
                                                    Edit
                                                </Link>
                                                <button className="btn btn-gradient-danger btn-fw">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminRoles;
