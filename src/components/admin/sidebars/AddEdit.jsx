import api from "../../../api/axiosInstance";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { successToast, errorToast } from "../../../utils/tost";
import { useNavigate } from "react-router-dom";
function AddEdit() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [urlVal, setURL] = useState("");
    const [icon, setIcon] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [visibility, setVisibility] = useState(1);
    const navigate = useNavigate();

    function fetchMenuById() {
        api.get(`/admin/menu/get-by-id/${id}`)
            .then((res) => {
                const data = res.data?.data;
                setName(data?.designation);
                setURL(data?.url);
                setIcon(data?.icon);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        if (id) {
            fetchMenuById();
        }
    }, [id]);
    async function addEditFormSubmitHandler(e) {
        e.preventDefault();
        try {
            let url = "/admin/menu/create";
            let msg = "Menu added successfully";

            if (id) {
                url = `/admin/menu/update/${id}`;
                msg = "Menu updated successfully";
            }

            const data = {
                text: name,
                url: urlVal,
                icon: icon,
                status: isActive,
                // visibility: visibility,
            };
            const res = await api.post(url, data);
            if (res.status === 201 || res.status === 200) {
                navigate("/sidebar-menus");
                successToast(res?.data?.message);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="row">
            <div className="col-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Menu Form</h4>
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
                                <label for="exampleInputName1">URL</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
                                    name="name"
                                    value={urlVal}
                                    onChange={(e) => setURL(e.target.value)}
                                    autoComplete="off"
                                />
                            </div>
                            <div className="form-group">
                                <label for="exampleInputName1">Icon</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Icon"
                                    name="icon"
                                    value={icon}
                                    onChange={(e) => setIcon(e.target.value)}
                                    autoComplete="off"
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={isActive === 1}
                                        onChange={(e) =>
                                            setIsActive(
                                                e.target.checked ? 1 : 0
                                            )
                                        }
                                    />{" "}
                                    Active
                                </label>
                            </div>
                            <div className="form-group">
                                <label>Visibility</label>
                                <select
                                    className="form-control"
                                    name="visibility"
                                    value={visibility}
                                    onChange={(e) =>
                                        setVisibility(Number(e.target.value))
                                    }
                                >
                                    <option value={1}>Show</option>
                                    <option value={0}>Hide</option>
                                </select>
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
