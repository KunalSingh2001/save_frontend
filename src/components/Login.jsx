import React, { useRef } from "react";
import axios from "axios";
function Login() {
    let useremail = useRef();
    let userpassword = useRef();

    async function loginSubmitHandler(event) {
        event.preventDefault();
        const enteredEmail = useremail.current.value;
        const enteredPassword = userpassword.current.value;
        const loginData = {
            username: enteredEmail,
            password: enteredPassword,
        };

        const res = await axios.post("http://localhost:3000/api/auth/login", {
            loginData,
        });

        console.log("After login process", res);
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
