import { PropsWithChildren } from 'react';

import { MarketTabs } from '@/app/market/SideBar/type';

import MarketLayout from '../layout.desktop';

export default ({ children }: PropsWithChildren) => {
  return <MarketLayout activeTab={MarketTabs.Agent}>{children}</MarketLayout>;
};
