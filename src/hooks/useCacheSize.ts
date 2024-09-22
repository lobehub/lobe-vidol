import { useState } from 'react';

import { cacheStorage } from '@/utils/storage';

const useCacheSize = () => {
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState(0);

  const fetchCacheSize = async () => {
    setLoading(true);
    try {
      const value = await cacheStorage.size();
      setSize(value);
    } finally {
      setLoading(false);
    }
  };

  return { loading, size, fetchCacheSize };
};

export default useCacheSize;
