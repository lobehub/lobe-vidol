'use client';

import { Alert, Icon, Modal, type ModalProps } from '@lobehub/ui';
import { Button, Divider, Input, Space } from 'antd';
import { useTheme } from 'antd-style';
import isEqual from 'fast-deep-equal';
import { kebabCase } from 'lodash-es';
import { Dices } from 'lucide-react';
import qs from 'query-string';
import { memo, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import AgentCard from '@/components/agent/AgentCard';
import SystemRole from '@/components/agent/SystemRole';
import { AGENTS_INDEX_GITHUB_ISSUE } from '@/constants/url';
import { upload } from '@/services/upload';
import { agentSelectors, useAgentStore } from '@/store/agent';
import { Agent } from '@/types/agent';
import { isLocalModelPath } from '@/utils/file';
import { base64ToFile } from '@/utils/imageToBase64';
import storage from '@/utils/storage';

const SubmitAgentModal = memo<ModalProps>(({ open, onCancel }) => {
  const [agentId, setAgentId] = useState('');
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const currentAgent: Agent = useAgentStore((s) => agentSelectors.currentAgentItem(s), isEqual);
  const { meta } = currentAgent;

  const isFormPass = Boolean(
    currentAgent.greeting &&
      currentAgent.systemRole &&
      meta.name &&
      meta.description &&
      meta.avatar &&
      meta.cover &&
      meta.model,
  );

  const handleSubmit = async () => {
    setLoading(true);
    let avatarUrl = meta.avatar;
    if (meta.avatar.includes('base64')) {
      const file = base64ToFile(meta.avatar, `${agentId}-avatar`);
      const { success, url } = await upload(file);
      if (success) {
        avatarUrl = url;
      }
    }

    let coverUrl = meta.cover;
    if (meta.cover.includes('base64')) {
      const file = base64ToFile(meta.avatar, `${agentId}-cover`);
      const { success, url } = await upload(file);
      if (success) {
        coverUrl = url;
      }
    }

    let modelUrl = meta.model;
    // 本地模型上传
    if (modelUrl && isLocalModelPath(modelUrl)) {
      const modelBlob = await storage.getItem(modelUrl);
      if (modelBlob) {
        const { success, url } = await upload(
          new File([modelBlob], `${agentId}-model.vrm`, { type: 'application/octet-stream' }),
        );
        if (success) {
          modelUrl = url;
        }
      }
    }

    const body = [
      '### systemRole',
      currentAgent.systemRole,
      '### agentId',
      agentId,
      '### avatar',
      avatarUrl,
      '### cover',
      coverUrl,
      '### model',
      modelUrl,
      '### name',
      meta.name,
      '### description',
      meta.description,
    ].join('\n\n');

    const url = qs.stringifyUrl({
      query: { body, labels: '🤖 Agent PR', title: `[Agent] ${meta.name}` },
      url: AGENTS_INDEX_GITHUB_ISSUE,
    });

    window.open(url, '_blank');
    setLoading(false);
  };

  return (
    <Modal
      allowFullscreen
      footer={
        <Button
          block
          disabled={!isFormPass || !agentId}
          onClick={handleSubmit}
          size={'large'}
          type={'primary'}
          loading={loading}
        >
          提交助手
        </Button>
      }
      onCancel={onCancel}
      open={open}
      title={'分享到助手市场'}
    >
      <Flexbox gap={16}>
        {!isFormPass && (
          <Alert
            message={'请补全助手信息后提交，需要包含名称、描述、头像、封面、和 3D模型'}
            showIcon
            type={'warning'}
          />
        )}
        <AgentCard agent={currentAgent} />
        <Divider style={{ margin: '8px 0' }} />
        <SystemRole systemRole={currentAgent.systemRole} />
        <Divider style={{ margin: '8px 0' }} />
        <strong>
          <span style={{ color: theme.colorError, marginRight: 4 }}>*</span>
          agentId 助手标识符
        </strong>
        <Space.Compact style={{ width: '100%' }}>
          <Input
            onChange={(e) => setAgentId(e.target.value)}
            placeholder={'请输入助手的标识符，需要是唯一的，比如 vidol-agent-klee'}
            value={agentId}
          />
          <Button
            type="primary"
            icon={<Icon icon={Dices} />}
            onClick={() => {
              const randomId = Math.random().toString(36).slice(7);
              setAgentId(kebabCase(randomId));
            }}
          ></Button>
        </Space.Compact>
      </Flexbox>
    </Modal>
  );
});

export default SubmitAgentModal;
