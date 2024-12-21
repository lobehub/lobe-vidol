import { ReactNode, memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import NavBar from './NavBar';

interface AppLayoutDesktopProps {
  children: ReactNode;
}

const AppLayoutDesktop = memo<AppLayoutDesktopProps>(({ children }) => {
  return (
    <Flexbox height={'100%'} width={'100%'} horizontal>
      <NavBar />
      <Flexbox flex={1} height={'100%'} width={'100%'}>
        {children}
      </Flexbox>
    </Flexbox>
  );
});

export default AppLayoutDesktop;
