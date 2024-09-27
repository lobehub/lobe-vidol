import { TRANSPARENT_ID, backgroundOptions } from '@/constants/background';
import { useGlobalStore } from '@/store/global';
import { useSettingStore } from '@/store/setting';

import { useStyles } from './style';

const Background = () => {
  const { styles } = useStyles();
  const backgroundId = useGlobalStore((s) => s.backgroundId);
  const backgroundEffect = useSettingStore((s) => s.config.backgroundEffect);
  const background = backgroundOptions.find((item) => item.id === backgroundId);

  if (background && backgroundId !== TRANSPARENT_ID) {
    return (
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          backgroundImage: `url(https://r2.vidol.chat/backgrounds/${encodeURIComponent(background.url)})`,
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
