import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { RequireAuth, RequireAdmin, RequireUser } from "./componentes/Guards/Guards";
import MainLayout from "./layout/Mainlayout";
import { useAuth } from "./context/AuthContext";

// Auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Mascotas
import PetsPage from "./pages/pets/PetsPage";
import PetDetailPage from "./pages/pets/PetDetailPage";
import PetFormPage from "./pages/pets/PetFormPage";

// Citas
import AppointmentsPage from "./pages/appointments/AppointmentsPage";
import AppointmentFormPage from "./pages/appointments/AppointmentFormPage";
import AppointmentDetailPage from "./pages/appointments/AppointmentDetailPage";

// Perfil
import ProfilePage from "./pages/profile/ProfilePage";
import ProfileFormPage from "./pages/profile/ProfileFormPage";

// Vacunas
import VaccineDetailPage from "./pages/Vaccine/VaccineDetailPage";
import VaccineFormPage from "./pages/Vaccine/VaccineFormPage";

// Dashboards / Placeholders
import Dashboard from "./pages/Dashboard";

//admin
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminTipsPage from "./pages/admin/AdminTipsPage";
import AdminPage from "./pages/admin/AdminPage";

//Tips
import TipsPage from "./pages/tips/TipsPages";

const RootRedirect = () => {
  const { user } = useAuth();
  return <Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} replace />;
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* -- Rutas públicas --------------------------- */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* -- Rutas protegidas  ---------------- */}
        <Route element={<RequireAuth />}>
          <Route element={<MainLayout />}>
            {/* Redirección raíz */}
            <Route path="/" element={<RootRedirect/>} />

            {/* Módulo Mascotas */}
            <Route element={<RequireUser />}>
              <Route path="/mascotas" element={<PetsPage />} />
              <Route path="/mascotas/nueva" element={<PetFormPage />} />
              <Route path="/mascotas/:id" element={<PetDetailPage />} />
              <Route path="/mascotas/:id/editar" element={<PetFormPage />} />

              {/* Módulo de Vacunas  */}
              <Route
                path="/mascotas/:id/vacunas/nueva"
                element={<VaccineFormPage />}
              />
              <Route
                path="/mascotas/:id/vacunas/:vaccineId"
                element={<VaccineDetailPage />}
              />
              <Route
                path="/mascotas/:id/vacunas/:vaccineId/editar"
                element={<VaccineFormPage />}
              />

              {/* Módulo Citas */}
              <Route path="/citas" element={<AppointmentsPage />} />
              <Route path="/citas/nueva" element={<AppointmentFormPage />} />
              <Route path="/citas/:id" element={<AppointmentDetailPage />} />
              <Route
                path="/citas/:id/editar"
                element={<AppointmentFormPage />}
              />

              {/* Módulo Perfil / Owner */}
              <Route path="/perfil" element={<ProfilePage />} />
              <Route path="/perfil/nuevo" element={<ProfileFormPage />} />
              <Route path="/perfil/editar" element={<ProfileFormPage />} />
            
              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/tips" element={<TipsPage />} />
            </Route>

            {/* Rutas de Admin */}
            <Route element={<RequireAdmin />}>
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/tips" element={<AdminTipsPage />} />
              <Route path="/admin/users" element={<AdminUsersPage />} />
            </Route>
          </Route>
        </Route>

        {/* Fallback para rutas inexistentes */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
