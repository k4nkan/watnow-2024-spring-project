import { VerticalSelect } from '@/components/vertical-select/VerticalSelect';
import {
  Cookie,
  Onigiri,
  BowlFood,
  CaretRight,
  XCircle
} from '@phosphor-icons/react';
import { VerticalSelectOption as Option } from '@/components/vertical-select/VerticalSelectOption';
import { useCallback, useState } from 'react';
import { Button, VStack } from '@chakra-ui/react';
import { SectionHeader } from './components/SectionHeader';
import { Section } from './components/Section';

export const UpdateForm = () => {
  const [selectedValue, setSelectedValue] = useState<string>('normal');

  const handleChange = useCallback((value: string | number) => {
    setSelectedValue(value as string);
  }, []);

  return (
    <VStack w={'100%'} bg={'gray.50'} p={4} gap={9}>
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
  );
};
