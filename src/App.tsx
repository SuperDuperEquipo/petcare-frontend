import { Routes, Route, Navigate } from 'react-router-dom';
import { RequireAuth, RequireAdmin, RequireOwner } from './components/Guards';
import MainLayout from './layout/Mainlayout';

// Auth
import Login    from './pages/Login';
import Register from './pages/Register';

// Pets
import PetsPage      from './pages/pets/PetsPage';
import PetDetailPage from './pages/pets/PetDetailPage';
import PetFormPage   from './pages/pets/PetFormPage';

// TODO: reemplazar estos placeholders con páginas reales
const Dashboard  = () => <h1 style={{ padding: 32 }}>Dashboard</h1>;
const AdminPanel = () => <h1 style={{ padding: 32 }}>Panel Admin</h1>;
const OwnerPanel = () => <h1 style={{ padding: 32 }}>Mi Perfil de Dueno</h1>;

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
    <Routes>
      {/* -- Rutas públicas (sin layout) --------------- */}
      <Route path="/login"    element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* -- Rutas protegidas: requieren sesión -------- */}
      <Route element={<RequireAuth />}>
        <Route element={<MainLayout />}>

          {/* Redirección raíz */}
          <Route path="/" element={<Navigate to="/mascotas" replace />} />

          {/* Dashboard general */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Módulo Mascotas */}
          <Route path="/mascotas"            element={<PetsPage />} />
          <Route path="/mascotas/nueva"      element={<PetFormPage />} />
          <Route path="/mascotas/:id"        element={<PetDetailPage />} />
          <Route path="/mascotas/:id/editar" element={<PetFormPage />} />

          {/* Rutas de owner: role === 'owner' | 'admin' */}
          <Route element={<RequireOwner />}>
            <Route path="/owner/*" element={<OwnerPanel />} />
          </Route>

          {/* Rutas de admin: role === 'admin' únicamente */}
          <Route element={<RequireAdmin />}>
            <Route path="/admin/*" element={<AdminPanel />} />
          </Route>

        </Route>
      </Route>

      {/* Fallback → login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;