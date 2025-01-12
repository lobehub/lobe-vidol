import { Button } from 'antd';
import { createStyles , useResponsive } from 'antd-style';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { Flexbox } from 'react-layout-kit';

const useStyles = createStyles(({ css, token, responsive }) => ({
  container: css`
    position: relative;
    width: 100%;
    padding: 0 12px;

    ${responsive.mobile} {
      padding: 8px;
    }
  `,
  leftSection: css`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 24px;

    ${responsive.mobile} {
      gap: 16px;
    }
  `,
  carouselSection: css`
    position: relative;

    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;

    ${responsive.mobile} {
      width: 100%;
    }
  `,
  titleGroup: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `,
  subtitle: css`
    display: flex;
    gap: 8px;
    align-items: center;

    margin-bottom: 4px;

    font-size: 24px;
    font-weight: 600;
    color: ${token.colorText};

    &::after {
      content: '✨';
      font-size: 16px;
    }

    ${responsive.mobile} {
      font-size: 20px;
    }
  `,
  title: css`
    margin: 0;

    font-size: 42px;
    font-weight: 600;
    line-height: 1.2;
    color: ${token.colorText};

    ${responsive.mobile} {
      font-size: 32px;
    }
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

    transition: all 0.2s ease;

    &:hover {
      transform: scale(1.1);
    }
  `,
  carouselContainer: css`
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 480px;
    height: 320px;

    perspective: 1000px;

    ${responsive.mobile} {
      width: 100%;
      max-width: 360px;
      height: 240px;
    }
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

    width: 160px;
    height: 240px;
    border: 1px solid rgba(255, 255, 255, 80%);
    border-radius: 16px;

    transition: all 0.3s ease;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &:hover {
      transform: translateY(-8px) scale(1.05);
      border-color: white;
    }

    ${responsive.mobile} {
      width: 120px;
      height: 180px;
    }
  `,
  cardInfo: css`
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;

    padding: 12px;

    color: white;

    opacity: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 90%) 0%,
      rgba(0, 0, 0, 60%) 50%,
      transparent 100%
    );

    transition: opacity 0.3s ease;

    h3 {
      margin: 0;
      font-size: 14px;
      font-weight: 600;
      line-height: 1.2;
    }

    .description {
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;

      margin-top: 4px;

      font-size: 12px;
      line-height: 1.2;
      text-overflow: ellipsis;

      opacity: 0.8;
    }
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
      left: -20px;
    }

    &.next {
      right: -20px;
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
  onSelect?: (id: string) => void;
}

const RomanceCarousel = ({ items, onEmojiClick, onSelect }: RomanceCarouselProps) => {
  const { styles } = useStyles();
  const [currentIndex, setCurrentIndex] = useState(2);
  const responsive = useResponsive();

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleCardClick = (index: number, item: CarouselItem) => {
    const currentPosition = index - currentIndex;

    if (currentPosition === 0) {
      onSelect?.(item.id);
      return;
    }

    setCurrentIndex(index);
  };

  return (
    <div className={styles.container}>
      <Flexbox horizontal={!responsive.mobile} gap={24} align="center" justify="space-between">
        <div className={styles.leftSection}>
          <Flexbox gap={24}>
            <div className={styles.titleGroup}>
              <div className={styles.subtitle}>Are you...</div>
              <h2 className={styles.title}>Looking for romance?</h2>
            </div>
            <div className={styles.reactions}>
              <Button type="primary" onClick={onEmojiClick} size="large">
                👻 试下手气
              </Button>
            </div>
          </Flexbox>
        </div>

        <div className={styles.carouselSection}>
          <div className={styles.carouselContainer}>
            <div className={styles.carouselTrack}>
              {items.map((item, index) => {
                const position = index - currentIndex;
                const zIndex = -Math.abs(position) + 10;
                const opacity = Math.max(0.6, 1 - Math.abs(position) * 0.2);
                const xOffset = position * 100; // Reduce spacing between cards
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
                    onClick={() => handleCardClick(index, item)}
                  >
                    <img src={item.image} alt={item.title} />
                    <div
                      className={styles.cardInfo}
                      style={{
                        opacity: index === currentIndex ? 1 : 0,
                      }}
                    >
                      <h3>{item.title}</h3>
                      {item.stats && <div className="description">{item.stats}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
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
