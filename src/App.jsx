import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./layouts/Dashboard";
import PrivateRoute from "./middlewares/PrivateRoute";
import PublicRoutes from "./middlewares/PublicRoutes";

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
                        <MainLayout>
                            <PublicRoutes>
                                <h2>Login Page</h2>
                            </PublicRoutes>
                        </MainLayout>
                    }
                />
                <MainLayout />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
