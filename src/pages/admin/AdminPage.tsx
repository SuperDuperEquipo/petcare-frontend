import { User, LayoutDashboard, PawPrint } from "lucide-react"
import { useAuth } from "../../context/AuthContext"



export default function AdminPage() {
  const {user} = useAuth()
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">


      <div className="bg-white rounded-2xl shadow-md border border-petIndigoLight p-8 flex flex-col items-center text-center gap-4">
        <PawPrint size={64} className="text-petIndigo" />
        <h1 className="font-display text-3xl font-semibold text-petDark">
          ¡Hola{user?.name ? `, ${user.name}` : ""}!
        </h1>
        <p className="text-petIndigo text-sm md:text-base max-w-lg">
          Este es tu panel administrativo. Desde aquí puedes gestionar usuarios, tips y toda la información de la plataforma de PetCare.
        </p>
        <p className="text-petMuted text-sm md:text-base font-medium">
          Usa el menú superior para navegar por las secciones disponibles.
        </p>
      </div>


      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-petIndigoLight rounded-xl p-6 shadow-sm flex flex-col items-center gap-3">
          <User size={40} className="text-petIndigoDark" />
          <p className="text-petIndigoDark font-semibold">Gestiona los usuarios, los puedes eliminar</p>
        </div>
        <div className="bg-petIndigoLight rounded-xl p-6 shadow-sm flex flex-col items-center gap-3">
          <LayoutDashboard size={40} className="text-petIndigoDark" />
          <p className="text-petIndigoDark font-semibold text-center">Revisa y administra los tips, puedes crear nuevas recomendaciones para mascotas</p>
        </div>
      </div>

    </div>
  )
}