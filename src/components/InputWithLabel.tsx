import {
  FormControl,
  FormLabel,
  Input,
  InputProps,
  Text
} from '@chakra-ui/react';

interface Props extends InputProps {
  label: string;
}

function InputWithLabel(props: Props) {
  const { label, ...inputProps } = props;

  return (
    <>
      <FormControl>
        <FormLabel>
          <Text fontSize="sm" as="b">
            {label}
          </Text>
        </FormLabel>
        <Input type="email" size="md" width="100%" {...inputProps} />
      </FormControl>
    </>
  );
}

export default InputWithLabel;
