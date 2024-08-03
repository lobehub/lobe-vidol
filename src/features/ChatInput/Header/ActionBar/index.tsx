import Record from '@/features/Actions/Record';
import Token from '@/features/Actions/Token';
import History from '@/features/ChatList/Actions/History';

const ActionBar = () => (
  <>
    <History />
    <Record />
    <Token />
  </>
);

export default ActionBar;
