import { ActionIcon } from '@lobehub/ui';
import { isEqual } from 'lodash-es';
import { Loader2, PlayIcon } from 'lucide-react';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DEFAULT_MOTION_ANIMATION_FEMALE } from '@/constants/touch';
import { speakCharacter } from '@/features/messages/speakCharacter';
import { agentSelectors, useAgentStore } from '@/store/agent';
import { useGlobalStore } from '@/store/global';
import { TouchAction } from '@/types/touch';
import { fetchWithProgress } from '@/utils/fetch';

interface Props {
  touchAction: TouchAction;
}

export default memo((props: Props) => {
  const { touchAction } = props;
  const [loading, setLoading] = useState(false);
  const viewer = useGlobalStore((s) => s.viewer);
  const { t } = useTranslation('panel');

  const currentAgentTTS = useAgentStore((s) => agentSelectors.currentAgentTTS(s), isEqual);

  if (!touchAction) {
    return null;
  }

  return (
    <ActionIcon
      icon={loading ? Loader2 : PlayIcon}
      spin={loading}
      disable={loading}
      title={t('dance.play')}
      key="play"
      onClick={() => {
        setLoading(true);

        if (touchAction.motion) {
          const item = DEFAULT_MOTION_ANIMATION_FEMALE.find(
            (item) => item.id === touchAction.motion,
          );
          if (item) {
            fetchWithProgress(item.url).then((blob) => {
              const url = window.URL.createObjectURL(blob);
              viewer.model?.loadFBX(url);
            });
          }
        }

        speakCharacter(
          {
            emotion: touchAction.emotion,
            tts: {
              ...currentAgentTTS,
              message: touchAction.text,
            },
            motion: touchAction.motion,
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
