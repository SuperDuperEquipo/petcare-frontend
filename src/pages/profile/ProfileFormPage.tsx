import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Save, ArrowLeft } from "lucide-react";
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

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      nombre: "",
      telefono: "",
      direccion: "",
    },
  });

  useEffect(() => {
    const fetchMyData = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        const { data } = await axiosClient.get("/owners");
        const lista = data.dueños || [];
        const myData = lista.find(
          (o: any) => String(o.user_id) === String(user.id),
        );

        if (myData) {
          setOwnerId(myData.id);

          const valuesToReset = {
            nombre: myData.nombre || "",
            telefono: myData.contacto || "",
            direccion: myData.dirección || "",
          };

          console.log("Cargando datos en el form:", valuesToReset);
          reset(valuesToReset);
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
        setToast({ message: "Error al cargar datos", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    if (isEditing) {
      fetchMyData();
    }
  }, [isEditing, user?.id, reset]);

  const onSubmit = async (formData: any) => {
    setSaving(true);
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
      setToast({ message: "Guardado correctamente", type: "success" });
      setTimeout(() => navigate("/perfil"), 1500);
    } catch (error) {
      setToast({ message: "Error al guardar cambios", type: "error" });
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

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <Link
        to="/perfil"
        className="flex items-center gap-2 text-petMuted mb-6 hover:text-petIndigo"
      >
        <ArrowLeft size={18} /> Volver al perfil
      </Link>

      <div className="bg-white rounded-[2.5rem] border border-petIndigoLight p-10 shadow-sm">
        <h1 className="text-3xl font-bold text-petDark mb-8">
          {isEditing ? "Editar Perfil" : "Crear Perfil"}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="text-[10px] font-bold text-petIndigo uppercase mb-2 block tracking-widest">
              Nombre completo
            </label>
            <input
              {...register("nombre", { required: true })}
              className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:border-petIndigo"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-petIndigo uppercase mb-2 block tracking-widest">
              Teléfono de contacto
            </label>
            <input
              {...register("telefono", { required: true })}
              className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:border-petIndigo"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-petIndigo uppercase mb-2 block tracking-widest">
              Dirección
            </label>
            <textarea
              {...register("direccion", { required: true })}
              rows={3}
              className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:border-petIndigo resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-5 bg-petIndigo text-white rounded-2xl font-bold flex justify-center items-center gap-2 shadow-lg transition-all hover:opacity-90"
          >
            {saving ? (
              <Spinner />
            ) : (
              <>
                <Save size={20} /> Guardar Cambios
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
