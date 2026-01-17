import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useApi from "../../../api/hooks/useApi";
import { ADMIN_ROUTES } from "../../../api/routes/admin.routes";
import { successToast } from "../../../utils/tost";
import Table from "../../../components/common/Table";
import { useNavigate } from "react-router-dom";

function AdminAdmins() {
    console.log("ADMIN_ROUTES:");
    const navigate = useNavigate();
    const [page, setPage] = useState(1);

    const { data, loading, request: fetchAdmins } = useApi(ADMIN_ROUTES.LIST);

    const { request: deleteAdmin } = useApi(null, { method: "DELETE" });

    useEffect(() => {
        fetchAdmins();
    }, [page]);

    async function handleDelete(id) {
        try {
            const deleteResponse = await deleteAdmin(null, {
                url: ADMIN_ROUTES.DELETE(id),
            });

            if (data?.length === 1 && page > 1) {
                setPage((prev) => prev - 1);
            } else {
                fetchAdmins();
            }

            successToast(deleteResponse?.message);
        } catch {
            // errorToast("Delete failed");
        }
    }

    if (loading) return <p>Loading...</p>;

    const onPageChange = (page) => {
        setPage(page);
    };

    return (
        <div className="card">
            <div className="card-body">
                <h4>Admin Admins</h4>

                <Link to="add" className="btn btn-success">
                    Add
                </Link>

                <Table
                    data={data?.data || []}
                    columns={[
                        {
                            key: "name",
                            label: "name",
                        },
                        {
                            key: "email",
                            label: "email",
                        },
                        {
                            key: "phone",
                            label: "phone",
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
                                onClick={() => navigate(`edit-admin/${row.id}`)}
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
                    pagination={data?.pagination}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    );
}

export default AdminAdmins;
