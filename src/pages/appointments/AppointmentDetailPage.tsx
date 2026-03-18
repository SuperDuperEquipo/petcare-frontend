import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Calendar,
  Clock,
  ClipboardList,
  Tag,
  PawPrint,
} from "lucide-react";
import {
  getAppointment,
  deleteAppointment,
} from "../../api/appointmentService";
import type { Appointment } from "../../api/appointmentService";
import Spinner from "../../componentes/Spinner/Spinner";
import Toast from "../../componentes/Toast/Toast";
import ConfirmModal from "../../componentes/ConfirmModal/ConfirmModal";

export default function AppointmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [app, setApp] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    if (!id) return;
    getAppointment(Number(id))
      .then(setApp)
      .catch(() =>
        setToast({ message: "No se pudo cargar la cita", type: "error" }),
      )
      .finally(() => setLoading(false));
  }, [id]);

  async function handleDelete() {
    if (!id) return;
    try {
      await deleteAppointment(Number(id));
      setToast({ message: "Cita eliminada", type: "success" });
      setTimeout(() => navigate("/citas"), 1200);
    } catch {
      setToast({ message: "Error al eliminar", type: "error" });
    }
    setShowConfirm(false);
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 font-sans">
      <Link
        to="/citas"
        className="inline-flex items-center gap-2 text-sm font-semibold text-petMuted hover:text-petPink transition-colors mb-9"
      >
        <ArrowLeft size={16} /> Volver al historial
      </Link>

      {loading ? (
        <Spinner />
      ) : app ? (
        <div className="bg-white rounded-3xl overflow-hidden border border-petBorder shadow-sm">
          {/* Banner Superior */}
          <div className="relative h-48 bg-gradient-to-r from-petIndigo to-petIndigoDark flex items-center justify-center">
            <ClipboardList
              size={80}
              className="text-petIndigoLight opacity-20"
              strokeWidth={1.5}
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <Link
                to={`/citas/${app.id}/editar`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-white text-petIndigo hover:bg-petIndigoLight transition-colors shadow-sm"
              >
                <Pencil size={14} /> Editar
              </Link>
              <button
                onClick={() => setShowConfirm(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-petPink text-white hover:bg-petPinkDark transition-colors shadow-sm"
              >
                <Trash2 size={14} /> Eliminar
              </button>
            </div>
          </div>

          <div className="px-10 py-9">
            <h1 className="font-display text-4xl font-semibold text-petDark mb-3">
              {app.titulo}
            </h1>
            <span className="inline-block bg-petPinkLight text-petPinkDark border border-petPinkLighter text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-8">
              Servicio: {app.tipo}
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              <div className="bg-petCard border border-petBorder rounded-2xl p-5 hover:border-petIndigoSubtle transition-colors">
                <div className="flex items-center gap-2 text-petIndigo text-xs font-bold uppercase mb-2">
                  <Calendar size={14} /> Fecha
                </div>
                <p className="text-base font-bold text-petDark">{app.fecha}</p>
              </div>
              <div className="bg-petCard border border-petBorder rounded-2xl p-5 hover:border-petIndigoSubtle transition-colors">
                <div className="flex items-center gap-2 text-petPink text-xs font-bold uppercase mb-2">
                  <Clock size={14} /> Hora
                </div>
                <p className="text-base font-bold text-petDark">{app.hora}</p>
              </div>
              <div className="bg-petCard border border-petBorder rounded-2xl p-5 hover:border-petIndigoSubtle transition-colors">
                <div className="flex items-center gap-2 text-petIndigo text-xs font-bold uppercase mb-2">
                  <PawPrint size={14} />
                  "Mascota ID"
                </div>
                <p className="text-base font-bold text-petDark">
                  #{app.id_mascota}
                </p>
              </div>
            </div>

            <div className="border-t border-petBorder pt-8">
              <h2 className="flex items-center gap-2.5 font-sans text-lg font-bold text-petIndigo mb-4 uppercase tracking-wide">
                <Tag size={18} /> Notas de la cita
              </h2>
              <div className="bg-petIndigoLight rounded-2xl p-7 text-sm text-petDark border border-petIndigoSubtle">
                {app.descripcion ? (
                  <p className="leading-relaxed">{app.descripcion}</p>
                ) : (
                  <p className="italic text-petMuted">
                    No se agregaron notas adicionales al agendar esta cita.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-petMuted text-center py-10">Cita no encontrada.</p>
      )}

      <ConfirmModal
        isOpen={showConfirm}
        title="Eliminar cita"
        message={`¿Seguro que deseas eliminar la cita "${app?.titulo}"?`}
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(false)}
      />
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
