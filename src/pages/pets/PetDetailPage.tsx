import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Pencil, Trash2, PawPrint, Syringe, Weight, Calendar, Dna } from 'lucide-react'
import { getPet, deletePet } from '../../api/petService'
import type { Pet } from '../../types'
import Spinner from '../../componentes/Spinner/Spinner'
import Toast from '../../componentes/Toast/Toast'
import ConfirmModal from '../../componentes/ConfirmModal/ConfirmModal'

function formatDate(dateStr?: string) {
  if (!dateStr) return null
  return new Date(dateStr).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
}

function calcAge(dateStr?: string) {
  if (!dateStr) return null
  const birth = new Date(dateStr)
  const now = new Date()
  const years = now.getFullYear() - birth.getFullYear()
  const months = now.getMonth() - birth.getMonth()
  if (years === 0) return `${months < 0 ? 0 : months} meses`
  return `${years} ${years === 1 ? 'año' : 'años'}`
}

export default function PetDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [pet, setPet] = useState<Pet | null>(null)
  const [loading, setLoading] = useState(true)
  const [showConfirm, setShowConfirm] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    setPet(null)
    setLoading(true)
    if (!id) return
    getPet(Number(id))
      .then(setPet)
      .catch(() => setToast({ message: 'No se pudo cargar la mascota', type: 'error' }))
      .finally(() => setLoading(false))
  }, [id])

  async function handleDelete() {
    if (!id) return
    try {
      await deletePet(Number(id))
      setToast({ message: 'Mascota eliminada', type: 'success' })
      setTimeout(() => navigate('/mascotas'), 1200)
    } catch {
      setToast({ message: 'Error al eliminar', type: 'error' })
    }
    setShowConfirm(false)
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">

      <Link
        to="/mascotas"
        className="inline-flex items-center gap-2 text-sm text-petMuted hover:text-petIndigo transition-colors mb-9"
      >
        <ArrowLeft size={16} /> Volver a mis mascotas
      </Link>

      {loading ? (
        <Spinner />
      ) : pet ? (
        <div className="bg-white rounded-3xl overflow-hidden border border-petIndigoLight shadow-sm">

          {/* Hero */}
          <div className="relative h-72 bg-gradient-to-br from-petPinkLight to-petIndigoLight flex items-center justify-center overflow-hidden">
            {pet.foto_url
              ? <img src={pet.foto_url} alt={pet.nombre} className="w-full h-full object-top" />
              : <PawPrint size={80} color="#D0D1F0" strokeWidth={1.2} />
            }
            <div className="absolute top-4 right-4 flex gap-2">
              <Link
                to={`/mascotas/${pet.id}/editar`}
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

          {/* Body */}
          <div className="px-10 py-9">
            <h1 className="font-display text-3xl font-semibold text-petDark mb-2">
              {pet.nombre}
            </h1>
            <span className="inline-block bg-petIndigoLight text-petIndigo text-xs font-medium px-4 py-1.5 rounded-full capitalize mb-8">
              {pet.especie}
            </span>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {pet.raza && (
                <div className="bg-petCard border border-petBorder rounded-2xl p-4">
                  <div className="flex items-center gap-1.5 text-petMuted text-xs font-semibold uppercase tracking-wider mb-2">
                    <Dna size={13} /> Raza
                  </div>
                  <p className="text-sm font-semibold text-petDark">{pet.raza}</p>
                </div>
              )}
              {pet.peso && (
                <div className="bg-petCard border border-petBorder rounded-2xl p-4">
                  <div className="flex items-center gap-1.5 text-petMuted text-xs font-semibold uppercase tracking-wider mb-2">
                    <Weight size={13} /> Peso
                  </div>
                  <p className="text-sm font-semibold text-petDark">{pet.peso} kg</p>
                </div>
              )}
              {pet.fecha_nacimiento && (
                <div className="bg-petCard border border-petBorder rounded-2xl p-4">
                  <div className="flex items-center gap-1.5 text-petMuted text-xs font-semibold uppercase tracking-wider mb-2">
                    <Calendar size={13} /> Edad
                  </div>
                  <p className="text-sm font-semibold text-petDark">{calcAge(pet.fecha_nacimiento)}</p>
                </div>
              )}
              {pet.fecha_nacimiento && (
                <div className="bg-petCard border border-petBorder rounded-2xl p-4">
                  <div className="flex items-center gap-1.5 text-petMuted text-xs font-semibold uppercase tracking-wider mb-2">
                    <Calendar size={13} /> Nacimiento
                  </div>
                  <p className="text-sm font-semibold text-petDark">{formatDate(pet.fecha_nacimiento)}</p>
                </div>
              )}
            </div>

            {/* Vaccines — Persona 3 integra aquí */}
            <div className="border-t border-petIndigoLight pt-8">
              <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold text-petDark mb-4">
                <Syringe size={20} color="#8A8CDB" strokeWidth={1.8} />
                Historial de vacunas
              </h2>
              <div className="bg-petCard border border-dashed border-petIndigoSubtle rounded-2xl p-7 text-center text-sm text-petSubtle">
                El historial de vacunas se cargará aquí
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-petMuted">Mascota no encontrada.</p>
      )}

      <ConfirmModal
        isOpen={showConfirm}
        title="Eliminar mascota"
        message={`¿Seguro que deseas eliminar a ${pet?.nombre}? Esta acción no se puede deshacer.`}
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(false)}
      />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}