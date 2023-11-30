import { useState, useEffect } from 'react';
import { apiPostSearch, apiPostSearchMore } from '@/api/api';

export default function usePostSearch(userID) {
  const [postDetail, setPostDetail] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPostDetail = async () => {
    try {
      const response = await apiPostSearch(userID);
      setPostDetail(response.data.data.posts);
      setLoading(true);
      setNextCursor(response.data.data.next_cursor);
      console.log('獲取文章成功', response.data.data);
      console.log('next_cursor', response.data.data.next_cursor);
    } catch (err) {
      console.log('獲取文章失敗', err);
      setPostDetail([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMorePostDetail = async () => {
    try {
      const response = await apiPostSearchMore(userID, nextCursor);
      setPostDetail((prev) => [...prev, ...response.data.data.posts]);
      setLoading(true);
      setNextCursor(response.data.data.next_cursor);
      console.log('獲取更多文章成功', response.data.data);
      console.log('next_cursor', response.data.data.next_cursor);
    } catch (err) {
      console.log('獲取文章失敗', err);
      setPostDetail([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostDetail();
  }, [userID]);

  useEffect(() => {
    console.log('nextCursor', nextCursor);
  }, [nextCursor]);

  const handlePostStateChange = () => {
    fetchPostDetail();
    console.log('抓取貼文');
  };

  const handleMorePost = () => {
    fetchMorePostDetail();
  };

  return { postDetail, nextCursor, loading, handlePostStateChange, handleMorePost };
}
