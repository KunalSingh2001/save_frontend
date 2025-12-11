import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function MainLayout({ children }) {
    return (
        <>
            <div className="container-scroller">
                <div className="row p-0 m-0 proBanner" id="proBanner">
                    <div className="col-md-12 p-0 m-0">
                        <div className="card-body card-body-padding d-flex align-items-center justify-content-between">
                            <div className="ps-lg-3">
                                <div className="d-flex align-items-center justify-content-between">
                                    <p className="mb-0 font-weight-medium me-3 buy-now-text">
                                        Free 24/7 customer support, updates,
                                        and more with this template!
                                    </p>
                                    <a
                                        href="https://www.bootstrapdash.com/product/purple-bootstrap-admin-template/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn me-2 buy-now-btn border-0"
                                    >
                                        Buy Now
                                    </a>
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                                <a href="https://www.bootstrapdash.com/product/purple-bootstrap-admin-template/">
                                    <i className="mdi mdi-home me-3 text-white"></i>
                                </a>
                                <button
                                    id="bannerClose"
                                    className="btn border-0 p-0"
                                    onClick={() => document.getElementById('proBanner').style.display = 'none'}
                                >
                                    <i className="mdi mdi-close text-white mr-0"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div className="main-panel">
                        <main>{children}</main>
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainLayout;
