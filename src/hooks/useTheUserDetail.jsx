import { useEffect, useState } from 'react';
import { getCookie } from '@/utils/cookies.js';
import { apiGetUserOrOtherUserDetail } from '@/api/api.js';

export default function useTheUserDetail(userID) {
  const [userDetail, setUserDetail] = useState({});
  const [mineFlag, setMineFlag] = useState(false);

  async function fetchUserData() {
    try {
      const response = await apiGetUserOrOtherUserDetail(userID);
      setUserDetail(response.data.data.user);
    } catch (err) {
      console.log('獲取個人資料失敗', err);
    }
  }

  useEffect(() => {
    if (userID.toString() === getCookie('user_id').toString()) {
      setMineFlag(true);
    } else {
      setMineFlag(false);
    }
    fetchUserData();
    window.scrollTo(0, 0);
  }, []);

  const handleUserDetailChange = () => {
    fetchUserData();
  };

  return { userDetail, mineFlag, handleUserDetailChange };
}
