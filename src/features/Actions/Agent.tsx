import { ManOutlined, QuestionCircleOutlined, WomanOutlined } from '@ant-design/icons';
import { ActionIcon } from '@lobehub/ui';
import { Popover } from 'antd';
import { PlusCircle } from 'lucide-react';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import Menu, { type MenuProps } from '@/components/Menu';
import { useAgentStore } from '@/store/agent';
import { GenderEnum } from '@/types/agent';

const genderIcons = {
  female: <WomanOutlined />,
  male: <ManOutlined />,
  other: <QuestionCircleOutlined />,
};

const ThemeButton = memo(() => {
  const createNewAgent = useAgentStore((s) => s.createNewAgent);
  const { t } = useTranslation('features');

  const items: MenuProps['items'] = useMemo(
    () => [
      {
        icon: genderIcons.female,
        key: 'light',
        label: t('agent.female'),
        onClick: () => createNewAgent(GenderEnum.FEMALE),
      },
      {
        icon: genderIcons.male,
        key: 'auto',
        label: t('agent.male'),
        onClick: () => createNewAgent(GenderEnum.MALE),
      },
      {
        icon: genderIcons.other,
        key: 'dark',
        label: t('agent.other'),
        onClick: () => createNewAgent(GenderEnum.OTHER),
      },
    ],
    [],
  );

  return (
    <Popover
      arrow={false}
      content={<Menu items={items} />}
      overlayInnerStyle={{
        padding: 0,
      }}
      trigger={['click']}
    >
      <ActionIcon icon={PlusCircle} title={t('agent.create')} />
    </Popover>
  );
});

export default ThemeButton;
