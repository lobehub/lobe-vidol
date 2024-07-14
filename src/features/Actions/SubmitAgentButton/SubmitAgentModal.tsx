'use client';

import { Alert, Icon, Modal, type ModalProps } from '@lobehub/ui';
import { Button, Divider, Input, Popover, Progress, Space, Typography, message } from 'antd';
import { useTheme } from 'antd-style';
import isEqual from 'fast-deep-equal';
import { kebabCase } from 'lodash-es';
import { Dices } from 'lucide-react';
import qs from 'query-string';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import AgentCard from '@/components/agent/AgentCard';
import SystemRole from '@/components/agent/SystemRole';
import { AGENTS_INDEX_GITHUB_ISSUE } from '@/constants/url';
import { useUploadAgent } from '@/hooks/useUploadAgent';
import { agentSelectors, useAgentStore } from '@/store/agent';
import { Agent } from '@/types/agent';

const SubmitAgentModal = memo<ModalProps>(({ open, onCancel }) => {
  const [agentId, setAgentId] = useState('');
  const theme = useTheme();
  const currentAgent: Agent | undefined = useAgentStore(
    (s) => agentSelectors.currentAgentItem(s),
    isEqual,
  );
  const meta = currentAgent?.meta;
  const { t } = useTranslation(['features', 'error']);

  const { uploading, uploadAgentData, percent } = useUploadAgent();

  const isFormPass = Boolean(
    currentAgent?.greeting &&
      currentAgent?.systemRole &&
      meta?.name &&
      meta?.description &&
      meta?.avatar &&
      meta?.model,
  );

  const handleSubmit = async () => {
    if (!currentAgent || !meta || !agentId) {
      return;
    }

    const { avatarUrl, coverUrl, modelUrl } = await uploadAgentData(agentId, meta);
    if (!avatarUrl || !coverUrl || !modelUrl) {
      message.error(t('fileUploadError', { ns: 'error' }));
      return;
    }

    const body = [
      '### agentId',
      agentId,
      '### avatar',
      avatarUrl,
      '### cover',
      coverUrl,
      '### systemRole',
      currentAgent.systemRole,
      '### greeting',
      currentAgent.greeting,
      '### modelUrl',
      modelUrl,
      '### name',
      meta.name,
      '### description',
      meta.description,
      '### category',
      meta.category,
      '### readme',
      meta.readme,
      '### gender',
      meta.gender,
      '### tts',
      JSON.stringify(currentAgent.tts),
      '### touch',
      JSON.stringify(currentAgent.touch),
      '### model',
      currentAgent.model,
      '### params',
      JSON.stringify(currentAgent.params),
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
        <Popover
          open={uploading}
          title={
            <Flexbox>
              <Typography.Text type={'secondary'}>上传处理中，请勿关闭页面...</Typography.Text>
              <Space>
                <Progress steps={30} percent={percent.cover} size="small" />
                <Typography.Text style={{ fontSize: 12 }}>上传封面</Typography.Text>
              </Space>
              <Space>
                <Progress steps={30} percent={percent.avatar} size="small" />
                <Typography.Text style={{ fontSize: 12 }}>上传头像</Typography.Text>
              </Space>
              <Space>
                <Progress steps={30} percent={percent.model} size="small" />
                <Typography.Text style={{ fontSize: 12 }}>上传模型</Typography.Text>
              </Space>
            </Flexbox>
          }
        >
          <Button
            block
            disabled={!isFormPass || !agentId}
            onClick={handleSubmit}
            size={'large'}
            type={'primary'}
            loading={uploading}
          >
            {t('submit.submitAssistant')}
          </Button>
        </Popover>
      }
      onCancel={onCancel}
      open={open}
      title={t('share.shareToMarket')}
    >
      <Flexbox gap={16}>
        {!isFormPass && <Alert message={t('submit.submitWarning')} showIcon type={'warning'} />}
        <AgentCard agent={currentAgent} />
        <Divider style={{ margin: '8px 0' }} />
        <SystemRole systemRole={currentAgent?.systemRole} />
        <Divider style={{ margin: '8px 0' }} />
        <strong>
          <span style={{ color: theme.colorError, marginRight: 4 }}>*</span>
          agentId {t('submit.assistantId')}
        </strong>
        <Space.Compact style={{ width: '100%' }}>
          <Input
            onChange={(e) => setAgentId(e.target.value)}
            placeholder={t('submit.assistantIdTip')}
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
