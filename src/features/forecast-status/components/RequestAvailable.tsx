import React from 'react';
import Layout from './Layout';
import { Box } from '@chakra-ui/react';
import { SampleRequests } from './SampleRequests';

export const RequestAvailable = () => {
  return (
    <Layout
      badgeText="要望あり"
      description={'晩御飯の希望アイデアが出ています！'}
      colorScheme="orange"
    >
      <Box
        width={'100%'}
        bg="black"
        height={'4px'}
        borderRadius={'lg'}
        opacity={0.03}
      />
      <SampleRequests />
    </Layout>
  );
};
