import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { successToast, errorToast } from "../utils/tost.js";
import { parseApiError } from "../utils/parseApiError.js";
import { loginSuccess } from "../redux/slices/authSlice.js";

function Login() {
    let useremail = useRef();
    let userpassword = useRef();
    const dispatch = useDispatch();

    async function loginSubmitHandler(event) {
        event.preventDefault();
        try {
            const enteredEmail = useremail.current.value;
            const enteredPassword = userpassword.current.value;
            console.log("entered Credetials", enteredEmail, enteredPassword);
            const res = await axios.post(
                "http://localhost:2519/api/auth/login",
                {
                    username: enteredEmail,
                    password: enteredPassword,
                }
            );

            dispatch(
                loginSuccess({
                    isAuthenticated: true,
                    user: res.data.username,
                    token: res.data.access_token,
                })
            );

            localStorage.setItem("isAuthenticated", true),
                localStorage.setItem("user", res.data.username) || false,
                localStorage.setItem("token", res.data.access_token) || false,
                successToast("Login successful");
        } catch (error) {
            const message = parseApiError(error);
            errorToast(message);
        }
    }

    return (
        <div className="row flex-grow">
            <div className="col-lg-4 mx-auto">
                <div className="auth-form-light text-left p-5">
                    <div className="brand-logo">
                        <img src="../../assets/images/logo.svg" />
                    </div>
                    <h4>Hello! let's get started</h4>
                    <h6 className="font-weight-light">Sign in to continue.</h6>
                    <form className="pt-3" onSubmit={loginSubmitHandler}>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control form-control-lg"
                                id="exampleInputEmail1"
                                placeholder="Username"
                                ref={useremail}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control form-control-lg"
                                id="exampleInputPassword1"
                                placeholder="Password"
                                ref={userpassword}
                            />
                        </div>
                        <div className="mt-3 d-grid gap-2">
                            <button
                                className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"
                                type="submit"
                            >
                                SIGN IN
                            </button>
                        </div>
                        <div className="my-2 d-flex justify-content-between align-items-center">
                            <div className="form-check">
                                <label className="form-check-label text-muted">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                    />{" "}
                                    Keep me signed in{" "}
                                </label>
                            </div>
                            <a href="#" className="auth-link text-primary">
                                Forgot password?
                            </a>
                        </div>
                        <div className="mb-2 d-grid gap-2">
                            <button
                                type="button"
                                className="btn btn-block btn-facebook auth-form-btn"
                            >
                                <i className="mdi mdi-facebook me-2"></i>Connect
                                using facebook{" "}
                            </button>
                        </div>
                        <div className="text-center mt-4 font-weight-light">
                            {" "}
                            Don't have an account?{" "}
                            <a href="register.html" className="text-primary">
                                Create
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
