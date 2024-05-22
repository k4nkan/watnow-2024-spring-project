import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack
} from '@chakra-ui/react';
import { ReactElement } from 'react';

interface titleProps {
  title: string;
  icon: ReactElement;
}

const TabItem = (props: titleProps) => {
  return (
    <>
      <VStack w={'60px'} spacing={1}>
        <Box h={8} w={8}>
          {props.icon}
        </Box>
        <Box>
          <p className="h-5 text-xs font-bold">{props.title}</p>
        </Box>
      </VStack>
    </>
  );
};

export default TabItem;
