import AlertContainer from '@/features/hint/AlertContainer';
import TabBar from '@/components/TabBar';
import SignInForm from '@/features/account/SignInForm';
import ForecastStatusContainer from '@/features/forecast-status/ForecastStatusContainer';

export default function Page() {
  return (
    <div>
      <SignInForm />
      <TabBar />
      <ForecastStatusContainer />
      <AlertContainer />
    </div>
  );
}
