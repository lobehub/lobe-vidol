import { Upload } from 'antd';
import React, { CSSProperties, memo } from 'react';

import EmptyGuide from '@/components/EmptyGuide';
import { ROLE_VIEWER_HEIGHT, ROLE_VIEWER_WIDTH } from '@/constants/common';
import AgentViewer from '@/features/AgentViewer';
import { agentSelectors, useAgentStore } from '@/store/agent';
import { useGlobalStore } from '@/store/global';
import { getModelPathByAgentId } from '@/utils/file';
import storage from '@/utils/storage';

interface ViewerWithUploadProps {
  style?: CSSProperties;
}

const ViewerWithUpload = memo<ViewerWithUploadProps>(({ style }) => {
  const viewer = useGlobalStore((s) => s.viewer);

  const [currentAgent, currentAgentModel, updateAgentConfig] = useAgentStore((s) => [
    agentSelectors.currentAgentItem(s),
    agentSelectors.currentAgentModel(s),
    s.updateAgentConfig,
  ]);

  const handleUploadAvatar = (file: any) => {
    if (!currentAgent) return;
    const blob = new Blob([file], { type: 'application/octet-stream' });
    const modelKey = getModelPathByAgentId(currentAgent.agentId!);

    storage.setItem(modelKey, blob).then(() => {
      updateAgentConfig({ meta: { model: modelKey } });
      const vrmUrl = window.URL.createObjectURL(blob as Blob);
      viewer.loadVrm(vrmUrl);
    });
  };

  return (
    <Upload
      beforeUpload={handleUploadAvatar}
      itemRender={() => void 0}
      accept={'.vrm'}
      maxCount={1}
      style={style}
      openFileDialogOnClick={!currentAgentModel}
    >
      {currentAgentModel && currentAgent ? (
        <AgentViewer height={ROLE_VIEWER_HEIGHT} agent={currentAgent} width={ROLE_VIEWER_WIDTH} />
      ) : (
        <EmptyGuide
          size={{ height: ROLE_VIEWER_HEIGHT, width: ROLE_VIEWER_WIDTH }}
          extra={`支持单个文件上传，当前仅支持 .vrm 格式文件`}
        />
      )}
    </Upload>
  );
});

export default ViewerWithUpload;
