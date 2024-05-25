'use client';
import { Gear, House, PencilSimple } from '@phosphor-icons/react';
import TabItem from './TabItem';
import { HStack } from '@chakra-ui/react';

interface Props {
  height?: string;
}

const TabBar = (props: Props) => {
  const height = props.height ?? '80px';
  return (
    <>
      <HStack
        justifyContent={'space-evenly'}
        w={'100%'}
        h={height}
        borderTopWidth={1}
        borderColor={'gray.50'}
      >
        <TabItem
          title="ホーム"
          activeIcon={<House size={32} weight={'fill'} />}
          icon={<House size={32} />}
          href="/home"
        />
        <TabItem
          title="連絡"
          activeIcon={<PencilSimple size={32} weight={'fill'} />}
          icon={<PencilSimple size={32} />}
          href="/update"
        />
        <TabItem
          activeIcon={<Gear size={32} weight={'fill'} />}
          title="設定"
          icon={<Gear size={32} />}
          href="/settings"
        />
      </HStack>
    </>
  );
};

export default TabBar;
