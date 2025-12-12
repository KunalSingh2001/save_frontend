import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import BeforeLoginLayout from "./layouts/BeforeLoginLayout";
import Dashboard from "./layouts/Dashboard";
import PrivateRoute from "./middlewares/PrivateRoute";
import PublicRoutes from "./middlewares/PublicRoutes";
import Login from "./components/Login";

function App() {
    console.log("App component rendered");
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <MainLayout>
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        </MainLayout>
                    }
                />

                <Route
                    path="/login"
                    element={
                        <BeforeLoginLayout>
                            <PublicRoutes>
                                <Login />
                            </PublicRoutes>
                        </BeforeLoginLayout>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
