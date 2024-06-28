'use client';

import PageTitle from '@/components/PageTitle';
import { UpdateForm } from '@/features/update-form/UpdateForm';
import { Text, VStack } from '@chakra-ui/react';

const Page = () => {
  return (
    <VStack w={'100%'} px={6} py={2.5} gap={4}>
      <PageTitle titleText="連絡" />
      <Text>
        今日の晩御飯はどれくらい食べる予定ですか？量や献立の希望を編集しましょう！
      </Text>
      <UpdateForm />
    </VStack>
  );
};

export default Page;
