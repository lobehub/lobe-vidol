'use client';

import { Alert, Modal, type ModalProps } from '@lobehub/ui';
import { Button, Divider, Input } from 'antd';
import { useTheme } from 'antd-style';
import isEqual from 'fast-deep-equal';
import { kebabCase } from 'lodash-es';
import qs from 'query-string';
import { memo, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import AgentCard from '@/components/agent/AgentCard';
import { AGENTS_INDEX_GITHUB_ISSUE } from '@/constants/url';
import { useSessionStore } from '@/store/session';
import { sessionSelectors } from '@/store/session/selectors';

const SubmitAgentModal = memo<ModalProps>(({ open, onCancel }) => {
  const [agentId, setAgentId] = useState('');
  const theme = useTheme();
  const currentAgent = useSessionStore(sessionSelectors.currentAgent, isEqual);
  const { meta } = currentAgent;

  const isFormPass = Boolean(
    currentAgent.greeting &&
      meta.name &&
      meta.description &&
      meta.avatar &&
      meta.cover &&
      meta.gender,
  );

  const handleSubmit = () => {
    const body = [
      '### systemRole',
      currentAgent.systemRole,
      '### agentId',
      kebabCase(agentId),
      '### avatar',
      meta.avatar,
      '### cover',
      meta.cover,
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
            message={'请补全助手信息后提交，需要包含名称、描述、头像和封面'}
            showIcon
            type={'warning'}
          />
        )}
        <AgentCard agent={currentAgent} />
        <Divider style={{ margin: '8px 0' }} />
        <strong>
          <span style={{ color: theme.colorError, marginRight: 4 }}>*</span>
          identifier 助手标识符
        </strong>
        <Input
          onChange={(e) => setAgentId(e.target.value)}
          placeholder={'请输入助手的标识符，需要是唯一的，比如 vidol-agent-klee'}
          value={agentId}
        />
      </Flexbox>
    </Modal>
  );
});

export default SubmitAgentModal;
