import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { useAuth, getHomeByRole } from '../context/AuthContext';

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
      // Redirige según rol: admin → /admin, owner/user → /dashboard
      navigate(getHomeByRole(data.user.role));
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.brand}>
          <span style={styles.paw}>🐾</span>
          <h1 style={styles.brandName}>PetCare</h1>
        </div>

        <h2 style={styles.title}>Bienvenido de vuelta</h2>
        <p style={styles.subtitle}>Ingresa a tu cuenta para continuar</p>

        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              required
              style={styles.input}
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={styles.input}
            />
          </div>
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Ingresando...' : 'Iniciar sesión'}
          </button>
        </form>

        <p style={styles.footer}>
          ¿No tienes cuenta?{' '}
          <Link to="/register" style={styles.link}>Regístrate</Link>
        </p>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #fdf6ec 0%, #fde8cc 100%)',
    padding: '24px',
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  card: {
    background: '#fff',
    borderRadius: '20px',
    padding: '48px 40px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 8px 40px rgba(0,0,0,0.10)',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '28px',
    justifyContent: 'center',
  },
  paw:       { fontSize: '32px' },
  brandName: { fontSize: '26px', fontWeight: 700, color: '#d97706', margin: 0 },
  title:     { fontSize: '22px', fontWeight: 700, color: '#1a1a1a', margin: '0 0 6px', textAlign: 'center' },
  subtitle:  { fontSize: '14px', color: '#888', margin: '0 0 24px', textAlign: 'center' },
  errorBox: {
    background: '#fff1f1',
    border: '1px solid #fca5a5',
    color: '#dc2626',
    borderRadius: '10px',
    padding: '12px 16px',
    fontSize: '14px',
    marginBottom: '16px',
  },
  form:   { display: 'flex', flexDirection: 'column', gap: '16px' },
  field:  { display: 'flex', flexDirection: 'column', gap: '6px' },
  label:  { fontSize: '13px', fontWeight: 600, color: '#444' },
  input: {
    padding: '12px 14px',
    borderRadius: '10px',
    border: '1.5px solid #e5e7eb',
    fontSize: '15px',
    outline: 'none',
  },
  button: {
    marginTop: '8px',
    padding: '14px',
    borderRadius: '12px',
    border: 'none',
    background: '#d97706',
    color: '#fff',
    fontWeight: 700,
    fontSize: '16px',
    cursor: 'pointer',
  },
  footer: { marginTop: '24px', textAlign: 'center', fontSize: '14px', color: '#666' },
  link:   { color: '#d97706', fontWeight: 600, textDecoration: 'none' },
};

export default Login;