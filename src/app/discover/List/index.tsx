import { Grid, SearchBar, TabsNav } from '@lobehub/ui';
import { Empty } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import RoleCard from '@/components/RoleCard';
import SkeletonList from '@/components/SkeletonList';
import { Agent, CategoryEnum } from '@/types/agent';

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    position: relative;
    height: 100%;
    background-color: rgba(255, 255, 255, 2%);
    border-radius: ${token.borderRadius}px;
  `,
  header: css`
    padding: ${token.padding}px ${token.paddingSM}px;
  `,
  list: css`
    overflow-y: scroll;
    width: 100%;
    height: 100%;
    padding: 0 ${token.paddingSM}px;
  `,
}));

interface AgentListProps {
  activateAgent: (agentId: string) => void;
  agents: Agent[];
  className?: string;
  loading: boolean;
  style?: React.CSSProperties;
}

const AgentList = (props: AgentListProps) => {
  const { activateAgent, className, style, agents = [], loading } = props;
  const { styles } = useStyles();

  const { t } = useTranslation('role');

  // 定义分类选项
  const CATEGORIES = [
    { key: 'all', label: t('category.all') },
    { label: t('category.game'), key: CategoryEnum.GAME },
    { label: t('category.vroid'), key: CategoryEnum.VROID },
    { label: t('category.anime'), key: CategoryEnum.ANIME },
    { label: t('category.animal'), key: CategoryEnum.ANIMAL },
    { label: t('category.book'), key: CategoryEnum.BOOK },
    { label: t('category.history'), key: CategoryEnum.HISTORY },
    { label: t('category.movie'), key: CategoryEnum.MOVIE },
    { label: t('category.realistic'), key: CategoryEnum.REALISTIC },

    { label: t('category.vtuber'), key: CategoryEnum.VTUBER },
  ];

  // 添加状态管理
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  // 根据分类和搜索关键词筛选 agents
  const filteredAgents = agents.filter((agent) => {
    const matchCategory = activeCategory === 'all' || agent.meta.category === activeCategory;
    const matchSearch =
      agent.meta.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      agent.meta.description.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (loading) {
    return <SkeletonList count={6} />;
  }

  return (
    <Flexbox className={classNames(className, styles.container)} style={style}>
      <Flexbox
        className={styles.header}
        gap={16}
        direction="horizontal"
        align="center"
        justify="space-between"
      >
        <TabsNav
          activeKey={activeCategory}
          items={CATEGORIES}
          onChange={(key) => setActiveCategory(key)}
        />
        <SearchBar
          placeholder={t('search', { ns: 'common' })}
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          allowClear
        />
      </Flexbox>
      <Flexbox className={styles.list} flex={1}>
        {filteredAgents.length === 0 ? (
          <Empty
            description={t('noRoleList', { ns: 'chat' })}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ) : (
          <Grid maxItemWidth={240} gap={16}>
            {filteredAgents.map((agent) => (
              <RoleCard
                key={agent.agentId}
                agent={agent}
                onClick={() => activateAgent(agent.agentId)}
              />
            ))}
          </Grid>
        )}
      </Flexbox>
    </Flexbox>
  );
};

export default memo(AgentList);
