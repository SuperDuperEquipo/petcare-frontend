import Navbar from "../componentes/Navbar/Navbar"
import Footer from "../componentes/Footer/Footer"
import { useAuth } from "../context/AuthContext"

type LayoutProps = {
  children: React.ReactNode
}

function MainLayout({ children }: LayoutProps) {

  const { user, logout, isAuthenticated } = useAuth()

  return (
    <div className="flex flex-col min-h-screen">

      <Navbar
        isLoggedIn={isAuthenticated}
        role={user?.role}
        onLogout={logout}
      />

      <main className="flex-grow p-6">
        {children}
      </main>

      <Footer />

    </div>
  )
}

export default MainLayout