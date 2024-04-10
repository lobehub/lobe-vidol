import { createGlobalStyle } from 'antd-style';
import global from './global';

const prefixCls = 'ant';

export const GlobalStyle = createGlobalStyle(() => [global({ prefixCls })]);
