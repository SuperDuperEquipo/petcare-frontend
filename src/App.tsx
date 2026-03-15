import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import MainLayout from './layout/Mainlayout'

// Pets
import PetsPage from './pages/pets/PetsPage'
import PetDetailPage from './pages/pets/PetDetailPage'
import PetFormPage from './pages/pets/PetFormPage'

//Vaccine
import VaccineDetailPage from './pages/Vaccine/VaccineDetailPage'
import VaccineFormPage from './pages/Vaccine/VaccineFormPage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            {/* Redirección raíz */}
            <Route path="/" element={<Navigate to="/mascotas" replace />} />

            {/* Módulo Mascotas */}
            <Route path="/mascotas" element={<PetsPage />} />
            <Route path="/mascotas/nueva" element={<PetFormPage />} />
            <Route path="/mascotas/:id" element={<PetDetailPage />} />
            <Route path="/mascotas/:id/editar" element={<PetFormPage />} />

            {/*Módulo de vacunas*/}
            <Route path="/mascotas/:id/vacunas/nueva" element={<VaccineFormPage />} />
            <Route path="/mascotas/:id/vacunas/:vaccineId" element={<VaccineDetailPage />} />
            <Route path="/mascotas/:id/vacunas/:vaccineId/editar" element={<VaccineFormPage />} />

          </Routes>
        </MainLayout>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App