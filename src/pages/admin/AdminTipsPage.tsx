import { useEffect, useState } from "react"
import { Pencil, Text, Dog, Tag, Plus, PawPrint } from "lucide-react"
import type { Tip } from "../../types"
import Spinner from "../../componentes/Spinner/Spinner"
import Toast from "../../componentes/Toast/Toast"
import { getTips, createTip } from "../../services/tipService"
import TipCard from "../../componentes/TipCard/TipCard"

export default function AdminTipsPage() {
  const [tips, setTips] = useState<Tip[]>([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    species: "",
    category: ""
  })

  useEffect(() => {
    fetchTips()
  }, [])

  const fetchTips = async () => {
    try {
      const data = await getTips()
      setTips(data)
    } catch (error) {
      console.error("Error cargando tips", error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleCreateTip = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createTip(formData)
      setToast({ message: "Tip creado correctamente", type: "success" })
      setFormData({ title: "", content: "", species: "", category: "" })
      fetchTips()
    } catch (error) {
      setToast({ message: "Error al crear el tip", type: "error" })
    }
  }


  if (loading) return <Spinner />

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="font-display text-3xl font-semibold text-petDark mb-8">
        Administrar Tips
      </h1>

      {/* Formulario */}
      <form
        onSubmit={handleCreateTip}
        className="bg-white rounded-2xl p-6 shadow-sm mb-10 border border-petIndigoLight"
      >
        <h2 className="font-display text-xl font-semibold text-petDark mb-5">
          Crear nuevo tip
        </h2>

        <div className="grid gap-4 mb-4">
          {/* Título */}
          <div className="flex items-center gap-2">
            <Pencil size={20} className="text-petIndigo" />
            <input
              type="text"
              name="title"
              placeholder="Título"
              value={formData.title}
              onChange={handleChange}
              className="flex-1 px-3 py-3 border border-petIndigoLighter rounded-xl text-sm text-petDark bg-petCard outline-none focus:border-petIndigo focus:ring-2 focus:ring-petIndigo/10"
              required
            />
          </div>

          {/* Contenido */}
          <div className="flex items-center gap-2">
            <Text size={20} className="text-petIndigo" />
            <textarea
              name="content"
              placeholder="Contenido"
              value={formData.content}
              onChange={handleChange}
              className="flex-1 px-3 py-3 border border-petIndigoLighter rounded-xl text-sm text-petDark bg-petCard outline-none focus:border-petIndigo focus:ring-2 focus:ring-petIndigo/10"
              required
            />
          </div>

          {/* Especie */}
          <div className="flex items-center gap-2">
            <Dog size={20} className="text-petIndigo" />
            <input
              type="text"
              name="species"
              placeholder="Especie (ej: perro, gato, ave...)"
              value={formData.species}
              onChange={handleChange}
              className="flex-1 px-3 py-3 border border-petIndigoLighter rounded-xl text-sm text-petDark bg-petCard outline-none focus:border-petIndigo focus:ring-2 focus:ring-petIndigo/10"
              required
            />
          </div>

          {/* Categoría */}
          <div className="flex items-center gap-2">
            <Tag size={20} className="text-petIndigo" />
            <input
              type="text"
              name="category"
              placeholder="Categoría"
              value={formData.category}
              onChange={handleChange}
              className="flex-1 px-3 py-3 border border-petIndigoLighter rounded-xl text-sm text-petDark bg-petCard outline-none focus:border-petIndigo focus:ring-2 focus:ring-petIndigo/10"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 p-3 rounded-xl text-sm font-semibold bg-gradient-to-br from-petIndigo to-petIndigoDark text-white shadow-lg hover:opacity-90 transition-all"
        >
          <Plus size={16} /> Crear Tip
        </button>
      </form>

      {/* Lista de tips */}
      {tips.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24">
          <PawPrint size={60} className="text-petIndigoLight mb-4" />
          <p className="text-petMuted text-sm">No hay tips registrados aún</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map(tip => (
            <TipCard key={tip.id} tip={tip} />
          ))}
        </div>
      )}

      {toast && (
        <Toast
          message={toast.message} type={toast.type} onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}






