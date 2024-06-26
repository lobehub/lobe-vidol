import chat from './chat';
import common from './common';
import constants from './constants';
import error from './error';
import my from './my';
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
} as const;

export default resources;
