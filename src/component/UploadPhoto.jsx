import React, { useState } from 'react';
import Image from 'next/image';
import { apiPhotoUpload } from '@/api/api.js';
import styles from '@/styles/uploadphoto.module.scss';
import Swal from 'sweetalert2';
import { useUser } from '../app/userContext';

export default function UploadPhoto({ onStateChange }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const { setUser } = useUser();

  const handleCancel = () => {
    onStateChange(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      const previewImageUrl = URL.createObjectURL(file);
      setPreviewUrl(previewImageUrl);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
    if (file) {
      const previewImageUrl = URL.createObjectURL(file);
      setPreviewUrl(previewImageUrl);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      Swal.fire({
        icon: 'error',
        title: '請選擇檔案',
        text: '請確認您已選擇檔案',
      });
      return;
    }

    const formData = new FormData();
    formData.append('picture', selectedFile);
    try {
      const response = await apiPhotoUpload(formData);
      console.log('上傳成功:', response.data);
      const picUrl = response.data.data.picture;
      setUser((prevUser) => ({ ...prevUser, picture: picUrl }));
      const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
      const updatedUser = {
        ...userFromLocalStorage,
        picture: picUrl,
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      localStorage.setItem('picture', picUrl);
      setSelectedFile(null);
      onStateChange(false);
    } catch (error) {
      console.error('上傳失敗:', error);
    }
  };

  return (
    <div>
      <div className={styles.overlay} />
      <div className={styles.window} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        <div className={styles.title}>上傳/編輯大頭照</div>
        <label htmlFor="upload_input" className={styles.upload_cover}>
          <input
            id="upload_input"
            className={styles.upload_input}
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleFileChange}
          />
          {previewUrl ? (
            <div className={styles.imageContainer}>
              <Image src={previewUrl} alt="Preview" layout="fill" objectFit="contain" />
            </div>
          ) : (
            <>
              <span className={styles.upload_icon}>➕</span>
              <span className={styles.upload_text}>點擊上傳或拖曳圖片到此處</span>
            </>
          )}
        </label>
        <button className={styles.buttonUpload} type="button" onClick={handleUpload}>
          上傳
        </button>
        <button className={styles.buttonCancel} type="button" onClick={handleCancel}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24ZM14.1213 12L17.5607 15.4393C18.1464 16.0251 18.1464 16.9749 17.5607 17.5607C16.9749 18.1464 16.0251 18.1464 15.4393 17.5607L12 14.1213L8.56066 17.5607C7.97487 18.1464 7.02513 18.1464 6.43934 17.5607C5.85355 16.9749 5.85355 16.0251 6.43934 15.4393L9.87868 12L6.43934 8.56066C5.85355 7.97487 5.85355 7.02513 6.43934 6.43934C7.02513 5.85355 7.97487 5.85355 8.56066 6.43934L12 9.87868L15.4393 6.43934C16.0251 5.85355 16.9749 5.85355 17.5607 6.43934C18.1464 7.02513 18.1464 7.97487 17.5607 8.56066L14.1213 12Z"
              fill="#5458F7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
