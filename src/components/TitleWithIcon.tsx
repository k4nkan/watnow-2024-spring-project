import { Box, ButtonProps, Center, HStack, Heading } from '@chakra-ui/react';
import { ReactElement, forwardRef } from 'react';

interface Props {
  text: string;
  ion: ReactElement;
}

const TitleWithIcon = forwardRef<HTMLDivElement, Props>((props, ref) => {
  return (
    <HStack ref={ref} mt={3} w={'100%'} justifyContent={'start'}>
      <Center h={8} w={8}>
        {props.ion}
      </Center>
      <Heading size={'md'}>{props.text}</Heading>
    </HStack>
  );
});

TitleWithIcon.displayName = 'TitleWithIcon';

export default TitleWithIcon;
