import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ArrowLeft, PawPrint, Ruler, Weight, Calendar, Image, Save } from 'lucide-react'
import { getPet, createPet, updatePet } from '../../api/petService'
import type { PetPayload } from '../../api/petService'
import Spinner from '../../componentes/Spinner/Spinner'
import Toast from '../../componentes/Toast/Toast'

export default function PetFormPage() {
  const { id } = useParams<{ id?: string }>()
  const isEditing = Boolean(id)
  const navigate = useNavigate()

  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<PetPayload>()

  useEffect(() => {
    if (!isEditing || !id) return
    getPet(Number(id))
      .then(pet => {
        reset({
          name: pet.nombre,
          species: pet.especie,
          breed: pet.raza ?? '',
          birth_date: pet.fecha_nacimiento ?? '',
          weight: pet.peso ?? undefined,
          photo_url: pet.foto_url ?? '',
        })
      })
      .catch(() => setToast({ message: 'Error al cargar la mascota', type: 'error' }))
      .finally(() => setLoading(false))
  }, [id, isEditing, reset])

  async function onSubmit(data: PetPayload) {
    setSaving(true)
    try {
      const clean: PetPayload = {
        name: data.name,
        species: data.species,
        ...(data.breed && { breed: data.breed }),
        ...(data.birth_date && { birth_date: data.birth_date }),
        ...(data.weight && { weight: Number(data.weight) }),
        ...(data.photo_url && { photo_url: data.photo_url }),
      }
      if (isEditing && id) {
        await updatePet(Number(id), clean)
        setToast({ message: 'Mascota actualizada correctamente', type: 'success' })
        setTimeout(() => navigate(`/mascotas/${id}`), 1200)
      } else {
        const created = await createPet(clean)
        setToast({ message: `${created.nombre} agregada correctamente`, type: 'success' })
        setTimeout(() => navigate('/mascotas'), 1200)
      }
    } catch {
      setToast({ message: 'Error al guardar la mascota', type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const inputBase = "w-full px-4 py-3 border border-petIndigoLighter rounded-xl text-sm text-petDark bg-petCard outline-none transition focus:border-petIndigo focus:ring-2 focus:ring-petIndigo/10 focus:bg-white"
  const inputError = "border-petPink focus:border-petPink focus:ring-petPink/10"
  const labelBase = "flex items-center gap-1.5 text-xs font-semibold text-petIndigo uppercase tracking-wider mb-2"

  return (
    <div className="max-w-xl mx-auto px-6 py-12">

      <Link
        to={isEditing ? `/mascotas/${id}` : '/mascotas'}
        className="inline-flex items-center gap-2 text-sm text-petMuted hover:text-petIndigo transition-colors mb-9"
      >
        <ArrowLeft size={16} /> {isEditing ? 'Volver al detalle' : 'Volver a mis mascotas'}
      </Link>

      <div className="mb-9">
        <div className="flex items-center gap-3 mb-1.5">
          <PawPrint size={28} color="#D0D1F0" strokeWidth={1.5} />
          <h1 className="font-display text-3xl font-semibold text-petDark tracking-tight">
            {isEditing ? 'Editar mascota' : 'Nueva mascota'}
          </h1>
        </div>
        <p className="text-sm text-petMuted ml-10">
          {isEditing
            ? 'Actualiza la información de tu mascota'
            : 'Completa los datos para registrar a tu mascota'}
        </p>
      </div>

      {loading ? <Spinner /> : (
        <div className="bg-white rounded-2xl p-9 border border-petIndigoLight shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>

            <p className="text-xs font-semibold text-petSubtle uppercase tracking-widest mb-5">
              Información básica
            </p>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className={labelBase}>
                  Nombre <span className="text-petPink">*</span>
                </label>
                <input
                  className={`${inputBase} ${errors.name ? inputError : ''}`}
                  placeholder="Ej. Luna"
                  {...register('name', { required: 'El nombre es obligatorio' })}
                />
                {errors.name && (
                  <p className="text-xs text-petPinkMid mt-1.5">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label className={labelBase}>
                  Especie <span className="text-petPink">*</span>
                </label>
                <input
                  className={`${inputBase} ${errors.species ? inputError : ''}`}
                  placeholder="Ej. Perro"
                  {...register('species', { required: 'La especie es obligatoria' })}
                />
                {errors.species && (
                  <p className="text-xs text-petPinkMid mt-1.5">{errors.species.message}</p>
                )}
              </div>
            </div>

            <div className="mb-5">
              <label className={labelBase}>
                <Ruler size={13} /> Raza
              </label>
              <input
                className={inputBase}
                placeholder="Ej. Labrador Retriever"
                {...register('breed')}
              />
            </div>

            <hr className="border-petIndigoLight my-7" />
            <p className="text-xs font-semibold text-petSubtle uppercase tracking-widest mb-5">
              Datos adicionales
            </p>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className={labelBase}>
                  <Calendar size={13} /> Fecha de nacimiento
                </label>
                <input
                  type="date"
                  className={inputBase}
                  {...register('birth_date')}
                />
              </div>
              <div>
                <label className={labelBase}>
                  <Weight size={13} /> Peso (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  className={`${inputBase} ${errors.weight ? inputError : ''}`}
                  placeholder="Ej. 8.5"
                  {...register('weight', {
                    min: { value: 0, message: 'El peso debe ser positivo' },
                  })}
                />
                {errors.weight && (
                  <p className="text-xs text-petPinkMid mt-1.5">{errors.weight.message}</p>
                )}
              </div>
            </div>

            <div className="mb-7">
              <label className={labelBase}>
                <Image size={13} /> URL de foto
              </label>
              <input
                className={inputBase}
                placeholder="https://..."
                {...register('photo_url')}
              />
              <p className="text-xs text-petSubtle mt-1.5">Ingresa un enlace directo a la foto</p>
            </div>

            <div className="flex gap-3">
              <Link
                to={isEditing ? `/mascotas/${id}` : '/mascotas'}
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
                {saving ? 'Guardando...' : isEditing ? 'Guardar cambios' : 'Agregar mascota'}
              </button>
            </div>
          </form>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}