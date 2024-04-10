import { danceListSelectors, useDanceStore } from '@/store/dance';
import { marketStoreSelectors, useMarketStore } from '@/store/market';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { Card, List } from 'antd';
import { memo } from 'react';

const { Meta } = List.Item;

const DanceList = () => {
  const [activateDance, danceList, danceLoading, showDanceSidebar] = useMarketStore((s) => [
    s.activateDance,
    s.danceList,
    s.danceLoading,
    marketStoreSelectors.showDanceSideBar(s),
  ]);
  const [subscribed] = useDanceStore((s) => [danceListSelectors.subscribed(s)]);
  return (
    <List
      dataSource={danceList}
      grid={{ column: showDanceSidebar ? 3 : 4, gutter: 8 }}
      loading={danceLoading}
      renderItem={(item) => {
        const isSubscribed = subscribed(item.danceId);
        return (
          <List.Item style={{ position: 'relative' }}>
            <Card
              cover={
                // eslint-disable-next-line @next/next/no-img-element,
                <img alt="thumb" height={108} src={item.thumb} style={{ objectFit: 'cover' }} />
              }
              hoverable
              onClick={() => {
                activateDance(item.danceId);
              }}
            >
              <Meta title={item.name} />
            </Card>
            {isSubscribed ? (
              <CheckCircleTwoTone
                style={{ fontSize: 24, position: 'absolute', right: 8, top: 8 }}
                twoToneColor="#52c41a"
              />
            ) : null}
          </List.Item>
        );
      }}
    />
  );
};

export default memo(DanceList);
