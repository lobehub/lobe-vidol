import { ReactNode, memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import NavBar from './NavBar';
import { HeaderNavKey } from './type';

interface AppLayoutDesktopProps {
  children: ReactNode;
  headerKey?: HeaderNavKey;
}

const AppLayoutDesktop = memo<AppLayoutDesktopProps>(({ children, headerKey }) => {
  return (
    <Flexbox height={'100%'} width={'100%'} horizontal>
      <NavBar headerKey={headerKey} />
      <Flexbox flex={1} height={'100%'} width={'100%'}>
        {children}
      </Flexbox>
    </Flexbox>
  );
});

export default AppLayoutDesktop;
