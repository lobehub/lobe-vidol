import { usePathname } from 'next/navigation';

import { HeaderNavKey } from '@/layout/type';

/**
 * Returns the active tab key (chat/market/settings/...)
 */
export const useActiveTabKey = () => {
  const pathname = usePathname();

  return pathname.split('/').find(Boolean)! as HeaderNavKey;
};
