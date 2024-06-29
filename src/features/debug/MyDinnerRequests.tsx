import React from 'react';
import Section from './components/Section';
import SectionHeader from './components/SectionHeader';
import { Button } from '@chakra-ui/react';
import useMyDinnerRequest, {
  updateRequestProps
} from '@/hooks/use-my-dinner-request';
import DebugInfoContainer from './components/DebugInfoContainer';

const MyDinnerRequests = () => {
  const { dinnerRequest, exists, updateRequest } = useMyDinnerRequest();
  const handleClick1 = () => {
    const data: updateRequestProps = {
      choice: 'less',
      portions: 2,
      additionalRequests: 'お腹いっぱい'
    };
    updateRequest(data);
  };
  return (
    <Section>
      <SectionHeader>MyDinnerRequests</SectionHeader>
      <Button onClick={handleClick1}>リクエストを追加</Button>
      <DebugInfoContainer>
        <div>exists: {exists ? 'true' : 'false'}</div>
        <div>
          dinnerRequest:{' '}
          {dinnerRequest ? JSON.stringify(dinnerRequest) : 'null'}
        </div>
      </DebugInfoContainer>
    </Section>
  );
};

export default MyDinnerRequests;
