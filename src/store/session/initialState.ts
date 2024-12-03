import { LOBE_VIDOL_DEFAULT_AGENT_ID } from '@/constants/agent';
import { Session } from '@/types/session';

const defaultSession: Session = {
  agentId: LOBE_VIDOL_DEFAULT_AGENT_ID,
  messages: [],
};

const initialState = {
  activeId: defaultSession.agentId,
  chatLoadingId: undefined,
  ttsLoadingId: undefined,
  shareLoading: false,
  messageInput: '',
  sessionList: [],
  defaultSession: defaultSession,
  interactive: true,
};

export { initialState };
