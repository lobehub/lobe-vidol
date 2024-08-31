import { Upload } from 'antd';
import React, { CSSProperties, memo } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('role');
  const [currentAgentId, currentAgentModel, updateAgentConfig] = useAgentStore((s) => [
    agentSelectors.currentAgentId(s),
    agentSelectors.currentAgentModel(s),
    s.updateAgentConfig,
  ]);

  const handleUploadAvatar = (file: any) => {
    if (!currentAgentId) return;
    const blob = new Blob([file], { type: 'application/octet-stream' });
    const modelKey = getModelPathByAgentId(currentAgentId!);

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
      {currentAgentModel && currentAgentId ? (
        <AgentViewer
          height={ROLE_VIEWER_HEIGHT}
          agentId={currentAgentId}
          width={ROLE_VIEWER_WIDTH}
          greeting={false}
        />
      ) : (
        <EmptyGuide
          size={{ height: ROLE_VIEWER_HEIGHT, width: ROLE_VIEWER_WIDTH }}
          extra={t('upload.support')}
        />
      )}
    </Upload>
  );
});

export default ViewerWithUpload;
