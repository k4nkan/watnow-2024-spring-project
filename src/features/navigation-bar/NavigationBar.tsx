import { Avatar, HStack, Spacer } from '@chakra-ui/react';

export const NavigationBar = () => {
  return (
    <HStack h={20} w={'100%'} p={5} justify={'space-between'}>
      <Spacer />
      <Avatar size="sm" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
    </HStack>
  );
};
