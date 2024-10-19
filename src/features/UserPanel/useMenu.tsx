import { DiscordIcon, Icon } from '@lobehub/ui';
import { ItemType } from 'antd/es/menu/interface';
import { Book, Download, Feather, LifeBuoy, Mail } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import type { MenuProps } from '@/components/Menu';
import { DISCORD, DOCUMENTS_REFER_URL, EMAIL_SUPPORT, GITHUB_ISSUES } from '@/constants/url';
// import DataImporter from '@/features/DataImporter';
import { usePWAInstall } from '@/hooks/usePWAInstall';

// import { configService } from '@/services/config';

export const useMenu = () => {
  const { canInstall, install } = usePWAInstall();
  const { t } = useTranslation(['common', 'setting', 'auth']);

  /* ↓ cloud slot ↓ */

  /* ↑ cloud slot ↑ */

  const pwa: MenuProps['items'] = [
    {
      icon: <Icon icon={Download} />,
      key: 'pwa',
      label: t('installPWA'),
      onClick: () => install(),
    },
    {
      type: 'divider',
    },
  ];

  // const data = [
  //   // {
  //   //   icon: <Icon icon={HardDriveDownload} />,
  //   //   key: 'import',
  //   //   label: <DataImporter>{t('import')}</DataImporter>,
  //   // },
  //   {
  //     children: [
  //       // {
  //       //   key: 'allAgent',
  //       //   label: t('exportType.allAgent'),
  //       //   onClick: configService.exportAgents,
  //       // },
  //       // {
  //       //   key: 'allAgentWithMessage',
  //       //   label: t('exportType.allAgentWithMessage'),
  //       //   onClick: configService.exportSessions,
  //       // },
  //       // {
  //       //   key: 'globalSetting',
  //       //   label: t('exportType.globalSetting'),
  //       //   onClick: configService.exportSettings,
  //       // },
  //       {
  //         type: 'divider',
  //       },
  //       // {
  //       //   key: 'all',
  //       //   label: t('exportType.all'),
  //       //   onClick: configService.exportAll,
  //       // },
  //     ],
  //     icon: <Icon icon={HardDriveUpload} />,
  //     key: 'export',
  //     label: t('export'),
  //   },
  //   {
  //     type: 'divider',
  //   },
  // ].filter(Boolean) as ItemType[];

  const helps: MenuProps['items'] = [
    {
      icon: <Icon icon={DiscordIcon} />,
      key: 'discord',
      label: (
        <Link href={DISCORD} target={'_blank'}>
          {t('userPanel.discord')}
        </Link>
      ),
    },
    {
      children: [
        {
          icon: <Icon icon={Book} />,
          key: 'docs',
          label: (
            <Link href={DOCUMENTS_REFER_URL} target={'_blank'}>
              {t('userPanel.docs')}
            </Link>
          ),
        },
        {
          icon: <Icon icon={Feather} />,
          key: 'feedback',
          label: (
            <Link href={GITHUB_ISSUES} target={'_blank'}>
              {t('userPanel.feedback')}
            </Link>
          ),
        },
        {
          icon: <Icon icon={Mail} />,
          key: 'email',
          label: (
            <Link href={EMAIL_SUPPORT} target={'_blank'}>
              {t('userPanel.email')}
            </Link>
          ),
        },
      ],
      icon: <Icon icon={LifeBuoy} />,
      key: 'help',
      label: t('userPanel.help'),
    },
    {
      type: 'divider',
    },
  ].filter(Boolean) as ItemType[];

  const mainItems = [
    {
      type: 'divider',
    },
    ...(canInstall ? pwa : []),
    // ...data,
    ...helps,
  ].filter(Boolean) as MenuProps['items'];

  return { mainItems };
};
