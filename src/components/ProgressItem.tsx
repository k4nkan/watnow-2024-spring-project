import { Box, HStack, Progress, Text, VStack } from '@chakra-ui/react';

interface BarProps {
  Status: boolean;
  Member: number;
  Now: number;
}

const ProgressItem = (props: BarProps) => {
  const progressValue = (props.Now / props.Member) * 100;
  return (
    <Box width="100%" borderRadius="lg" bg="gray.50">
      <VStack alignItems={'flex-start'}>
        {props.Status ? (
          <Text>全員連絡済みです！</Text>
        ) : (
          <>
            <Box borderRadius="2px" bg="gray.100">
              <Text as='b' size={'sm'}>
                未確定
              </Text>
            </Box>
            <Text>連絡がまだの人がいます！</Text>
          </>
        )}
        <Progress
          colorScheme="yellow.300"
          borderRadius={'lg'}
          width="100%"
          value={progressValue}
          
        />
        <HStack width="100%" justifyContent="space-between">
          <Text>{props.Now}人</Text>
          <Text>あと {props.Member - props.Now}人</Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ProgressItem;
