import { Box, Center, HStack, Heading } from '@chakra-ui/react';
import { ReactElement } from 'react';

interface Props {
    text: string;
    ion: ReactElement;
}

const TitleWithIcon = (Props : Props) => {
    return (
        <HStack mt={3} w={'100%'} justifyContent={'start'}>
            <Center h={8} w={8}>
                {Props.ion}
            </Center>
            <Heading size={'md'}>
                {Props.text}
            </Heading>
        </HStack>
    )
}

export default TitleWithIcon;