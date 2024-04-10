import { useConfigStore } from '@/store/config';
import { useStyles } from './style';

const Background = () => {
  const { styles } = useStyles();
  const backgroundEffect = useConfigStore((s) => s.config.backgroundEffect);
  return backgroundEffect === 'glow' ? <div className={styles.glow}></div> : null;
};

export default Background;
