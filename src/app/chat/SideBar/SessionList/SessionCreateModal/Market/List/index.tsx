import { Pagination } from 'antd';
import { createStyles } from 'antd-style';
import React, { memo, useEffect, useState } from 'react';

import GridList from '@/components/GridList';
import { agentSelectors, useAgentStore } from '@/store/agent';
import { useMarketStore } from '@/store/market';

const PAGE_SIZE = 20; // 每页显示的数量

const useStyles = createStyles(({ css }) => ({
  container: css`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  paginationWrapper: css`
    display: flex;
    justify-content: flex-end;
  `,
}));

const AgentList = () => {
  const { styles } = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const [activateAgent, agentList, agentLoading, currentAgentId, fetchAgentIndex] = useMarketStore(
    (s) => [s.activateAgent, s.agentList, s.agentLoading, s.currentAgentId, s.fetchAgentIndex],
  );

  useEffect(() => {
    fetchAgentIndex();
  }, [fetchAgentIndex]);

  const [subscribed] = useAgentStore((s) => [agentSelectors.subscribed(s)]);

  // 计算当前页的数据
  const currentPageData = agentList.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.container}>
      <GridList
        loading={agentLoading}
        items={currentPageData.map((items) => ({
          avatar: items.meta.avatar,
          id: items.agentId,
          name: items.meta.name,
        }))}
        onClick={(id) => {
          activateAgent(id);
        }}
        isActivated={(id) => id === currentAgentId}
        isChecked={(id) => subscribed(id)}
      />
      {!agentLoading && agentList.length > PAGE_SIZE && (
        <div className={styles.paginationWrapper}>
          <Pagination
            current={currentPage}
            total={agentList.length}
            pageSize={PAGE_SIZE}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
};

export default memo(AgentList);
