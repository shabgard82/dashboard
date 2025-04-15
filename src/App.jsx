import { Navigate, Route, Routes } from "react-router-dom";
// COMPONENTS
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import DashboardLayout from "./pages/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
