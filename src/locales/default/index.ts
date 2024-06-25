import chat from './chat';
import common from './common';
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
} as const;

export default resources;
