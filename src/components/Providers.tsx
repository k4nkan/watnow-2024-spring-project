import customTheme from '@/utils/chakra-custom-theme';
import { ChakraProvider } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

const Providers = ({ children }: PropsWithChildren) => {
  return <ChakraProvider theme={customTheme}>{children}</ChakraProvider>;
};

export default Providers;
