import { NavLink, Link } from "react-router-dom"
import { PawPrint } from "lucide-react"

type NavbarProps = {
  isLoggedIn?: boolean
  role?: "admin" | "user" | "owner"
  onLogout?: () => void
}

function Navbar({ isLoggedIn = false, role, onLogout }: NavbarProps) {

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-white/20 text-white font-bold rounded-full px-4 py-2 transition"
      : "hover:bg-white/10 text-white rounded-full px-4 py-2 transition"

  return (
    <nav className="bg-petIndigo text-white px-6 py-3 flex justify-between items-center shadow-md sticky top-0 z-50">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <PawPrint size={28} className="text-yellow-300" />
        <Link to="/" className="text-2xl font-display font-bold hover:text-yellow-300 transition">
          PetCare
        </Link>
      </div>

      {/* Links */}
      <div className="flex items-center gap-4 md:gap-6">

        {(role === "user" || role === "owner") && (
          <>
            <NavLink to="/" end className={linkClass}>
              Inicio
            </NavLink>
            <NavLink to="/mascotas" className={linkClass}>
              Mascotas
            </NavLink>
            <NavLink to="/appointments" className={linkClass}>
              Citas
            </NavLink>
            <NavLink to="/vaccines" className={linkClass}>
              Vacunas
            </NavLink>
            <NavLink to="/tips" className={linkClass}>
              Tips
            </NavLink>
            <NavLink to="/profile" className={linkClass}>
              Perfil
            </NavLink>
          </>
        )}

        {role === "admin" && (
          <>
            <NavLink to="/admin" end className={linkClass}>
              Inicio
            </NavLink>
            <NavLink to="/admin/users" className={linkClass}>
              Usuarios
            </NavLink>
            <NavLink to="/admin/tips" className={linkClass}>
              Tips
            </NavLink>
            <NavLink to="/admin/perfil" className={linkClass}>
              Perfil
            </NavLink>
          </>
        )}

        {/* Botón de sesión */}
        {isLoggedIn ? (
          <button
            onClick={onLogout}
            className="bg-petPink px-4 py-2 rounded-full text-sm font-semibold hover:bg-petPinkDark transition"
          >
            Cerrar Sesión
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-green-500 px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-600 transition"
          >
            Iniciar Sesión
          </Link>
        )}

      </div>

    </nav>
  )
}

export default Navbar