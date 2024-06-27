import { OpenAI } from '@lobehub/icons';
import { Icon, Tooltip } from '@lobehub/ui';
import { Typography } from 'antd';
import { Infinity, LucideEye, LucidePaperclip, ToyBrick } from 'lucide-react';
import numeral from 'numeral';
import { memo } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

import { ChatModelCard } from '@/types/llm';

import ModelIcon from '../ModelIcon';
import useStyles from './style';

const formatTokenNumber = (num: number): string => {
  if (num > 0 && num < 1024) return '1K';

  let kiloToken = Math.floor(num / 1024);
  if (num >= 128_000 && num < 1_024_000) {
    kiloToken = Math.floor(num / 1000);
  }
  return kiloToken < 1000 ? `${kiloToken}K` : `${Math.floor(kiloToken / 1000)}M`;
};

interface ModelInfoTagsProps extends ChatModelCard {
  directionReverse?: boolean;
  placement?: 'top' | 'right';
}

export const ModelInfoTags = memo<ModelInfoTagsProps>(
  ({ directionReverse, placement = 'right', ...model }) => {
    const { styles, cx } = useStyles();

    return (
      <Flexbox direction={directionReverse ? 'horizontal-reverse' : 'horizontal'} gap={4}>
        {model.files && (
          <Tooltip
            overlayStyle={{ pointerEvents: 'none' }}
            placement={placement}
            title={'该模型支持上传文件读取与识别'}
          >
            <div className={cx(styles.tag, styles.tagGreen)} style={{ cursor: 'pointer' }} title="">
              <Icon icon={LucidePaperclip} />
            </div>
          </Tooltip>
        )}
        {model.vision && (
          <Tooltip
            overlayStyle={{ pointerEvents: 'none' }}
            placement={placement}
            title={'该模型支持视觉识别'}
          >
            <div className={cx(styles.tag, styles.tagGreen)} style={{ cursor: 'pointer' }} title="">
              <Icon icon={LucideEye} />
            </div>
          </Tooltip>
        )}
        {model.functionCall && (
          <Tooltip
            overlayStyle={{ maxWidth: 'unset', pointerEvents: 'none' }}
            placement={placement}
            title={'该模型支持函数调用（Function Call）'}
          >
            <div className={cx(styles.tag, styles.tagBlue)} style={{ cursor: 'pointer' }} title="">
              <Icon icon={ToyBrick} />
            </div>
          </Tooltip>
        )}
        {model.tokens !== undefined && (
          <Tooltip
            overlayStyle={{ maxWidth: 'unset', pointerEvents: 'none' }}
            placement={placement}
            title={`该模型单个会话最多支持 ${model.tokens === 0 ? '∞' : numeral(model.tokens).format('0,0')} Tokens`}
          >
            <Center className={styles.token} title="">
              {model.tokens === 0 ? (
                <Infinity size={17} strokeWidth={1.6} />
              ) : (
                formatTokenNumber(model.tokens)
              )}
            </Center>
          </Tooltip>
        )}
      </Flexbox>
    );
  },
);

interface ModelItemRenderProps extends ChatModelCard {
  showInfoTag?: boolean;
}

export const ModelItemRender = memo<ModelItemRenderProps>(({ showInfoTag = true, ...model }) => {
  const modelName = model.displayName || model.id;

  return (
    <Flexbox horizontal align={'center'} gap={32} justify={'space-between'}>
      <Flexbox horizontal align={'center'} gap={8} style={{ overflow: 'hidden' }}>
        <ModelIcon model={model.id} size={20} />
        <Typography.Text ellipsis={{ tooltip: modelName }}>{modelName}</Typography.Text>
      </Flexbox>
      {showInfoTag && <ModelInfoTags {...model} />}
    </Flexbox>
  );
});

export const ProviderItemRender = memo<{ name: string }>(({ name }) => (
  <Flexbox align={'center'} gap={4} horizontal>
    <OpenAI size={20} />
    {name}
  </Flexbox>
));
