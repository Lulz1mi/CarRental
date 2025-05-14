import { useEffect, useState } from 'react';
import { getProfile } from '../api/auth';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getProfile(token)
        .then((data) => setProfile(data))
        .catch(() => setError('Failed to fetch profile'));
    }
  }, []);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      {profile ? (
        <div>
          <h1>Welcome, {profile.name}</h1>
          <p>Email: {profile.email}</p>
          <p>Phone: {profile.phone}</p>
          <p>Role: {profile.role}</p>

          {profile.role === 'admin' && <p>You are an <strong>admin</strong>.</p>}
          {profile.role === 'user' && <p>You are a <strong>user</strong>.</p>}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default Profile;
