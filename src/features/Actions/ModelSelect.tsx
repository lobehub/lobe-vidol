import { Dropdown } from 'antd';
import { createStyles } from 'antd-style';
import { memo } from 'react';

import ModelIcon from '@/components/ModelIcon';
import ModelTag from '@/components/ModelTag';
import { OPENAI_MODEL_LIST } from '@/constants/openai';
import useSessionContext from '@/hooks/useSessionContext';
import { useAgentStore } from '@/store/agent';

const useStyles = createStyles(({ css, prefixCls }) => ({
  menu: css`
    .${prefixCls}-dropdown-menu-item {
      display: flex;
      gap: 8px;
      margin: 4px 0 !important;
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

const ModelSelect = memo(() => {
  const { styles } = useStyles();

  const { updateChatModel } = useAgentStore();

  const model = useSessionContext()?.sessionAgent?.chatModel?.model;

  const items = OPENAI_MODEL_LIST.map((item) => {
    return {
      icon: <ModelIcon model={item.id} size={18} />,
      key: item.id,
      label: item.displayName,
      onClick: () => updateChatModel({ model: item.id }),
    };
  });

  return (
    <Dropdown
      menu={{
        items,
        className: styles.menu,
        activeKey: model,
        style: {
          maxHeight: 500,
          overflowY: 'scroll',
        },
      }}
      placement={'topLeft'}
      trigger={['click']}
    >
      <div className={styles.tag}>
        <ModelTag model={model} />
      </div>
    </Dropdown>
  );
});

export default ModelSelect;
