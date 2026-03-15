import { Routes, Route, Navigate } from 'react-router-dom';
import { RequireAuth, RequireAdmin, RequireOwner } from './components/Guards';
import Login    from './pages/Login';
import Register from './pages/Register';

// TODO: reemplaza estos placeholders con tus páginas reales
const Dashboard  = () => <h1 style={{ padding: 32 }}>Dashboard 🐾</h1>;
const AdminPanel = () => <h1 style={{ padding: 32 }}>Panel Admin 🔒</h1>;
const OwnerPanel = () => <h1 style={{ padding: 32 }}>Mi Perfil de Dueño 🏠</h1>;

function App() {
  return (
    <Routes>
      {/* ── Rutas públicas ───────────────────────────── */}
      <Route path="/login"    element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ── Rutas protegidas: cualquier usuario con sesión ── */}
      <Route element={<RequireAuth />}>
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Rutas de owner: role === 'owner' | 'admin' */}
        <Route element={<RequireOwner />}>
          <Route path="/owner/*" element={<OwnerPanel />} />
        </Route>

        {/* Rutas de admin: role === 'admin' únicamente */}
        <Route element={<RequireAdmin />}>
          <Route path="/admin/*" element={<AdminPanel />} />
        </Route>
      </Route>

      {/* Fallback → login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;