import { useState } from 'react';
import { apiUpdateUserDetail } from '@/api/api.js';

export default function useEditUserDetail(userDetail, onUserDetailChange) {
  const [intro, setIntro] = useState(userDetail?.introduction);
  const [interests, setInterests] = useState(userDetail?.tags);
  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    setIntro(userDetail?.introduction);
    setInterests(userDetail?.tags);
    setEdit(!edit);
  };

  const handleInTroChange = (event) => {
    setIntro(event.target.value);
  };

  const handleInterestChange = (event) => {
    setInterests(event.target.value);
  };

  const onConfirmEdit = async (event) => {
    event.preventDefault();
    try {
      const requestBody = {
        name: userDetail.name,
        introduction: intro,
        tags: interests,
      };
      const response = await apiUpdateUserDetail(requestBody);
      console.log('更新個人資料成功:', response.data);
      setEdit(!edit);
      onUserDetailChange();
    } catch (error) {
      console.error('更新個人資料失敗:', error);
    }
  };

  return {
    intro,
    interests,
    edit,
    handleEdit,
    handleInTroChange,
    handleInterestChange,
    onConfirmEdit,
  };
}
