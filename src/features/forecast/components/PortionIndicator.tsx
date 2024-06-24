import { Heading } from '@chakra-ui/react';
import { BowlContainer } from './BowlContainer';

interface PortionIndicatorProps {
  portion: number;
  isPending?: boolean;
}

export const PortionIndicator = (props: PortionIndicatorProps) => {
  return (
    <BowlContainer>
      <Heading size={'md'}>
        <span className="text-4xl">{props.portion}</span>
        {'人前' + (props.isPending ? '?' : '')}
      </Heading>
    </BowlContainer>
  );
};
