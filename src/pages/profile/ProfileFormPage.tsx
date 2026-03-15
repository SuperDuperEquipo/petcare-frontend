import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowLeft, Save } from "lucide-react";
import axiosClient from "../../api/axiosClient";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../../componentes/Spinner/Spinner";
import Toast from "../../componentes/Toast/Toast";

export default function ProfileFormPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const isEditing = location.pathname.includes("editar");
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [ownerId, setOwnerId] = useState<number | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchMyData = async () => {
      try {
        const { data } = await axiosClient.get("/owners");
        const myData = data.find((o: any) => o.user_id === user?.id);

        if (myData) {
          setOwnerId(myData.id);
          reset({
            nombre: myData.nombre || myData.name,
            telefono: myData.telefono || myData.phone,
            direccion: myData.direccion || myData.address,
          });
        }
      } catch (error) {
        setToast({ message: "Error al cargar datos", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    if (isEditing && user?.id) {
      fetchMyData();
    }
  }, [isEditing, user, reset]);

  const onSubmit = async (formData: any) => {
    setSaving(true);
    // IMPORTANTE: Enviamos al backend con los nombres de columna en inglés
    const payload = {
      name: formData.nombre,
      phone: formData.telefono,
      address: formData.direccion,
    };

    try {
      if (isEditing && ownerId) {
        await axiosClient.put(`/owners/${ownerId}`, payload);
      } else {
        await axiosClient.post("/owners", payload);
      }
      setToast({ message: "¡Perfil guardado!", type: "success" });
      setTimeout(() => navigate("/perfil"), 1500);
    } catch (error) {
      setToast({ message: "Error al guardar los cambios", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="py-20 text-center">
        <Spinner />
      </div>
    );

  const inputClass =
    "w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:border-petIndigo transition-all font-medium";

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <Link
        to="/perfil"
        className="flex items-center gap-2 text-petMuted mb-8 hover:text-petIndigo transition-colors"
      >
        <ArrowLeft size={18} /> Volver al perfil
      </Link>

      <div className="bg-white rounded-[3rem] border border-petIndigoLight overflow-hidden shadow-sm">
        <div className="bg-petIndigo p-10 text-white">
          <h1 className="text-3xl font-bold font-display">
            {isEditing ? "Editar Perfil" : "Crear Perfil"}
          </h1>
          <p className="opacity-80 mt-1">Completa tu información de contacto</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-10 space-y-8">
          <div>
            <label className="text-[10px] font-bold text-petIndigo uppercase tracking-widest block mb-2">
              Nombre Completo
            </label>
            <input
              {...register("nombre", { required: true })}
              className={inputClass}
              placeholder="Ej. Juan Pérez"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-petIndigo uppercase tracking-widest block mb-2">
              Teléfono
            </label>
            <input
              {...register("telefono", { required: true })}
              className={inputClass}
              placeholder="+503 0000-0000"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-petIndigo uppercase tracking-widest block mb-2">
              Dirección
            </label>
            <textarea
              {...register("direccion", { required: true })}
              rows={3}
              className={`${inputClass} resize-none`}
              placeholder="Tu dirección..."
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-5 bg-petIndigo text-white rounded-[1.5rem] font-bold flex justify-center items-center gap-2 shadow-xl hover:opacity-90 transition-all"
          >
            {saving ? (
              <Spinner />
            ) : (
              <>
                <Save size={20} /> Guardar Perfil
              </>
            )}
          </button>
        </form>
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
