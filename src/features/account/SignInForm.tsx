'use client';

import { auth, googleAuthProvider } from '@/utils/firebase';
import { VStack, Button, Divider, Box } from '@chakra-ui/react';
import { signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import GoogleGLogo from '@/components/GoogleGLogo';
import InputWithLabel from '@/components/InputWithLabel';

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
    <Box bg={"gray.50"} width={"100%"} p={5} borderRadius={12}>
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
    </Box>
  );
};

export default SignInForm;
