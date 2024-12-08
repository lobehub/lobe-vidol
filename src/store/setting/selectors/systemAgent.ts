import { DEFAULT_SYSTEM_AGENT_CONFIG } from '@/constants/agent';
import type { SettingStore } from '@/store/setting';
import { merge } from '@/utils/merge';

import { currentConfig } from './config';

const currentSystemAgent = (s: SettingStore) =>
  merge(DEFAULT_SYSTEM_AGENT_CONFIG, currentConfig(s).systemAgent);

const emotionAnalysis = (s: SettingStore) => currentSystemAgent(s).emotionAnalysis;

export const systemAgentSelectors = {
  currentSystemAgent,
  emotionAnalysis,
};
