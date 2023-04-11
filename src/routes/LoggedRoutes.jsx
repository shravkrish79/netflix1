import "../scripts/scroll";
import AdminUserLogin from "./AdminUserLogin";
import NormalUserLogin from "./NormalUserLogin";
import Navbar from "../components/Navbar";


export default function LoggedRoutes() {

  const checkAdmin = localStorage.checkAdmin;
  return (
    <div>
      <Navbar />
      {(checkAdmin === 'true') ? <AdminUserLogin /> : <NormalUserLogin />}
    </div>
  )
}


