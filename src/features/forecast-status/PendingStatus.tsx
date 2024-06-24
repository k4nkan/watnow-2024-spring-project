import React from 'react';
import ForecastStatusLayout from './components/ForecastStatusLayout';
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
      colorScheme="gray"
    >
      <Progress
        colorScheme="progress"
        borderRadius={'lg'}
        width="100%"
        value={progressValue}
      />
      <HStack width="100%" justifyContent="space-between">
        <Text>
          <span className="font-bold">{props.current}</span>人
        </Text>
        <Text>
          あと <span className="font-bold">{props.max - props.current}</span>人
        </Text>
      </HStack>
    </ForecastStatusLayout>
  );
};
