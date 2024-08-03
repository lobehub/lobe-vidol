import { Form, type FormItemProps, Modal, type ModalProps } from '@lobehub/ui';
import { Button, Segmented, SegmentedProps, Switch } from 'antd';
import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { FORM_STYLE } from '@/constants/token';
import { useSessionStore } from '@/store/session';

import { useScreenshot } from '../../../hooks/useScreenshot';
import Preview from './Preview';
import { FieldType, ImageType } from './type';

enum Tab {
  Screenshot = 'screenshot',
  ShareGPT = 'sharegpt',
}

export const imageTypeOptions: SegmentedProps['options'] = [
  {
    label: 'JPG',
    value: ImageType.JPG,
  },
  {
    label: 'PNG',
    value: ImageType.PNG,
  },
  {
    label: 'SVG',
    value: ImageType.SVG,
  },
  {
    label: 'WEBP',
    value: ImageType.WEBP,
  },
];

const DEFAULT_FIELD_VALUE: FieldType = {
  imageType: ImageType.JPG,
  withBackground: true,
  withFooter: false,
  withPluginInfo: false,
  withSystemRole: false,
};

const ShareModal = memo<ModalProps>(({ onCancel, open }) => {
  const [fieldValue, setFieldValue] = useState<FieldType>(DEFAULT_FIELD_VALUE);
  const [tab, setTab] = useState<Tab>(Tab.Screenshot);
  const { t } = useTranslation('features');
  const [shareLoading, shareToShareGPT] = useSessionStore((s) => [
    s.shareLoading,
    s.shareToShareGPT,
  ]);
  const { loading, onDownload, title } = useScreenshot(fieldValue.imageType, '#preview');

  const options: SegmentedProps['options'] = useMemo(
    () => [
      {
        label: t('share.screenshot'),
        value: Tab.Screenshot,
      },
      {
        label: t('share.shareGPT'),
        value: Tab.ShareGPT,
      },
    ],
    [],
  );

  const settings: FormItemProps[] = useMemo(
    () => [
      {
        children: <Switch />,
        label: t('share.withSystemRole'),
        minWidth: undefined,
        name: 'withSystemRole',
        valuePropName: 'checked',
      },
      {
        children: <Switch />,
        hidden: tab !== Tab.Screenshot,
        label: t('share.withBackground'),
        minWidth: undefined,
        name: 'withBackground',
        valuePropName: 'checked',
      },
      {
        children: <Switch />,
        hidden: tab !== Tab.Screenshot,
        label: t('share.withFooter'),
        minWidth: undefined,
        name: 'withFooter',
        valuePropName: 'checked',
      },
      {
        children: <Segmented options={imageTypeOptions} />,
        hidden: tab !== Tab.Screenshot,
        label: t('share.imageType'),
        minWidth: undefined,
        name: 'imageType',
      },
    ],
    [tab],
  );

  return (
    <Modal
      allowFullscreen
      centered={false}
      width={800}
      footer={
        <>
          {tab === Tab.Screenshot && (
            <Button block loading={loading} onClick={onDownload} size={'large'} type={'primary'}>
              {t('share.downloadScreenshot')}
            </Button>
          )}
          {tab === Tab.ShareGPT && (
            <Button
              block
              loading={shareLoading}
              onClick={() => shareToShareGPT({ ...fieldValue })}
              size={'large'}
              type={'primary'}
            >
              {t('share.shareToGPT')}
            </Button>
          )}
        </>
      }
      maxHeight={false}
      onCancel={onCancel}
      open={open}
      title={t('share.share')}
    >
      <Flexbox gap={16}>
        <Segmented
          block
          onChange={(value) => setTab(value as Tab)}
          options={options}
          style={{ width: '100%' }}
          value={tab}
        />
        {tab === Tab.Screenshot && <Preview title={title} {...fieldValue} />}
        <Form
          initialValues={DEFAULT_FIELD_VALUE}
          items={settings}
          itemsType={'flat'}
          onValuesChange={(_, v) => setFieldValue(v)}
          {...FORM_STYLE}
        />
      </Flexbox>
    </Modal>
  );
});

export default ShareModal;
