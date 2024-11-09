import urlJoin from 'url-join';

const siteUrl = 'https://vidol.lobehub.com';

export const getCanonicalUrl = (...paths: string[]) => urlJoin(siteUrl, ...paths);
