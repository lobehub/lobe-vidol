import { Space } from 'antd';
import classNames from 'classnames';
import isEqual from 'fast-deep-equal';
import React, { memo, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';

import Header from '@/components/Header';
import Item from '@/features/ChatItem';
import { sessionSelectors, useSessionStore } from '@/store/session';

import History from './Actions/History';
import TokenMini from './Actions/TokenMini';
import AutoScroll from './AutoScroll';
import { useStyles } from './style';

const itemContent = (index: number, id: string) => {
  return index === 0 ? (
    <div style={{ height: 24 }} />
  ) : (
    <Item id={id} index={index - 1} showTitle />
  );
};

interface VirtualizedListProps {
  className?: string;
  mobile?: boolean;
  style?: React.CSSProperties;
}
const VirtualizedList = memo<VirtualizedListProps>(({ mobile, className, style }) => {
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const [atBottom, setAtBottom] = useState(true);
  const { styles } = useStyles();
  const { t } = useTranslation('chat');

  const data = useSessionStore(
    (s) => ['empty', ...sessionSelectors.currentChatIDsWithGreetingMessage(s)],
    isEqual,
  );
  const [id, chatLoading] = useSessionStore((s) => [s.activeId, !!s.chatLoadingId]);

  useEffect(() => {
    if (virtuosoRef.current) {
      virtuosoRef.current.scrollToIndex({ align: 'end', behavior: 'auto', index: 'LAST' });
    }
  }, [id]);

  // overscan should be 1.5 times the height of the window
  const overscan = typeof window !== 'undefined' ? window.innerHeight * 1.5 : 0;

  // @ts-ignore
  return chatLoading && data.length === 2 ? null : (
    <Flexbox style={style} className={classNames(className, styles.list)}>
      <Header
        title={t('history.title')}
        className={styles.header}
        extra={
          <Space>
            <TokenMini />
            <History key={'history'} />
          </Space>
        }
      />
      <Virtuoso
        atBottomStateChange={setAtBottom}
        atBottomThreshold={60 * (mobile ? 2 : 1)}
        computeItemKey={(_, item) => item}
        data={data}
        followOutput={'auto'}
        initialTopMostItemIndex={data?.length - 1}
        itemContent={itemContent}
        overscan={overscan}
        ref={virtuosoRef}
      />
      <AutoScroll
        atBottom={atBottom}
        onScrollToBottom={(type) => {
          const virtuoso = virtuosoRef.current;
          switch (type) {
            case 'auto': {
              virtuoso?.scrollToIndex({ align: 'end', behavior: 'auto', index: 'LAST' });
              break;
            }
            case 'click': {
              virtuoso?.scrollToIndex({ align: 'end', behavior: 'smooth', index: 'LAST' });
              break;
            }
          }
        }}
      />
    </Flexbox>
  );
});

export default VirtualizedList;
