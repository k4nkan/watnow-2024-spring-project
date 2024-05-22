import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react';

interface titleProps {
  title: string;
}

const InputWithTitle: React.FC<titleProps> = ({ title }) => {
  return (
    <>
      <FormControl>
        <FormLabel>
          <Text fontSize="sm" as='b'>{title}</Text>
        </FormLabel>
        <Input type="email" size="md" width="100%" />
      </FormControl>
    </>
  );
};

export default InputWithTitle;
