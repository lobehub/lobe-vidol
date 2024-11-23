import { Wenxin } from '@lobehub/icons';
import { Input } from 'antd';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ModelProvider } from '@/libs/agent-runtime';
import { useSettingStore } from '@/store/setting';
import { keyVaultsConfigSelectors } from '@/store/setting/selectors';

import { FormAction } from '../style';

const WenxinForm = memo(() => {
  const { t } = useTranslation('modelProvider');

  const [accessKey, secretKey, setConfig] = useSettingStore((s) => [
    keyVaultsConfigSelectors.wenxinConfig(s).accessKey,
    keyVaultsConfigSelectors.wenxinConfig(s).secretKey,
    s.updateKeyVaultConfig,
  ]);

  return (
    <FormAction
      avatar={<Wenxin.Color size={56} />}
      description={t('wenxin.unlock.description')}
      title={t('wenxin.unlock.title')}
    >
      <Input.Password
        autoComplete={'new-password'}
        onChange={(e) => {
          setConfig(ModelProvider.Wenxin, { accessKey: e.target.value });
        }}
        placeholder={'Access Key'}
        type={'block'}
        value={accessKey}
      />
      <Input.Password
        autoComplete={'new-password'}
        onChange={(e) => {
          setConfig(ModelProvider.Wenxin, { secretKey: e.target.value });
        }}
        placeholder={'Secret Key'}
        type={'block'}
        value={secretKey}
      />
    </FormAction>
  );
});

export default WenxinForm;
