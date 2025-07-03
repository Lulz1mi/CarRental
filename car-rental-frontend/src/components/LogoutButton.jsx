import { useNavigate } from 'react-router-dom';
import { logout } from '../api/auth';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    try {
      await logout(token);
    } catch (e) {
      console.error('Logout failed:', e);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
