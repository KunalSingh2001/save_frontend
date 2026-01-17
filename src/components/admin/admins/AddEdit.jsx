import api from "../../../api/axiosInstance";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { successToast, errorToast } from "../../../utils/tost";
import { useNavigate } from "react-router-dom";
import useApi from "../../../api/hooks/useApi";
import { ADMIN_ROUTES } from "../../../api/routes/admin.routes";

function AddEdit() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [role_id, setRole] = useState("");
    const [manus, setManus] = useState([]);

    const navigate = useNavigate();
    function fetchAdminById() {
        api.get(`/admin/sub-admin/get-by-id/${id}`)
            .then((res) => {
                setName(res.data?.data?.name);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function fetchAllManus() {
        api.get(ADMIN_ROUTES.fetchRolesMenus)
            .then((res) => {
                console.log(res.data);
                // setManus(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        if (id) {
            fetchAdminById();
        }
        fetchAllManus();
    }, [id]);

    const { request: addEditAdmin } = useApi(null, { method: "POST" });

    async function addEditFormSubmitHandler(e) {
        e.preventDefault();
        try {
            let url = ADMIN_ROUTES.CREATE;
            let msg = "Admin added successfully";

            if (id) {
                url = ADMIN_ROUTES.UPDATE(id);
                msg = "Admin updated successfully";
            }
            const payload = {
                name,
                email,
                phone,
                password,
                role_id,
            };
            const addEditResponse = await addEditAdmin(
                {
                    payload,
                },
                {
                    url: url,
                }
            );

            // const res = await api.post(url, { designation:name });
            // console.log(res);
            // if (res.status === 201 || res.status === 200) {
            //     navigate('/sub-admins');
            //     successToast(res?.data?.message);
            // }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="row">
            <div className="col-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Sub Admin Form</h4>
                        <p className="card-description">
                            {" "}
                            {id ? "Edit Form" : "Add Form"}{" "}
                        </p>
                        <form
                            className="forms-sample"
                            onSubmit={addEditFormSubmitHandler}
                        >
                            <div className="form-group">
                                <label for="exampleInputName1">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    autoComplete="off"
                                />
                            </div>
                            <div className="form-group">
                                <label for="exampleInputEmail3">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="off"
                                />
                            </div>
                            <div className="form-group">
                                <label for="exampleInputPhone3">Phone</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Phone"
                                    name="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    autoComplete="off"
                                />
                            </div>
                            <div className="form-group">
                                <label for="exampleInputPassword3">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    name="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    autoComplete="off"
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-gradient-primary me-2"
                            >
                                Submit
                            </button>
                            <button className="btn btn-light">Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AddEdit;
