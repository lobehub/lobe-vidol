import { useConfigStore } from '@/store/config';
import { useDanceStore } from '@/store/dance';
import { useMarketStore } from '@/store/market';
import { GradientButton } from '@lobehub/ui';
import { Card, List } from 'antd';
import { Flexbox } from 'react-layout-kit';

const { Meta } = Card;

const DanceList = () => {
  const [danceList, activateDance] = useDanceStore((s) => [s.danceList, s.activateDance]);
  const [openPanel] = useConfigStore((s) => [s.openPanel]);
  const [setTab] = useMarketStore((s) => [s.setTab]);

  return (
    <>
      <Flexbox align="center" distribution="space-between" horizontal style={{ marginBottom: 12 }}>
        <h2>订阅列表</h2>
        <GradientButton
          glow
          onClick={() => {
            openPanel('market');
            setTab('dance');
          }}
          size="middle"
        >
          + 订阅舞蹈
        </GradientButton>
      </Flexbox>
      <List
        dataSource={danceList}
        grid={{ column: 4, gutter: 8 }}
        renderItem={(item) => (
          <List.Item>
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
          </List.Item>
        )}
      />
    </>
  );
};

export default DanceList;
