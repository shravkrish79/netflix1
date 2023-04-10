import { Route, Routes } from "react-router-dom";
import DisplayPage from "../pages/DisplayPage";
import Navbar from "../components/Navbar";
import PlayVideo from "../pages/PlayVideo";

export default function NormalUserLogin() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<DisplayPage />} />
                <Route path="/:category" element={<DisplayPage />} />
                <Route path="/:category/:title" element={<PlayVideo />} />
            </Routes>
        </div>
    )
}