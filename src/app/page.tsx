import AlertBox from '@/components/AlertBox';
import SignInForm from '@/components/SignInForm';
import TabBar from '@/components/TabBar';

export default function Page() {
  return (
    <div>
      <SignInForm />
      <TabBar />
      <AlertBox />
    </div>
  );
}
