import { TabsNav } from '@lobehub/ui';
import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { Tab } from '../type';
import { useStyles } from './style';

interface Props {
  className?: string;
  setTab: (tab: Tab) => void;
  tab: Tab;
}
export default (props: Props) => {
  const { className, tab, setTab } = props;
  const { styles } = useStyles();
  const { t } = useTranslation('features');

  return (
    <Flexbox
      justify={'space-between'}
      horizontal
      align={'center'}
      className={classNames(styles.header, className)}
    >
      <TabsNav
        activeKey={tab}
        items={[
          {
            label: t('info.history'),
            key: Tab.History,
          },
          {
            label: t('info.playlist'),
            key: Tab.PlayList,
          },
          {
            label: t('info.motions'),
            key: Tab.Motions,
          },
          {
            label: t('info.posture'),
            key: Tab.Posture,
          },
        ]}
        onChange={(key) => {
          setTab(key as Tab);
        }}
      />
    </Flexbox>
  );
};
