import { Box, Text, VStack, theme } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

interface ForecastStatusProps {
  colorScheme?: keyof typeof theme.colors;
  badgeText: string;
  description: string;
}

const Layout = (props: PropsWithChildren<ForecastStatusProps>) => {
  const colorScheme = props.colorScheme || 'gray';
  const bg50 = `${colorScheme}.50`;
  const bg800 = `${colorScheme}.800`;
  const bg100 = `${colorScheme}.100`;

  return (
    <Box px={4} py={3} width="100%" borderRadius="lg" bg={bg50}>
      <VStack alignItems={'flex-start'}>
        <>
          <Box color={bg800} px={1} borderRadius="2px" bg={bg100}>
            <Text as="b" size={'sm'}>
              {props.badgeText}
            </Text>
          </Box>
          <Text>{props.description}</Text>
          {props.children}
        </>
      </VStack>
    </Box>
  );
};

export default Layout;
