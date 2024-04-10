import UAParser from 'ua-parser-js';

const getPaser = () => {
  if (typeof window === 'undefined') {
    // @ts-ignore
    return new UAParser('Node');
  }

  const ua = navigator.userAgent;
  // @ts-ignore
  return new UAParser(ua);
};

export const getPlatform = () => {
  return getPaser().getOS().name;
};

export const isMacOS = () => getPlatform() === 'Mac OS';
