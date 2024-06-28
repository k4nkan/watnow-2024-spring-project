import customTheme from '@/utils/chakra-custom-theme';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider as JotaiProvider } from 'jotai';
import { PropsWithChildren } from 'react';

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <JotaiProvider>
      <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
    </JotaiProvider>
  );
};

export default Providers;
