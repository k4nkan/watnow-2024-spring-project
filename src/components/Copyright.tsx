import { Box, Text } from '@chakra-ui/react';

export default function Copyright() {
  return (
    <Box>
      <Text fontSize={'xs'} textAlign={'center'} color={'gray.500'}>
        Gohan Board
        <br />
        ©2024 k4nkan, chell-uoxou
      </Text>
    </Box>
  );
}
