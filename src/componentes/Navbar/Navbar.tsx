import { Link } from "react-router-dom";

type NavbarProps = {
  isLoggedIn?: boolean;
  onLogout?: () => void;
};

function Navbar({ isLoggedIn = false, onLogout }: NavbarProps) {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <div className="text-lg font-semibold">PetCare</div>

      <div className="flex items-center gap-6">
        <Link to="/mascotas" className="hover:text-gray-200">
          Inicio
        </Link>

        <Link to="/mascotas" className="hover:text-gray-200">
          Mascotas
        </Link>

        <Link to="/citas" className="hover:text-gray-200">
          Citas
        </Link>

        <Link to="/vacunas" className="hover:text-gray-200">
          Vacunas
        </Link>

        <Link to="/tips" className="hover:text-gray-200">
          Tips
        </Link>

        <Link to="/perfil" className="hover:text-gray-200">
          Perfil
        </Link>

        {isLoggedIn ? (
          <button
            onClick={onLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Cerrar Sesión
          </button>
        ) : (
          <button className="bg-green-500 px-3 py-1 rounded hover:bg-green-600">
            Iniciar Sesión
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
