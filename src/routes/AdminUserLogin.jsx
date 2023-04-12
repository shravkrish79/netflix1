
import { Route, Routes } from "react-router-dom";
import Category from "../pages/Category";
import Seasons from "../pages/Seasons";
import ContentManager from "../pages/ContentManager";
import Episode from "../pages/Epsisode";
import PlayVideo from "../pages/PlayVideo";


export default function AdminUserLogin() {
    return (
        <div>
        <Routes>
            <Route path="/" element={<ContentManager />} />
            <Route path="/:category" element={<Category />} />
            <Route path="/tvshows/:showname" element={<Seasons />} />
            <Route path="/tvshows/:showname/:season" element={<Episode />} />
            <Route path="/:category/:title" element={<PlayVideo />} />
        </Routes>
        </div>
    );
}


