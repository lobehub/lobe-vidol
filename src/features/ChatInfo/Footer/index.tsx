import Play from '@/features/Actions/PlayControl';

import { useStyles } from './style';

export default () => {
  const { styles } = useStyles();
  return (
    <div className={styles.footer}>
      <Play />
    </div>
  );
};
