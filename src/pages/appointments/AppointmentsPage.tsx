import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  Plus,
  Eye,
  Trash2,
  ClipboardList,
  Pencil,
} from "lucide-react";
import {
  getAppointments,
  deleteAppointment,
  type Appointment,
} from "../../api/appointmentService";
import Spinner from "../../componentes/Spinner/Spinner";
import Toast from "../../componentes/Toast/Toast";
import ConfirmModal from "../../componentes/ConfirmModal/ConfirmModal";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    fetchCitas();
  }, []);

  async function fetchCitas() {
    try {
      setLoading(true);
      const data = await getAppointments();
      setAppointments(data);
    } catch {
      setToast({ message: "Error al cargar las citas", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (deleteId == null) return;
    try {
      await deleteAppointment(deleteId);
      setAppointments((prev) => prev.filter((a) => a.id !== deleteId));
      setToast({ message: "Cita eliminada correctamente", type: "success" });
    } catch {
      setToast({ message: "Error al eliminar la cita", type: "error" });
    } finally {
      setDeleteId(null);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 font-sans">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="font-display text-4xl font-semibold text-petDark tracking-tight mb-1">
            Mis Citas
          </h1>
          <p className="text-sm text-petMuted">
            Tienes {appointments.length}
            {appointments.length === 1
              ? " cita programada"
              : " citas programadas"}
          </p>
        </div>

        <Link
          to="/citas/nueva"
          className="inline-flex items-center gap-2 bg-gradient-to-br from-petIndigo to-petIndigoDark text-white px-6 py-3 rounded-xl text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <Plus size={18} strokeWidth={2.5} /> Nueva cita
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : appointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 ">
          <Calendar
            size={64}
            className="text-petIndigoSubtle mb-5"
            strokeWidth={1.5}
          />
          <h2 className="font-display text-2xl font-semibold text-petDark mb-2">
            No hay citas agendadas
          </h2>
          <p className="text-sm text-petMuted">
            "Agrega una nueva cita para comenzar."
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-2xl overflow-hidden border border-petBorder shadow-sm hover:-translate-y-1 hover:border-petIndigoSubtle transition-all duration-200"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-white p-3 rounded-xl">
                    <ClipboardList className="text-petIndigo" size={24} />
                  </div>
                  <span className="bg-petPinkLight text-petPinkDark text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {app.tipo}
                  </span>
                </div>

                <h2 className="font-display text-lg font-semibold text-petDark mb-1">
                  {app.titulo}
                </h2>

                <p className="text-xs text-petMuted mb-4 flex items-center gap-1">
                  Mascota ID: #{app.id_mascota}
                </p>

                <div className="space-y-2 mb-6 bg-petCard p-3 rounded-lg border border-petBorder">
                  <div className="flex items-center gap-2 text-sm text-petDark font-medium">
                    <Calendar size={14} className="text-petIndigo" />{" "}
                    {app.fecha}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-petDark font-medium">
                    <Clock size={14} className="text-petPink" /> {app.hora}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-3 border-t border-petIndigoLight">
                  <Link
                    to={`/citas/${app.id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium bg-petIndigoLight text-petIndigo hover:bg-petIndigoLighter transition-colors"
                  >
                    <Eye size={14} /> Ver
                  </Link>
                  <Link
                    to={`/citas/${app.id}/editar`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium bg-petPinkLight text-petPink hover:bg-petPinkLighter transition-colors"
                  >
                    <Pencil size={14} /> Editar
                  </Link>
                  <button
                    onClick={() => setDeleteId(app.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium border border-petPinkLighter text-petPinkMid hover:bg-petPinkLight transition-colors"
                  >
                    <Trash2 size={14} /> Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <ConfirmModal
        isOpen={deleteId !== null}
        title="Eliminar cita"
        message="¿Estás seguro de que deseas cancelar esta cita? Esta acción no se puede deshacer."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
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
