import AlertItem from '@/features/hint/AlertItem';

function AlertContainer() {
  return (
    <>
      <AlertItem
        alertColorScheme={'warning'}
        titleText={'今日の連絡がまだです！'}
        descriptionText={'今夜、ごはんを家で食べたいのかを連絡しましょう！'}
        destination={'連絡'}
        buttonColorScheme={'orange'}
      />
      <AlertItem
        alertColorScheme={'info'}
        titleText={'曜日ごとの予定をしよう！'}
        descriptionText={
          '毎週同じステータスを報告していませんか？曜日ごとの自動報告ステータスを設定してみましょう！'
        }
        destination={'設定'}
        buttonColorScheme={'blue'}
      />
    </>
  );
}

export default AlertContainer;
