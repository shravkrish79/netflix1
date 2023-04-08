
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Modal from "./components/Modal";
import { useCategory } from "./state/useCategory";
import "./styles/global/style.css";

import SignIn from "./pages/auth/SignIn";
import Signup from "./pages/auth/Signup";


export default function App() {
  const { modal, setModal } = useCategory();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Modal modalState={[modal, setModal]} />
    </BrowserRouter>
  );
}


