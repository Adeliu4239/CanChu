import styles from '@/styles/sidebar.module.scss';
import HomePageSideBar from './SideBarType/HomePageSideBar';
import MyUserPageSideBar from './SideBarType/MyUserPageSideBar';
import OtherUserPageSideBar from './SideBarType/OtherUserPageSideBar';

export default function SideBar({
  isHomePage,
  friendsList,
  friendsInvite,
  onFriendStateChange,
  isMyUserPage,
  userDetail,
  onUserDetailChange,
}) {
  const isOtherUserPage = !(isMyUserPage || isHomePage);

  return (
    <div className={`${styles.sideBar} ${isHomePage ? styles.sideHide : ''}`}>
      <div className={styles.sideBox}>
        {isHomePage && (
          <HomePageSideBar
            friendsList={friendsList}
            friendsInvite={friendsInvite}
            onFriendStateChange={onFriendStateChange}
            className={styles.sideBox}
          />
        )}
        {isMyUserPage && (
          <MyUserPageSideBar userDetail={userDetail} onUserDetailChange={onUserDetailChange} />
        )}
        {isOtherUserPage && <OtherUserPageSideBar userDetail={userDetail} />}
      </div>
      <footer className={`${styles.sideBoxFooter}} ${styles.sideHide}`}>
        關於我們 · 隱私權條款 · Cookie 條款 · © 2023 CanChu, Inc.
      </footer>
    </div>
  );
}
