'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Redirect = () => {
  const router = useRouter();

  useEffect(() => {
    // const hasData = localStorage.getItem('V_IDOL_WELCOME');
    // if (hasData) {
    router.push('/market/agent');
    // } else {
    //   router.push('/welcome');
    // }
  }, []);

  return null;
};

export default Redirect;
