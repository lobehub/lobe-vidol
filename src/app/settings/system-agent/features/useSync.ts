import { FormInstance } from 'antd';
import { useLayoutEffect } from 'react';

import { useSettingStore } from '@/store/setting';

export const useSyncSystemAgent = (form: FormInstance, settings: any) => {
  useLayoutEffect(() => {
    // Set initial form values
    form.setFieldsValue(settings);

    // Sync form values with updated settings
    const unsubscribe = useSettingStore.subscribe(
      (s) => s.config.systemAgent,
      (newSettings) => {
        form.setFieldsValue(newSettings);
      },
    );

    return () => {
      unsubscribe();
    };
  }, [form, settings]);
};
