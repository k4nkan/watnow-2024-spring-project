'use client';

import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  VStack,
  Divider
} from '@chakra-ui/react';
import GoogleGLogo from './GoogleGLogo';
import InputWithTitle from './InputWithTitle';

const SignInForm = () => {
  return (
    <VStack spacing={4}>
      <InputWithTitle title="メールアドレス"></InputWithTitle>
      <InputWithTitle title="パスワード"></InputWithTitle>
      <Button colorScheme="blue" size="md" width="100%">
        続ける
      </Button>
      <Divider />
      <Button
        leftIcon={<GoogleGLogo />}
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
