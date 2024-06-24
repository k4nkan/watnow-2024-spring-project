import { VStack } from '@chakra-ui/react';
import { RequestListItem } from './RequestListItem';

export const SampleRequests = () => {
  return (
    <VStack>
      <RequestListItem
        text="最近食べてなかったのでスーパー激甘口麻婆豆腐たべたいです🥄"
        icon="https://bit.ly/sage-adebayo"
        name="Segun Adebayo"
      />
      <RequestListItem
        text="さっぱりしたものが食べたい"
        icon="https://bit.ly/tioluwani-kolawole"
        name="Kola Tioluwani"
      />
      <RequestListItem
        text="サラダくれ"
        icon="https://bit.ly/sage-adebayo"
        name="Segun Adebayo"
      />
    </VStack>
  );
};
