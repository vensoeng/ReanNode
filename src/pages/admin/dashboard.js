import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL, getAccessToken, clearAuthStorage , STORAGE } from '../../utils/auth';
import '../../assets/css/admin/dashboard.css';

export default function Dashboard() {
  // const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/dashboard`, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`
          }
        });

        if (!response.ok) {
          clearAuthStorage();
          navigate('/login', { replace: true });
          return;
        }

        const data = await response.json();
        setUser(data.user);
        console.log(data);
      } catch (err) {
        clearAuthStorage();
        navigate('/login', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [navigate]);

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {error && <p style={{ color: '#f87171' }}>{error}</p>}
      {user ? (
        <>
          <div className='admin-content'>
            <img
              src={API_URL + STORAGE + user.pr_img}
              width={35}
              alt="User profile"
            />
            <p>Welcome back, <strong>{user.username || user.email}</strong></p>
            <p>Role: {user.role}</p>
          </div>
        </>
      ) : (
        <p>You must be logged in to use the dashboard.</p>
      )}
    </div>
  );
}
