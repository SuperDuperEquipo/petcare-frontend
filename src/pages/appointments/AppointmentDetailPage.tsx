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
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link
        to="/citas"
        className="inline-flex items-center gap-2 text-sm text-petMuted hover:text-petIndigo transition-colors mb-9"
      >
        <ArrowLeft size={16} /> Volver al historial
      </Link>

      {loading ? (
        <Spinner />
      ) : app ? (
        <div className="bg-white rounded-3xl overflow-hidden border border-petIndigoLight shadow-sm">
          <div className="relative h-48 bg-gradient-to-br from-petIndigoLight to-petPinkLight flex items-center justify-center">
            <ClipboardList size={80} color="#D0D1F0" strokeWidth={1.2} />
            <div className="absolute top-4 right-4 flex gap-2">
              <Link
                to={`/citas/${app.id}/editar`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-white/85 backdrop-blur text-petIndigo hover:opacity-80 transition-opacity"
              >
                <Pencil size={14} /> Editar
              </Link>
              <button
                onClick={() => setShowConfirm(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-petPinkMid/80 backdrop-blur text-white hover:opacity-80 transition-opacity"
              >
                <Trash2 size={14} /> Eliminar
              </button>
            </div>
          </div>

          <div className="px-10 py-9">
            <h1 className="font-display text-3xl font-semibold text-petDark mb-2">
              {app.titulo}
            </h1>
            <span className="inline-block bg-petIndigoLight text-petIndigo text-xs font-medium px-4 py-1.5 rounded-full capitalize mb-8">
              {app.tipo}
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              <div className="bg-petCard border border-petBorder rounded-2xl p-4">
                <div className="flex items-center gap-1.5 text-petMuted text-xs font-semibold uppercase mb-2">
                  <Calendar size={13} /> Fecha
                </div>
                <p className="text-sm font-semibold text-petDark">
                  {app.fecha}
                </p>
              </div>
              <div className="bg-petCard border border-petBorder rounded-2xl p-4">
                <div className="flex items-center gap-1.5 text-petMuted text-xs font-semibold uppercase mb-2">
                  <Clock size={13} /> Hora
                </div>
                <p className="text-sm font-semibold text-petDark">{app.hora}</p>
              </div>
              <div className="bg-petCard border border-petBorder rounded-2xl p-4">
                <div className="flex items-center gap-1.5 text-petMuted text-xs font-semibold uppercase mb-2">
                  <PawPrint size={13} /> Mascota ID
                </div>
                <p className="text-sm font-semibold text-petDark">
                  #{app.id_mascota}
                </p>
              </div>
            </div>

            <div className="border-t border-petIndigoLight pt-8">
              <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold text-petDark mb-4">
                <Tag size={20} color="#8A8CDB" /> Notas de la cita
              </h2>
              <div className="bg-petCard border border-dashed border-petIndigoSubtle rounded-2xl p-7 text-sm text-petDark italic">
                {app.descripcion || "No hay descripción adicional."}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-petMuted">Cita no encontrada.</p>
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
