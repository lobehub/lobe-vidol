import { useGlobalStore } from '@/store/global';
import { useSettingStore } from '@/store/setting';

import { useStyles } from './style';

const Background = () => {
  const { styles } = useStyles();
  const backgroundUrl = useGlobalStore((s) => s.backgroundUrl);
  const backgroundEffect = useSettingStore((s) => s.config.backgroundEffect);

  if (backgroundUrl) {
    return (
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          backgroundImage: `url(${backgroundUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '100%',
          zIndex: -1,
          transition: 'background-image 0.5s ease-in-out',
        }}
      ></div>
    );
  }

  return backgroundEffect === 'glow' ? <div className={styles.glow}></div> : null;
};

export default Background;
