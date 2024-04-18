import { PropsWithChildren } from 'react';

import { MyTabs } from '@/app/my/SideBar/type';

import MyLayout from '../layout.desktop';

export default ({ children }: PropsWithChildren) => {
  return <MyLayout activeTab={MyTabs.Config}>{children}</MyLayout>;
};
