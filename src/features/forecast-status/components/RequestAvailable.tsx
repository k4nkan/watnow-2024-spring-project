import React from 'react';
import Layout from './Layout';
import { Box, VStack } from '@chakra-ui/react';
import { AdditionalRequest } from '@/states/db/todays-dinner-requests';
import { RequestListItem } from './RequestListItem';
import { SampleRequests } from './SampleRequests';

interface RequestAvailableProps {
  additionalRequests: AdditionalRequest[];
}
export const RequestAvailable = ({
  additionalRequests
}: RequestAvailableProps) => {
  console.log('additionalRequests', additionalRequests);

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
      {/* <VStack pt={2} px={2}>
        {additionalRequests.map((request, index) => (
          <RequestListItem
            key={index}
            text={request.requestText}
            icon=""
            name="Segun Adebayo"
          />
        ))}
      </VStack> */}
      <SampleRequests />
    </Layout>
  );
};
