import { NavLink, Link } from "react-router-dom"
import { PawPrint } from "lucide-react"
import { useAuth } from "../../context/AuthContext"

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-white/20 text-white font-bold rounded-full px-4 py-2 transition"
      : "hover:bg-white/10 text-white rounded-full px-4 py-2 transition"

  return (
    <nav className="bg-gradient-to-br from-petIndigo to-petIndigoDark text-white px-6 py-3 flex justify-between items-center shadow-md sticky top-0 z-50">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <PawPrint size={28} className="text-white" />
        <Link to={user?.role === "admin" ? "/admin" : "/dashboard"} className="text-2xl font-display font-bold">
          PetCare
        </Link>
      </div>

      {/* Links */}
      <div className="flex items-center gap-4 md:gap-6">

        {(user?.role === "user" || user?.role === "owner") && (
          <>
            <NavLink to="/dashboard" end className={linkClass}>Inicio</NavLink>
            <NavLink to="/mascotas" className={linkClass}>Mascotas</NavLink>
            <NavLink to="/citas" className={linkClass}>Citas</NavLink>
            <NavLink to="/tips" className={linkClass}>Tips</NavLink>
            <NavLink to="/perfil" className={linkClass}>Perfil</NavLink>
          </>
        )}

        {user?.role === "admin" && (
          <>
            <NavLink to="/admin" end className={linkClass}>Inicio</NavLink>
            <NavLink to="/admin/users" className={linkClass}>Usuarios</NavLink>
            <NavLink to="/admin/tips" className={linkClass}>Tips</NavLink>
          </>
        )}

        {isAuthenticated && (
          <button
            onClick={logout}
            className="bg-petPink px-4 py-2 rounded-full text-sm font-semibold hover:bg-petPinkDark transition"
          >
            Cerrar Sesión
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar