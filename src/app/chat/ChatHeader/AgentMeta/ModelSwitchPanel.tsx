import { Icon } from '@lobehub/ui';
import { Dropdown } from 'antd';
import { createStyles } from 'antd-style';
import type { ItemType } from 'antd/es/menu/interface';
import isEqual from 'fast-deep-equal';
import { LucideArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { ModelItemRender, ProviderItemRender } from '@/components/ModelSelect';
import { LOBE_VIDOL_DEFAULT_AGENT_ID } from '@/constants/agent';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useAgentStore } from '@/store/agent';
import { sessionSelectors, useSessionStore } from '@/store/session';
import { useSettingStore } from '@/store/setting';
import { modelProviderSelectors } from '@/store/setting/selectors';
import { ModelProviderCard } from '@/types/llm';

const useStyles = createStyles(({ css, prefixCls }) => ({
  menu: css`
    .${prefixCls}-dropdown-menu-item {
      display: flex;
      gap: 8px;
    }
    .${prefixCls}-dropdown-menu {
      &-item-group-title {
        padding-inline: 8px;
      }

      &-item-group-list {
        margin: 0 !important;
      }
    }
  `,
  tag: css`
    cursor: pointer;
  `,
}));

const menuKey = (provider?: string, model?: string) => `${provider}-${model}`;

const ModelSwitchPanel = memo<PropsWithChildren>(({ children }) => {
  const { t } = useTranslation('components');
  const { styles, theme } = useStyles();
  const [agent] = useSessionStore((s) => [sessionSelectors.currentAgent(s)], isEqual);

  const [updateAgentConfig] = useAgentStore((s) => [s.updateAgentConfig]);

  console.log(agent);

  const isMobile = useIsMobile();

  const router = useRouter();

  const enabledList = useSettingStore(
    modelProviderSelectors.modelProviderListForModelSelect,
    isEqual,
  );

  const items = useMemo<ItemType[]>(() => {
    const getModelItems = (provider: ModelProviderCard) => {
      const items = provider.chatModels.map((model) => ({
        key: menuKey(provider.id, model.id),
        label: <ModelItemRender {...model} />,
        onClick: () => {
          updateAgentConfig(
            { model: model.id, provider: provider.id },
            agent?.agentId || LOBE_VIDOL_DEFAULT_AGENT_ID,
          );
        },
      }));

      // if there is empty items, add a placeholder guide
      if (items.length === 0)
        return [
          {
            key: 'empty',
            label: (
              <Flexbox gap={8} horizontal style={{ color: theme.colorTextTertiary }}>
                {t('ModelSwitchPanel.emptyModel')}
                <Icon icon={LucideArrowRight} />
              </Flexbox>
            ),
            onClick: () => {
              router.push('/settings/llm');
            },
          },
        ];

      return items;
    };

    // otherwise show with provider group
    return enabledList.map((provider) => ({
      children: getModelItems(provider),
      key: provider.id,
      label: <ProviderItemRender name={provider.name} provider={provider.id} />,
      type: 'group',
    }));
  }, [enabledList]);

  return (
    <Dropdown
      menu={{
        activeKey: menuKey(agent?.provider, agent?.model),
        className: styles.menu,
        items,
        style: {
          maxHeight: 500,
          overflowY: 'scroll',
        },
      }}
      placement={isMobile ? 'top' : 'topLeft'}
      trigger={['click']}
    >
      <div className={styles.tag}>{children}</div>
    </Dropdown>
  );
});

export default ModelSwitchPanel;
