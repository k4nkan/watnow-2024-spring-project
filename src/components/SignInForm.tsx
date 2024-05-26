'use client';

import { auth, googleAuthProvider } from '@/utils/firebase';
import { VStack, Button, Divider } from '@chakra-ui/react';
import { signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import GoogleGLogo from './GoogleGLogo';
import InputWithLabel from './InputWithLabel';

const SignInForm = () => {
  const router = useRouter();

  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((user) => {
        console.log(user);
        router.push('/home');
      })
      .catch((error) => {
        // TODO: エラー内容を表示する
        console.error(error);
      });
  };

  return (
    <VStack spacing={4}>
      <InputWithLabel label="メールアドレス" />
      <InputWithLabel label="パスワード" />
      <Button colorScheme="blue" size="md" width="100%">
        続ける
      </Button>
      <Divider />
      <Button
        leftIcon={<GoogleGLogo size={16} />}
        colorScheme="gray"
        variant="outline"
        size="md"
        width="100%"
        onClick={handleSignInWithGoogle}
      >
        Googleでログイン
      </Button>
    </VStack>
  );
};

export default SignInForm;
