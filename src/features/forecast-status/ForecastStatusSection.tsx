import { Pending } from '@/features/forecast-status/components/Pending';
import { RequestAvailable } from './components/RequestAvailable';

const ForecastStatusSection = () => {
  return (
    <>
      <Pending current={4} max={10} />
      <RequestAvailable />
    </>
  );
};

export default ForecastStatusSection;
