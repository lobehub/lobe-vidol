import chat from './chat';
import common from './common';
import dance from './dance';
import error from './error';
import market from './market';
import metadata from './metadata';
import modelProvider from './modelProvider';
import role from './role';
import settings from './settings';
import welcome from './welcome';

const resources = {
  chat,
  common,
  error,
  dance,
  role,
  metadata,
  welcome,
  market,
  settings,
  modelProvider,
} as const;

export default resources;
