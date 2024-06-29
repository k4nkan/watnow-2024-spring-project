'use client';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Button,
  VStack
} from '@chakra-ui/react';
import { ArrowRight } from '@phosphor-icons/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface alertProps {
  alertColorScheme:
    | 'success'
    | 'info'
    | 'warning'
    | 'error'
    | 'loading'
    | undefined;
  buttonColorScheme: string;
  titleText: string;
  descriptionText: string;
  destination: string;
  href?: string;
}

function Hint(props: alertProps) {
  const [isVisible, setIsVisible] = useState(true);
  const navigation = useRouter();

  return (
    <>
      {isVisible && (
        <Alert borderRadius="lg" status={props.alertColorScheme}>
          <AlertIcon />
          <VStack width="100%" alignItems={'flex-start'}>
            <AlertTitle>{props.titleText}</AlertTitle>
            <AlertDescription>{props.descriptionText}</AlertDescription>
            <Button
              rightIcon={<ArrowRight size={14} weight="bold" />}
              width="100%"
              variant={'solid'}
              size={'sm'}
              colorScheme={props.buttonColorScheme}
              onClick={() => props.href && navigation.push(props.href)}
            >
              {props.destination} に移動
            </Button>
          </VStack>
          <CloseButton
            alignSelf="flex-start"
            position="relative"
            right={-1}
            top={-1}
            onClick={() => setIsVisible(false)}
          />
        </Alert>
      )}
    </>
  );
}

export default Hint;
