import { Avatar } from '@lobehub/ui';
import { Space } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { Flexbox } from 'react-layout-kit';

import { Agent } from '@/types/agent';

import { useStyles } from './style';

interface Props {
  actions?: React.ReactNode[];
  agent?: Agent;
  className?: string;
  extra?: React.ReactNode;
  footer?: React.ReactNode;
  style?: React.CSSProperties;
}

export default (props: Props) => {
  const { styles, theme } = useStyles();

  const { actions = [], agent, extra, footer, className, style } = props;
  const { meta } = agent || {};
  const { avatar, name, description } = meta || {};

  return (
    <Flexbox
      className={classNames(styles.container, className)}
      gap={16}
      style={style}
      flex={1}
      align={'center'}
    >
      <Avatar
        avatar={avatar}
        background={theme.colorFillTertiary}
        className={styles.avatar}
        size={100}
      />
      <div className={styles.title}>{name}</div>
      <div className={styles.desc}>{description}</div>
      {actions && actions.length !== 0 ? (
        <div className={styles.actions}>
          <Space>{actions}</Space>
        </div>
      ) : null}
      {extra ? extra : null}
      {footer ? (
        <Flexbox className={styles.footer} flex={1}>
          {footer}
        </Flexbox>
      ) : null}
    </Flexbox>
  );
};
