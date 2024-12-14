import classNames from 'classnames';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Flexbox } from 'react-layout-kit';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';

import Item from '@/features/ChatItem';
import { useSessionStore } from '@/store/session';

import AutoScroll from './AutoScroll';
import { useStyles } from './style';

interface VirtualizedListProps {
  className?: string;
  data: string[];
  mobile?: boolean;

  style?: React.CSSProperties;
}
const VirtualizedList = memo<VirtualizedListProps>(({ mobile, className, style, data }) => {
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const [atBottom, setAtBottom] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const { styles } = useStyles();

  const [id, chatLoading] = useSessionStore((s) => [s.activeId, !!s.chatLoadingId]);

  const prevDataLengthRef = useRef(data.length);

  const getFollowOutput = useCallback(() => {
    const newFollowOutput = data.length > prevDataLengthRef.current ? 'auto' : false;
    prevDataLengthRef.current = data.length;
    return newFollowOutput;
  }, [data.length]);

  useEffect(() => {
    if (virtuosoRef.current) {
      virtuosoRef.current.scrollToIndex({ align: 'end', behavior: 'auto', index: 'LAST' });
    }
  }, [id]);

  // overscan should be 3 times the height of the window
  const overscan = typeof window !== 'undefined' ? window.innerHeight * 2 : 0;

  // @ts-ignore
  return chatLoading && data.length === 2 ? null : (
    <Flexbox style={style} className={classNames(className, styles.list)}>
      <Virtuoso
        atBottomStateChange={setAtBottom}
        atBottomThreshold={50 * (mobile ? 2 : 1)}
        computeItemKey={(_, item) => item}
        data={data}
        followOutput={getFollowOutput}
        increaseViewportBy={overscan}
        isScrolling={setIsScrolling}
        initialTopMostItemIndex={data?.length - 1}
        itemContent={(index, id) => <Item id={id} showTitle />}
        overscan={overscan}
        ref={virtuosoRef}
      />
      <AutoScroll
        atBottom={atBottom}
        isScrolling={isScrolling}
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
