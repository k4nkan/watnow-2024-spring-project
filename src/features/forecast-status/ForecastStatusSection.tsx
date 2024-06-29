import { Pending } from '@/features/forecast-status/components/Pending';
import { RequestAvailable } from './components/RequestAvailable';
import { VStack } from '@chakra-ui/react';
import useTodaysDinnerRequests from '@/hooks/use-todays-dinner-requests';
import useCurrentGroupMembers from '@/hooks/use-current-group-members';

const ForecastStatusSection = () => {
  const { summary } = useTodaysDinnerRequests();
  const { membersCount } = useCurrentGroupMembers();
  const isSummaryAvailable = summary !== null && summary !== 'loading';
  const isMembersAvailable =
    membersCount !== null && membersCount !== 'loading';
  const isPending =
    isSummaryAvailable &&
    isMembersAvailable &&
    membersCount > summary.totalRequests;
  const isAdditionalRequestAvailable =
    isSummaryAvailable && summary?.additionalRequests.length > 0;

  return (
    <VStack gap={4}>
      {isPending && (
        <Pending current={summary.totalRequests} max={membersCount} />
      )}
      {isAdditionalRequestAvailable && (
        <RequestAvailable additionalRequests={summary.additionalRequests} />
      )}
    </VStack>
  );
};

export default ForecastStatusSection;
