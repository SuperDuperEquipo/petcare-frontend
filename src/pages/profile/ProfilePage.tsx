import { Mail, Pencil, User as UserIcon } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import type { User } from "../../types";

export default function ProfilePage() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosClient.get("/auth/profile");
        setUserData(res.data.user);
      } catch (error) {
        console.error("Error al cargar datos frescos");
      }
    };

    if (user) fetchProfile();
  }, [user]);

  // Variables de respaldo para evitar errores de carga
  const displayName = userData?.name || user?.name || "Cargando...";
  const displayEmail = userData?.email || user?.email;

  return (
    <div className="max-w-4xl mx-auto px-8 py-12 bg-white min-h-screen font-sans">
      <div className="flex justify-between items-center mb-16">
        <div>
          <h1 className="font-display text-5xl font-bold text-petDark mb-2 tracking-tight">
            Mi Perfil
          </h1>
          <p className="text-lg text-petSubtle">Tu información de cuenta</p>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-petBorder overflow-hidden shadow-sm flex flex-col relative">
        <Link
          to={`/perfil/editar`}
          className="absolute top-6 right-6 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-white/85 backdrop-blur text-petIndigo hover:opacity-80 transition-opacity z-10 shadow-sm border border-petIndigoSubtle"
        >
          <Pencil size={14} /> Editar
        </Link>

        <div className="bg-petIndigoLight/50 p-12 flex flex-col items-center justify-center border-b border-petBorder">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-petIndigoSubtle">
            <UserIcon size={48} className="text-petIndigo" strokeWidth={1.5} />
          </div>
          <h2 className="text-4xl font-bold font-display text-petDark tracking-tight text-center">
            {displayName}
          </h2>
          <p className="text-petIndigo font-bold mt-3 uppercase tracking-widest text-xs bg-white px-4 py-1.5 rounded-full border border-petIndigoLighter">
            Dueño Registrado
          </p>
        </div>

        <div className="p-12 space-y-8 bg-white">
          <div className="flex items-center gap-6 p-6 rounded-2xl border border-petBorder hover:border-petIndigoSubtle transition-colors">
            <div className="bg-petPinkLight p-4 rounded-xl text-petPinkMid">
              <Mail size={24} strokeWidth={2} />
            </div>
            <div>
              <p className="text-xs font-bold text-petIndigo uppercase tracking-widest mb-1.5">
                Correo electrónico
              </p>
              <p className="text-xl font-semibold text-petDark">
                {displayEmail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
