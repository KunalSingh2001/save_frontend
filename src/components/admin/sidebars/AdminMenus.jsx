import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useApi from "../../../api/hooks/useApi";
import { MENU_ROUTES } from "../../../api/routes/menus.routes";
import { errorToast } from "../../../utils/tost";
import Table from "../../../components/common/Table";
import { useNavigate } from "react-router-dom";

function AdminMenus() {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const limit = 10;
    const {
        data,
        loading,
        error,
        request: fetchMenus,
    } = useApi(MENU_ROUTES.LIST);

    const { request: deleteMenu } = useApi(null, { method: "DELETE" });

    useEffect(() => {
        fetchMenus(null, {
            params: {
                page,
                limit,
            },
        });
    }, [page]);

    async function handleDelete(id) {
        try {
            await deleteMenu(null, {
                url: MENU_ROUTES.DELETE(id),
            });

            0;
        } catch {
            errorToast("Delete failed");
        }
    }

    if (loading) return <p>Loading...</p>;

    const onPageChange = (page) => {
        setPage(page);
    };

    return (
        <div className="card">
            <div className="card-body">
                <h4>Admin Menus</h4>

                <Link to="add" className="btn btn-success">
                    Add
                </Link>

                <Table
                    data={data?.data || []}
                    columns={[
                        {
                            key: "text",
                            label: "Text",
                        },
                        {
                            key: "url",
                            label: "URL",
                        },
                        {
                            key: "icon",
                            label: "Icon",
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
                                onClick={() =>
                                    navigate(`menu/update/${row.id}`)
                                }
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

export default AdminMenus;
