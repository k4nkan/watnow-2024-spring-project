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
import TabBar from '@/components/TabBar';

export default function Page() {
  return (
    <div>
      <SignInForm />
      <TabBar />
    </div>
  );
}
