import { HStack, Heading, VStack } from '@chakra-ui/react';

interface SectionHeaderProps {
  children: React.ReactNode;
  supportButton?: React.ReactNode;
}
export const SectionHeader = ({
  children,
  supportButton
}: SectionHeaderProps) => {
  return (
    <HStack w={'100%'} align={'start'} spacing={2} px={2}>
      <Heading size="sm" flex={1}>
        {children}
      </Heading>
      <HStack>{supportButton}</HStack>
    </HStack>
  );
};
