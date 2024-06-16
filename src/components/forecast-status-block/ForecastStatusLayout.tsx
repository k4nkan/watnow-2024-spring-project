import { Box, Text, VStack } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

interface ForecastStatusProps {
  badgeText: string;
  description: string;
}

const ForecastStatusLayout = (
  props: PropsWithChildren<ForecastStatusProps>
) => {
  return (
    <Box px={4} py={3} width="100%" borderRadius="lg" bg="gray.50">
      <VStack alignItems={'flex-start'}>
        <>
          <Box borderRadius="2px" bg="gray.100">
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

export default ForecastStatusLayout;
