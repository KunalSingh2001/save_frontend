import { Link } from "react-router-dom";
function Sidebar() {
    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
                <li className="nav-item nav-profile">
                    <a href="#" className="nav-link">
                        <div className="nav-profile-image">
                            <img
                                src="/assets/images/faces/face1.jpg"
                                alt="profile"
                            />
                            <span className="login-status online"></span>
                        </div>
                        <div className="nav-profile-text d-flex flex-column">
                            <span className="font-weight-bold mb-2">
                                David Grey. H
                            </span>
                            <span className="text-secondary text-small">
                                Project Manager
                            </span>
                        </div>
                        <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="index.html">
                        <span className="menu-title">Dashboard</span>
                        <i className="mdi mdi-home menu-icon"></i>
                    </a>
                </li>
                <li className="nav-item">
                    {/* TOGGLE ONLY (no routing here) */}
                    <a
                        className="nav-link"
                        data-bs-toggle="collapse"
                        href="#ui-basic"
                        aria-expanded="false"
                        aria-controls="ui-basic"
                    >
                        <span className="menu-title">Admins</span>
                        <i className="menu-arrow"></i>
                        <i className="mdi mdi-crosshairs-gps menu-icon"></i>
                    </a>

                    {/* SUB MENU */}
                    <div className="collapse" id="ui-basic">
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item">
                                <Link to="/roles" className="nav-link">
                                    Admin Roles
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/admins" className="nav-link">
                                    Admins
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/sidebar-menus" className="nav-link">
                                    Sidebar Menus
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </nav>
    );
}

export default Sidebar;
