'use client';

import { Avatar } from '@lobehub/ui';

import { sessionSelectors, useSessionStore } from '@/store/session';

import { useStyles } from './style';

const AvatarSize = 64;

const QuickSwitch = () => {
  const { styles } = useStyles({ avatarSize: AvatarSize });
  const [sessionList, getAgentById] = useSessionStore((s) => [
    s.sessionList,
    sessionSelectors.getAgentById(s),
  ]);
  const [switchSession, activeId] = useSessionStore((s) => [s.switchSession, s.activeId]);

  return (
    <div className={styles.sidebar}>
      {/*<div className={styles.header}>聊天列表</div>*/}
      <div className={styles.list}>
        {sessionList.map((item) => {
          const agent = getAgentById(item.agentId);
          if (!agent) return null;
          const isActive = activeId === agent.agentId;
          return (
            <div key={agent.agentId} style={{ position: 'relative' }}>
              <Avatar
                className={isActive ? styles.active : ''}
                onClick={() => switchSession(agent.agentId)}
                size={AvatarSize}
                src={agent.meta.avatar}
              />
              {isActive ? (
                <>
                  {/*<div className={styles.satellite} />*/}
                  <div className={styles.orbit} />
                </>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickSwitch;
