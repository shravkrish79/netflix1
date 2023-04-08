import SignIn from "../pages/auth/SignIn";
import Signup from "../pages/auth/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword";
import { Routes, Route } from "react-router-dom";

export default function UnLoggedRoutes() {
    return (
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Routes>
    );
}