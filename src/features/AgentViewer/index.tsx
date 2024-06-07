import { Progress } from 'antd';
import classNames from 'classnames';
import React, { memo, useRef } from 'react';

import PageLoading from '@/components/PageLoading';
import Viewer from '@/features/AgentViewer/Viewer';
import { useLoadModel } from '@/hooks/useLoadModel';
import { useGlobalStore } from '@/store/global';
import { Agent } from '@/types/agent';

import ToolBar from './ToolBar';
import { useStyles } from './style';

interface Props {
  agent: Agent;
  className?: string;
  height?: number | string;
  style?: React.CSSProperties;
  width?: number | string;
}

function AgentViewer(props: Props) {
  const { className, style, height, agent, width } = props;
  const { styles } = useStyles();
  const ref = useRef<HTMLDivElement>(null);
  const viewer = useGlobalStore((s) => s.viewer);

  const { downloading, percent, vrmUrl } = useLoadModel(agent.agentId, agent.meta.model!);

  return (
    <div
      ref={ref}
      className={classNames(styles.viewer, className)}
      style={{ height, width, ...style }}
    >
      <ToolBar className={styles.toolbar} viewer={viewer} />
      {downloading ? (
        <PageLoading
          title="模型下载中，请稍后..."
          description={<Progress percent={percent} size="small" steps={50} />}
          className={styles.loading}
        />
      ) : null}
      {vrmUrl ? <Viewer vrmUrl={vrmUrl} /> : null}
    </div>
  );
}

export default memo(AgentViewer);
