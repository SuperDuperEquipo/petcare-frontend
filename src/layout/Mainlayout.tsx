import Navbar from "../componentes/Navbar/Navbar"
import Footer from "../componentes/Footer/Footer"

type LayoutProps = {
  children: React.ReactNode
}

function MainLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">

      <Navbar isLoggedIn={true} />

      <main className="flex-grow p-6">
        {children}
      </main>

      <Footer />

    </div>
  )
}

export default MainLayout