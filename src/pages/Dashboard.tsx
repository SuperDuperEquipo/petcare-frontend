import { BookOpen, PawPrint, Syringe, CalendarDays } from "lucide-react"
import { useAuth } from "../context/AuthContext"



export default function Dashboard() {
    const {user} = useAuth()
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">

      <div className="bg-white rounded-2xl shadow-md border border-petIndigoLight p-8 flex flex-col items-center text-center gap-4">
        <PawPrint size={64} className="text-petIndigo" />
        <h1 className="font-display text-3xl font-semibold text-petDark">
          ¡Hola{user?.name ? `, ${user.name}` : ""}!
        </h1>
        <p className="text-petIndigo text-md md:text-base max-w-lg">
          Bienvenido a PetCare, tu espacio dedicado al cuidado y bienestar de tus mascotas.
        </p>
        <p className="text-petPinkDark text-sm font-semibold md:text-base">
            Porque en PetCare, cada mascota es parte de la familia
        </p>
        <p className="text-petMuted text-sm md:text-base font-medium">
          Usa el menú superior para explorar el contenido disponible.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-petIndigoLight rounded-xl p-6 shadow-sm flex flex-col items-center gap-3">
          <BookOpen size={40} className="text-petIndigoDark" />
          <p className="text-petIndigoDark font-semibold text-center">
            Explora tips y recomendaciones para el cuidado de tus mascotas
          </p>
        </div>
        <div className="bg-petIndigoLight rounded-xl p-6 shadow-sm flex flex-col items-center gap-3">
          <PawPrint size={40} className="text-petIndigoDark" />
          <p className="text-petIndigoDark font-semibold text-center">
            Registra a tu mascota con sus datos y tenla siempre a la mano
          </p>
        </div>
        <div className="bg-petIndigoLight rounded-xl p-6 shadow-sm flex flex-col items-center gap-3">
          <Syringe size={40} className="text-petIndigoDark" />
          <p className="text-petIndigoDark font-semibold text-center">
            Lleva el control de las vacunas de tu mascota y sus próximas dosis
          </p>
        </div>
        <div className="bg-petIndigoLight rounded-xl p-6 shadow-sm flex flex-col items-center gap-3">
          <CalendarDays size={40} className="text-petIndigoDark" />
          <p className="text-petIndigoDark font-semibold text-center">
            Agenda y organiza las citas veterinarias de tu mascota
          </p>
        </div>
      </div>

    </div>
  )
}