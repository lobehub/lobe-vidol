import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import React, { CSSProperties, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { HEADER_HEIGHT } from '@/constants/token';
import AgentViewer from '@/features/AgentViewer';
import { agentSelectors, useAgentStore } from '@/store/agent';
import { useGlobalStore } from '@/store/global';
import { getModelPathByAgentId } from '@/utils/file';
import { cacheStorage } from '@/utils/storage';

import { useStyles } from './style';

interface ViewerWithUploadProps {
  style?: CSSProperties;
}

const ViewerWithUpload = memo<ViewerWithUploadProps>(({ style }) => {
  const viewer = useGlobalStore((s) => s.viewer);
  const { t } = useTranslation('role');
  const { styles } = useStyles();

  const [currentAgentId, currentAgent3DModel, updateAgentConfig] = useAgentStore((s) => [
    agentSelectors.currentAgentId(s),
    agentSelectors.currentAgent3DModel(s),
    s.updateAgentConfig,
  ]);

  const handleUploadAvatar = (file: any) => {
    if (!currentAgentId) return;
    const blob = new Blob([file], { type: 'application/octet-stream' });
    const modelKey = getModelPathByAgentId(currentAgentId!);

    cacheStorage.setItem(modelKey, blob).then(() => {
      updateAgentConfig({ meta: { model: modelKey } });
      const vrmUrl = window.URL.createObjectURL(blob as Blob);
      viewer.loadVrm(vrmUrl);
    });
  };

  return currentAgent3DModel && currentAgentId ? (
    <AgentViewer
      height={`calc(100vh - ${HEADER_HEIGHT}px)`}
      agentId={currentAgentId}
      interactive={false}
      toolbar={false}
    />
  ) : (
    <Upload
      beforeUpload={handleUploadAvatar}
      itemRender={() => void 0}
      accept={'.vrm'}
      maxCount={1}
      style={style}
      openFileDialogOnClick={!currentAgent3DModel}
    >
      <Flexbox
        className={styles.guide}
        align="center"
        justify={'center'}
        width={'100%'}
        height={'100%'}
      >
        <InboxOutlined className={styles.icon} />
        <p className={styles.info}>{t('uploadTip', { ns: 'common' })}</p>
        <p className={styles.extra}>{t('upload.support')}</p>
      </Flexbox>
    </Upload>
  );
});

export default ViewerWithUpload;
