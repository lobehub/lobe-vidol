import { Empty } from 'antd';
import { createStyles } from 'antd-style';
import { isEqual } from 'lodash-es';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import LazyLoad from 'react-lazy-load';

import { agentSelectors, useAgentStore } from '@/store/agent';

import SessionItem from './Item';

const useStyles = createStyles(
  ({ css }) => css`
    min-height: 70px;
  `,
);

interface SessionListProps {
  filter?: string;
}

const SessionList = memo<SessionListProps>(({ filter }) => {
  const [filterAgentListIds, activateAgent, agentListIds] = useAgentStore(
    (s) => [
      agentSelectors.filterAgentListIds(s, filter),
      s.activateAgent,
      agentSelectors.agentListIds(s),
    ],
    isEqual,
  );
  const { styles } = useStyles();
  const { t } = useTranslation('role');

  return (
    <>
      {filterAgentListIds.map((id) => (
        <LazyLoad className={styles} key={id}>
          <SessionItem
            id={id}
            onClick={() => {
              activateAgent(id);
            }}
          />
        </LazyLoad>
      ))}
      {agentListIds.length === 0 && (
        <Empty description={t('noRole')} image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </>
  );
});

export default SessionList;
