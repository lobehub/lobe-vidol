import { Card, Cards } from '@lobehub/ui/mdx';

interface BackgroundOption {
  id: string;
  name: string;
  thumbnail: string;
  url: string; // 添加 thumbnail 参数
}

const backgroundOptions: BackgroundOption[] = [
  {
    id: 'bedroom-clean',
    name: 'bedroom clean',
    url: '/1920x1080/bedroom clean.jpg',
    thumbnail: '/160x90/bedroom clean.jpg',
  },
  {
    id: 'bedroom-cyberpunk',
    name: 'bedroom cyberpunk',
    url: '/1920x1080/bedroom cyberpunk.jpg',
    thumbnail: '/160x90/bedroom cyberpunk.jpg',
  },
  {
    id: 'bedroom-red',
    name: 'bedroom red',
    url: '/1920x1080/bedroom red.jpg',
    thumbnail: '/160x90/bedroom red.jpg',
  },
  {
    id: 'bedroom-tatami',
    name: 'bedroom tatami',
    url: '/1920x1080/bedroom tatami.jpg',
    thumbnail: '/160x90/bedroom tatami.jpg',
  },
  {
    id: 'cityscape-medieval-market',
    name: 'cityscape medieval market',
    url: '/1920x1080/cityscape medieval market.jpg',
    thumbnail: '/160x90/cityscape medieval market.jpg',
  },
  {
    id: 'cityscape-medieval-night',
    name: 'cityscape medieval night',
    url: '/1920x1080/cityscape medieval night.jpg',
    thumbnail: '/160x90/cityscape medieval night.jpg',
  },
  {
    id: 'cityscape-postapoc',
    name: 'cityscape postapoc',
    url: '/1920x1080/cityscape postapoc.jpg',
    thumbnail: '/160x90/cityscape postapoc.jpg',
  },
  {
    id: 'forest-treehouse',
    name: 'forest treehouse fireworks air baloons (by kallmeflocc)',
    url: '/1920x1080/forest treehouse.jpg',
    thumbnail: '/160x90/forest treehouse.jpg',
  },
  {
    id: 'japan-classroom-side',
    name: 'japan classroom side',
    url: '/1920x1080/japan classroom side.jpg',
    thumbnail: '/160x90/japan classroom side.jpg',
  },
  {
    id: 'japan-classroom',
    name: 'japan classroom',
    url: '/1920x1080/japan classroom.jpg',
    thumbnail: '/160x90/japan classroom.jpg',
  },
  {
    id: 'japan-path-cherry-blossom',
    name: 'japan path cherry blossom',
    url: '/1920x1080/japan path cherry blossom.jpg',
    thumbnail: '/160x90/japan path cherry blossom.jpg',
  },
  {
    id: 'japan-university',
    name: 'japan university',
    url: '/1920x1080/japan university.jpg',
    thumbnail: '/160x90/japan university.jpg',
  },
  {
    id: 'landscape-autumn-great-tree',
    name: 'landscape autumn great tree',
    url: '/1920x1080/landscape autumn great tree.jpg',
    thumbnail: '/160x90/landscape autumn great tree.jpg',
  },
  {
    id: 'landscape-beach-day',
    name: 'landscape beach day',
    url: '/1920x1080/landscape beach day.jpg',
    thumbnail: '/160x90/landscape beach day.jpg',
  },
  {
    id: 'landscape-beach-night',
    name: 'landscape beach night',
    url: '/1920x1080/landscape beach night.jpg',
    thumbnail: '/160x90/landscape beach night.jpg',
  },
  {
    id: 'landscape-mountain-lake',
    name: 'landscape mountain lake',
    url: '/1920x1080/landscape mountain lake.jpg',
    thumbnail: '/160x90/landscape mountain lake.jpg',
  },
  {
    id: 'landscape-postapoc',
    name: 'landscape postapoc',
    url: '/1920x1080/landscape postapoc.jpg',
    thumbnail: '/160x90/landscape postapoc.jpg',
  },
  {
    id: 'landscape-winter-lake-house',
    name: 'landscape winter lake house',
    url: '/1920x1080/landscape winter lake house.jpg',
    thumbnail: '/160x90/landscape winter lake house.jpg',
  },
  { id: 'royal', name: 'royal', url: '/1920x1080/royal.jpg', thumbnail: '/160x90/royal.jpg' },
  {
    id: 'tavern-day',
    name: 'tavern day',
    url: '/1920x1080/tavern day.jpg',
    thumbnail: '/160x90/tavern day.jpg',
  },
];

export default function Component() {
  return (
    <Cards>
      {backgroundOptions.map((option) => (
        <Card
          key={option.id}
          href={`https://r2.vidol.chat/backgrounds${option.url}`}
          image={`https://r2.vidol.chat/backgrounds${option.thumbnail}`}
          title={option.name}
        />
      ))}
    </Cards>
  );
}
