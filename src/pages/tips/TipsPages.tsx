import { useEffect, useState } from "react"
import { getTips } from "../../services/tipService"
import type { Tip } from "../../types"
import Spinner from "../../componentes/Spinner/Spinner"
import TipCard from "../../componentes/TipCard/TipCard"
import { PawPrint } from "lucide-react"   

function TipsPage() {

  const [tips, setTips] = useState<Tip[]>([])
  const [loading, setLoading] = useState(true)

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

  useEffect(() => {
    fetchTips()
  }, [])

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="lex justify-between items-end mb-12">
      <h1 className="font-display text-4xl font-semibold text-petDark tracking-tight mb-1">
        Tips para mascotas
      </h1>
    </div>
      {tips.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24">
          <PawPrint size={64} color="#E2E2F6" strokeWidth={1.5} className="text-petIndigoLight" />
          <p className="text-petMuted text-sm my-5">No hay tips disponibles</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip) => (
            <TipCard key={tip.id} tip={tip} />
          ))}
        </div>
      )}

    </div>
  )
}

export default TipsPage



