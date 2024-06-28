import { useAgentStore } from '@/store/agent';
import { sessionSelectors, useSessionStore } from '@/store/session';

const useSessionContext = () => {
  const [activeSessionId, switchSession] = useSessionStore((s) => [s.activeId, s.switchSession]);
  const getAgentById = sessionSelectors.getAgentById(useSessionStore.getState());

  // activate another agent
  const activateAgent = useAgentStore((s) => s.activateAgent);

  const getSessionAgent = (id: string) => getAgentById(id);

  const onSwitchSession = (id: string) => {
    switchSession(id);

    const agent = getAgentById(id);

    activateAgent(agent.agentId);
  };

  return {
    activeSessionId,
    getSessionAgent,
    onSwitchSession,
  };
};

export default useSessionContext;
