import { Route, Routes } from "react-router-dom";
import DisplayPage from "../pages/DisplayPage";
import PlayVideo from "../pages/PlayVideo";

export default function NormalUserLogin() {
    return (
            <Routes>
                <Route path="/" element={<DisplayPage />} />
                <Route path="/:category" element={<DisplayPage />} />
                <Route path="/:category/:title" element={<PlayVideo />} />
            </Routes>

    )
}