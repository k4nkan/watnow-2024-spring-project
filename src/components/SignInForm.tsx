'use client';

import { Button, VStack, Divider } from '@chakra-ui/react';
import GoogleGLogo from './GoogleGLogo';
import InputWithLabel from './InputWithLabel';

const SignInForm = () => {
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
      >
        Googleでログイン
      </Button>
    </VStack>
  );
};

export default SignInForm;
