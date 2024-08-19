import chat from './chat';
import common from './common';
import dance from './dance';
import error from './error';
import market from './market';
import role from './role';
import welcome from './welcome';

const resources = {
  chat,
  common,
  error,
  dance,
  role,
  welcome,
  market,
} as const;

export default resources;
