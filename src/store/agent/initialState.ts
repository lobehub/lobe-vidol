import { LOBE_VIDOL_DEFAULT_AGENT, LOBE_VIDOL_DEFAULT_AGENT_ID } from '@/constants/agent';

const initialState = {
  currentIdentifier: LOBE_VIDOL_DEFAULT_AGENT_ID,
  defaultAgent: LOBE_VIDOL_DEFAULT_AGENT,
  localAgentList: [],
};

export { initialState };
