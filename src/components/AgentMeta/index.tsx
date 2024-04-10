import { AgentMeta } from '@/types/agent';
import { Avatar } from '@lobehub/ui';
import { Typography } from 'antd';
import { useStyles } from './style';

interface AgentMetaProps {
  meta?: AgentMeta;
}

export default (props: AgentMetaProps) => {
  const { styles } = useStyles();
  const { meta } = props;
  const { avatar, name, description } = meta || {};

  return (
    <div className={styles.container}>
      <Avatar avatar={avatar} size={36} />
      <div className={styles.content}>
        <div className={styles.title}>{name}</div>
        <Typography.Text className={styles.desc} ellipsis>
          {description}
        </Typography.Text>
      </div>
    </div>
  );
};
