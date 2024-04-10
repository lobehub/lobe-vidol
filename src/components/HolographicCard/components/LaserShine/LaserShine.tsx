import { animated } from '@react-spring/web';
import { CSSProperties, memo } from 'react';
import { DivProps } from 'react-layout-kit';
import { useStyles } from './style';

export interface LaserShineProps extends DivProps {
  className?: string;
  mask?: boolean;
  style?: CSSProperties;
}

export const LaserShine = memo<LaserShineProps>(({ mask, className, ...res }) => {
  const { styles, cx } = useStyles();

  console.log(className);
  return (
    <animated.div
      className={cx(
        styles.composeShine,
        mask ? styles.maskedShine : styles.noMaskedShine,
        className,
      )}
      {...res}
    />
  );
});
