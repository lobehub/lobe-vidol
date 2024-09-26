import GridList from '@/components/GridList';
import { backgroundOptions } from '@/constants/background';
import { useGlobalStore } from '@/store/global';

const Background = () => {
  const [backgroundId, setBackgroundId] = useGlobalStore((s) => [
    s.backgroundId,
    s.setBackgroundId,
  ]);
  return (
    <GridList
      items={backgroundOptions.map((option) => ({
        avatar: `https://r2.vidol.chat/backgrounds/${encodeURIComponent(option.thumbnail)}`,
        id: option.id,
        name: option.name,
        url: option.url,
      }))}
      onClick={(id) => setBackgroundId(id)}
      isActivated={(id) => id === backgroundId}
    />
  );
};

export default Background;
