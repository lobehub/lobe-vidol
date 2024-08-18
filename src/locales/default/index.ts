import chat from './chat';
import common from './common';
import constants from './constants';
import error from './error';
import features from './features';
import market from './market';
import panel from './panel';
import role from './role';
import welcome from './welcome';

const resources = {
  chat,
  common,
  error,
  role,
  welcome,
  constants,
  panel,
  market,
  features,
} as const;

export default resources;
