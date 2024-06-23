import urlJoin from 'url-join';

export const AGENTS_INDEX_GITHUB = 'https://github.com/lobehub/lobe-vidol-market';
export const AGENTS_INDEX_GITHUB_ISSUE = urlJoin(AGENTS_INDEX_GITHUB, 'issues/new');

export const PLUGINS_INDEX_URL = 'https://chat-plugins.lobehub.com';
export const imageUrl = (filename: string) => `/images/${filename}`;
