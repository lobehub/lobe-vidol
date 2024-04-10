'use client';

import { apps } from '@/app/home/apps';
import Application from '@/components/Application';
import { useConfigStore } from '@/store/config';
import { PanelKey } from '@/types/config';
import { useStyles } from './style';

const Apps = () => {
  const [openPanel] = useConfigStore((s) => [s.openPanel]);
  const { styles } = useStyles();

  return (
    <div className={styles.apps}>
      {apps.map((app) => {
        return (
          <Application
            avatar={app.avatar}
            key={app.key}
            name={app.label}
            onClick={() => {
              openPanel(app.key as PanelKey);
            }}
          />
        );
      })}
    </div>
  );
};

export default Apps;
