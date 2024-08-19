import chat from './chat';
import common from './common';
import dance from './dance';
import error from './error';
import market from './market';
import panel from './panel';
import role from './role';
import welcome from './welcome';

const resources = {
  chat,
  common,
  error,
  dance,
  role,
  welcome,
  panel,
  market,
} as const;

export default resources;
