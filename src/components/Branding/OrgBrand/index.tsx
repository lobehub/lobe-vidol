import { LobeHub, type LobeHubProps } from '@lobehub/ui/brand';
import { memo } from 'react';

import { ORG_NAME } from '@/constants/branding';
import { isCustomORG } from '@/constants/version';

export const OrgBrand = memo<LobeHubProps>((props) => {
  if (isCustomORG) {
    return <span>{ORG_NAME}</span>;
  }

  return <LobeHub {...props} />;
});
