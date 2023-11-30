// useLike.js
import { useState, useEffect } from 'react';
import { apiSendArticleLike, apiDeleteArticleLike } from '@/api/api.js';

function useLike(initialIsLiked, initialLikeCount, postId) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  useEffect(() => {
    setIsLiked(initialIsLiked);
    setLikeCount(initialLikeCount);
  }, [initialIsLiked, initialLikeCount]);

  const startSendLikeAPI = async () => {
    try {
      const response = await apiSendArticleLike(postId);
      console.log('按讚成功:', response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const startDeleteLikeAPI = async () => {
    try {
      const response = await apiDeleteArticleLike(postId);
      console.log('取消按讚成功:', response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);

    if (isLiked) {
      setLikeCount((prevLikeCount) => prevLikeCount - 1);
      try {
        await startDeleteLikeAPI();
      } catch (error) {
        console.error('取消按讚失敗:', error);
        setIsLiked((prevIsLiked) => !prevIsLiked);
        setLikeCount((prevLikeCount) => prevLikeCount + 1);
      }
    } else {
      setLikeCount((prevLikeCount) => prevLikeCount + 1);
      try {
        await startSendLikeAPI();
      } catch (error) {
        console.error('按讚失敗:', error);
        setIsLiked((prevIsLiked) => !prevIsLiked);
        setLikeCount((prevLikeCount) => prevLikeCount - 1);
      }
    }
  };

  return {
    isLiked,
    likeCount,
    handleLike,
  };
}

export default useLike;
