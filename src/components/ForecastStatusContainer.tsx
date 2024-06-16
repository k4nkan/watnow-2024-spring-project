import { Pending } from './forecast-status-block/PendingStatus';

const ForecastStatusBlock = () => {
  return <Pending current={4} max={10} />;
};

export default ForecastStatusBlock;
