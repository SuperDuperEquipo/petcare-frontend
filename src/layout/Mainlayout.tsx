import { Outlet } from 'react-router-dom'
import Navbar from "../componentes/Navbar/Navbar"
import Footer from "../componentes/Footer/Footer"
import { useAuth } from "../context/AuthContext"

function MainLayout() {

  const { user, logout, isAuthenticated } = useAuth()

  return (
    <div className="flex flex-col min-h-screen">

      <Navbar
        isLoggedIn={isAuthenticated}
        role={user?.role}
        onLogout={logout}
      />

      <main className="flex-grow p-6">
        <Outlet />
      </main>

      <Footer />

    </div>
  )
}

export default MainLayout