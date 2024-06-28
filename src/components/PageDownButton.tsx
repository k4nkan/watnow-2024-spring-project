import { useScrollButton } from '@/hooks/use-scroll-button';
import { Box, BoxProps, Circle } from '@chakra-ui/react';
import { ArrowDown } from '@phosphor-icons/react';
import { MouseEventHandler } from 'react';

interface PageDownButtonProps {
  onClick?: MouseEventHandler<HTMLDivElement>;
  zIndex?: number;
}

const PageDownButton = (props: PageDownButtonProps) => {
  const { show, disabled } = useScrollButton();

  if (!disabled)
    return (
      <Box
        position="absolute"
        bottom={'80px'}
        left="50%"
        transition={'all 0.2s cubic-bezier(0.62, 0, 0.09, 0.99) '}
        transform={`translate(-50%, calc(-50% + ${show ? '0px' : '100px'}))`}
        zIndex={props.zIndex}
      >
        <Circle size={'40px'} bg={'black'} onClick={props.onClick}>
          <ArrowDown size={'25px'} color="white" />
        </Circle>
      </Box>
    );
};

export default PageDownButton;
