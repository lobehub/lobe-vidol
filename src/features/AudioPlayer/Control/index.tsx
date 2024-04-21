import { PauseCircle, PlayCircle, SkipBack, SkipForward } from 'lucide-react';

import { DanceStore, useDanceStore } from '@/store/dance';

import { useStyles } from './style';

const controlSelectors = (s: DanceStore) => {
  return {
    isPlaying: s.isPlaying,
    nextDance: s.nextDance,
    prevDance: s.prevDance,
    setIsPlaying: s.setIsPlaying,
    togglePlayPause: s.togglePlayPause,
  };
};

const Control = () => {
  const { prevDance, nextDance, isPlaying, togglePlayPause } = useDanceStore(controlSelectors);
  const { styles } = useStyles();

  return (
    <div className={styles.control}>
      <SkipBack className={styles.back} onClick={prevDance} size={16} />
      {isPlaying ? (
        <PauseCircle className={styles.playPause} onClick={togglePlayPause} size={32} />
      ) : (
        <PlayCircle className={styles.playPause} onClick={togglePlayPause} size={32} />
      )}
      <SkipForward className={styles.forward} onClick={nextDance} size={16} />
    </div>
  );
};

export default Control;
