function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">

      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">

        <p className="text-sm">
          © {new Date().getFullYear()} PetCare. Todos los derechos reservados.
        </p>

        <div className="flex gap-4 mt-2 md:mt-0">

          <a
            href="#"
            className="text-gray-300 hover:text-white text-sm"
          >
            Privacidad
          </a>

          <a
            href="#"
            className="text-gray-300 hover:text-white text-sm"
          >
            Términos
          </a>

          <a
            href="#"
            className="text-gray-300 hover:text-white text-sm"
          >
            Contacto
          </a>

        </div>

      </div>

    </footer>
  )
}

export default Footer