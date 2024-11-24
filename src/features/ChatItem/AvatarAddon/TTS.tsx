import { createStyles, useTheme } from 'antd-style';
import { Play } from 'lucide-react';
import React from 'react';

import { useSessionStore } from '@/store/session';

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    cursor: pointer;

    position: absolute;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 24px;
    height: 24px;

    border-radius: 50%;

    transition: all 0.2s ease-in-out;

    &:hover {
      background: ${token.colorFillSecondary};
    }
  `,
  audioWaves: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    gap: 2px;
    align-items: center;

    height: 16px;
    padding: 4px;

    border-radius: 50%;

    transition: all 0.2s ease-in-out;
  `,
  wave: css`
    width: 2px;
    height: 8px;

    background-color: ${token.colorPrimary};
    border-radius: 2px;

    animation: wave 1s ease-in-out infinite;

    &:nth-child(2) {
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }

    &:nth-child(4) {
      animation-delay: 0.6s;
    }

    @keyframes wave {
      0%,
      100% {
        height: 8px;
        opacity: 0.5;
      }

      50% {
        height: 16px;
        opacity: 1;
      }
    }
  `,
  playIcon: css`
    width: 16px;
    height: 16px;
    color: ${token.colorPrimary};
  `,
}));

export default ({ content, id, loading }: { content: string; id: string; loading: boolean }) => {
  const { styles } = useStyles();
  const stopTtsMessage = useSessionStore((s) => s.stopTtsMessage);
  const ttsMessage = useSessionStore((s) => s.ttsMessage);
  const theme = useTheme();

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.audioWaves} onClick={() => stopTtsMessage()}>
          <div className={styles.wave} />
          <div className={styles.wave} />
          <div className={styles.wave} />
          <div className={styles.wave} />
        </div>
      ) : (
        <Play
          className={styles.playIcon}
          fill={theme.colorPrimary}
          onClick={() => ttsMessage(id, content)}
        />
      )}
    </div>
  );
};
