'use client';

import React from 'react';
import { Flexbox } from 'react-layout-kit';

import Actions from './components/Actions';
import Avatar from './components/Avatar';
import ErrorContent from './components/ErrorContent';
import MessageContent from './components/MessageContent';
import Title from './components/Title';
import { useStyles } from './style';
import { ChatItemProps } from './type';

const ChatItem = React.forwardRef<HTMLDivElement, ChatItemProps>(
  ({
    avatarAddon,
    onAvatarClick,
    avatarProps,
    actions,
    className,
    primary,
    loading,
    message,
    placement = 'left',
    type = 'block',
    avatar,
    error,
    showTitle,
    time,
    editing,
    onChange,
    onEditingChange,
    messageExtra,
    renderMessage,
    text,
    errorMessage,
    onDoubleClick,
    fontSize,
    ...rest
  }: ChatItemProps) => {
    const { cx, styles } = useStyles({
      editing,
      placement,
      primary,
      showTitle,
      time,
      title: avatar.title,
      type,
    });

    return (
      <Flexbox
        className={cx(styles.container, className)}
        direction={placement === 'left' ? 'horizontal' : 'horizontal-reverse'}
        {...rest}
      >
        <Avatar
          {...avatarProps}
          addon={avatarAddon}
          avatar={avatar}
          loading={loading}
          onClick={onAvatarClick}
          placement={placement}
        />
        <Flexbox
          align={placement === 'left' ? 'flex-start' : 'flex-end'}
          className={styles.messageContainer}
        >
          <Title avatar={avatar} placement={placement} showTitle={showTitle} time={time} />
          <Flexbox
            align={placement === 'left' ? 'flex-start' : 'flex-end'}
            className={styles.messageContent}
            direction={
              type === 'block'
                ? placement === 'left'
                  ? 'horizontal'
                  : 'horizontal-reverse'
                : 'vertical'
            }
            gap={8}
          >
            {error ? (
              <ErrorContent error={error} message={errorMessage} placement={placement} />
            ) : (
              <MessageContent
                editing={editing}
                fontSize={fontSize}
                message={message}
                messageExtra={messageExtra}
                onChange={onChange}
                onDoubleClick={onDoubleClick}
                onEditingChange={onEditingChange}
                placement={placement}
                primary={primary}
                renderMessage={renderMessage}
                text={text}
                type={type}
              />
            )}
            <Actions actions={actions} editing={editing} placement={placement} type={type} />
          </Flexbox>
        </Flexbox>
      </Flexbox>
    );
  },
);

export default ChatItem;

export type { ChatItemProps } from './type';
