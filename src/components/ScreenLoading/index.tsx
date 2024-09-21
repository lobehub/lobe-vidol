import classNames from 'classnames';
import React, { memo, useRef } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

import { useStyles } from './style';

interface ScreenLoadingProps {
  className?: string;
  description?: React.ReactNode;
  style?: React.CSSProperties;
  title: React.ReactNode;
}

const ScreenLoading = (props: ScreenLoadingProps) => {
  const { title, className, style, description } = props;
  const { styles } = useStyles();
  const loadingScreenRef = useRef<HTMLDivElement>(null);

  return (
    <Flexbox
      height={'100%'}
      width={'100%'}
      className={classNames(className, styles.container)}
      style={style}
    >
      <Center flex={1} gap={12} width={'100%'}>
        <div id="loading-screen" ref={loadingScreenRef}>
          <div id="loader"></div>
        </div>
        <Center gap={8} horizontal>
          {title}
        </Center>
        {description && <Center>{description}</Center>}
      </Center>
    </Flexbox>
  );
};

export default memo(ScreenLoading);
