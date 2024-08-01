export interface MotionAnimation {
  avatar: string;
  category: string;
  description: string;
  gender: string;
  id: string;
  name: string;
  type: string;
  url: string;
}

export interface Motion {
  category: string;
  character_type: string;
  description: string;
  id: string;
  motion_id: string;
  motions: any[] | null;
  name: string;
  source: string;
  thumbnail: string;
  thumbnail_animated: string;
  type: string;
}
