
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Category from "./pages/Category";
import ContentManager from "./pages/ContentManager";
import "./styles/global/style.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContentManager />} />
        <Route path="/:category" element={<Category />} />
      </Routes>
    </BrowserRouter>
  );
}


