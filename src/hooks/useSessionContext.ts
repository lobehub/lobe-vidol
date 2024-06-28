import { sessionSelectors, useSessionStore } from '@/store/session';

const useSessionContext = () => {
  const [activeSessionId, switchSession] = useSessionStore((s) => [s.activeId, s.switchSession]);

  const getAgentById = sessionSelectors.getAgentById(useSessionStore.getState());
  const sessionAgent = getAgentById(activeSessionId);

  return {
    activeSessionId,
    sessionAgent,
    switchSession,
    getAgentById,
  };
};

export default useSessionContext;
