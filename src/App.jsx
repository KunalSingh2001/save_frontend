import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./layouts/Dashboard";
function App() {
    return (
        <>
            <BrowserRouter>
                <MainLayout>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                    </Routes>
                </MainLayout>
            </BrowserRouter>
        </>
    );
}

export default App;
