import type { Tip } from "../../types"

type TipCardProps = {
  tip: Tip
}

function TipCard({ tip }: TipCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-petIndigoLight shadow-sm p-6 hover:-translate-y-1 hover:shadow-md transition-all duration-200">
      
      <h2 className="font-display text-lg font-semibold text-petDark mb-3">
        {tip.titulo}
      </h2>

      <p className="text-sm text-petMuted mb-4">
        {tip.contenido}
      </p>

      <div className="text-xs text-petMuted space-y-1">
        <p><strong className="text-petIndigo">Especie:</strong> {tip.especie}</p>
        <p><strong className="text-petIndigo">Categoría:</strong> {tip.categoria}</p>
      </div>
    </div>
  )
}

export default TipCard