'use client';

import { VerticalSelect } from '@/components/vertical-select/VerticalSelect';
import { Cookie, Onigiri, BowlFood } from '@phosphor-icons/react';
import { VerticalSelectOption as Option } from '@/components/vertical-select/VerticalSelectOption';

const Page = () => {
  return (
    <div className="m-10">
      <VerticalSelect
        value={'less'}
        itemHeight={56}
        onChange={(e) => console.log(e)}
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
    </div>
  );
};

export default Page;
