import { DEFAULT_AGENT, V_CHAT_DEFAULT_AGENT_ID } from '@/constants/agent';
import { Session } from '@/types/session';

const defaultSession: Session = {
  agentId: V_CHAT_DEFAULT_AGENT_ID,
  messages: [],
};

const initialState = {
  activeId: defaultSession.agentId,
  chatLoadingId: undefined,
  localAgentList: [DEFAULT_AGENT],
  messageInput: '',
  sessionList: [defaultSession],
  viewerMode: true,
  voiceOn: true,
};

export { initialState };
