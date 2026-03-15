import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Save,
  ClipboardList,
  Tag,
  PawPrint,
  FileText,
} from "lucide-react";
import {
  getAppointment,
  createAppointment,
  updateAppointment,
} from "../../api/appointmentService";
import { getPets } from "../../api/petService";
import type { Pet } from "../../types";

import Spinner from "../../componentes/Spinner/Spinner";
import Toast from "../../componentes/Toast/Toast";

export default function AppointmentFormPage() {
  const { id } = useParams<{ id?: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [pets, setPets] = useState<Pet[]>([]);
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
  } = useForm<any>();

  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);
        const petsData = await getPets();
        setPets(petsData);

        if (isEditing && id) {
          const app = await getAppointment(Number(id));
          reset({
            titulo: app.titulo,
            fecha: app.fecha,
            hora: app.hora,
            tipo: app.tipo,
            id_mascota: app.id_mascota,
            descripcion: app.descripcion,
          });
        }
      } catch (err) {
        setToast({ message: "Error al cargar los datos", type: "error" });
      } finally {
        setLoading(false);
      }
    }

    loadInitialData();
  }, [id, isEditing, reset]);

  async function onSubmit(data: any) {
    setSaving(true);
    const payload = {
      title: data.titulo,
      date: data.fecha,
      time: data.hora,
      type: data.tipo,
      description: data.descripcion,
      pet_id: Number(data.id_mascota),
    };

    try {
      if (isEditing && id) {
        await updateAppointment(Number(id), payload);
        setToast({ message: "Cita actualizada con éxito", type: "success" });
      } else {
        await createAppointment(payload);
        setToast({ message: "¡Cita agendada!", type: "success" });
      }
      setTimeout(() => navigate("/citas"), 1200);
    } catch {
      setToast({ message: "Error al guardar la cita", type: "error" });
    } finally {
      setSaving(false);
    }
  }

  const inputBase =
    "w-full px-4 py-3 border border-petIndigoLighter rounded-xl text-sm text-petDark bg-petCard outline-none transition focus:border-petIndigo focus:ring-2 focus:ring-petIndigo/10 focus:bg-white appearance-none";
  const labelBase =
    "flex items-center gap-1.5 text-xs font-semibold text-petIndigo uppercase tracking-wider mb-2";

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Link
        to="/citas"
        className="inline-flex items-center gap-2 text-sm text-petMuted hover:text-petIndigo transition-colors mb-9"
      >
        <ArrowLeft size={16} />{" "}
        {isEditing ? "Volver al detalle" : "Volver al historial"}
      </Link>

      <div className="mb-9 flex items-center gap-3">
        <ClipboardList size={32} className="text-petIndigo" strokeWidth={1.5} />
        <div>
          <h1 className="font-display text-3xl font-semibold text-petDark tracking-tight">
            {isEditing ? "Editar cita" : "Agendar nueva cita"}
          </h1>
          <p className="text-sm text-petMuted">
            Organiza las visitas médicas de tus mejores amigos
          </p>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-white rounded-[2.5rem] p-10 border border-petIndigoLight shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelBase}>
                  <Tag size={14} /> Título de la cita
                </label>
                <input
                  className={inputBase}
                  {...register("titulo", { required: true })}
                  placeholder="Ej. Control de Vacunas"
                />
              </div>
              <div>
                <label className={labelBase}>
                  <ClipboardList size={14} /> Tipo de servicio
                </label>
                <select
                  className={inputBase}
                  {...register("tipo", { required: true })}
                >
                  <option value="">Seleccionar...</option>
                  <option value="Medica">Consulta Médica</option>
                  <option value="Estetica">Estética / Baño</option>
                  <option value="Urgencia">Urgencia</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={labelBase}>
                  <PawPrint size={14} /> Mascota
                </label>
                <select
                  className={inputBase}
                  {...register("id_mascota", { required: true })}
                >
                  <option value="">¿Quién viene?</option>
                  {pets.map((pet) => (
                    <option key={pet.id} value={pet.id}>
                      {pet.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelBase}>
                  <Calendar size={14} /> Fecha
                </label>
                <input
                  type="date"
                  className={inputBase}
                  {...register("fecha", { required: true })}
                />
              </div>
              <div>
                <label className={labelBase}>
                  <Clock size={14} /> Hora
                </label>
                <input
                  type="time"
                  className={inputBase}
                  {...register("hora", { required: true })}
                />
              </div>
            </div>

            <div>
              <label className={labelBase}>
                <FileText size={14} /> Descripción detallada
              </label>
              <textarea
                className={`${inputBase} resize-none`}
                rows={4}
                {...register("descripcion")}
                placeholder="Notas adicionales para el doctor..."
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={saving}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 rounded-2xl font-bold bg-gradient-to-br from-petIndigo to-petIndigoDark text-white shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all disabled:opacity-50"
              >
                <Save size={18} />
                {saving
                  ? "Guardando..."
                  : isEditing
                    ? "Guardar Cambios"
                    : "Confirmar Cita"}
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
