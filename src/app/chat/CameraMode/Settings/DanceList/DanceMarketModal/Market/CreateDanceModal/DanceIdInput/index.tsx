import { Icon } from '@lobehub/ui';
import { Button, Input, Space } from 'antd';
import { kebabCase } from 'lodash-es';
import { Dices } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface DanceIdInputProps {
  className?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
  value?: string;
}

const DanceIdInput: React.FC<DanceIdInputProps> = ({ onChange, value, className, style }) => {
  const { t } = useTranslation('dance');

  return (
    <Space.Compact style={{ width: '100%', ...style }} className={className}>
      <Input
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={t('create.danceId.placeholder')}
        value={value}
      />
      <Button
        type="primary"
        icon={<Icon icon={Dices} />}
        title={t('create.danceId.random')}
        onClick={() => {
          const randomId = Math.random().toString(36).slice(7);
          if (onChange) {
            onChange(kebabCase(randomId));
          }
        }}
      ></Button>
    </Space.Compact>
  );
};

export default DanceIdInput;
