import { LOBE_VIDOL_DEFAULT_AGENT_ID } from '@/constants/agent';
import { ChatMode, Session } from '@/types/session';

const defaultSession: Session = {
  agentId: LOBE_VIDOL_DEFAULT_AGENT_ID,
  messages: [],
};

const initialState = {
  chatMode: 'chat' as ChatMode,
  activeId: defaultSession.agentId,
  chatLoadingId: undefined,
  ttsLoadingId: undefined,
  shareLoading: false,
  messageInput: '',
  sessionList: [],
  defaultSession: defaultSession,
  voiceOn: false,
  interactive: true,
};

export { initialState };
