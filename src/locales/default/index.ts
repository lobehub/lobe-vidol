import chat from './chat';
import common from './common';
import constants from './constants';
import error from './error';
import features from './features';
import layout from './layout';
import my from './my';
import panel from './panel';
import role from './role';
import welcome from './welcome';

const resources = {
  my,
  chat,
  common,
  error,
  role,
  welcome,
  constants,
  layout,
  panel,
  features,
} as const;

export default resources;
