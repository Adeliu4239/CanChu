import { apiFriendAdd, apiFriendAgree, apiFriendDelete } from '@/api/api.js';
import styles from '@/styles/sidebar.module.scss';
import useFriendship from '@/hooks/useFriendship.jsx';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Swal from 'sweetalert2';

export default function OtherUserSideBar({ userDetail }) {
  const { friendshipID, friendshipStatus, setNewFriendshipStatus } = useFriendship(
    userDetail?.friendship,
  );
  const sendFriendRequest = async () => {
    console.log('sendFriendRequest');
    try {
      const response = await apiFriendAdd(userDetail.id);
      console.log('發送邀請成功', response);
      console.log(response.data.data);
      const newID = response.data.data.friendship.id;
      setNewFriendshipStatus(newID, 'requested');
    } catch (err) {
      console.log('發送邀請失敗', err);
    }
  };
  const cancelFriendRequest = async () => {
    console.log('cancelFriendRequest');
    try {
      const response = await apiFriendDelete(friendshipID);
      console.log('取消邀請成功', response);
      console.log(response.data.data);
      setNewFriendshipStatus(null, 'None');
    } catch (err) {
      console.log('取消邀請失敗', err);
    }
  };
  const confirmFriendRequest = async () => {
    console.log('confirmFriendRequest');
    try {
      const response = await apiFriendAgree(friendshipID);
      console.log('確認邀請成功', response);
      console.log(response.data.data);
      const newID = response.data.data.friendship.id;
      setNewFriendshipStatus(newID, 'friend');
    } catch (err) {
      console.log('確認邀請失敗', err);
    }
  };
  const deleteFriend = async () => {
    Swal.fire({
      title: '確定要刪除好友嗎？',
      text: '刪除後將無法復原',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '確定',
      cancelButtonText: '取消',
    }).then(async (result) => {
      console.log('deleteFriend');
      try {
        if (result.isConfirmed) {
          const response = await apiFriendDelete(friendshipID);
          console.log('刪除好友成功', response);
          console.log(response.data.data);
          setNewFriendshipStatus(null, 'None');
        }
      } catch (err) {
        console.log('刪除好友失敗', err);
      }
    });
  };
  console.log(userDetail);
  return (
    <div className={styles.sideContent} style={{ margin: '23px 16px 23px 16px' }}>
      {Object.entries(userDetail).length > 0 ? (
        (() => {
          switch (friendshipStatus) {
            case 'None':
              return (
                <button
                  type="button"
                  className={`${styles.sideButton} ${styles.blue}`}
                  onClick={sendFriendRequest}
                >
                  發送好友邀請
                </button>
              );
            case 'requested':
              return (
                <button
                  type="button"
                  className={`${styles.sideButton} ${styles.gray}`}
                  onClick={cancelFriendRequest}
                >
                  取消好友邀請
                </button>
              );
            case 'pending':
              return (
                <div className={styles.flexBox}>
                  <button
                    type="button"
                    className={`${styles.sideButton} ${styles.blue}`}
                    onClick={confirmFriendRequest}
                  >
                    確認好友邀請
                  </button>
                  <button
                    type="button"
                    className={`${styles.sideButton} ${styles.gray}`}
                    onClick={cancelFriendRequest}
                  >
                    拒絕好友邀請
                  </button>
                </div>
              );
            case 'friend':
              return (
                <button
                  type="button"
                  className={`${styles.sideButton} ${styles.red}`}
                  onClick={deleteFriend}
                >
                  刪除好友
                </button>
              );
            default:
              return <div className={`${styles.sideButton} ${styles.red}`}>Loading</div>;
          }
        })()
      ) : (
        <Skeleton className={`${styles.sideButton} ${styles.blue}`} />
      )}

      <div className={styles.sideItemUser}>
        <div className={styles.sideTitle}>自我介紹</div>
        {Object.entries(userDetail).length > 0 ? (
          <div className={styles.sideText}>
            {userDetail?.introduction ? userDetail.introduction : '此人沒有值得介紹'}
          </div>
        ) : (
          <Skeleton className={styles.sideText} />
        )}
      </div>
      <div className={styles.sideItemUser}>
        <div className={styles.sideTitle}>興趣</div>
        {Object.entries(userDetail).length > 0 ? (
          <div className={styles.sideText}>
            {userDetail?.tags ? (
              <div className={styles.interestBar}>
                {userDetail.tags.split(',').map((tag, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={index} className={styles.interestBox}>
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
            ) : (
              '此人很無聊'
            )}
          </div>
        ) : (
          <Skeleton className={styles.sideText} />
        )}
      </div>
    </div>
  );
}
