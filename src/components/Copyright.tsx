import { Box, Heading } from '@chakra-ui/react';

export default function Copyright() {
  return (
    <Box>
      <Heading size={'xs'} textAlign={'center'} color={'gray.500'}>
        Gohan Board
        <br />
        ©2024 k4nkan, chell-uoxou
      </Heading>
    </Box>
  );
}
