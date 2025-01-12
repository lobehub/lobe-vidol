import { createStyles } from 'antd-style';
import React, { memo, useRef } from 'react';

import { Agent } from '@/types/agent';

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    cursor: pointer;

    position: relative;

    overflow: hidden;

    aspect-ratio: 3/4;
    width: 100%;
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: ${token.borderRadiusLG}px;

    transition: all 0.3s ease;
  `,
  image: css`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
  overlay: css`
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;

    padding: 12px;

    color: white;

    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 90%) 0%,
      rgba(0, 0, 0, 60%) 50%,
      transparent 100%
    );
  `,
  title: css`
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.2;
  `,
  stats: css`
    display: flex;
    gap: 4px;
    align-items: center;

    margin-top: 4px;

    font-size: 12px;

    opacity: 0.8;
  `,
  description: css`
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;

    margin-top: 4px;

    font-size: 12px;
    line-height: 1.4;
    text-overflow: ellipsis;

    opacity: 0.8;
  `,
}));

interface RoleCardProps {
  agent: Agent;
  onClick?: () => void;
}

const RoleCard = (props: RoleCardProps) => {
  const { agent, onClick } = props;
  const { styles } = useStyles();
  const hoverRef = useRef(null);

  return (
    <div ref={hoverRef} className={styles.container} onClick={onClick}>
      <img className={styles.image} src={agent?.meta?.cover} alt={agent?.meta?.name} />
      <div className={styles.overlay}>
        <h3 className={styles.title}>{agent?.meta?.name}</h3>
        <div className={styles.description}>{agent?.meta?.description}</div>
      </div>
    </div>
  );
};

export default memo(RoleCard);
