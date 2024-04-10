import { GridBackground } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { Center } from 'react-layout-kit';

const useStyles = createStyles(({ css }) => ({
  background: css`
    width: 90%;
    margin: -24px 0 -12px;
  `,
  title: css`
    z-index: 2;
    margin-top: 24px;
    font-size: 36px;
    font-weight: 800;
  `,
}));

const TopBanner = () => {
  const { theme, styles } = useStyles();

  return (
    <Center>
      <h1 className={styles.title}>Hello, Let&apos;s Chat!</h1>
      <GridBackground animation className={styles.background} colorFront={theme.colorText} random />
    </Center>
  );
};

export default TopBanner;
