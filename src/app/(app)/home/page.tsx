'use client';
import { VStack } from '@chakra-ui/react';
import PageTitle from '@/components/PageTitle';
import TitleWithIcon from '@/components/TitleWithIcon';
import { Lightbulb, Onigiri } from '@phosphor-icons/react';
import ForecastStatusSection from '@/features/forecast-status/ForecastStatusSection';
import HintSection from '@/features/hint/HintSection';
import { useScrollButton } from '@/hooks/use-scroll-button';
import { useEffect, useRef } from 'react';

const Page = () => {
  const { setScrollTarget } = useScrollButton();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      setScrollTarget(scrollRef.current);
    }
  }, [setScrollTarget]);

  return (
    <>
      <VStack w={'100%'} px={6} py={2.5}>
        <PageTitle titleText="ホーム" />
        <TitleWithIcon
          text="今日のご飯予報"
          ion={<Onigiri size={24} weight="bold" />}
        />
        <ForecastStatusSection />
        <TitleWithIcon
          ref={scrollRef}
          text="ヒント"
          ion={<Lightbulb size={24} weight="bold" />}
        />
        <HintSection />
      </VStack>
    </>
  );
};

export default Page;
