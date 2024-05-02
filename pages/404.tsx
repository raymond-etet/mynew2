
import React from 'react';
import { useAuthRedirect } from '@/utils/auth';

const NotFoundPage = () => {
  useAuthRedirect();

  return (
    <div>
      <h1>404 - Page Not Found</h1>
    </div>
  );
};

export default NotFoundPage;
