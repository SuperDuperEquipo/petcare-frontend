import { Outlet } from 'react-router-dom'
import Navbar from "../componentes/Navbar/Navbar"
import Footer from "../componentes/Footer/Footer"


function MainLayout() {

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <main className="flex-grow p-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout