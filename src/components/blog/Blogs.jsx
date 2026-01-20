import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useApi from "../../api/hooks/useApi";
import { BLOG_ROUTES } from "../../api/routes/blog.routes";
import { successToast } from "../../utils/tost";
import Table from "../../components/common/Table";
import { useNavigate } from "react-router-dom";

function Blogs() {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);

    const { data, loading, request: fetchBlogs } = useApi(BLOG_ROUTES.LIST);
    const { request: deleteBlog } = useApi(null, { method: "DELETE" });
    console.log("blog data", data);
    // const { request: activeDeavtiveBlog } = useApi(null, { method: "POST" });

    useEffect(() => {
        fetchBlogs();
    }, [page]);

    // async function handleActiveDeactive(id) {
    //     try {
    //         const payload = {
    //             field: "is_active",
    //             value:
    //                 data.data.find((admin) => admin.id === id)?.is_active === 1
    //                     ? 0
    //                     : 1,
    //         };
    //         console.log("payload", payload);
    //         const activeResponse = await activeDeavtiveAdmin(payload, {
    //             url: ADMIN_ROUTES.ActiveStatus(id),
    //         });
    //         fetchAdmins();
    //         successToast(activeResponse?.message);
    //     } catch {
    //         // errorToast("Delete failed");
    //     }
    // }

    async function handleDelete(id) {
        try {
            const deleteResponse = await deleteBlog(null, {
                url: BLOG_ROUTES.DELETE(id),
            });

            if (data?.length === 1 && page > 1) {
                setPage((prev) => prev - 1);
            } else {
                fetchBlogs();
            }

            successToast(deleteResponse?.message);
        } catch {
            // errorToast("Delete failed");
        }
    }

    const onPageChange = (page) => {
        setPage(page);
    };

    if (loading) return <p>Loading...</p>;
    return (
        <div className="card">
            <div className="card-body">
                <h4>Blogs</h4>

                <Link to="add" className="btn btn-success">
                    Add
                </Link>

                <Table
                    data={data?.data || []}
                    columns={[
                        {
                            key: "image",
                            label: "Image",
                        },
                        {
                            key: "category",
                            label: "Category",
                        },
                        {
                            key: "title",
                            label: "Title",
                        },
                        {
                            key: "post",
                            label: "Post",
                        },
                        {
                            key: "is_recent",
                            label: "Recent",
                        },
                        {
                            key: "is_published",
                            label: "Published",
                        },
                        {
                            key: "is_published",
                            label: "Published",
                        },
                        {
                            key: "status",
                            label: "Added",
                        },
                        {
                            key: "blog_author.name",
                            label: "Author",
                        },
                        {
                            key: "status",
                            label: "Status",
                            render: (row) =>
                                row.is_active === 1 ? (
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
                                onClick={() => navigate(`edit-blog/${row.id}`)}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-danger btn-fw"
                                onClick={() => handleDelete(row.id)}
                            >
                                Delete
                            </button>
                            {/* <button
                                // btn btn-inverse-success btn-fw
                                className={`btn btn-${row.is_active === 1 ? "inverse-danger" : "inverse-success"} btn-fw`}
                                onClick={() => handleActiveDeactive(row.id)}
                            >
                                {row.is_active === 1 ? "InActive" : "Active"}
                            </button> */}
                        </>
                    )}
                    pagination={data?.pagination}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    );
}

export default Blogs;
