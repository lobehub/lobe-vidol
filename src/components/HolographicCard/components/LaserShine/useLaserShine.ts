import { useSpring } from '@react-spring/web';
import { CSSProperties } from 'react';
import { adjust, clamp, round } from '../../utils/math';

const randomSeed = {
  x: Math.random(),
  y: Math.random(),
};

const cosmosPosition = {
  x: Math.floor(randomSeed.x * 734),
  y: Math.floor(randomSeed.y * 1280),
};

export const useLaserShine = (delay = 500) => {
  const [{ background, glare }, api] = useSpring(() => ({
    background: [0, 50],
    glare: [50, 50, 0],
  }));

  const onMouseMove = (e: any) => {
    const rect = e.target.getBoundingClientRect();
    const absolute = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    const percent = {
      x: clamp(round((100 / rect.width) * absolute.x)),
      y: clamp(round((100 / rect.height) * absolute.y)),
    };

    api.start({
      background: [adjust(percent.x, 0, 100, 37, 63), adjust(percent.y, 0, 100, 33, 67)],
      glare: [round(percent.x), round(percent.y), 1],
    });
  };

  const onMouseOut = () => {
    setTimeout(() => {
      api.start({ background: [50, 50], glare: [50, 50, 0] });
    }, delay);
  };

  const style = {
    '--background-x': background.to((x) => `${x}%`),
    '--background-y': background.to((_, y) => `${y}%`),
    '--card-opacity': glare.to((_, __, o) => o),

    '--cosmosbg': `${cosmosPosition.x}px ${cosmosPosition.y}px`,
    '--pointer-from-center': glare.to((x, y) =>
      clamp(Math.sqrt((y - 50) * (y - 50) + (x - 50) * (x - 50)) / 50, 0, 1),
    ),
    '--pointer-from-left': glare.to((x) => x / 100),
    '--pointer-from-top': glare.to((_, y) => y / 100),
    '--pointer-x': glare.to((x) => `${x}%`),
    '--pointer-y': glare.to((_, y) => `${y}%`),
    '--seedx': randomSeed.x,
    '--seedy': randomSeed.y,
  } as CSSProperties;

  return { onMouseMove, onMouseOut, style };
};
