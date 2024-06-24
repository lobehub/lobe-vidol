// develop enironment
export const isDev = process.env.NODE_ENV === 'development';
// server environment
export const isOnServerSide = typeof window === 'undefined';
