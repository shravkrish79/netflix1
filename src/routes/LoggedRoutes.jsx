
import AdminUserLogin from "./AdminUserLogin";
import NormalUserLogin from "./NormalUserLogin";
import Navbar from "../components/Navbar";
import NavbarMobile from "../components/NavbarMobile";


export default function LoggedRoutes() {

  const checkAdmin = localStorage.checkAdmin;
  return (
    <div>
      <Navbar />
      <NavbarMobile />
      {(checkAdmin === 'true') ? <AdminUserLogin /> : <NormalUserLogin />}
    </div>
  )
}


