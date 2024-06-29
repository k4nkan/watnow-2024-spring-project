'use client';

import InputWithLabel from '@/components/InputWithLabel';
import PageTitle from '@/components/PageTitle';
import MyDinnerRequests from '@/features/debug/MyDinnerRequests';
import useAuthUser from '@/hooks/use-auth-user';
import useCurrentGroup from '@/hooks/use-current-group';
import { createGroupByUser } from '@/stores/firestore/user-group-transaction';
import { getUserDocRef } from '@/stores/firestore/users';
import { DBGroup } from '@/types/db-group';
import { Button, Divider } from '@chakra-ui/react';
import { Timestamp } from 'firebase/firestore';
import React from 'react';

export default function Page() {
  const { authUser } = useAuthUser();
  const { currentGroup, changeGroup } = useCurrentGroup();
  const [groupId, setGroupId] = React.useState('');

  const createGroup = async () => {
    console.log('createGroup', authUser);

    // 発表用にダミーのグループ lBbYQHxvVjITTZdTUT7H を作成しました。お役御免

    if (authUser === null) {
      console.log('authUser is null');
      return;
    }

    const groupData: Omit<DBGroup, 'uid'> = {
      displayName: '２個目の家庭',
      description: 'テスト用の２個目の家庭です',
      createdAt: Timestamp.fromDate(new Date()),
      createdBy: getUserDocRef(authUser.uid),
      iconUrl: null
    };
    createGroupByUser(groupData, authUser.uid).then((group) => {
      if (group) {
        changeGroup(group.id);
      }
    });
  };

  if (authUser === null || currentGroup === 'loading') {
    return <div>loading...</div>;
  }
  return (
    <div className="flex flex-col gap-2 p-4">
      <PageTitle titleText="Debug" />
      <Button onClick={createGroup}>グループを作成</Button>
      <InputWithLabel
        label="グループID"
        value={groupId}
        defaultValue={currentGroup?.uid}
        onChange={(e) => setGroupId(e.target.value)}
      />
      <Button onClick={() => changeGroup(groupId)}>グループを変更</Button>
      <div>
        <div className="text-lg font-bold">ユーザー情報</div>
        <div className="mb-3 flex flex-col gap-2 px-2">
          <div>ユーザー名: {authUser?.displayName}</div>
          <div>メールアドレス: {authUser?.email}</div>
          <div>ユーザーID: {authUser?.uid}</div>
        </div>
      </div>
      <div>
        <div className="text-lg font-bold">グループ情報</div>
        <div className="mb-3 flex flex-col gap-2 px-2">
          <div>グループ名: {currentGroup?.displayName}</div>
          <div>グループUID: {currentGroup?.uid}</div>
        </div>
      </div>
      <Divider />
      <MyDinnerRequests />
    </div>
  );
}
