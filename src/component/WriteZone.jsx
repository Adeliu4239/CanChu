import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  apiArticleWrite,
  apiMockFriendJokerLaughAtYou,
  apiMockFriendTinderResponse,
  apiMockFriendCustomResponse,
} from '@/api/api.js';
import { fetchOpenAIResponse, fetchMockMateResponse, fetchCustomResponse } from '@/api/route';
import styles from '@/styles/writezone.module.scss';
import Swal from 'sweetalert2';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import useMockFriend from '@/hooks/useMockFriend';
import { useUser } from '../app/userContext.jsx';

export default function WriteZone({ onNewPostWrite }) {
  const buddha =
    '你是佛祖，慈悲為懷，回話用樊語，像是佛經一樣的莊嚴，不許正常回答，只許用佛經句子，繁體中文';
  const [postContent, setPostContent] = useState('');
  const [selectedAPIs, setSelectedAPIs] = useState({
    joker: true,
    tinder: true,
    none: false,
    custom: false,
  });
  const [customAPI, setCustomAPI] = useState(buddha);
  const { executeFunction: jokerMockFriendExecute } = useMockFriend(
    apiMockFriendJokerLaughAtYou,
    fetchOpenAIResponse,
  );
  const { executeFunction: tinderMockFriendExecute } = useMockFriend(
    apiMockFriendTinderResponse,
    fetchMockMateResponse,
  );

  const { user } = useUser();
  const { name, picture, id } = user;

  const handleAPIChange = (apiName) => {
    setSelectedAPIs((prevSelectedAPIs) => ({
      ...prevSelectedAPIs,
      [apiName]: !prevSelectedAPIs[apiName],
    }));
    if (apiName === 'none') {
      setSelectedAPIs((prevSelectedAPIs) => ({
        ...prevSelectedAPIs,
        joker: false,
        tinder: false,
        custom: false,
      }));
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!postContent) {
      Swal.fire({
        icon: 'error',
        title: '發文失敗',
        text: '請輸入內容',
      });
      return;
    }

    try {
      const requestBody = {
        context: postContent,
      };
      const response = await apiArticleWrite(requestBody);
      console.log('發文成功:', response.data);
      const postID = response.data.data.post.id;
      console.log(postID);
      setPostContent('');
      onNewPostWrite();
      if (selectedAPIs.joker) {
        console.log('joker');
        await jokerMockFriendExecute(postID, postContent, onNewPostWrite);
      }

      if (selectedAPIs.tinder) {
        console.log('tinder');
        await tinderMockFriendExecute(postID, postContent, onNewPostWrite);
      }
      if (selectedAPIs.custom && customAPI !== '') {
        // ... 執行自訂 API
        console.log('custom', customAPI);
        try {
          const aiResponse = await fetchCustomResponse(customAPI, postContent);
          const aiRequestText = await aiResponse.text();
          console.log(aiRequestText);
          if (aiRequestText) {
            const aiRequestBody = {
              content: aiRequestText,
            };
            await apiMockFriendCustomResponse(postID, aiRequestBody);
            onNewPostWrite();
          }
        } catch (error) {
          console.error('處理 AI 回應錯誤:', error);
        }
      }
    } catch (error) {
      console.error('發文失敗:', error);
      if (error.response) {
        const { status } = error.response;
        if (status === 403) {
          Swal.fire({
            icon: 'error',
            title: '發文失敗',
            text: '你的問題可能違反社群規範，請重新發文',
          });
        } else if (status === 400) {
          Swal.fire({
            icon: 'error',
            title: '發文失敗',
            text: '請輸入內容',
          });
        } else if (status > 500) {
          Swal.fire({
            icon: 'error',
            title: '發文失敗',
            text: '伺服器異常，請稍後再試',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: '發文失敗',
            text: '發生錯誤，請稍後再試',
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: '發文失敗',
          text: '發生錯誤，請稍後再試',
        });
      }
    }
  };

  const handleInputChange = (event) => {
    setPostContent(event.target.value);
  };
  return (
    <div className={styles.writeBox}>
      <div className={styles.writeZone}>
        <form
          name="postform"
          id="postForm"
          method="post"
          onSubmit={handleFormSubmit}
          className={styles.writeField}
        >
          <textarea
            value={postContent}
            onChange={handleInputChange}
            className={styles.writeText}
            placeholder={`${name || '...'} 想說點什麼呢？`}
            type="text"
          />
        </form>
        <div className={styles.writerPic}>
          {picture ? (
            <Link href={`/user/${id}`}>
              <Image
                src={picture || '/picture.png'}
                className={styles.image}
                alt="user_picture"
                width={74}
                height={74}
              />
            </Link>
          ) : (
            <Skeleton circle width={74} height={74} className={styles.image} />
          )}
        </div>
      </div>
      <div className={styles.functionZone}>
        <button type="submit" className={styles.writeButton} form="postForm">
          <span className={styles.buttonText}>發布貼文</span>
        </button>

        <div className={styles.apiSelect}>
          <label htmlFor="joker" className={styles.apiLabel}>
            <input
              id="joker"
              type="checkbox"
              checked={selectedAPIs.joker}
              disabled={selectedAPIs.none}
              onChange={() => handleAPIChange('joker')}
            />
            Joker
          </label>

          <label htmlFor="tinder" className={styles.apiLabel}>
            <input
              id="tinder"
              type="checkbox"
              checked={selectedAPIs.tinder}
              disabled={selectedAPIs.none}
              onChange={() => handleAPIChange('tinder')}
            />
            Tinder
          </label>
          <label htmlFor="custom" className={styles.apiLabel}>
            <input
              id="custom"
              type="checkbox"
              checked={selectedAPIs.custom}
              onChange={() => handleAPIChange('custom')}
              disabled={selectedAPIs.none}
            />
            自訂 API：
            <input
              type="text"
              defaultValue={customAPI}
              onChange={(e) => setCustomAPI(e.target.value)}
              disabled={selectedAPIs.none}
            />
          </label>
          <label htmlFor="none">
            <input
              id="none"
              type="checkbox"
              checked={selectedAPIs.none}
              onChange={() => handleAPIChange('none')}
            />
            None
          </label>
        </div>
      </div>
    </div>
  );
}
