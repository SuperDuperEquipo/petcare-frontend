import { useEffect, useState } from "react"
import { X } from "lucide-react"

type ToastProps = {
  message: string
  type?: "success" | "error" | "warning" | "info"
  onClose: () => void
}

function Toast({ message, type = "info", onClose }: ToastProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 300) 
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  const baseStyle =
    "fixed top-5 right-5 z-50 max-w-xs w-full px-4 py-3 rounded-xl shadow-lg text-white flex items-center justify-between gap-3 transform transition-all duration-300"

  const typeStyles: Record<string, string> = {
    success: "bg-petIndigo",
    error: "bg-petPink",
    warning: "bg-yellow-400 text-black",
    info: "bg-petIndigoLight text-petDark"
  }

  return (
    <div
      className={`${baseStyle} ${typeStyles[type]} ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}
    >
      <span className="flex-1 text-sm">{message}</span>
      <button
        onClick={() => {
          setVisible(false)
          setTimeout(onClose, 300)
        }}
        className="p-1 rounded-full hover:bg-white/20 transition"
      >
        <X size={16} />
      </button>
    </div>
  )
}

export default Toast