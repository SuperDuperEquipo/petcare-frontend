import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User, Phone, MapPin, Edit3, PlusCircle } from "lucide-react";
import axiosClient from "../../api/axiosClient";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../../componentes/Spinner/Spinner";

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const findMyProfile = async () => {
      try {
        setLoading(true);
        const { data } = await axiosClient.get("/owners");

        const lista = data.dueños || [];

        const myData = lista.find(
          (o: any) => String(o.user_id) === String(user?.id),
        );

        if (myData) {
          setProfile({
            id: myData.id,
            nombre: myData.nombre,
            telefono: myData.contacto,
            direccion: myData.dirección,
          });
        }
      } catch (error) {
        console.error("Error al obtener perfil:", error);
      } finally {
        setLoading(false);
      }
    };
    if (user?.id) {
      findMyProfile();
    }
  }, [user]);

  if (loading)
    return (
      <div className="py-20 text-center">
        <Spinner />
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="font-display text-4xl font-semibold text-petDark mb-1">
            Mi Perfil
          </h1>
          <p className="text-sm text-petMuted">
            Gestiona tu información de contacto
          </p>
        </div>
        {profile && (
          <Link
            to="/perfil/editar"
            className="flex items-center gap-2 bg-white border border-petIndigoLight text-petIndigo px-6 py-3 rounded-xl font-bold hover:bg-petIndigoLight/10 transition-all shadow-sm"
          >
            <Edit3 size={18} /> Editar Perfil
          </Link>
        )}
      </div>

      {!profile ? (
        <div className="bg-white rounded-[2.5rem] p-16 border-2 border-dashed border-petIndigoLight text-center">
          <div className="bg-petIndigoLighter/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <User size={40} className="text-petIndigo" />
          </div>
          <h2 className="text-2xl font-bold text-petDark mb-3">¡Bienvenido!</h2>
          <p className="text-petMuted mb-10 max-w-sm mx-auto">
            Aún no has completado tus datos de dueño. Regístrate para poder
            gestionar tus mascotas.
          </p>
          <Link
            to="/perfil/nuevo"
            className="inline-flex items-center gap-2 bg-petIndigo text-white px-10 py-4 rounded-2xl font-bold shadow-lg hover:opacity-90 transition-all"
          >
            <PlusCircle size={20} /> Crear mi Perfil
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-petIndigoLight overflow-hidden shadow-sm">
          <div className="bg-gradient-to-r from-petIndigo to-petIndigoDark p-12 text-white">
            <h2 className="text-4xl font-bold font-display">
              {profile.nombre || profile.name}
            </h2>
            <p className="text-petIndigoLighter font-medium mt-2 uppercase tracking-widest text-xs">
              Dueño de Mascota Registrado
            </p>
          </div>
          <div className="p-12 space-y-10">
            <div className="flex items-start gap-6">
              <div className="bg-petPinkLight p-4 rounded-2xl text-petPink">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-petIndigo uppercase tracking-[0.2em] mb-1">
                  Teléfono de contacto
                </p>
                <p className="text-xl font-semibold text-petDark">
                  {profile.telefono || profile.phone}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="bg-petIndigoLighter/30 p-4 rounded-2xl text-petIndigo">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-petIndigo uppercase tracking-[0.2em] mb-1">
                  Dirección residencial
                </p>
                <p className="text-xl font-semibold text-petDark leading-relaxed">
                  {profile.direccion || profile.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
