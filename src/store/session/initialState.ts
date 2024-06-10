import { LOBE_VIDOL_DEFAULT_AGENT_ID } from '@/constants/agent';
import { Session } from '@/types/session';

const defaultSession: Session = {
  agentId: LOBE_VIDOL_DEFAULT_AGENT_ID,
  messages: [],
};

const initialState = {
  activeId: defaultSession.agentId,
  chatLoadingId: undefined,
  shareLoading: false,
  messageInput: '',
  sessionList: [],
  defaultSession: defaultSession,
  viewerMode: false,
  voiceOn: true,
};

export { initialState };
