'use client';
import { Stack, Text, VStack } from '@chakra-ui/react';
import PageTitle from '@/components/PageTitle';
import TitleWithIcon from '@/components/TitleWithIcon';
import { Lightbulb, Onigiri } from '@phosphor-icons/react';
import AlertContainer from '@/components/AlertContainer';
import ForecastStatusContainer from '@/components/ForecastStatusContainer';

const Page = () => {
  return (
    <>
      <VStack w={'100%'} px={6} py={2.5}>
        <PageTitle titleText="ホーム" />
        <TitleWithIcon
          text="今日のご飯予報"
          ion={<Onigiri size={24} weight="bold" />}
        />
        <ForecastStatusContainer />
        <TitleWithIcon
          text="ヒント"
          ion={<Lightbulb size={24} weight="bold" />}
        />
        <AlertContainer />
      </VStack>
    </>
  );
};

export default Page;
