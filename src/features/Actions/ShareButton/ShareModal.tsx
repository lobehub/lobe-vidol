import { Form, type FormItemProps, Modal, type ModalProps } from '@lobehub/ui';
import { Button, Segmented, SegmentedProps, Switch } from 'antd';
import { memo, useMemo, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import { FORM_STYLE } from '@/constants/token';
import { useSessionStore } from '@/store/session';

import Preview from './Preview';
import { FieldType, ImageType } from './type';
import { useScreenshot } from './useScreenshot';

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
  const [shareLoading, shareToShareGPT] = useSessionStore((s) => [
    s.shareLoading,
    s.shareToShareGPT,
  ]);
  const { loading, onDownload, title } = useScreenshot(fieldValue.imageType);

  const options: SegmentedProps['options'] = useMemo(
    () => [
      {
        label: '截图',
        value: Tab.Screenshot,
      },
      {
        label: 'ShareGPT',
        value: Tab.ShareGPT,
      },
    ],
    [],
  );

  const settings: FormItemProps[] = useMemo(
    () => [
      {
        children: <Switch />,
        label: '包含助手角色设定',
        minWidth: undefined,
        name: 'withSystemRole',
        valuePropName: 'checked',
      },
      {
        children: <Switch />,
        hidden: tab !== Tab.Screenshot,
        label: '包含背景图片',
        minWidth: undefined,
        name: 'withBackground',
        valuePropName: 'checked',
      },
      {
        children: <Switch />,
        hidden: tab !== Tab.Screenshot,
        label: '包含页脚',
        minWidth: undefined,
        name: 'withFooter',
        valuePropName: 'checked',
      },
      {
        children: <Segmented options={imageTypeOptions} />,
        hidden: tab !== Tab.Screenshot,
        label: '图片格式',
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
              下载截图
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
              生成 ShareGPT 分享链接
            </Button>
          )}
        </>
      }
      maxHeight={false}
      onCancel={onCancel}
      open={open}
      title={'分享'}
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
