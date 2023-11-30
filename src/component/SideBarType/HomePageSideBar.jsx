import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { apiFriendAgree, apiFriendDelete } from '@/api/api.js';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from '@/styles/sidebar.module.scss';
import { useUser } from '../../app/userContext.jsx';

function SideItemSkeleton({ style }) {
  return (
    <div className={styles.sideItem} style={style}>
      <div className={styles.sideIcon}>
        <Skeleton circle className={`${styles.sideIcon} ${styles.image}`} />
      </div>
      <Skeleton className={styles.sideText} />
    </div>
  );
}

export default function HomePageSideBar({ friendsList, friendsInvite, onFriendStateChange }) {
  const { user } = useUser();
  const { name, picture, id } = user;
  const [showAllFriends, setShowAllFriends] = useState(false);

  const cancelHomeFriendRequest = async (sideFriendshipID) => {
    try {
      await apiFriendDelete(sideFriendshipID);
      onFriendStateChange();
    } catch (err) {
      console.log('取消邀請失敗', err);
    }
  };
  const confirmHomeFriendRequest = async (sideFriendshipID) => {
    try {
      await apiFriendAgree(sideFriendshipID);
      onFriendStateChange();
    } catch (err) {
      console.log('確認邀請失敗', err);
    }
  };
  return (
    <div className={styles.sideContent}>
      {picture && name ? (
        <div className={styles.sideItem} style={{ margin: '0 0 8px' }}>
          <Link href={`/user/${id}`}>
            <div className={styles.sideIcon}>
              <Image
                src={picture || '/picture.png'}
                className={styles.image}
                alt="more"
                width={42}
                height={42}
              />
            </div>
          </Link>
          <Link href={`/user/${id}`}>
            <div className={styles.sideText}>
              {name || <Skeleton className={styles.sideText} />}
            </div>
          </Link>
        </div>
      ) : (
        <SideItemSkeleton style={{ margin: '0 0 8px' }} />
      )}
      <hr className={styles.line} />
      {friendsInvite &&
        friendsInvite.length > 0 &&
        friendsInvite.map((friendInv) => (
          <div className={styles.sideItem} key={friendInv.id}>
            <Link href={`/user/${friendInv.id}`}>
              <div className={styles.sideIcon}>
                <Image
                  src={friendInv.picture !== '' ? friendInv.picture : '/picture.png'}
                  alt="Friend Avator"
                  className={styles.image}
                  width={42}
                  height={42}
                />
              </div>
            </Link>
            <Link href={`/user/${friendInv.id}`} className={styles.sideTextInvite}>
              {friendInv.name || 'Unknown'}
            </Link>
            <button
              type="button"
              className={`${styles.sideSmallButton} ${styles.blue}`}
              onClick={() => confirmHomeFriendRequest(friendInv.friendship.id)}
            >
              接受
            </button>
            <button
              type="button"
              className={`${styles.sideSmallButton} ${styles.gray}`}
              style={{ marginLeft: '0.5rem' }}
              onClick={() => cancelHomeFriendRequest(friendInv.friendship.id)}
            >
              拒絕
            </button>
            <button
              type="button"
              className={styles.btnHidden}
              onClick={() => confirmHomeFriendRequest(friendInv.friendship.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <g clip-path="url(#clip0_27_26)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10 20C8.0222 20 6.0888 19.4135 4.4443 18.3147C2.79981 17.2159 1.5181 15.6541 0.76122 13.8268C0.00434319 11.9996 -0.193704 9.98891 0.192148 8.0491C0.578 6.10929 1.53042 4.32746 2.92894 2.92894C4.32747 1.53041 6.10929 0.578006 8.0491 0.192153C9.98891 -0.193699 11.9996 0.00432817 13.8269 0.761205C15.6541 1.51808 17.2159 2.79981 18.3147 4.4443C19.4135 6.08879 20 8.02219 20 10C20 12.6522 18.9464 15.1957 17.0711 17.0711C15.1957 18.9464 12.6522 20 10 20ZM4.338 12.255C4.12296 12.0376 4.00235 11.7441 4.00235 11.4383C4.00235 11.1325 4.12296 10.8391 4.338 10.6217L4.92669 10.0363C5.0268 9.93532 5.14617 9.85545 5.27774 9.80146C5.40931 9.74747 5.55041 9.72047 5.69262 9.72205C5.83483 9.72364 5.97526 9.75378 6.1056 9.81068C6.23594 9.86759 6.35351 9.95012 6.45134 10.0533L7.49134 11.1323C7.54093 11.1847 7.60066 11.2263 7.66688 11.2548C7.7331 11.2833 7.80443 11.298 7.87652 11.298C7.9486 11.298 8.01993 11.2833 8.08615 11.2548C8.15237 11.2263 8.21208 11.1847 8.26167 11.1323L13.5617 5.669C13.6602 5.56505 13.7788 5.4821 13.9102 5.42514C14.0416 5.36817 14.1832 5.33838 14.3264 5.33754C14.4697 5.3367 14.6116 5.36483 14.7437 5.42024C14.8757 5.47566 14.9952 5.55722 15.095 5.66001L15.6667 6.238C15.8765 6.45452 15.9938 6.74418 15.9938 7.04567C15.9938 7.34716 15.8765 7.63682 15.6667 7.85334L8.63034 15.0037C8.53215 15.1053 8.41465 15.1863 8.28474 15.242C8.15482 15.2976 8.01509 15.3267 7.87377 15.3277C7.73244 15.3286 7.59236 15.3013 7.46172 15.2474C7.33108 15.1935 7.21253 15.114 7.11301 15.0137L4.338 12.255Z"
                    fill="#699F4C"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_27_26">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
            <button
              type="button"
              className={styles.btnHidden}
              onClick={() => cancelHomeFriendRequest(friendInv.friendship.id)}
              style={{ marginLeft: '0.5rem' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <g clip-path="url(#clip0_28_209)">
                  <path
                    d="M10.0002 0C4.48616 0 0.000244141 4.48607 0.000244141 10.0006C0.000244141 15.5141 4.48616 20 10.0002 20C15.5143 20 20.0001 15.5141 20.0001 10.0006C20.0001 4.48607 15.5143 0 10.0002 0ZM14.6016 14.1361L14.1512 14.5868C14.0374 14.7017 13.8343 14.7017 13.7198 14.5868L10.1256 10.9928C10.0961 10.9628 10.0565 10.9468 10.0148 10.9468C9.97317 10.9468 9.93361 10.963 9.90411 10.9928L6.31003 14.5869C6.19573 14.7019 5.99275 14.7019 5.87846 14.5869L5.42825 14.1362C5.37102 14.0793 5.33924 14.0023 5.33924 13.9214C5.33924 13.8395 5.37102 13.7627 5.42825 13.7048L9.02249 10.1109C9.08361 10.0496 9.08361 9.95088 9.02249 9.88992L5.42825 6.29568C5.37102 6.23829 5.33924 6.1616 5.33924 6.08006C5.33924 5.99818 5.37102 5.92134 5.42825 5.86411L5.87846 5.4139C5.99275 5.2996 6.19573 5.2996 6.31003 5.4139L9.90427 9.00781C9.96279 9.06634 10.067 9.06634 10.1256 9.00781L13.7196 5.41374C13.8341 5.29928 14.0372 5.29928 14.1511 5.41374L14.6014 5.86411C14.7201 5.98262 14.7201 6.17684 14.6014 6.29568L11.0067 9.88976C10.9457 9.95071 10.9457 10.0494 11.0067 10.1107L14.6016 13.7046C14.7203 13.8238 14.7203 14.0172 14.6016 14.1361Z"
                    fill="#E91D1D"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_28_209">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        ))}
      {friendsList?.length === 0 && <SideItemSkeleton />}
      {friendsList?.length !== 0 && (
        <div className={styles.sideItem} style={{ marginTop: '10px' }}>
          <div className={`${styles.sideIcon} ${styles.center}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="25"
              viewBox="0 0 27 25"
              fill="#525252"
            >
              <path
                d="M21.4661 14.2857C24.5964 14.2857 26.7857 16.95 26.7857 20.2268C26.7857 21.875 25.4857 23.2143 23.8893 23.2143H22.9714C22.5696 23.2143 22.2679 22.8607 22.3161 22.4607C22.3393 22.2518 22.3518 22.0393 22.3518 21.8232V20.9357C22.3518 18.8714 21.7268 16.9482 20.6554 15.3411C20.3554 14.8893 20.6554 14.2857 21.1946 14.2857H21.4661ZM20.0893 12.5C18.1196 12.5 16.5179 10.6982 16.5179 8.48214C16.5179 6.04286 17.9196 4.46429 20.0893 4.46429C22.2589 4.46429 23.6607 6.04286 23.6607 8.48214C23.6607 10.6982 22.0589 12.5 20.0893 12.5ZM11.9143 13.3929C16.175 13.3929 19.6429 16.7768 19.6429 20.9357V21.8232C19.6429 23.575 18.1839 25 16.3875 25H3.25536C1.45893 25 0 23.575 0 21.8232V20.9357C0 16.7768 3.46607 13.3929 7.72857 13.3929H11.9143ZM14.7321 5.35714C14.7321 8.3125 12.5304 10.7143 9.82143 10.7143C7.11429 10.7143 4.91071 8.3125 4.91071 5.35714C4.91071 2.05357 6.79286 0 9.82143 0C12.8518 0 14.7321 2.05357 14.7321 5.35714Z"
                fill="#525252"
              />
            </svg>
          </div>
          <div className={styles.sideText} style={{ color: '#767676' }}>
            我的好友
          </div>
        </div>
      )}
      {friendsList && friendsList.length > 0 && (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {showAllFriends
            ? friendsList.map((friend) => (
                <div className={styles.sideItem} key={friend.id}>
                  <Link href={`/user/${friend.id}`}>
                    <div className={styles.sideIcon}>
                      <Image
                        src={friend.picture || '/picture.png'}
                        alt={friend.name || 'Unknown'}
                        className={styles.image}
                        width={42}
                        height={42}
                      />
                    </div>
                  </Link>
                  <Link href={`/user/${friend.id}`} className={styles.sideText}>
                    {friend.name || 'Unknown'}
                  </Link>
                </div>
              ))
            : friendsList.slice(0, 6).map((friend) => (
                <div className={styles.sideItem} key={friend.id}>
                  <Link href={`/user/${friend.id}`}>
                    <div className={styles.sideIcon}>
                      <Image
                        src={friend.picture || '/picture.png'}
                        alt={friend.name || 'Unknown'}
                        className={styles.image}
                        width={42}
                        height={42}
                      />
                    </div>
                  </Link>
                  <Link href={`/user/${friend.id}`}>
                    <div className={styles.sideText}>{friend.name || 'Unknown'}</div>
                  </Link>
                </div>
              ))}
        </>
      )}
      {friendsList?.length === 0 && <SideItemSkeleton />}
      {friendsList === null && <div className="textHint">你沒有朋友</div>}
      {friendsList?.length > 6 && (
        <button
          type="button"
          onClick={() => setShowAllFriends(!showAllFriends)}
          className={styles.sideItem}
        >
          <div className={styles.sideIcon}>
            {!showAllFriends ? (
              <Image src="/options 1.png" alt="more" width={39} height={39} />
            ) : (
              <svg height="39" viewBox="0 0 21 21" width="39" xmlns="http://www.w3.org/2000/svg">
                <g
                  fill="none"
                  fill-rule="evenodd"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  transform="translate(7 6)"
                >
                  <path d="m.5 9.5 3-3 3 3" />
                  <path d="m.5.5 3 3 3-3" />
                </g>
              </svg>
            )}
          </div>
          <div className={styles.sideTextMore}>{showAllFriends ? '收起' : '查看更多'}</div>
        </button>
      )}
    </div>
  );
}
