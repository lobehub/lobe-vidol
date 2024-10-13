export const EMPTY_ID = 'empty';

export interface StageOption {
  id: string;
  name: string;
  thumbnail: string;
  url?: string; // 添加 thumbnail 参数
}

export const stageList: StageOption[] = [
  {
    id: EMPTY_ID,
    name: '空场景',
    thumbnail: 'https://r2.vidol.chat/common/transparent.png',
  },
  {
    id: 'cyber-blackxwhite',
    name: 'cyber blackxwhite',
    url: 'https://r2.vidol.chat/stages/cyber_blackxwhite/cyber%20blackxwhite.pmx',
    thumbnail: 'https://r2.vidol.chat/stages/cyber_blackxwhite/preview.png',
  },
  {
    id: 'gufengwutai',
    name: '国风舞台',
    url: 'https://r2.vidol.chat/stages/gufengwutai/wt.pmx',
    thumbnail: 'https://r2.vidol.chat/stages/gufengwutai/954.jpg',
  },
  {
    id: 'hot-spring-hall',
    name: '温泉馆',
    url: 'https://r2.vidol.chat/stages/%E6%B8%A9%E6%B3%89%E9%A6%86%20Hot%20spring%20Hall%20V1.01/%E6%B8%A9%E6%B3%89%E9%A6%86%20Hot%20spring%20Hall%20V1.01.pmx',
    thumbnail:
      'https://r2.vidol.chat/stages/%E6%B8%A9%E6%B3%89%E9%A6%86%20Hot%20spring%20Hall%20V1.01/01.png',
  },
];
