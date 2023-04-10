
import { Route, Routes } from "react-router-dom";
import Category from "../pages/Category";
import Seasons from "../pages/Seasons";
import ContentManager from "../pages/ContentManager";
import Episode from "../pages/Epsisode";
import { useUser } from "../state/useUser";
import Navbar from "../components/Navbar";



export default function AdminUserLogin() {
    const {isAdmin} = useUser();
    console.log(isAdmin);
    console.log('entered admin page')
    return (
        <div>
        <Navbar />
        <Routes>
            <Route path="/" element={<ContentManager />} />
            <Route path="/:category" element={<Category />} />
            <Route path="/tvshows/:showname" element={<Seasons />} />
            <Route path="/tvshows/:showname/:season" element={<Episode />} />
        </Routes>
        </div>
    );
}


