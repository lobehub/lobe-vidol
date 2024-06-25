import { Bot, Mic2 } from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { MyTabs } from '../type';
import Item from './Item';

export interface MyListProps {
  activeTab?: MyTabs;
  mobile?: boolean;
}
const MyList = memo<MyListProps>(({ activeTab, mobile }) => {
  const { t } = useTranslation('my');

  const items = [
    { icon: Bot, label: t('myRole'), value: MyTabs.Agent },
    { icon: Mic2, label: t('myDance'), value: MyTabs.Dance },
  ];

  return items.map(({ value, icon, label }) => (
    <Link aria-label={label} href={`/my/${value}`} key={value}>
      <Item
        active={mobile ? false : activeTab === value}
        hoverable={!mobile}
        icon={icon}
        label={label}
      />
    </Link>
  ));
});

export default MyList;
