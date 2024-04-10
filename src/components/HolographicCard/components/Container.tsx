import { CSSProperties, ReactNode, memo } from 'react';
import { LaserShine, useLaserShine } from './LaserShine';
import Orbit from './Orbit';
import { useStyles } from './style';

export interface ContainerProps {
  children?: ReactNode;
  className?: string;
  foil?: string;
  loading?: boolean;
  mask?: string;
}

const Container = memo<ContainerProps>(({ foil, mask, children, className, loading }) => {
  const { styles, cx } = useStyles();
  const { style: shineStyle, onMouseMove, onMouseOut } = useLaserShine();

  return (
    <Orbit
      classNames={{
        container: cx(`${className} ${mask ? 'masked' : ''}`, styles.container),
        rotator: cx(styles.rotator),
      }}
      onMouseMove={onMouseMove}
      onMouseOut={onMouseOut}
      styles={{
        container: {
          ...shineStyle,
          '--foil': `url(${foil ?? ''})`,
          '--mask': `url(${mask ?? ''})`,
          width: 320,
        } as CSSProperties,
        content: {
          display: 'grid',
        },
      }}
    >
      <div className={cx(styles.front, loading && styles.fontLoading)}>
        {children}
        <LaserShine className={styles.shine} mask={!!mask} />
        <div className={cx('card__glare', styles.glare)} />
      </div>
    </Orbit>
  );
});

export default Container;
