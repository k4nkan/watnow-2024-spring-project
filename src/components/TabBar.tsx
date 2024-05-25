'use client';
import { Gear, House, PencilSimple } from '@phosphor-icons/react';
import TabItem from './TabItem';
import { HStack } from '@chakra-ui/react';

const TabBar = () => {
  return (
    <>
      <HStack justifyContent={'space-evenly'}>
        <TabItem title="ホーム" icon={<House size={32} />} />
        <TabItem title="連絡" icon={<PencilSimple size={32} />} />
        <TabItem title="設定" icon={<Gear size={32} />} />
      </HStack>
    </>
  );
};

export default TabBar;
