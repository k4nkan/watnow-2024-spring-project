import { Box, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactElement } from 'react';

interface titleProps {
  title: string;
  icon: ReactElement;
  activeIcon: ReactElement;
  href: string;
}

const TabItem = (props: titleProps) => {
  const pathName = usePathname();

  const isActive = (href: string) => {
    return pathName.startsWith(href);
  };

  return (
    <Link href={props.href}>
      <VStack
        w={'60px'}
        spacing={1}
        className={isActive(props.href) ? 'text-orange-500' : undefined}
      >
        <Box h={8} w={8}>
          {isActive(props.href) ? props.activeIcon : props.icon}
        </Box>
        <Box>
          <p className="h-5 text-xs font-bold">{props.title}</p>
        </Box>
      </VStack>
    </Link>
  );
};

export default TabItem;
