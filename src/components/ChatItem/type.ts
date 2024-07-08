import { AlertProps, AvatarProps, EditableMessageProps } from '@lobehub/ui';
import { ReactNode } from 'react';
import { type HTMLAttributes } from 'react';

export type DivProps = HTMLAttributes<HTMLDivElement>;

export interface MetaData {
  /**
   * 角色头像
   * @description 可选参数，如果不传则使用默认头像
   */
  avatar?: string | ReactNode;
  /**
   *  背景色
   * @description 可选参数，如果不传则使用默认背景色
   */
  backgroundColor?: string;
  description?: string;
  tags?: string[];
  /**
   * 名称
   * @description 可选参数，如果不传则使用默认名称
   */
  title?: string;
}

export interface ChatItemProps {
  /**
   * @description Actions to be displayed in the chat item
   */
  actions?: ReactNode;
  /**
   * @description Metadata for the avatar
   */
  avatar: MetaData;
  avatarAddon?: ReactNode;
  avatarProps?: AvatarProps;
  /**
   * @description Custom CSS class name for the chat item
   */
  className?: string;
  /**
   * @description Whether the chat item is in editing mode
   */
  editing?: boolean;
  /**
   * @description Props for Error render
   */
  error?: AlertProps;
  errorMessage?: ReactNode;
  fontSize?: number;
  /**
   * @description Whether the chat item is in loading state
   */
  loading?: boolean;
  /**
   * @description The message content of the chat item
   */
  message?: ReactNode;
  messageExtra?: ReactNode;
  onAvatarClick?: () => void;
  /**
   * @description Callback when the message content changes
   * @param value - The new message content
   */
  onChange?: (value: string) => void;
  onDoubleClick?: DivProps['onDoubleClick'];
  /**
   * @description Callback when the editing mode changes
   * @param editing - The new editing mode
   */
  onEditingChange?: (editing: boolean) => void;
  /**
   * @description The placement of the chat item
   * @default 'left'
   */
  placement?: 'left' | 'right';
  /**
   * @description Whether the chat item is primary
   */
  primary?: boolean;
  renderMessage?: (content: ReactNode) => ReactNode;
  /**
   * @description Whether to show the title of the chat item
   */
  showTitle?: boolean;
  text?: EditableMessageProps['text'];
  /**
   * @description The timestamp of the chat item
   */
  time?: number;
  /**
   * @description The type of the chat item
   * @default 'block'
   */
  type?: 'block' | 'pure';
}
