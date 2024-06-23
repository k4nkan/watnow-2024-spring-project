import { Pending } from '@/features/forecast-status/PendingStatus';

const ForecastStatusBlock = () => {
  return <Pending current={4} max={10} />;
};

export default ForecastStatusBlock;
