type ToastProps = {
  message: string
  type?: "success" | "error" | "warning" | "info"
  onClose: () => void
}

function Toast({ message, type = "info", onClose }: ToastProps) {
  const baseStyle = "fixed top-5 right-5 px-4 py-3 rounded shadow-lg text-white"

  const typeStyles = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500"
  }

  return (
    <div className={`${baseStyle} ${typeStyles[type]}`}>
      <div className="flex items-center gap-4">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="font-bold"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

export default Toast