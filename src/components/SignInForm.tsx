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

const SignInForm = () => {
  return (
    <VStack
        spacing={4}
    >
      <FormControl>
        <FormLabel>メールアドレス</FormLabel>
        <Input type="email" size='md' width='100%'/>
      </FormControl>
      <FormControl>
        <FormLabel>パスワード</FormLabel>
        <Input type="email" size='md' width='100%'/>
      </FormControl>
      <Button colorScheme='blue' size='md' width='100%'>
        続ける
      </Button>
      <Divider/>
      <Button leftIcon={<GoogleGLogo/>} colorScheme='gray' variant='outline' size='md' width='100%'>
        Googleでログイン
      </Button>
    </VStack>
  );
};

export default SignInForm;
