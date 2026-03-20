import { User, Mail, ShieldCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto px-8 py-12 bg-white min-h-screen font-sans">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-16">
        <div>
          <h1 className="font-display text-5xl font-bold text-petDark mb-2 tracking-tight">
            Mi Perfil
          </h1>
          <p className="text-lg text-petSubtle">
            Tu información de cuenta
          </p>
        </div>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-white rounded-[2rem] border border-petBorder overflow-hidden shadow-sm flex flex-col">
        {/* PROFILE CARD HEADER */}
        <div className="bg-petIndigoLight/50 p-12 flex flex-col items-center justify-center border-b border-petBorder">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-petIndigoSubtle">
            <User size={48} className="text-petIndigo" strokeWidth={1.5} />
          </div>
          <h2 className="text-4xl font-bold font-display text-petDark tracking-tight">
            {user?.name}
          </h2>
          <p className="text-petIndigo font-bold mt-3 uppercase tracking-widest text-xs bg-white px-4 py-1.5 rounded-full border border-petIndigoLighter">
            Dueño Registrado
          </p>
        </div>

        {/* PROFILE CARD BODY */}
        <div className="p-12 space-y-8 bg-white">
          {/* INFO ROW: EMAIL */}
          <div className="flex items-center gap-6 p-6 rounded-2xl border border-petBorder hover:border-petIndigoSubtle transition-colors">
            <div className="bg-petPinkLight p-4 rounded-xl text-petPinkMid">
              <Mail size={24} strokeWidth={2} />
            </div>
            <div>
              <p className="text-xs font-bold text-petIndigo uppercase tracking-widest mb-1.5">
                Correo electrónico
              </p>
              <p className="text-xl font-semibold text-petDark">
                {user?.email}
              </p>
            </div>
          </div>

          {/* INFO ROW: ROLE */}
          <div className="flex items-center gap-6 p-6 rounded-2xl border border-petBorder hover:border-petIndigoSubtle transition-colors">
            <div className="bg-petIndigoLight p-4 rounded-xl text-petIndigo">
              <ShieldCheck size={24} strokeWidth={2} />
            </div>
            <div>
              <p className="text-xs font-bold text-petIndigo uppercase tracking-widest mb-1.5">
                Rol
              </p>
              <p className="text-xl font-semibold text-petDark capitalize">
                {user?.role === "admin" ? "Administrador" : "Usuario"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
