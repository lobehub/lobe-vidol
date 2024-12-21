import { Icon } from '@lobehub/ui';
import { Brain, Mic2, MousePointerClick, Settings2 } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { MenuProps } from '@/components/Menu';
import { SettingsTabs } from '@/store/global/index';

export const useCategory = () => {
  const { t } = useTranslation('settings');

  const cateItems: MenuProps['items'] = useMemo(
    () =>
      [
        {
          icon: <Icon icon={Settings2} />,
          key: SettingsTabs.Common,
          label: (
            <Link href={'/settings/common'} onClick={(e) => e.preventDefault()}>
              {t('common.title')}
            </Link>
          ),
        },
        // {
        //   icon: <Icon icon={Sparkles} />,
        //   key: SettingsTabs.SystemAgent,
        //   label: (
        //     <Link href={'/settings/system-agent'} onClick={(e) => e.preventDefault()}>
        //       {t('tab.system-agent')}
        //     </Link>
        //   ),
        // },
        {
          icon: <Icon icon={Brain} />,
          key: SettingsTabs.LLM,
          label: (
            <Link href={'/settings/llm'} onClick={(e) => e.preventDefault()}>
              {t('llm.title')}
            </Link>
          ),
        },

        {
          icon: <Icon icon={Mic2} />,
          key: SettingsTabs.TTS,
          label: (
            <Link href={'/settings/tts'} onClick={(e) => e.preventDefault()}>
              {t('tts.title')}
            </Link>
          ),
        },
        {
          icon: <Icon icon={MousePointerClick} />,
          key: SettingsTabs.Touch,
          label: (
            <Link href={'/settings/touch'} onClick={(e) => e.preventDefault()}>
              {t('touch.title')}
            </Link>
          ),
        },
      ].filter(Boolean) as MenuProps['items'],
    [t],
  );

  return cateItems;
};
