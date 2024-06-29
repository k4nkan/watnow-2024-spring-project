import React from 'react';
import Section from './components/Section';
import SectionHeader from './components/SectionHeader';
import useTodaysDinnerRequests from '@/hooks/use-todays-dinner-requests';
import useCurrentGroupMembers from '@/hooks/use-current-group-members';

const TodaysDinnerRequests = () => {
  const { dinnerRequests, summary } = useTodaysDinnerRequests();
  const { membersCount } = useCurrentGroupMembers();

  if (summary !== null && dinnerRequests !== null && membersCount !== null) {
    return (
      <Section>
        <SectionHeader>TodaysDinnerRequests</SectionHeader>
        {dinnerRequests !== 'loading' &&
          summary !== 'loading' &&
          membersCount !== 'loading' && (
            <div>
              <p>totalRequests: {summary.totalRequests}</p>
              <p>totalPortions: {summary.totalPortions}</p>
              <p>totalMembers: {membersCount}</p>
              <p>
                additionalRequests:{' '}
                {summary.additionalRequests.map(
                  (request) => request.requestText
                )}
              </p>
              <ul>
                {dinnerRequests.map((request) => (
                  <li key={request.uid}>
                    {request.choice}, {request.portions}
                    {request.additionalRequests && (
                      <span> ({request.additionalRequests})</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
      </Section>
    );
  }
};

export default TodaysDinnerRequests;
