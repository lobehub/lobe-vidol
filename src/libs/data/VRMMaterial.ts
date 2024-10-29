export interface VRMMaterial {
  name: string;
  shader: string;
  renderQueue: number;
  floatProperties: { [key: string]: number };
  vectorProperties: { [key: string]: number[] };
  textureProperties: { [key: string]: number };
  keywordMap: { [key: string]: any };
  tagMap: { [key: string]: string };
}
