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
  {
    id: 'xiao-shu-fang',
    name: '小书房',
    url: 'https://r2.vidol.chat/stages/stage07%20%E5%B0%8F%E4%B9%A6%E6%88%BF%20by%20G_Wuuuuu/01.pmx',
    thumbnail:
      'https://r2.vidol.chat/stages/stage07%20%E5%B0%8F%E4%B9%A6%E6%88%BF%20by%20G_Wuuuuu/%E9%A2%84%E8%A7%88.png',
  },
  {
    id: 'tai-kong-cang',
    name: '太空舱',
    url: 'https://r2.vidol.chat/stages/stage13%20%E5%A4%AA%E7%A9%BA%E8%88%B1%20by%20G_Wuuuuu/stage13/stage.pmx',
    thumbnail:
      'https://r2.vidol.chat/stages/stage13%20%E5%A4%AA%E7%A9%BA%E8%88%B1%20by%20G_Wuuuuu/%E9%A2%84%E8%A7%88.png',
  },
  {
    id: 'practice-room',
    name: '练习室',
    url: 'https://r2.vidol.chat/stages/stage19%20%E7%BB%83%E4%B9%A0%E5%AE%A4%20by%20G_Wuuuuu/stage.pmx',
    thumbnail:
      'https://r2.vidol.chat/stages/stage19%20%E7%BB%83%E4%B9%A0%E5%AE%A4%20by%20G_Wuuuuu/%E9%A2%84%E8%A7%88.png',
  },
  {
    id: 'japanese-stage',
    name: '日系舞台',
    url: 'https://r2.vidol.chat/stages/Japanese%20Stage/1.pmx',
    thumbnail: 'https://r2.vidol.chat/stages/Japanese%20Stage/preview.png',
  },
  {
    id: 'niu-qu-kong-jian',
    name: '扭曲空间',
    url: 'https://r2.vidol.chat/stages/RedialC_EpRoomTortuosity/EPT.pmx',
    thumbnail: 'https://r2.vidol.chat/stages/RedialC_EpRoomTortuosity/Preview.jpg',
  },
];
