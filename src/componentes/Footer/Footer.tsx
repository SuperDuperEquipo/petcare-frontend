import { Mail, ShieldCheck, FileText } from "lucide-react"

function Footer() {
  return (
    <footer className="bg-petIndigo text-white py-6 mt-auto shadow-inner">

      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">

        {/* Texto de derechos */}
        <p className="text-sm text-petMuted md:text-base">
          © {new Date().getFullYear()} PetCare. Todos los derechos reservados.
        </p>

        {/* Links con íconos */}
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">

          <a
            href="#"
            className="flex items-center gap-1 text-gray-300 hover:text-white transition"
          >
            <ShieldCheck size={16} /> Privacidad
          </a>

          <a
            href="#"
            className="flex items-center gap-1 text-gray-300 hover:text-white transition"
          >
            <FileText size={16} /> Términos
          </a>

          <a
            href="#"
            className="flex items-center gap-1 text-gray-300 hover:text-white transition"
          >
            <Mail size={16} /> Contacto
          </a>

        </div>

      </div>

    </footer>
  )
}

export default Footer