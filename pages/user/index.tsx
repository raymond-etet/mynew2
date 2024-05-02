// /Users/raymond/Documents/next/next_v1/pages/user/index.tsx
import React, { useEffect, useState } from 'react';
import { useAuthRedirect } from '@/utils/auth';

const UserCenter = () => {
  useAuthRedirect();

  const [user, setUser] = useState({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUser(JSON.parse(localStorage.getItem('user') || '{}'));
    }
  }, []);

  return (
      <div>
        <h1>Welcome, {user?.username}!</h1>
      </div>
  );
};

export default UserCenter;