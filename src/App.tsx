import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import MainLayout from './layout/Mainlayout'

// Pets
import PetsPage from './pages/pets/PetsPage'
import PetDetailPage from './pages/pets/PetDetailPage'
import PetFormPage from './pages/pets/PetFormPage'

//admin
import AdminUsersPage from './pages/admin/AdminUsersPage'
import AdminTipsPage from './pages/admin/AdminTipsPage'
import AdminPage from './pages/admin/AdminPAge'

//Tips
import TipsPage from './pages/tips/TipsPages'

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
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/tips" element={<TipsPage />} />
            <Route path="/admin/tips" element={<AdminTipsPage />} />
            <Route path="/admin" element={<AdminPage/>} />

          </Routes>
        </MainLayout>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App