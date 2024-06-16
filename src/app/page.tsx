import AlertContainer from '@/components/AlertContainer';
import ForecastStatusContainer from '@/components/ForecastStatusContainer';
import SignInForm from '@/components/SignInForm';
import TabBar from '@/components/TabBar';

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
