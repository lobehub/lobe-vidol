import { Bot, Mic2 } from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';

import { MarketTabs } from '../type';
import Item from './Item';

export interface MarketListProps {
  activeTab?: MarketTabs;
  mobile?: boolean;
}

const MarketList = memo<MarketListProps>(({ activeTab, mobile }) => {
  const items = [
    { icon: Bot, label: '角色', value: MarketTabs.Agent },
    { icon: Mic2, label: '跳舞', value: MarketTabs.Dance },
  ];

  return items.map(({ value, icon, label }) => (
    <Link aria-label={label} href={`/market/${value}`} key={value}>
      <Item
        active={mobile ? false : activeTab === value}
        hoverable={!mobile}
        icon={icon}
        label={label}
      />
    </Link>
  ));
});

export default MarketList;
