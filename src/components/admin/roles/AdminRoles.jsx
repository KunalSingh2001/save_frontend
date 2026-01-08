import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useApi from "../../../api/hooks/useApi";
import { ROLE_ROUTES } from "../../../api/routes/role.routes";
import { errorToast } from "../../../utils/tost";
import Table from "../../../components/common/Table";
import { useNavigate } from "react-router-dom";

function AdminRoles() {
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);

    const { data, loading, request: fetchRoles } = useApi(ROLE_ROUTES.LIST);

    const { request: deleteRole } = useApi(null, { method: "DELETE" });

    useEffect(() => {
        fetchRoles().then((res) => {
            setRoles(res.data || []);
        });
    }, []);

    async function handleDelete(id) {
        try {
            await deleteRole(null, {
                url: ROLE_ROUTES.DELETE(id),
            });

            setRoles((prev) => prev.filter((r) => r.id !== id));
        } catch {
            errorToast("Delete failed");
        }
    }

    if (loading) return <p>Loading...</p>;

    return (
        <div className="card">
            <div className="card-body">
                <h4>Admin Roles</h4>

                <Link to="add" className="btn btn-success">
                    Add
                </Link>

                <Table
                    data={roles}
                    columns={[
                        {
                            key: "designation",
                            label: "Designationnnn",
                        },
                        {
                            key: "status",
                            label: "Status",
                            render: (row) =>
                                row.status === 1 ? (
                                    <span className="badge badge-gradient-success">
                                        Active
                                    </span>
                                ) : (
                                    <span className="badge badge-gradient-danger">
                                        Inactive
                                    </span>
                                ),
                        },
                    ]}
                    actions={(row) => (
                        <>
                            <button
                                className="btn btn-primary btn-fw"
                                onClick={() => navigate(`edit-role/${row.id}`)}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-danger btn-fw"
                                onClick={() => handleDelete(row.id)}
                            >
                                Delete
                            </button>
                        </>
                    )}
                />
            </div>
        </div>
    );
}

export default AdminRoles;
