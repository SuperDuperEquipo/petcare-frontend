import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  getVaccine,
  createVaccine,
  updateVaccine,
} from "../../api/vaccineService";
import Spinner from "../../componentes/Spinner/Spinner";
import Toast from "../../componentes/Toast/Toast";

interface FormState {
  name: string;
  vet: string;
  date_applied: string;
  next_dose: string;
}

const today = new Date().toISOString().split("T")[0];

const EMPTY: FormState = {
  name: "",
  vet: "",
  date_applied: today,
  next_dose: "",
};

export default function VaccineFormPage() {
  const { id, vaccineId } = useParams<{ id: string; vaccineId?: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(vaccineId);

  const [form, setForm] = useState<FormState>(EMPTY);
  const [fetching, setFetching] = useState(isEditing);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    if (!isEditing || !vaccineId) return;
    setFetching(true);
    getVaccine(Number(vaccineId))
      .then((v) =>
        setForm({
          name: v.name,
          vet: v.vet,
          date_applied: v.date_applied ?? today,
          next_dose: v.next_dose ?? "",
        }),
      )
      .catch(() =>
        setToast({ message: "No se pudo cargar la vacuna", type: "error" }),
      )
      .finally(() => setFetching(false));
  }, [isEditing, vaccineId]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: form.name.trim(),
      vet: form.vet.trim(),
      date_applied: form.date_applied,
      next_dose: form.next_dose || null,
    };

    try {
      if (isEditing && vaccineId) {
        await updateVaccine(Number(vaccineId), payload);
        setToast({ message: "Vacuna actualizada", type: "success" });
      } else {
        await createVaccine(Number(id), payload);
        setToast({ message: "Vacuna registrada", type: "success" });
      }
      setTimeout(() => navigate(`/mascotas/${id}`), 1000);
    } catch {
      setToast({ message: "Error al guardar la vacuna", type: "error" });
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <Link
        to={`/mascotas/${id}`}
        className="inline-flex items-center gap-2 text-sm text-petMuted hover:text-petIndigo transition-colors mb-9"
      >
        <ArrowLeft size={16} /> Volver al detalle de mascota
      </Link>

      <h1 className="font-display text-3xl font-semibold text-petDark mb-1">
        {isEditing ? "Editar vacuna" : "Agregar vacuna"}
      </h1>
      <p className="text-sm text-petMuted mb-9">
        {isEditing
          ? "Modifica los datos de la vacuna registrada."
          : "Registra una nueva vacuna para esta mascota."}
      </p>

      {fetching ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-petIndigoLight rounded-3xl px-8 py-9 space-y-6 shadow-sm"
        >
          {/* Nombre */}
          <div>
            <label className="block text-xs font-semibold text-petMuted uppercase tracking-wider mb-1.5">
              Nombre de la vacuna *
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Ej. Antirrábica, Parvovirus..."
              className="w-full px-4 py-2.5 rounded-xl border border-petBorder text-petDark text-sm placeholder-petSubtle focus:outline-none focus:ring-2 focus:ring-petIndigo/40 focus:border-petIndigo transition"
            />
          </div>

          {/* Veterinario */}
          <div>
            <label className="block text-xs font-semibold text-petMuted uppercase tracking-wider mb-1.5">
              Veterinario *
            </label>
            <input
              type="text"
              name="vet"
              value={form.vet}
              onChange={handleChange}
              required
              placeholder="Nombre del veterinario"
              className="w-full px-4 py-2.5 rounded-xl border border-petBorder text-petDark text-sm placeholder-petSubtle focus:outline-none focus:ring-2 focus:ring-petIndigo/40 focus:border-petIndigo transition"
            />
          </div>

          {/* Fecha aplicada */}
          <div>
            <label className="block text-xs font-semibold text-petMuted uppercase tracking-wider mb-1.5">
              Fecha aplicada *
            </label>
            <input
              type="date"
              name="date_applied"
              value={form.date_applied}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-petBorder text-petDark text-sm focus:outline-none focus:ring-2 focus:ring-petIndigo/40 focus:border-petIndigo transition"
            />
          </div>

          {/* Próxima dosis */}
          <div>
            <label className="block text-xs font-semibold text-petMuted uppercase tracking-wider mb-1.5">
              Próxima dosis{" "}
              <span className="normal-case font-normal">(opcional)</span>
            </label>
            <input
              type="date"
              name="next_dose"
              value={form.next_dose}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-petBorder text-petDark text-sm focus:outline-none focus:ring-2 focus:ring-petIndigo/40 focus:border-petIndigo transition"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(`/mascotas/${id}`)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-petBorder text-petMuted text-sm font-medium hover:bg-petCard transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl bg-petIndigo text-white text-sm font-semibold hover:opacity-85 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading
                ? "Guardando..."
                : isEditing
                  ? "Guardar cambios"
                  : "Registrar vacuna"}
            </button>
          </div>
        </form>
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
