import { message } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import GridList from '@/components/GridList';
import Header from '@/components/Header';
import { EMPTY_ID, StageOption, stageList } from '@/constants/stage';
import { useGlobalStore } from '@/store/global';

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    width: 100%;
    height: 100%;
    padding: 0 ${token.paddingSM}px;

    background-color: rgba(255, 255, 255, 2%);
    border-radius: ${token.borderRadius}px;
  `,
}));

interface StageListProps {
  className?: string;
  style?: React.CSSProperties;
}

const StageList = ({ className, style }: StageListProps) => {
  const [stageId, setStageId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false); // 添加 loading 状态
  const { t } = useTranslation('chat');
  const { styles } = useStyles();
  const viewer = useGlobalStore((s) => s.viewer);

  const handleItemClick = async (id: string, item: StageOption) => {
    setStageId(id);
    if (id === EMPTY_ID) {
      viewer.removeStage();
      return;
    }
    setLoading(true); // 开始加载时设置 loading 为 true
    try {
      if (item.url) await viewer.loadStage(item.url);
    } catch {
      message.error('舞台模型加载失败');
    } finally {
      setLoading(false); // 无论成功或失败,都设置 loading 为 false
    }
  };

  return (
    <Flexbox className={classNames(className, styles.container)} style={style}>
      <Header
        title={t('stage.stageList')}
        extra={t('stage.totalCount', { total: stageList.length })}
      />
      <GridList
        items={stageList.map((option) => ({
          avatar: option.thumbnail,
          id: option.id,
          name: option.name,
          url: option.url,
          spin: loading && stageId === option.id,
        }))}
        onClick={handleItemClick}
        isActivated={(id) => stageId === id}
      />
    </Flexbox>
  );
};

export default StageList;
