import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Save, ArrowLeft, User, BadgeInfo, Mail } from "lucide-react";
import axiosClient from "../../api/axiosClient";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../../componentes/Spinner/Spinner";
import Toast from "../../componentes/Toast/Toast";

export default function ProfileFormPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: "",
      email: "",
    },
  });

  useEffect(() => {
    const fetchMyData = async () => {
      try {
        setLoading(true);
        const { data } = await axiosClient.get("/auth/profile");

        reset({
          nombre: data.user?.name || user?.name || "",
          email: data.user?.email || user?.email || "",
        });
      } catch (error) {
        setToast({ message: "Error al cargar datos", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchMyData();
  }, [user?.id, user?.name, reset]);

  const onSubmit = async (formData: any) => {
    setSaving(true);
    const payload = {
      name: formData.nombre,
      email: formData.email,
    };

    try {
      await axiosClient.put("/auth/profile", payload);
      setToast({
        message: "Perfil actualizado correctamente",
        type: "success",
      });
      setTimeout(() => navigate("/perfil"), 1200);
    } catch (error) {
      setToast({ message: "Error al guardar cambios", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const inputBase =
    "w-full px-4 py-3 border border-petIndigoLighter rounded-xl text-sm text-petDark bg-petCard outline-none transition focus:border-petIndigo focus:ring-2 focus:ring-petIndigo/10 focus:bg-white";
  const inputError =
    "border-petPink focus:border-petPink focus:ring-petPink/10";
  const labelBase =
    "flex items-center gap-1.5 text-xs font-semibold text-petIndigo uppercase tracking-wider mb-2";

  return (
    <div className="max-w-xl mx-auto px-6 py-12 font-sans bg-white min-h-screen">
      {/* NAVEGACIÓN */}
      <Link
        to="/perfil"
        className="inline-flex items-center gap-2 text-sm text-petMuted hover:text-petIndigo transition-colors mb-9"
      >
        <ArrowLeft size={16} /> Volver a mi perfil
      </Link>

      {/* ENCABEZADO */}
      <div className="mb-9">
        <div className="flex items-center gap-3 mb-1.5">
          <User size={28} color="#D0D1F0" strokeWidth={1.5} />
          <h1 className="font-display text-3xl font-semibold text-petDark tracking-tight">
            Actualizar Perfil
          </h1>
        </div>
        <p className="text-sm text-petMuted ml-10">
          Mantén tu información de contacto al día para la clínica.
        </p>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-white rounded-2xl p-9 border border-petIndigoLight shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* -- SECCIÓN: INFORMACIÓN PERSONAL -- */}
            <p className="text-xs font-semibold text-petSubtle uppercase tracking-widest mb-5">
              Información Personal
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <div className="md:col-span-2">
                <label className={labelBase}>
                  <BadgeInfo size={13} /> Nombre Completo{" "}
                  <span className="text-petPink">*</span>
                </label>
                <input
                  className={`${inputBase} ${errors.nombre ? inputError : ""}`}
                  placeholder="Ej. Juan Pérez"
                  {...register("nombre", {
                    required: "El nombre es obligatorio",
                  })}
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelBase}>
                  <Mail size={13} /> Correo electrónico{" "}
                  <span className="text-petPink">*</span>
                </label>
                <input
                  className={`${inputBase} ${errors.email ? inputError : ""}`}
                  placeholder="Ej. juan@example.com"
                  {...register("email", {
                    required: "El correo es obligatorio",
                  })}
                />
              </div>
            </div>

            <hr className="border-petIndigoLight my-7" />

            {/* -- BOTONES DE ACCIÓN -- */}
            <div className="flex gap-3">
              <Link
                to="/perfil"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium border border-petIndigoLighter text-petMuted hover:border-petIndigo hover:text-petIndigo transition-colors"
              >
                <ArrowLeft size={15} /> Cancelar
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-br from-petIndigo to-petIndigoDark text-white shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Save size={16} />
                {saving ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
          </form>
        </div>
      )}

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
