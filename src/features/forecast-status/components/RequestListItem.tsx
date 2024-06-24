import { Avatar, HStack, Heading, Text } from '@chakra-ui/react';

interface RequestListItemProps {
  text: string;
  icon: string;
  name: string;
}

export const RequestListItem = (props: RequestListItemProps) => {
  return (
    <HStack alignItems={'flex-start'} w={'100%'} justifyContent={'start'}>
      <Avatar size={'xs'} src={props.icon} name={props.name} />
      <Text size={'xs'}>{props.text}</Text>
    </HStack>
  );
};
