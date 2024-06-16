import React from 'react';
import ForecastStatusLayout from './ForecastStatusLayout';
import { HStack, Progress, Text } from '@chakra-ui/react';

interface PendingProps {
  current: number;
  max: number;
}

export const Pending = (props: PendingProps) => {
  const progressValue = (props.current / props.max) * 100;
  return (
    <ForecastStatusLayout
      badgeText="未確定"
      description={'連絡がまだの人がいます！'}
    >
      <Progress
        colorScheme="yellow.300"
        borderRadius={'lg'}
        width="100%"
        value={progressValue}
      />
      <HStack width="100%" justifyContent="space-between">
        <Text>{props.current}人</Text>
        <Text>あと {props.max - props.current}人</Text>
      </HStack>
    </ForecastStatusLayout>
  );
};
