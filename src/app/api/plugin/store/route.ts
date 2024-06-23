import { PLUGINS_INDEX_URL } from '@/constants/url';

export const runtime = 'edge';

export const revalidate = 43_200; // revalidate at almost every 12 hours

export const GET = async () => {
  return fetch(PLUGINS_INDEX_URL);
};
