import { useSettingStore } from '@/store/setting';

import { useStyles } from './style';

const Background = () => {
  const { styles } = useStyles();
  const backgroundEffect = useSettingStore((s) => s.config.backgroundEffect);
  console.log(backgroundEffect);

  return backgroundEffect === 'glow' ? <div className={styles.glow}></div> : null;
};

export default Background;
