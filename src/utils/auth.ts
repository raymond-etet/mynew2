
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useAuthRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/auth/login');
    }
  }, []);
};
