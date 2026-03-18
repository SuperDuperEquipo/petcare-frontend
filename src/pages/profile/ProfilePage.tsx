import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User, Phone, MapPin, Edit3 } from "lucide-react";
import axiosClient from "../../api/axiosClient";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../../componentes/Spinner/Spinner";

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data } = await axiosClient.get("/owners");
        const lista = data.dueños || [];
        const myData = lista.find(
          (o: any) => String(o.user_id) === String(user?.id),
        );

        setProfile({
          nombre: myData?.nombre || user?.name || "Dueño de Mascota",
          telefono: myData?.contacto || "No registrado",
          direccion: myData?.dirección || "No registrada",
        });
      } catch (error) {
        console.error("Error al obtener perfil:", error);

        setProfile({
          nombre: user?.name || "Dueño de Mascota",
          telefono: "No registrado",
          direccion: "No registrada",
        });
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchProfile();
  }, [user]);

  if (loading)
    return (
      <div className="py-20 text-center flex justify-center items-center min-h-[50vh]">
        <Spinner />
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-8 py-12 bg-white min-h-screen font-sans">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-16">
        <div>
          <h1 className="font-display text-5xl font-bold text-petDark mb-2 tracking-tight">
            Mi Perfil
          </h1>
          <p className="text-lg text-petSubtle">
            Gestiona tu información de contacto
          </p>
        </div>
        <Link
          to="/perfil/editar"
          className="inline-flex items-center gap-2 bg-white border border-petIndigoLight text-petIndigo px-6 py-3.5 rounded-xl text-sm font-semibold hover:bg-petIndigoLight hover:border-petIndigoSubtle transition-all shadow-sm"
        >
          <Edit3 size={18} strokeWidth={2.5} /> Editar Perfil
        </Link>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-white rounded-[2rem] border border-petBorder overflow-hidden shadow-sm flex flex-col">
        {/* PROFILE CARD HEADER */}
        <div className="bg-petIndigoLight/50 p-12 flex flex-col items-center justify-center border-b border-petBorder">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-petIndigoSubtle">
            <User size={48} className="text-petIndigo" strokeWidth={1.5} />
          </div>
          <h2 className="text-4xl font-bold font-display text-petDark tracking-tight">
            {profile?.nombre}
          </h2>
          <p className="text-petIndigo font-bold mt-3 uppercase tracking-widest text-xs bg-white px-4 py-1.5 rounded-full border border-petIndigoLighter">
            Dueño Registrado
          </p>
        </div>

        {/* PROFILE CARD BODY */}
        <div className="p-12 space-y-8 bg-white">
          {/* INFO ROW: PHONE */}
          <div className="flex items-center gap-6 p-6 rounded-2xl border border-petBorder hover:border-petIndigoSubtle transition-colors">
            <div className="bg-petPinkLight p-4 rounded-xl text-petPinkMid">
              <Phone size={24} strokeWidth={2} />
            </div>
            <div>
              <p className="text-xs font-bold text-petIndigo uppercase tracking-widest mb-1.5">
                Teléfono de contacto
              </p>
              <p
                className={`text-xl font-semibold ${profile?.telefono === "No registrado" ? "text-petMuted italic" : "text-petDark"}`}
              >
                {profile?.telefono}
              </p>
            </div>
          </div>

          {/* INFO ROW: ADDRESS */}
          <div className="flex items-center gap-6 p-6 rounded-2xl border border-petBorder hover:border-petIndigoSubtle transition-colors">
            <div className="bg-petIndigoLight p-4 rounded-xl text-petIndigo">
              <MapPin size={24} strokeWidth={2} />
            </div>
            <div>
              <p className="text-xs font-bold text-petIndigo uppercase tracking-widest mb-1.5">
                Dirección residencial
              </p>
              <p
                className={`text-xl font-semibold leading-relaxed ${profile?.direccion === "No registrada" ? "text-petMuted italic" : "text-petDark"}`}
              >
                {profile?.direccion}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
