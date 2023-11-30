import styles from '@/styles/sidebar.module.scss';
import useEditUserDetail from '@/hooks/useEditUserDetail';

export default function MyUserPageSideBar({ userDetail, onUserDetailChange }) {
  const {
    intro,
    interests,
    edit,
    handleEdit,
    handleInTroChange,
    handleInterestChange,
    onConfirmEdit,
  } = useEditUserDetail(userDetail, onUserDetailChange);

  return (
    <div className={styles.sideContent} style={{ margin: '23px 16px 23px 16px' }}>
      <button
        type="button"
        className={`${styles.sideButton} ${!edit ? styles.blue : styles.gray}`}
        onClick={handleEdit}
      >
        編輯個人資料
      </button>
      <div className={styles.sideItemUser}>
        <div className={styles.sideTitle}>自我介紹</div>
        {!edit && (
          <div className={styles.sideText}>
            {userDetail?.introduction ? userDetail.introduction : '此人沒有值得介紹'}
          </div>
        )}
        {edit && (
          <textarea
            className={styles.sideTextArea}
            placeholder="介紹一下自己..."
            type="text"
            onChange={handleInTroChange}
            defaultValue={intro}
          />
        )}
      </div>
      <div className={styles.sideItemUser}>
        <div className={styles.sideTitle}>興趣</div>
        {!edit && (
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
        )}
        {edit && (
          <textarea
            className={styles.sideTextArea}
            placeholder="你的興趣是..."
            type="text"
            onChange={handleInterestChange}
            defaultValue={interests}
          />
        )}
      </div>
      {edit && (
        <div className={styles.sideButtonArea}>
          <button
            type="button"
            className={`${styles.sideButtonAreaText} ${styles.blue}`}
            onClick={onConfirmEdit}
          >
            確認
          </button>
          <button
            type="button"
            className={`${styles.sideButtonAreaText} ${styles.gray}`}
            onClick={handleEdit}
          >
            取消
          </button>
        </div>
      )}
    </div>
  );
}
