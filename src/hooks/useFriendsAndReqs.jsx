import { useEffect, useState } from 'react';
import { apiAllUserFriend, apiUserFriendPending } from '@/api/api.js';

export default function useFriendsAndReqs() {
  const [friendsList, setFriendsList] = useState([]);
  const [friendsRequests, setFriendsRequests] = useState([]);

  async function fetchFriendsList() {
    try {
      const response = await apiAllUserFriend();
      console.log('獲取好友列表成功', response);
      const friends = response.data.data.users;
      setFriendsList(friends.length > 0 ? friends : null);
    } catch (err) {
      console.log('獲取好友列表失敗', err);
      setFriendsList([]);
    }
  }

  async function fetchFriendsRequests() {
    try {
      const response = await apiUserFriendPending();
      console.log('獲取好友邀請成功', response);
      const friendsInvite = response.data.data.users;
      setFriendsRequests(friendsInvite.length > 0 ? friendsInvite : null);
    } catch (err) {
      console.log('獲取好友邀請失敗', err);
      setFriendsRequests([]);
    }
  }

  useEffect(() => {
    fetchFriendsList();
    fetchFriendsRequests();
  }, []);

  const handleFriendStateChange = () => {
    fetchFriendsList();
    fetchFriendsRequests();
  };

  return { friendsList, friendsRequests, handleFriendStateChange };
}
