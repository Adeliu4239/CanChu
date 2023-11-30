import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '@/styles/nav.module.scss';
import handleLogout from '@/utils/logoutUtils.js';
import useUserSearch from '@/hooks/useUserSearch';
import useEvent from '@/hooks/useEvent';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Swal from 'sweetalert2';
import EventBar from './Nav/EventBar.jsx';
import { useUser } from '../app/userContext';

export default function Nav() {
  const router = useRouter();
  const { user, logout } = useUser();
  const { name, picture, id } = user;
  const { searchUser, searchUserResults, handleInputChange } = useUserSearch();
  const { events, eventCounts, unreadEvents, fetchEvent, handleEventRead } = useEvent();
  const [showReadEvents, setShowReadEvents] = useState(false);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const toggleShowReaded = () => {
    fetchEvent();
    setShowReadEvents(!showReadEvents);
  };

  const handleLogoutClick = () => {
    Swal.fire({
      title: '確定要登出嗎？',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '確定',
      cancelButtonText: '取消',
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout(logout, router, '/login');
      }
    });
  };

  return (
    <div className={styles.nav}>
      <div className={styles.navBox}>
        <Link href="/">
          <div className={styles.brandLogo}>CanChu</div>
        </Link>
        <div className={styles.searchBar} style={{ display: showSearch ? 'flex' : 'none' }}>
          <div className={styles.searchBox}>
            <input
              type="text"
              name="search"
              id="search"
              value={searchUser}
              onChange={handleInputChange}
              placeholder="搜尋"
              className={styles.searchText}
              autoComplete="off"
            />
            <Image
              src="/search 2.png"
              className={styles.searchPic}
              alt="user-pic"
              width={17}
              height={17}
            />
          </div>
          {searchUserResults && searchUserResults.length > 0 && (
            <div className={styles.searchResultBox}>
              {searchUserResults.map((searchUserResult, index) => (
                <div key={searchUserResult.id} className={styles.searchResultItem}>
                  <Link
                    className={styles.searchResultItemLink}
                    href={`/user/${searchUserResult.id}`}
                  >
                    <div className={styles.searchResultPic}>
                      <Image
                        src={searchUserResult.picture ? searchUserResult.picture : '/picture.png'}
                        alt="user-pic"
                        width={39}
                        height={39}
                        className={styles.image}
                      />
                    </div>
                    <div className={styles.searchResultName}>{searchUserResult.name}</div>
                  </Link>
                  {index !== searchUserResults.length - 1 && <hr className={styles.line} />}
                </div>
              ))}
            </div>
          )}
          {searchUser && searchUserResults === null && (
            <div className={styles.searchResultBox}>
              <div className={styles.searchResultText}>沒有結果</div>
            </div>
          )}
        </div>
        <div className={styles.navFunction}>
          <button
            type="button"
            className={styles.searchBtn}
            onClick={() => setShowSearch(!showSearch)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
            >
              <g clip-path="url(#clip0_49_193)">
                <path
                  d="M36 18C36 8.05887 27.9411 0 18 0C8.05887 0 0 8.05887 0 18C0 27.9411 8.05887 36 18 36C27.9411 36 36 27.9411 36 18Z"
                  fill="#A3C3D3"
                />
                <path
                  d="M22.3805 22.3511L26.4375 26.4375M24.5625 17.0625C24.5625 21.2047 21.2047 24.5625 17.0625 24.5625C12.9204 24.5625 9.5625 21.2047 9.5625 17.0625C9.5625 12.9204 12.9204 9.5625 17.0625 9.5625C21.2047 9.5625 24.5625 12.9204 24.5625 17.0625Z"
                  stroke="white"
                  stroke-width="3.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_49_193">
                  <rect width="36" height="36" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
          <div className={styles.notifIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
            >
              <circle cx="18" cy="18" r="18" fill="#A3C3D3" />
              <path
                d="M13.5206 26.1521C14.5568 26.1521 16.2604 26.0568 18.5644 25.6324C18.166 26.7159 17.1275 27.4922 15.9077 27.4922C14.8936 27.4922 14.0052 26.9551 13.5039 26.1521H13.5206ZM26.5309 20.2412C26.7191 21.2103 26.0395 22.0675 24.5096 22.7905C23.6715 23.186 21.8079 23.9387 18.7298 24.5376C16.3557 24.9985 14.6162 25.1044 13.5214 25.1044C13.196 25.1044 12.9271 25.0953 12.7153 25.0831C11.0269 24.9863 10.0745 24.4454 9.88633 23.4762C9.60062 22.0081 10.0524 21.4412 10.8014 20.5025L10.9987 20.2549C11.5039 19.6141 11.7012 18.9848 11.3781 17.3246C10.6551 13.6065 12.3298 11.0656 15.9717 10.354C19.6151 9.65072 22.1202 11.3772 22.8433 15.0961C23.1656 16.7562 23.5846 17.2652 24.2932 17.6698V17.6705L24.569 17.8267C25.6143 18.4164 26.2452 18.7722 26.5309 20.2412Z"
                fill="white"
              />
            </svg>
            {eventCounts > 0 && (
              <div className={styles.notifHint}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <circle cx="11.3332" cy="10.6667" r="10.6667" fill="#DE3F4F" />
                  <text x="50%" y="50%" textAnchor="middle" fill="white" fontSize="12" dy=".35em">
                    {eventCounts}
                  </text>
                </svg>
              </div>
            )}
            <div className={styles.notifMenu} style={showAllEvents ? { border: 'none' } : {}}>
              <div className={styles.notifMenuBox}>
                <div className={`${styles.colorBlue} ${styles.notifiBox} ${styles.noeffect}`}>
                  <div className={styles.notifIconHov}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                    >
                      <circle cx="18" cy="18" r="18" fill="white" />
                      <path
                        d="M13.5206 26.1521C14.5568 26.1521 16.2604 26.0568 18.5644 25.6324C18.166 26.7159 17.1275 27.4922 15.9077 27.4922C14.8936 27.4922 14.0052 26.9551 13.5039 26.1521H13.5206ZM26.5309 20.2412C26.7191 21.2103 26.0395 22.0675 24.5096 22.7905C23.6715 23.186 21.8079 23.9387 18.7298 24.5376C16.3557 24.9985 14.6162 25.1044 13.5214 25.1044C13.196 25.1044 12.9271 25.0953 12.7153 25.0831C11.0269 24.9863 10.0745 24.4454 9.88633 23.4762C9.60062 22.0081 10.0524 21.4412 10.8014 20.5025L10.9987 20.2549C11.5039 19.6141 11.7012 18.9848 11.3781 17.3246C10.6551 13.6065 12.3298 11.0656 15.9717 10.354C19.6151 9.65072 22.1202 11.3772 22.8433 15.0961C23.1656 16.7562 23.5846 17.2652 24.2932 17.6698V17.6705L24.569 17.8267C25.6143 18.4164 26.2452 18.7722 26.5309 20.2412Z"
                        fill="#5458F7"
                      />
                    </svg>
                  </div>
                  <div className={styles.notifiBoxTitle}>我的通知</div>
                  <button type="button" onClick={toggleShowReaded} className={styles.notifiReaded}>
                    {showReadEvents ? '全部' : '未讀'}
                  </button>
                </div>
                {Object.keys(events).length === 0 ||
                (showReadEvents && unreadEvents.length === 0) ? (
                  <div className={styles.notifiBox}>
                    <div className={styles.notifiBoxBtn}>
                      {showReadEvents && unreadEvents.length === 0
                        ? '暫無未讀通知'
                        : '沒有想通知你'}
                    </div>
                  </div>
                ) : (
                  <>
                    {showAllEvents
                      ? (!showReadEvents ? events : unreadEvents).map((event) => (
                          <EventBar key={event.id} event={event} onRead={handleEventRead} />
                        ))
                      : (!showReadEvents ? events : unreadEvents)
                          .slice(0, 4)
                          .map((event) => (
                            <EventBar key={event.id} event={event} onRead={handleEventRead} />
                          ))}
                    <div className={styles.notifiBox}>
                      <button
                        type="button"
                        className={styles.notifiBoxBtn}
                        onClick={() => setShowAllEvents(!showAllEvents)}
                      >
                        {!showAllEvents ? '查看全部通知' : '收起通知'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className={styles.userPic}>
            <div className={styles.userPicCon}>
              {picture ? (
                <Image
                  src={picture || '/picture.png'}
                  alt="user-pic"
                  width={36}
                  height={36}
                  className={styles.image}
                />
              ) : (
                <Skeleton circle className={`${styles.userPicCon} ${styles.image}`} />
              )}
            </div>

            <div className={styles.navMenu}>
              <div className={`${styles.colorBlue} ${styles.navInfo} ${styles.noeffect}`}>
                {picture ? (
                  <div className={styles.userPicConHov}>
                    <Image
                      src={picture}
                      className={styles.image}
                      alt="user-pic"
                      width={38}
                      height={38}
                    />
                  </div>
                ) : (
                  <Skeleton circle className={styles.userPicConHov} />
                )}
                <div className={styles.navUserName}>{name || 'Unknown'}</div>
              </div>
              <div className={`${styles.navInfo} ${styles.navInfoHov}`}>
                <Link href={`/user/${id}`} className={styles.navLink}>
                  查看個人檔案
                </Link>
              </div>

              <button
                type="button"
                className={`${styles.navInfo} ${styles.navInfoHov}`}
                style={{
                  borderBottom: '1px solid #0000001a',
                  borderBottomLeftRadius: '20px',
                  borderBottomRightRadius: '20px',
                }}
                onClick={handleLogoutClick}
              >
                <div style={{ paddingLeft: '0.25rem' }}>登出</div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr className={styles.line} />
    </div>
  );
}
