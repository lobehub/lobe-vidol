import { useGlobalStore } from '@/store/global';

const Background = () => {
  const backgroundUrl = useGlobalStore((s) => s.backgroundUrl);

  return backgroundUrl ? (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100%',
        zIndex: -1,
        transition: 'background-image 0.5s ease-in-out',
      }}
    ></div>
  ) : null;
};

export default Background;
