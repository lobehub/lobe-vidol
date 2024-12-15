import { ModelTag } from '@lobehub/icons';
import { Avatar, ChatHeaderTitle, Logo, Markdown } from '@lobehub/ui';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { DEFAULT_CHAT_MODEL } from '@/constants/agent';
import { siteUrl } from '@/server/utils/url';
import { sessionSelectors, useSessionStore } from '@/store/session';

import ChatList from './ChatList';
import { useStyles } from './style';
import { FieldType } from './type';

const Preview = memo<FieldType & { title?: string }>(
  ({ title, withSystemRole, withBackground, withFooter }) => {
    const sessionAgent = useSessionStore((s) => sessionSelectors.currentAgent(s));
    const { styles } = useStyles(withBackground);

    if (!sessionAgent) return null;

    return (
      <div className={styles.preview}>
        <div className={withBackground ? styles.background : undefined} id={'preview'}>
          <Flexbox className={styles.container} gap={16}>
            <div className={styles.header}>
              <Flexbox align={'flex-start'} gap={12} horizontal>
                <Avatar avatar={sessionAgent.meta.avatar} size={40} title={title} />
                <ChatHeaderTitle
                  desc={sessionAgent.meta.description}
                  tag={<ModelTag model={sessionAgent?.model || DEFAULT_CHAT_MODEL} />}
                  title={title}
                />
              </Flexbox>
              {withSystemRole && sessionAgent.systemRole && (
                <div className={styles.role}>
                  <Markdown variant={'chat'}>{sessionAgent.systemRole}</Markdown>
                </div>
              )}
            </div>
            <ChatList />
            {withFooter ? (
              <Flexbox align={'center'} className={styles.footer} gap={4}>
                <Logo extra={'vidol'} type={'combine'} />
                <div className={styles.url}>{siteUrl}</div>
              </Flexbox>
            ) : (
              <div />
            )}
          </Flexbox>
        </div>
      </div>
    );
  },
);

export default Preview;
