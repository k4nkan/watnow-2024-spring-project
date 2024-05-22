import Link from 'next/link';

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  ChakraProvider
} from '@chakra-ui/react';
import SignInForm from '@/components/SignInForm';

export default function Page() {
  return (
    <div>
      <SignInForm></SignInForm>
    </div>
  );
}
