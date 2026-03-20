import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import { useAuth, getHomeByRole } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const { login } = useAuth();
  const navigate  = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await axiosClient.post('/auth/login', { email, password });
      login(data.access_token, data.user);
      navigate(getHomeByRole(data.user.role));
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-petIndigoLight to-petPinkLight px-6 font-sans">
      <div className="bg-white rounded-2xl p-12 w-full max-w-md shadow-lg border border-petBorder">

        <div className="flex items-center justify-center gap-2 mb-7">
          <span className="text-3xl">🐾</span>
          <h1 className="font-display text-2xl font-bold text-petDark m-0">PetCare</h1>
        </div>

        <h2 className="font-display text-xl font-bold text-petDark text-center mb-1">Bienvenido de vuelta</h2>
        <p className="text-sm text-petMuted text-center mb-6">Ingresa a tu cuenta para continuar</p>

        {error && (
          <div className="bg-petPinkLight border border-petPinkLighter text-petPink rounded-xl px-4 py-3 text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-petDark">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              required
              className="px-4 py-3 rounded-xl border border-petBorder text-sm outline-none focus:border-petIndigo transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-petDark">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="px-4 py-3 rounded-xl border border-petBorder text-sm outline-none focus:border-petIndigo transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-2 py-3.5 rounded-xl bg-petPink hover:bg-petPinkMid disabled:opacity-60 text-white font-bold text-base cursor-pointer transition-colors border-none"
          >
            {loading ? 'Ingresando...' : 'Iniciar sesión'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-petMuted">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-petPink font-semibold no-underline hover:text-petPinkMid">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
