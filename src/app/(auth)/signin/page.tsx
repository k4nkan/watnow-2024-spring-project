import Copyright from '@/components/Copyright';
import SignInForm from '@/features/account/SignInForm';
import { Heading, VStack, Image, Box, Spacer } from '@chakra-ui/react';

function page() {
  return (
    <Box width={'100%'} height={'100vh'} bg={'gray.100'}>
      <VStack p={12} height={'100vh'} spacing={0} align={'stretch'}>
        <Box width={'100%'}>
          <Image src="/gohanboard_app_logo_big.svg" alt="gohanboard_app_logo" />
        </Box>
        <Spacer />
        <VStack bg={''} width={'100%'} spacing={'52px'}>
          <Heading size={'xl'}>
            晩ごはんの連絡で
            <br />
            イライラする毎日に
            <br />
            さようなら👋
          </Heading>
          <Box bg={'gray.50'} width={'100%'} p={5} borderRadius={12}>
            <SignInForm />
          </Box>
        </VStack>
        <Spacer />
        <Copyright />
      </VStack>
    </Box>
  );
}

export default page;
