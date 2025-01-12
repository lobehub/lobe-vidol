import { createStyles } from 'antd-style';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    position: relative;
    width: 100%;
    padding: 24px 32px;
  `,
  titleGroup: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `,
  subtitle: css`
    margin-bottom: 8px;
    font-size: 20px;
    color: ${token.colorTextTertiary};
  `,
  title: css`
    margin-bottom: 24px;
    font-size: 32px;
    font-weight: 600;
    color: ${token.colorText};
  `,
  reactions: css`
    display: flex;
    flex-direction: row;
    gap: 12px;
  `,
  reaction: css`
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 44px;
    height: 44px;
    border-radius: 50%;

    font-size: 24px;

    background: ${token.colorFillTertiary};

    transition: all 0.2s;

    &:hover {
      transform: scale(1.1);
      background: ${token.colorFill};
    }
  `,
  carouselContainer: css`
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 50%;
    height: 400px;

    perspective: 1000px;
  `,
  carouselTrack: css`
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    height: 100%;
  `,
  card: css`
    cursor: pointer;

    position: absolute;
    transform-origin: center center;

    overflow: hidden;

    width: 200px;
    height: 300px;
    border: 1px solid rgba(255, 255, 255, 80%);
    border-radius: 16px;

    transition: all 0.5s ease;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &:hover {
      transform: translateY(-8px) scale(1.05);
      border-color: white;
    }
  `,
  cardInfo: css`
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;

    padding: 16px;

    color: white;

    background: linear-gradient(to top, rgba(0, 0, 0, 80%), transparent);
  `,
  navigationButton: css`
    cursor: pointer;

    position: absolute;
    z-index: 10;
    top: 50%;
    transform: translateY(-50%);

    display: flex;
    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;
    border-radius: 50%;

    background: rgba(255, 255, 255, 10%);
    backdrop-filter: blur(10px);

    transition: all 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 20%);
    }

    &.prev {
      left: 16px;
    }

    &.next {
      right: 16px;
    }
  `,
}));

interface CarouselItem {
  id: string;
  image: string;
  stats?: string;
  title: string;
}

interface RomanceCarouselProps {
  items: CarouselItem[];
  onEmojiClick?: () => void;
}

const RomanceCarousel = ({ items, onEmojiClick }: RomanceCarouselProps) => {
  const { styles } = useStyles();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Update currentIndex when items change
  useEffect(() => {
    if (items.length > 0) {
      setCurrentIndex(Math.floor(items.length / 2));
    }
  }, [items]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className={styles.container}>
      <Flexbox horizontal gap={24} align="flex-start" justify="space-between">
        <Flexbox gap={24}>
          <div className={styles.titleGroup}>
            <div className={styles.subtitle}>Are you...</div>
            <h2 className={styles.title}>Looking for romance?</h2>
          </div>
          <div className={styles.reactions}>
            <div className={styles.reaction} onClick={onEmojiClick}>
              ❤️
            </div>
            <div className={styles.reaction} onClick={onEmojiClick}>
              ✨
            </div>
            <div className={styles.reaction} onClick={onEmojiClick}>
              🌟
            </div>
          </div>
        </Flexbox>

        <div className={styles.carouselContainer}>
          <div className={styles.carouselTrack}>
            {items.map((item, index) => {
              const position = index - currentIndex;
              const zIndex = -Math.abs(position) + 10;
              const opacity = Math.max(0.6, 1 - Math.abs(position) * 0.2);
              const xOffset = position * 136; // Reduce spacing between cards
              const scale = Math.max(0.8, 1 - Math.abs(position) * 0.15);

              return (
                <div
                  key={item.id}
                  className={styles.card}
                  style={{
                    transform: `translateX(${xOffset}px) scale(${scale})`,
                    zIndex,
                    opacity,
                  }}
                  onClick={() => setCurrentIndex(index)}
                >
                  <img src={item.image} alt={item.title} />
                  <div className={styles.cardInfo}>
                    <h3>{item.title}</h3>
                    {item.stats && <div>{item.stats}</div>}
                  </div>
                </div>
              );
            })}
          </div>

          <div className={`${styles.navigationButton} prev`} onClick={prevSlide}>
            <ChevronLeft size={24} color="white" />
          </div>
          <div className={`${styles.navigationButton} next`} onClick={nextSlide}>
            <ChevronRight size={24} color="white" />
          </div>
        </div>
      </Flexbox>
    </div>
  );
};

export default RomanceCarousel;
