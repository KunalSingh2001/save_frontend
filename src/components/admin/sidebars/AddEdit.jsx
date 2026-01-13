import api from "../../../api/axiosInstance";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { successToast, errorToast } from "../../../utils/tost";
import { useNavigate } from "react-router-dom";
function AddEdit() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        if (id) {
            fetchRoleById();
        }
    }, [id]);
    function fetchRoleById() {
        api.get(`/admin/role/get-by-id/${id}`).then(res => {
            setName(res.data?.data?.designation)
        }).catch(err => {
            console.log(err);
        });
    }

    async function addEditFormSubmitHandler(e) {
        e.preventDefault();
        try {
            let url = "/admin/role/create";
            let msg = "Role added successfully";

            if (id) {
                url = `/admin/role/update/${id}`;
                msg = "Role updated successfully";
            }

            const res = await api.post(url, { designation:name });
            console.log(res);
            if (res.status === 201 || res.status === 200) {
                navigate('/roles');
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
                        <h4 className="card-title">Role Form</h4>
                        <p className="card-description"> {id ? 'Edit Form' : 'Add Form'} </p>
                        <form className="forms-sample" onSubmit={addEditFormSubmitHandler}>
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

                            <button type="submit" className="btn btn-gradient-primary me-2">Submit</button>
                            <button className="btn btn-light">Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AddEdit;