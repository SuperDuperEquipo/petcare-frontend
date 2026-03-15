import { useEffect, useState } from "react"
import { X, AlertTriangle } from "lucide-react"

type ConfirmModalProps = {
  isOpen: boolean
  title?: string
  message: string
  onConfirm: () => void
  onCancel: () => void
  loading?: boolean
}

function ConfirmModal({
  isOpen,
  title = "Confirmar acción",
  message,
  onConfirm,
  onCancel,
  loading = false
}: ConfirmModalProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setVisible(true)
    }
  }, [isOpen])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onCancel, 200)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`bg-white rounded-2xl shadow-lg w-96 p-6 transform transition-all duration-200 ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="text-petPink" size={28} />
          <h2 className="font-display text-xl font-semibold text-petDark">
            {title}
          </h2>
          <button
            onClick={handleClose}
            className="ml-auto p-1 rounded-full hover:bg-gray-200 transition"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-petMuted text-sm mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={handleClose}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-petIndigoLighter text-petDark hover:bg-petIndigoLight transition disabled:opacity-50"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-petPink text-white hover:bg-petPinkDark transition disabled:opacity-50"
          >
            {loading ? "Procesando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal