import { Route, Routes } from "react-router-dom";
import DisplayPage from "../pages/DisplayPage";
import Navbar from "../components/Navbar";

export default function NormalUserLogin() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<DisplayPage />} />
                <Route path="/:category" element={<DisplayPage />} />
            </Routes>
        </div>
    )
}