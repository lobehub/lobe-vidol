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

type MotionType = 'Motion' | 'Posture';
type Gender = 'Male' | 'Female';

const formatMixamoList = (
  type: MotionType,
  gender: Gender,
  category: string,
  list: Motion[],
): MotionAnimation[] => {
  return list.map((item) => {
    return {
      id: item.motion_id,
      name: item.name,
      type,
      gender,
      category,
      description: item.description,
      url: `https://r2.vidol.chat/animations/${item.motion_id}.fbx`,
      avatar: item.thumbnail_animated,
    };
  });
};

const genList = (type: MotionType, gender: Gender) => {
  const srcListDir = resolve(__dirname, type, gender);

  const mixamoDirJsonList = readdirSync(srcListDir);
  mixamoDirJsonList.forEach((category) => {
    console.info('processing...', category);
    const inputPath = resolve(__dirname, type, gender, category, './input.json');
    const outputPath = resolve(__dirname, type, gender, category, './output.json');
    const list = readJSON(inputPath);
    const formatList = formatMixamoList(type, gender, category, list);
    writeJSON(outputPath, formatList);
  });
};

const start = () => {
  const motionList: MotionType[] = ['Motion', 'Posture'];
  const genderList: Gender[] = ['Male', 'Female'];
  for (let motion of motionList) {
    for (let gender of genderList) {
      genList(motion, gender);
    }
  }
};

start();
