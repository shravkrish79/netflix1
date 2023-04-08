
import "./styles/global/style.css";

import { BrowserRouter } from "react-router-dom";
import Modal from "./components/Modal";
import { useCategory } from "./state/useCategory";
import { useUser } from "./state/useUser";
import LoggedRoutes from "./routes/LoggedRoutes";
import UnLoggedRoutes from "./routes/UnLoggedRoutes";


export default function App() {
  const { uid } = useUser();

  const { modal, setModal } = useCategory();
  return (
    <BrowserRouter>
      {uid ? <LoggedRoutes /> : <UnLoggedRoutes />}
      <Modal modalState={[modal, setModal]} />
    </BrowserRouter>
  );
}


