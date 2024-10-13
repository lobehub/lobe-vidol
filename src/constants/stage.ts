export interface StageOption {
  id: string;
  name: string;
  thumbnail: string;
  url: string; // 添加 thumbnail 参数
}

export const stageList: StageOption[] = [
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
];
