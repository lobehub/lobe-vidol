import { Progress, Space } from 'antd';
import classNames from 'classnames';
import React, { memo, useEffect, useRef, useState } from 'react';

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
  const [vrmUrl, setVrmUrl] = useState<string | null>(null);
  const { styles } = useStyles();
  const ref = useRef<HTMLDivElement>(null);
  const viewer = useGlobalStore((s) => s.viewer);

  const { downloading, percent, fetchVrmUrl } = useLoadModel();

  useEffect(() => {
    if (!agent.meta.model) return;
    console.log('fetchVrmUrl', agent.agentId, agent.meta.model);
    fetchVrmUrl(agent.agentId, agent.meta.model).then((vrmUrl) => {
      setVrmUrl(vrmUrl);
    });
  }, [agent.agentId]);

  return (
    <div
      ref={ref}
      className={classNames(styles.viewer, className)}
      style={{ height, width, ...style }}
    >
      <ToolBar className={styles.toolbar} viewer={viewer} />
      {downloading ? (
        <PageLoading
          title={
            <Space>
              模型加载中，请稍后...
              <Progress percent={percent} type="circle" size={[20, 20]} />
            </Space>
          }
          className={styles.loading}
        />
      ) : null}
      {vrmUrl ? <Viewer vrmUrl={vrmUrl} /> : null}
    </div>
  );
}

export default memo(AgentViewer);
