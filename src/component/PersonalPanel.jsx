/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/personalpanel.module.scss';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useUser } from '../app/userContext';
import UploadPhoto from './UploadPhoto.jsx';

export default function PersonalPanel({ userData }) {
  const [showUploadPhoto, setShowUploadPhoto] = useState(false);
  const { user } = useUser();
  const { name, picture, id } = user;
  const handleEditClick = () => {
    setShowUploadPhoto(!showUploadPhoto);
  };
  console.log(userData);
  return (
    <div className={styles.personalBox}>
      <div className={styles.personalInfo}>
        <div className={styles.personalAvatar}>
          {Object.entries(userData).length > 0 &&
            (userData.id === id ? (
              <div>
                <Image
                  src={picture || '/picture.png'}
                  alt="avatar"
                  width={180}
                  height={180}
                  className={styles.image}
                />
                <button type="button" className={styles.editText} onClick={handleEditClick}>
                  編輯大頭照
                </button>
              </div>
            ) : (
              <Image
                src={
                  userData.picture !== null &&
                  userData.picture !== undefined &&
                  userData.picture !== ''
                    ? userData.picture
                    : '/picture.png'
                }
                alt="avatar"
                width={180}
                height={180}
                className={styles.image}
              />
            ))}
          {Object.entries(userData).length === 0 && <Skeleton width={180} height={180} circle />}
        </div>
        <div className={styles.personalName}>
          {userData.id === id ? (
            name !== null && name !== undefined ? (
              name
            ) : (
              <Skeleton />
            )
          ) : userData.name !== null && userData.name !== undefined ? (
            userData.name
          ) : (
            <Skeleton />
          )}
          <span className={styles.personalFriendsCount}>
            {userData.friend_count !== undefined ? `${userData.friend_count} 位朋友` : <Skeleton />}
          </span>
        </div>
      </div>
      <hr className={styles.line} />
      <div className={styles.personalFunction}>
        <div className={styles.personalFunctionButton}>
          <div className={styles.personalFunctionButtonText}>貼文</div>
          <hr className={styles.line} />
        </div>
      </div>
      {showUploadPhoto && <UploadPhoto onStateChange={setShowUploadPhoto} />}
    </div>
  );
}
