import { createStyles, useTheme } from 'antd-style';
import { ReactNode, memo } from 'react';
import { type HTMLAttributes } from 'react';
import { Flexbox } from 'react-layout-kit';

import Divider from './Divider';

export interface LobeHubProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * @description Additional React Node to be rendered next to the logo
   */
  extra?: ReactNode;
  /**
   * @description Size of the logo in pixels
   * @default 32
   */
  size?: number;
}

export const useStyles = createStyles(({ css }) => {
  return {
    extraTitle: css`
      font-weight: 300;
      white-space: nowrap;
    `,
  };
});

const Logo = memo<LobeHubProps>(({ size = 32, style, extra, className, ...rest }) => {
  const theme = useTheme();
  const { styles } = useStyles();

  const extraSize = Math.round((size / 3) * 1.9);

  return (
    <Flexbox
      align={'center'}
      className={className}
      flex={'none'}
      horizontal
      style={style}
      {...rest}
    >
      <img alt={'logo'} src={'/icons/logo.svg'} width={size} height={size} />
      <Divider size={extraSize} style={{ color: theme.colorFill }} />
      <div className={styles.extraTitle} style={{ fontSize: extraSize }}>
        {extra}
      </div>
    </Flexbox>
  );
});

export default Logo;
