import { ActionIcon } from '@lobehub/ui';
import { List } from 'antd';
import { createStyles } from 'antd-style';
import { get, isEqual } from 'lodash-es';
import { PlayIcon, XIcon } from 'lucide-react';

import { speakCharacter } from '@/features/messages/speakCharacter';
import { agentSelectors, useAgentStore } from '@/store/agent';
import { useGlobalStore } from '@/store/global';
import { TouchAction, TouchAreaEnum } from '@/types/touch';

const useStyles = createStyles(({ css, token }) => ({
  active: css`
    background-color: ${token.controlItemBgActiveHover};
  `,
  list: css`
    width: 100%;
    padding: 24px;
  `,
  listItem: css`
    &:hover {
      cursor: pointer;
    }
  `,
}));

interface AreaListProps {
  currentTouchArea: TouchAreaEnum;
}

const AreaList = (props: AreaListProps) => {
  const { styles } = useStyles();
  const { currentTouchArea } = props;
  const [currentAgentTouch, removeTouchAction] = useAgentStore((s) => [
    agentSelectors.currentAgentTouch(s),
    s.removeTouchAction,
  ]);
  const currentAgentTTS = useAgentStore((s) => agentSelectors.currentAgentTTS(s), isEqual);

  const viewer = useGlobalStore((s) => s.viewer);

  const data = currentAgentTouch ? (get(currentAgentTouch, currentTouchArea) as TouchAction[]) : [];

  return (
    <List
      className={styles.list}
      dataSource={data}
      header={<div>触摸反应列表</div>}
      renderItem={(item, index) => (
        <List.Item
          actions={[
            <ActionIcon
              icon={PlayIcon}
              key="play"
              onClick={() => {
                speakCharacter(
                  {
                    emotion: item.emotion,
                    tts: {
                      ...currentAgentTTS,
                      message: item.text,
                    },
                  },
                  viewer,
                );
              }}
            />,
            <ActionIcon
              icon={XIcon}
              key="delete"
              onClick={() => {
                removeTouchAction(currentTouchArea, index);
              }}
            />,
          ]}
          className={styles.listItem}
        >
          <List.Item.Meta title={item.text}></List.Item.Meta>
        </List.Item>
      )}
    />
  );
};

export default AreaList;
