import AdminUserLogin from "./AdminUserLogin";
import NormalUserLogin from "./NormalUserLogin";


export default function LoggedRoutes() {

  const checkAdmin = localStorage.checkAdmin;

  return (
    <div>
      {(checkAdmin === 'true') ? <AdminUserLogin /> : <NormalUserLogin />}
    </div>
  )
}


