import { DEFAULT_VIDOL_AGENT, LOBE_VIDOL_DEFAULT_AGENT_ID } from '@/constants/agent';

const initialState = {
  currentIdentifier: LOBE_VIDOL_DEFAULT_AGENT_ID,
  defaultAgent: DEFAULT_VIDOL_AGENT,
  localAgentList: [],
};

export { initialState };
