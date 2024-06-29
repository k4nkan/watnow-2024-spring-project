import Hint from '@/features/hint/components/Hint';
import useMyDinnerRequest from '@/hooks/use-my-dinner-request';
import { VStack } from '@chakra-ui/react';

function HintSection() {
  const { exists: isTodaysRequestExists } = useMyDinnerRequest();
  const isLoading = isTodaysRequestExists === 'loading';

  return (
    <VStack gap={4}>
      {!isLoading && !isTodaysRequestExists && (
        <Hint
          alertColorScheme={'warning'}
          titleText={'今日の連絡がまだです！'}
          descriptionText={'今夜、ごはんを家で食べたいのかを連絡しましょう！'}
          destination={'連絡'}
          buttonColorScheme={'orange'}
          href="/update"
        />
      )}
      <Hint
        alertColorScheme={'info'}
        titleText={'曜日ごとの予定をしよう！'}
        descriptionText={
          '毎週同じステータスを報告していませんか？曜日ごとの自動報告ステータスを設定してみましょう！'
        }
        destination={'設定'}
        buttonColorScheme={'blue'}
        href="/settings"
      />
    </VStack>
  );
}

export default HintSection;
