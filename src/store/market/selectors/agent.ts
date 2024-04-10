import { MarketStore } from '@/store/market';
import { Agent } from '@/types/agent';

const showAgentSideBar = (s: MarketStore) => !!s.currentAgentId;

const currentAgentItem = (s: MarketStore): Agent | undefined => {
  const { currentAgentId, agentList } = s;
  const currentAgent = agentList.find((item) => item.agentId === currentAgentId);
  if (!currentAgent) return undefined;

  return currentAgent;
};

export const agentSelectors = {
  currentAgentItem,
  showAgentSideBar,
};
