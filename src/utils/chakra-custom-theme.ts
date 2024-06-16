'use client';

import { extendTheme, theme } from '@chakra-ui/react';
const customTheme = extendTheme({
  colors: {
    progress: {
      500: theme.colors.yellow[300]
    }
  }
});

export default customTheme;
