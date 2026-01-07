import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import NotFound from "./routes/NotFound";

function App() {
  console.log("App");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={<PublicRoutes />} />

        <Route path="/*" element={<PrivateRoutes />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
