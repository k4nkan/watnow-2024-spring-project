import { Heading } from '@chakra-ui/react';

interface Props {
  titleText: string;
}

const PageTitle = (Props: Props) => {
  return (
    <Heading w={'100%'} textAlign={'start'}>
      {Props.titleText}
    </Heading>
  );
};

export default PageTitle;
