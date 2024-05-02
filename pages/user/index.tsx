// /Users/raymond/Documents/next/next_v1/pages/user/index.tsx
import React from 'react';
import { useAuthRedirect } from '@/utils/auth';

const UserCenter = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useAuthRedirect();

  return (
      <div>
        <h1>Welcome, {user.username}!</h1>
      </div>
  );
};

export default UserCenter;
