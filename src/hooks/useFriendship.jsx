import { useEffect, useState } from 'react';

const useFriendship = (friendship) => {
  const [friendshipID, setFriendShipID] = useState([]);
  const [friendshipStatus, setFriendshipStatus] = useState([]);

  useEffect(() => {
    console.log('friendship', friendship);
    if (!friendship) {
      setFriendshipStatus('None');
      console.log('friendship is null');
    } else {
      setFriendshipStatus(friendship.status);
    }
    if (friendship) {
      setFriendShipID(friendship.id);
      console.log('friendshipid is set');
    }
  }, [friendship]);

  const setNewFriendshipStatus = (newID, status) => {
    setFriendShipID(newID);
    setFriendshipStatus(status);
  };

  return { friendshipStatus, friendshipID, setNewFriendshipStatus };
};

export default useFriendship;
