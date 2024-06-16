import AlertBox from '@/components/AlertBox';
import ForecastStatusBlock from '@/components/ForecastStatusBlock';
import SignInForm from '@/components/SignInForm';
import TabBar from '@/components/TabBar';

export default function Page() {
  return (
    <div>
      <SignInForm />
      <TabBar />
      <ForecastStatusBlock />
      <AlertBox />
    </div>
  );
}
