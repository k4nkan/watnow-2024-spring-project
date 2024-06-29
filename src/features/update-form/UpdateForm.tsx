import { VerticalSelect } from '@/components/vertical-select/VerticalSelect';
import {
  Cookie,
  Onigiri,
  BowlFood,
  CaretRight,
  XCircle,
  CheckCircle
} from '@phosphor-icons/react';
import { VerticalSelectOption as Option } from '@/components/vertical-select/VerticalSelectOption';
import { MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { Box, Button, Spinner, VStack } from '@chakra-ui/react';
import { SectionHeader } from './components/SectionHeader';
import { Section } from './components/Section';
import useMyDinnerRequest, {
  updateRequestProps
} from '@/hooks/use-my-dinner-request';
import clsx from 'clsx';

// TODO: この値はユーザー設定から取得する
const presets = {
  none: 0,
  less: 1,
  normal: 1.5,
  more: 2
};

export const UpdateForm = () => {
  const {
    dinnerRequest,
    exists: isTodaysRequestExists,
    updateRequest
  } = useMyDinnerRequest();
  const [selectedValue, setSelectedValue] = useState<string>('loading');
  const [currentValue, setCurrentValue] = useState<string>('loading');
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const isLoading = dinnerRequest === 'loading';

  useEffect(() => {
    if (isLoading) return;
    if (dinnerRequest === null) {
      setSelectedValue('normal');
    } else {
      setCurrentValue(dinnerRequest.choice);
      setSelectedValue(dinnerRequest.choice);
    }
  }, [dinnerRequest, isLoading]);

  const handleChange = useCallback(
    (value: string | number) => {
      setSelectedValue(value as string);
    },
    [setSelectedValue]
  );

  const handleSubmit: MouseEventHandler = useCallback(() => {
    const value = selectedValue;
    const requestData: updateRequestProps = {
      choice: value as updateRequestProps['choice'],
      portions: presets[value as keyof typeof presets],
      additionalRequests: ''
    };
    updateRequest(requestData);
  }, [selectedValue, updateRequest]);

  useEffect(() => {
    setIsChanged(selectedValue !== currentValue);
  }, [selectedValue, currentValue]);

  return (
    <VStack w={'100%'} gap={4}>
      <VStack
        w={'100%'}
        p={4}
        bg={'gray.50'}
        rounded={'8px'}
        className={clsx(
          ' flex w-full flex-col gap-9 transition-opacity',
          isLoading ?? 'opacity-10'
        )}
      >
        <Section>
          <SectionHeader>食べません...</SectionHeader>
          <VerticalSelect
            value={selectedValue}
            itemHeight={56}
            onChange={handleChange}
          >
            <Option
              value={'none'}
              leftIcon={<XCircle />}
              selectedLeftIcon={<XCircle weight="bold" />}
              subText={'0杯'}
            >
              まったく
            </Option>
          </VerticalSelect>
        </Section>
        <Section>
          <SectionHeader
            supportButton={
              <Button
                variant="link"
                size="sm"
                rightIcon={<CaretRight weight="bold" />}
              >
                カスタマイズ
              </Button>
            }
          >
            食べる！
          </SectionHeader>
          <VerticalSelect
            value={selectedValue}
            itemHeight={56}
            onChange={handleChange}
          >
            <Option
              value={'less'}
              leftIcon={<Cookie />}
              selectedLeftIcon={<Cookie weight="bold" />}
              subText={'1杯'}
            >
              少なめに
            </Option>
            <Option
              value={'normal'}
              leftIcon={<Onigiri />}
              selectedLeftIcon={<Onigiri weight="bold" />}
              subText={'1.5杯'}
            >
              普段通り
            </Option>
            <Option
              value={'more'}
              leftIcon={<BowlFood />}
              selectedLeftIcon={<BowlFood weight="bold" />}
              subText={'2杯'}
            >
              たくさん
            </Option>
          </VerticalSelect>
        </Section>
      </VStack>
      <Button
        colorScheme="yellow"
        size="lg"
        w={'100%'}
        rightIcon={<CheckCircle weight={'bold'} />}
        isDisabled={!isChanged}
        onClick={handleSubmit}
        isLoading={isSubmitting}
      >
        {isTodaysRequestExists ? '更新する' : '今日の連絡をする'}
      </Button>
    </VStack>
  );
};
