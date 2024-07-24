/**
 * https://www.mixamo.com/
 * Mixamo Animations 脚本处理
 * @author rdmclin2
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { Motion, MotionAnimation } from './type';

export const readJSON = (filePath: string) => {
  const data = readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

export const writeJSON = (filePath: string, data: any) => {
  const jsonStr = JSON.stringify(data, null, 2);
  writeFileSync(filePath, jsonStr, 'utf8');
};

export const srcListDir = resolve(__dirname, './input');

const formatMixamoList = (list: Motion[]): MotionAnimation[] => {
  const countMap: Record<string, number> = {};
  return list.map((item) => {
    // 用 countMap 对 item.name 进行计数
    if (countMap[item.name] !== undefined) {
      countMap[item.name] += 1;
    } else {
      countMap[item.name] = 0;
    }
    const suffix = countMap[item.name] === 0 ? '' : ` (${countMap[item.name]})`;
    return {
      id: item.motion_id,
      name: item.name,
      url: `https://r2.vidol.chat/posture/${item.name}${suffix}.fbx`,
      avatar: item.thumbnail_animated,
    };
  });
};

const genList = () => {
  const mixamoDirJsonList = readdirSync(srcListDir);
  mixamoDirJsonList.forEach((filePath) => {
    console.info('processing...', filePath);
    const inputPath = resolve(__dirname, './input', filePath);
    const outputPath = resolve(__dirname, './output', filePath);
    const list = readJSON(inputPath);
    const formatList = formatMixamoList(list);
    writeJSON(outputPath, formatList);
  });
};

genList();
