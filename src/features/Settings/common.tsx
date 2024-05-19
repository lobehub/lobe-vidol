import { Form, FormGroup, FormItem } from '@lobehub/ui';
import { App, Button, Input, Segmented } from 'antd';
import { ThemeMode, createStyles } from 'antd-style';
import classNames from 'classnames';
import { isEqual } from 'lodash-es';
import { Monitor, Settings2, User2Icon } from 'lucide-react';
import React from 'react';

import { MAX_NAME_LENGTH } from '@/constants/common';
import AvatarWithUpload from '@/features/AvatarWithUpload';
import ThemeSwatchesPrimary from '@/features/Settings/features/ThemeSwatchesPrimary';
import { useSyncSettings } from '@/features/Settings/useSyncSettings';
import { useAgentStore } from '@/store/agent';
import { useConfigStore } from '@/store/config';
import { useSessionStore } from '@/store/session';
import { useThemeStore } from '@/store/theme';
import { BackgroundEffect } from '@/types/config';

interface CommonConfigProps {
  className?: string;
  style?: React.CSSProperties;
}

const useStyles = createStyles(({ css }) => ({
  config: css`
    display: flex;
    flex-grow: 1;
    justify-content: center;
  `,
  effect: css`
    width: 160px;
    margin-bottom: 0;
  `,
}));

const CommonConfig = (props: CommonConfigProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const [config, setConfig] = useConfigStore((s) => [s.config, s.setConfig], isEqual);
  const clearAgentStorage = useAgentStore((s) => s.clearAgentStorage);
  const [themeMode, setThemeMode] = useThemeStore((s) => [s.themeMode, s.setThemeMode]);
  const clearSessions = useSessionStore((s) => s.clearSessions);
  const resetConfig = useConfigStore((s) => s.resetConfig);
  const { message, modal } = App.useApp();

  const [form] = Form.useForm();

  useSyncSettings(form);

  const handleClear = () => {
    modal.confirm({
      cancelText: '取消',
      centered: true,
      content: '操作无法撤销，清除后数据将无法恢复，请慎重操作',
      okButtonProps: {
        danger: true,
      },
      okText: '确定',
      onOk: () => {
        clearSessions();
        clearAgentStorage();
        message.success('清除成功');
      },
      title: '确认清除所有会话消息?',
    });
  };

  const handleReset = () => {
    modal.confirm({
      cancelText: '取消',
      centered: true,
      content: '操作无法撤销，重置后数据将无法恢复，请慎重操作',
      okButtonProps: {
        danger: true,
      },
      okText: '确定',
      onOk: () => {
        resetConfig();
        message.success('重置成功');
      },
      title: '确认重置所有系统设置?',
    });
  };

  return (
    <div className={classNames(styles.config, className)} style={style}>
      <Form
        style={{ display: 'flex', flexGrow: 1 }}
        initialValues={config}
        form={form}
        onValuesChange={setConfig}
      >
        <FormGroup icon={User2Icon} title={'用户设置'}>
          <FormItem desc={'自定义头像'} divider label={'头像'} name={'avatar'}>
            <AvatarWithUpload />
          </FormItem>
          <FormItem desc={'自定义昵称'} divider label={'昵称'} name={'nickName'}>
            <Input
              defaultValue={config.nickName}
              placeholder={'请输入昵称'}
              maxLength={MAX_NAME_LENGTH}
              showCount
              onChange={(e) => {
                setConfig({ nickName: e.target.value });
              }}
            />
          </FormItem>
        </FormGroup>
        <FormGroup icon={Settings2} title={'主题设置'}>
          <FormItem desc={'主题色'} divider label={'自定义主题色'} name={'primaryColor'}>
            <ThemeSwatchesPrimary />
          </FormItem>
          <FormItem desc={'自定义主题模式'} divider label={'主题模式'} name={'themeMode'}>
            <Segmented
              defaultValue={themeMode}
              onChange={(value: ThemeMode) => {
                setThemeMode(value as ThemeMode);
              }}
              options={[
                {
                  label: '🔆 亮色模式',
                  value: 'light',
                },
                {
                  label: '🌙 暗色模式',
                  value: 'dark',
                },
                {
                  label: '💻 跟随系统',
                  value: 'auto',
                },
              ]}
            />
          </FormItem>
          <FormItem
            desc={'自定义背景效果，可关闭以提升性能'}
            divider
            label={'背景效果'}
            name={'backgroundEffect'}
          >
            <Segmented
              defaultValue={config.backgroundEffect}
              onChange={(value: BackgroundEffect) => {
                setConfig({ backgroundEffect: value });
              }}
              options={[
                {
                  label: '光辉',
                  value: 'glow',
                },
                {
                  label: '无背景',
                  value: 'none',
                },
              ]}
            />
          </FormItem>
        </FormGroup>
        <FormGroup icon={Monitor} title={'系统设置'}>
          <FormItem
            desc={'将会清除所有会话与角色数据，包括会话列表，角色列表、会话消息等'}
            divider
            label={'清除所有会话消息'}
          >
            <Button danger onClick={handleClear} type={'primary'}>
              立即清除
            </Button>
          </FormItem>
          <FormItem
            desc={'将会重置所有系统设置，包括主题设置、背景效果、语言模型设置、窗口位置等'}
            divider
            label={'重置系统设置'}
          >
            <Button danger onClick={handleReset} type={'primary'}>
              立即重置
            </Button>
          </FormItem>
        </FormGroup>
      </Form>
    </div>
  );
};

export default CommonConfig;
