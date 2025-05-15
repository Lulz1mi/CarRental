import { logout } from '../api/auth';
import { useHistory } from 'react-router-dom';

function LogoutButton() {
  const history = useHistory();

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    try {
      await logout(token);
    } catch (e) {
      console.error('Logout failed:', e);
    }
    localStorage.removeItem('token');
    history.push('/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;