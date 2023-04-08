
import {  Route, Routes } from "react-router-dom";
import Category from "../pages/Category";
import Seasons from "../pages/Seasons";
import ContentManager from "../pages/ContentManager";
import Modal from "../components/Modal";
import { useCategory } from "../state/useCategory";
// import "../styles/global/style.css";
import Episode from "../pages/Epsisode";
import Navbar from "../components/Navbar";


export default function LoggedRoutes() {
  const { modal, setModal } = useCategory();
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<ContentManager />} />
        <Route path="/:category" element={<Category />} />
        <Route path="/tvshows/:showname" element={<Seasons />} />
        <Route path="/tvshows/:showname/:season" element={<Episode />} />
      </Routes>
      <Modal modalState={[modal, setModal]} />
    </div> 
  );
}


