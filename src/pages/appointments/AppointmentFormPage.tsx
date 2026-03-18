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
  User,
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
      ...(data.propietario_id && { owner_id: Number(data.propietario_id) }),
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
    "w-full px-4 py-3 border border-petIndigoLighter rounded-xl text-sm text-petDark bg-petCard outline-none transition focus:border-petIndigo focus:ring-2 focus:ring-petIndigo/10 focus:bg-white";
  const inputError =
    "border-petPink focus:border-petPink focus:ring-petPink/10";
  const labelBase =
    "flex items-center gap-1.5 text-xs font-semibold text-petIndigo uppercase tracking-wider mb-2";

  return (
    <div className="max-w-xl mx-auto px-6 py-12 font-sans bg-white min-h-screen">
      <Link
        to={isEditing ? `/citas/${id}` : "/citas"}
        className="inline-flex items-center gap-2 text-sm text-petMuted hover:text-petIndigo transition-colors mb-9"
      >
        <ArrowLeft size={16} />{" "}
        {isEditing ? "Volver al detalle" : "Volver al calendario"}
      </Link>

      <div className="mb-9">
        <div className="flex items-center gap-3 mb-1.5">
          {/* El ícono de citas con color sutil igual al form de mascotas */}
          <ClipboardList size={28} color="#D0D1F0" strokeWidth={1.5} />
          <h1 className="font-display text-3xl font-semibold text-petDark tracking-tight">
            {isEditing ? "Editar cita" : "Nueva cita"}
          </h1>
        </div>
        <p className="text-sm text-petMuted ml-10">
          {isEditing
            ? "Modifica los detalles de la consulta."
            : "Reserva un espacio para tu mascota."}
        </p>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-white rounded-2xl p-9 border border-petIndigoLight shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* -- SECCIÓN: DATOS DE LA CITA -- */}
            <p className="text-xs font-semibold text-petSubtle uppercase tracking-widest mb-5">
              Información de la consulta
            </p>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className={labelBase}>
                  <Tag size={13} /> Título{" "}
                  <span className="text-petPink">*</span>
                </label>
                <input
                  className={`${inputBase} ${errors.titulo ? inputError : ""}`}
                  placeholder="Ej. Control anual"
                  {...register("titulo", {
                    required: "El título es obligatorio",
                  })}
                />
              </div>
              <div>
                <label className={labelBase}>
                  <ClipboardList size={13} /> Servicio{" "}
                  <span className="text-petPink">*</span>
                </label>
                <select
                  className={`${inputBase} ${errors.tipo ? inputError : ""}`}
                  {...register("tipo", {
                    required: "Selecciona el tipo de servicio",
                  })}
                >
                  <option value="">Seleccionar...</option>
                  <option value="Consulta">Consulta Médica</option>
                  <option value="Vacunacion">Vacunación</option>
                  <option value="Estetica">Estética / Baño</option>
                  <option value="Emergencia">Emergencia</option>
                </select>
              </div>
            </div>

            <div className="mb-5">
              <label className={labelBase}>
                <PawPrint size={13} /> Mascota Paciente{" "}
                <span className="text-petPink">*</span>
              </label>
              <select
                className={`${inputBase} ${errors.id_mascota ? inputError : ""}`}
                {...register("id_mascota", {
                  required: "Selecciona una mascota",
                })}
              >
                <option value="">¿Quién viene a la cita?</option>
                {pets.map((pet) => (
                  <option key={pet.id} value={pet.id}>
                    {pet.nombre}
                  </option>
                ))}
              </select>
            </div>

            <hr className="border-petIndigoLight my-7" />

            {/* -- SECCIÓN: FECHA Y HORA -- */}
            <p className="text-xs font-semibold text-petSubtle uppercase tracking-widest mb-5">
              Programación
            </p>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className={labelBase}>
                  <Calendar size={13} /> Fecha{" "}
                  <span className="text-petPink">*</span>
                </label>
                <input
                  type="date"
                  className={`${inputBase} ${errors.fecha ? inputError : ""}`}
                  {...register("fecha", {
                    required: "La fecha es obligatoria",
                  })}
                />
              </div>
              <div>
                <label className={labelBase}>
                  <Clock size={13} /> Hora{" "}
                  <span className="text-petPink">*</span>
                </label>
                <input
                  type="time"
                  className={`${inputBase} ${errors.hora ? inputError : ""}`}
                  {...register("hora", { required: "La hora es obligatoria" })}
                />
              </div>
            </div>

            <div className="mb-7">
              <label className={labelBase}>
                <FileText size={13} /> Motivo / Detalles
              </label>
              <textarea
                className={`${inputBase} resize-none`}
                rows={3}
                placeholder="Escribe aquí si hay síntomas específicos, dudas, etc."
                {...register("descripcion")}
              />
            </div>

            {/* -- BOTONES DE ACCIÓN -- */}
            <div className="flex gap-3">
              <Link
                to={isEditing ? `/citas/${id}` : "/citas"}
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
                {saving
                  ? "Guardando..."
                  : isEditing
                    ? "Guardar cambios"
                    : "Agendar cita"}
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
