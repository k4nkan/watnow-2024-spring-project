import { ChakraProvider } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

const Providers = ({ children }: PropsWithChildren) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};

export default Providers;
