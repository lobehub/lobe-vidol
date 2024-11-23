import { FormInstance } from 'antd/es/form/hooks/useForm';
import { useLayoutEffect } from 'react';

import { useSettingStore } from '@/store/setting';

export const useSyncSettings = (form: FormInstance) => {
  useLayoutEffect(() => {
    // set the first time
    form.setFieldsValue(useSettingStore.getState().config);

    // sync with later updated settings
    const unsubscribe = useSettingStore.subscribe(
      (s) => s.config,
      (config) => {
        form.setFieldsValue(config);
      },
    );

    return () => {
      unsubscribe();
    };
  }, []);
};
