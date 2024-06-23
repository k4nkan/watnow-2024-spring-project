import { Pending } from '@/features/forecast-status/PendingStatus';

const ForecastStatusContainer = () => {
  return <Pending current={4} max={10} />;
};

export default ForecastStatusContainer;
