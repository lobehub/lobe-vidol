import { ActionIcon, GradientButton } from '@lobehub/ui';
import { Empty } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { PlusCircle } from 'lucide-react';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import Header from '@/components/Header';
import { useDanceStore } from '@/store/dance';
import { useGlobalStore } from '@/store/global';

import DanceItem from './Item';

interface PlayListProps {
  className?: string;
  style?: React.CSSProperties;
}

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    position: relative;
    height: 100%;
    background-color: rgba(255, 255, 255, 2%);
    border-radius: ${token.borderRadius}px;
  `,
  list: css`
    overflow-y: scroll;
    width: 100%;
    padding: 0 ${token.paddingSM}px;
  `,
  player: css`
    width: 100%;
    height: 64px;
    padding: 0 ${token.paddingSM}px;
    border-top: 1px solid ${token.colorBorder};
  `,
}));

const DanceList = (props: PlayListProps) => {
  const danceList = useDanceStore((s) => s.danceList);
  const [openPanel] = useGlobalStore((s) => [s.openPanel]);

  const { t } = useTranslation(['panel', 'common']);
  const { className, style } = props;
  const { styles } = useStyles();

  return (
    <Flexbox className={classNames(className, styles.container)} style={style} id={'dance-list'}>
      <Flexbox className={styles.list} flex={1}>
        <Header
          title={t('danceList', { ns: 'common' })}
          extra={
            <ActionIcon
              icon={PlusCircle}
              onClick={() => {
                openPanel('dance');
              }}
              title={t('dance.musicAndDance')}
            />
          }
        />

        {danceList.map((item) => {
          return <DanceItem danceItem={item} key={item.danceId} />;
        })}
        {danceList.length === 0 ? (
          <Empty description={t('dance.noPlayList')} image={Empty.PRESENTED_IMAGE_SIMPLE}>
            <GradientButton
              glow
              size="middle"
              onClick={() => {
                openPanel('dance');
              }}
            >
              {t('dance.musicAndDance')}
            </GradientButton>
          </Empty>
        ) : null}
      </Flexbox>
    </Flexbox>
  );
};

export default memo(DanceList);
