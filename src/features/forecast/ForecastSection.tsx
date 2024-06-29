import { HStack } from '@chakra-ui/react';
import React from 'react';
import { PortionIndicator } from './components/PortionIndicator';
import useTodaysDinnerRequests from '@/hooks/use-todays-dinner-requests';
import useCurrentGroupMembers from '@/hooks/use-current-group-members';

const ForecastSection = () => {
  const { summary } = useTodaysDinnerRequests();
  const { membersCount } = useCurrentGroupMembers();
  const isSummaryAvailable = summary !== null && summary !== 'loading';
  const isMembersAvailable =
    membersCount !== null && membersCount !== 'loading';
  const isPending =
    isSummaryAvailable &&
    isMembersAvailable &&
    membersCount > summary.totalRequests;

  return (
    <HStack justifyContent={'start'} py={8}>
      <PortionIndicator
        portion={isSummaryAvailable ? summary.totalPortions : '...'}
        isPending={isPending}
      />
    </HStack>
  );
};

export default ForecastSection;
