import { ActionIcon } from '@lobehub/ui';
import { isEqual } from 'lodash-es';
import { Loader2, PlayIcon } from 'lucide-react';
import { memo, useState } from 'react';

import { speakCharacter } from '@/features/messages/speakCharacter';
import { agentSelectors, useAgentStore } from '@/store/agent';
import { useGlobalStore } from '@/store/global';
import { TouchAction } from '@/types/touch';

interface Props {
  item: TouchAction;
}

export default memo((props: Props) => {
  const { item } = props;
  const [loading, setLoading] = useState(false);
  const viewer = useGlobalStore((s) => s.viewer);

  const currentAgentTTS = useAgentStore((s) => agentSelectors.currentAgentTTS(s), isEqual);

  if (!item) {
    return null;
  }

  return (
    <ActionIcon
      icon={loading ? Loader2 : PlayIcon}
      spin={loading}
      disable={loading}
      key="play"
      onClick={() => {
        setLoading(true);
        speakCharacter(
          {
            emotion: item.emotion,
            tts: {
              ...currentAgentTTS,
              message: item.text,
            },
          },
          viewer,
          () => {},
          () => {
            setLoading(false);
          },
        );
      }}
    />
  );
});
