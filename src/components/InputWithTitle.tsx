import {
  FormControl,
  FormLabel,
  Input,
  InputProps,
  Text
} from '@chakra-ui/react';

interface Props extends InputProps {
  title: string;
}

function InputWithTitle(props: Props) {
  const { title, ...inputProps } = props;

  return (
    <>
      <FormControl>
        <FormLabel>
          <Text fontSize="sm" as="b">
            {title}
          </Text>
        </FormLabel>
        <Input type="email" size="md" width="100%" {...inputProps} />
      </FormControl>
    </>
  );
}

export default InputWithTitle;
