import { ReactNode, memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import Header from './Header';
import { HeaderNavKey } from './type';

interface AppLayoutDesktopProps {
  children: ReactNode;
  headerKey?: HeaderNavKey;
}

const AppLayoutDesktop = memo<AppLayoutDesktopProps>(({ children, headerKey }) => {
  return (
    <Flexbox height={'100%'} horizontal width={'100%'}>
      <Header headerKey={headerKey} />
      {children}
    </Flexbox>
  );
});

export default AppLayoutDesktop;
