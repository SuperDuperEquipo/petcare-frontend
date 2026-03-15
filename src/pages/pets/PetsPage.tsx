import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PawPrint, Plus, Pencil, Trash2, Eye } from 'lucide-react'
import { getPets, deletePet } from '../../api/petService'
import type { Pet } from '../../types'
import Spinner from '../../componentes/Spinner/Spinner'
import Toast from '../../componentes/Toast/Toast'
import ConfirmModal from '../../componentes/ConfirmModal/ConfirmModal'

export default function PetsPage() {
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  useEffect(() => { fetchPets() }, [])

  async function fetchPets() {
    try {
      setLoading(true)
      const data = await getPets()
      setPets(data)
    } catch {
      setToast({ message: 'Error al cargar las mascotas', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (deleteId == null) return
    try {
      await deletePet(deleteId)
      setPets(prev => prev.filter(p => p.id !== deleteId))
      setToast({ message: 'Mascota eliminada correctamente', type: 'success' })
    } catch {
      setToast({ message: 'Error al eliminar la mascota', type: 'error' })
    } finally {
      setDeleteId(null)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      {/* Header */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="font-display text-4xl font-semibold text-petDark tracking-tight mb-1">
            Mis mascotas
          </h1>
          <p className="text-sm text-petMuted">
            {pets.length} {pets.length === 1 ? 'mascota registrada' : 'mascotas registradas'}
          </p>
        </div>
        <Link
          to="/mascotas/nueva"
          className="inline-flex items-center gap-2 bg-gradient-to-br from-petIndigo to-petIndigoDark text-white px-6 py-3 rounded-xl text-sm font-medium shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all"
        >
          <Plus size={16} strokeWidth={2.5} /> Nueva mascota
        </Link>
      </div>

      {/* Content */}
      {loading ? (
        <Spinner />
      ) : pets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24">
          <PawPrint size={64} color="#E2E2F6" strokeWidth={1.5} className="mb-5" />
          <h2 className="font-display text-2xl font-semibold text-petDark mb-2">
            Aún no tienes mascotas
          </h2>
          <p className="text-sm text-petMuted">Agrega tu primera mascota para comenzar</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map(pet => (
            <div
              key={pet.id}
              className="bg-white rounded-2xl overflow-hidden border border-petIndigoLight shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200"
            >
              {/* Photo */}
              {pet.foto_url ? (
                <img src={pet.foto_url} alt={pet.nombre} className="w-full h-44 object-cover" />
              ) : (
                <div className="w-full h-44 bg-gradient-to-br from-petPinkLight to-petIndigoLight flex items-center justify-center">
                  <PawPrint size={52} color="#D0D1F0" strokeWidth={1.5} />
                </div>
              )}

              {/* Info */}
              <div className="p-5">
                <h2 className="font-display text-lg font-semibold text-petDark mb-1">
                  {pet.nombre}
                </h2>
                <span className="inline-block bg-petIndigoLight text-petIndigo text-xs font-medium px-3 py-1 rounded-full capitalize mb-3">
                  {pet.especie}
                </span>
                {pet.raza && (
                  <p className="text-sm text-petMuted mb-4">
                    {pet.raza}{pet.peso ? ` · ${pet.peso} kg` : ''}
                  </p>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-3 border-t border-petIndigoLight">
                  <Link
                    to={`/mascotas/${pet.id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium bg-petIndigoLight text-petIndigo hover:bg-petIndigoLighter transition-colors"
                  >
                    <Eye size={13} /> Ver
                  </Link>
                  <Link
                    to={`/mascotas/${pet.id}/editar`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium bg-petPinkLight text-petPink hover:bg-petPinkLighter transition-colors"
                  >
                    <Pencil size={13} /> Editar
                  </Link>
                  <button
                    onClick={() => setDeleteId(pet.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium border border-petPinkLighter text-petPinkMid hover:bg-petPinkLight transition-colors"
                  >
                    <Trash2 size={13} /> Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={deleteId !== null}
        title="Eliminar mascota"
        message="Esta acción no se puede deshacer. ¿Deseas continuar?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}