'use client';

import { useInterval } from 'ahooks';
import { useState } from 'react';
import { useStyles } from './style';

const getTime = () => {
  const date = new Date();
  return date.toLocaleTimeString();
};

const getDate = () => {
  const date = new Date();
  return date.toLocaleDateString();
};

const Timer = () => {
  const { styles } = useStyles();

  const [time, setTime] = useState(getTime());
  const [date, setDate] = useState(getDate());

  useInterval(() => {
    setTime(getTime());
    setDate(getDate());
  }, 1000);

  return (
    <div className={styles.timer}>
      <div className={styles.time}>{time}</div>
      <div className={styles.date}>{date}</div>
    </div>
  );
};

export default Timer;
