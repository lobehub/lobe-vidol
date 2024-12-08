'use client';

import { Form, type ItemGroup } from '@lobehub/ui';
import { Form as AntForm } from 'antd';
import isEqual from 'fast-deep-equal';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { FORM_STYLE } from '@/constants/token';
import ModelSelect from '@/features/ModelSelect';
import { useSettingStore } from '@/store/setting';
import { systemAgentSelectors } from '@/store/setting/selectors';
import { SystemAgentConfigKey } from '@/types/agent';

import { useSyncSystemAgent } from './useSync';

type SettingItemGroup = ItemGroup;

interface SystemAgentFormProps {
  systemAgentKey: SystemAgentConfigKey;
}

const SystemAgentForm = memo(({ systemAgentKey }: SystemAgentFormProps) => {
  const { t } = useTranslation('settings');

  const settings = useSettingStore(systemAgentSelectors.currentSystemAgent, isEqual);
  const [updateSystemAgent] = useSettingStore((s) => [s.updateSystemAgent]);

  const [form] = AntForm.useForm();
  const value = settings[systemAgentKey];

  const systemAgentSettings: SettingItemGroup = {
    children: [
      {
        children: (
          <ModelSelect
            onChange={(props) => {
              updateSystemAgent(systemAgentKey, props);
            }}
            showAbility={false}
            // value={value}
          />
        ),
        desc: t(`systemAgent.${systemAgentKey}.modelDesc`),
        label: t(`systemAgent.${systemAgentKey}.label`),
        name: systemAgentKey,
      },
    ],
    title: (
      <span
        style={{
          opacity: typeof value.enabled === 'boolean' && !value.enabled ? 0.45 : 1,
        }}
      >
        {t(`systemAgent.${systemAgentKey}.title`)}
      </span>
    ),
  };

  useSyncSystemAgent(form, settings);

  return (
    <Form form={form} initialValues={settings} items={[systemAgentSettings]} {...FORM_STYLE} />
  );
});

export default SystemAgentForm;
