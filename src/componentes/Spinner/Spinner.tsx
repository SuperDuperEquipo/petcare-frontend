function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/50 z-50">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-petIndigoLighter border-t-petIndigo"></div>
    </div>
  )
}

export default Spinner