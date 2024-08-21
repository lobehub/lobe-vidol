import chat from './chat';
import common from './common';
import dance from './dance';
import error from './error';
import market from './market';
import role from './role';
import settings from './settings';
import welcome from './welcome';

const resources = {
  chat,
  common,
  error,
  dance,
  role,
  welcome,
  market,
  settings,
} as const;

export default resources;
