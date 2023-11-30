import { useState, useEffect } from 'react';
import { apiArticleGet } from '@/api/api';

export default function useThePostDetail(postID) {
  const [postDetail, setPostDetail] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchPostDetail = async () => {
    try {
      const response = await apiArticleGet(postID);
      setPostDetail(response.data.data.post);
      setLoading(true);
    } catch (err) {
      console.log('獲取文章失敗', err);
      setPostDetail({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostDetail();
  }, []);

  const handlePostDetailChange = () => {
    fetchPostDetail();
  };

  return { postDetail, loading, handlePostDetailChange };
}
