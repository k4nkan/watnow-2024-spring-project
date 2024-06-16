'use client';
import { Stack, Text, VStack } from '@chakra-ui/react';
import PageTitle from '@/components/PageTitle';
import AlertBox from '@/components/AlertBox';
import TitleWithIcon from '@/components/TitleWithIcon';
import { Lightbulb, Onigiri } from '@phosphor-icons/react';

const Page = () => {
  return (
    <>
      <VStack w={'100%'} px={6} py={2.5}>
        <PageTitle titleText="ホーム" />
        <TitleWithIcon
          text="今日のご飯予報"
          ion={<Onigiri size={24} weight="bold" />}
        />
        <TitleWithIcon
          text="ヒント"
          ion={<Lightbulb size={24} weight="bold" />}
        />
        <AlertBox />
      </VStack>
    </>
  );
};

export default Page;
