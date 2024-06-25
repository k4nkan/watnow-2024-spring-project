import { Box, Circle } from '@chakra-ui/react';
import { ArrowDown } from '@phosphor-icons/react';
import { MouseEventHandler } from 'react';

interface PageDownButtonProps {
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const PageDownButton = (props: PageDownButtonProps) => {
  return (
    <Box
      position="absolute"
      bottom={'80px'}
      left="50%"
      transform="translate(-50%, -50%)"
    >
      <Circle size={'40px'} bg={'black'} onClick={props.onClick}>
        <ArrowDown size={'25px'} color="white" />
      </Circle>
    </Box>
  );
};

export default PageDownButton;
