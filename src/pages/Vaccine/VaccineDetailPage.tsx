import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getVaccine } from '../../api/vaccineService'
import type { Vaccine } from '../../api/vaccineService'
import Spinner from '../../componentes/Spinner/Spinner'
import Toast from '../../componentes/Toast/Toast'

function formatDate(dateStr?: string | null) {
  if (!dateStr) return null
  return new Date(dateStr).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function VaccineDetailPage() {
  const { id, vaccineId } = useParams<{ id: string; vaccineId: string }>()
  const [vaccine, setVaccine] = useState<Vaccine | null>(null)
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    setLoading(true)
    if (!vaccineId) return
    getVaccine(Number(vaccineId))
      .then(setVaccine)
      .catch(() => setToast({ message: 'No se pudo cargar la vacuna', type: 'error' }))
      .finally(() => setLoading(false))
  }, [vaccineId])

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">

      <Link
        to={`/mascotas/${id}`}
        className="inline-flex items-center gap-2 text-sm text-petMuted hover:text-petIndigo transition-colors mb-9"
      >
        <ArrowLeft size={16} /> Volver al detalle de mascota
      </Link>

      {loading ? (
        <Spinner />
      ) : vaccine ? (
        <div className="bg-white rounded-3xl overflow-hidden border border-petIndigoLight shadow-sm">
          <div className="px-10 py-9">
            <h1 className="font-display text-3xl font-semibold text-petDark mb-8">
              {vaccine.name}
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-petCard border border-petBorder rounded-2xl p-4">
                <p className="text-petMuted text-xs font-semibold uppercase tracking-wider mb-2">Fecha de aplicación</p>
                <p className="text-sm font-semibold text-petDark">{formatDate(vaccine.date_applied)}</p>
              </div>
              {vaccine.next_dose && (
                <div className="bg-petCard border border-petBorder rounded-2xl p-4">
                  <p className="text-petMuted text-xs font-semibold uppercase tracking-wider mb-2">Próxima dosis</p>
                  <p className="text-sm font-semibold text-petDark">{formatDate(vaccine.next_dose)}</p>
                </div>
              )}
              <div className="bg-petCard border border-petBorder rounded-2xl p-4">
                <p className="text-petMuted text-xs font-semibold uppercase tracking-wider mb-2">Veterinario</p>
                <p className="text-sm font-semibold text-petDark">{vaccine.vet}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-petMuted">Vacuna no encontrada.</p>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}