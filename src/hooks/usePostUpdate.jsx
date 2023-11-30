import { useState, useCallback } from 'react';
import { apiArticleUpdate } from '@/api/api.js';
import Swal from 'sweetalert2';

const usePostUpdate = (initialContent, postId, setPostData) => {
  const [newPostContent, setPostContent] = useState(initialContent.text);
  const [editMode, setEditMode] = useState(false);

  const handlePostContentChange = (event) => {
    setPostContent(event.target.value);
  };

  const switchEditMode = () => {
    setEditMode(!editMode);
  };

  const onPostUpdate = () => {
    const updatedPost = { ...initialContent };
    updatedPost.context = newPostContent;
    setPostData(updatedPost);
  };
  const handleEditPostFormSubmit = useCallback(async () => {
    // event.preventDefault();
    if (!newPostContent) {
      Swal.fire({
        icon: 'error',
        title: '更新貼文失敗',
        text: '請輸入貼文內容',
      });
      return;
    }

    try {
      const requestBody = {
        context: newPostContent,
      };
      const response = await apiArticleUpdate(postId, requestBody);
      onPostUpdate();
      console.log('更新貼文成功:', response.data);
      switchEditMode();
    } catch (error) {
      console.error('更新貼文失敗:', error);
    }
  }, [newPostContent, postId]);

  return {
    newPostContent,
    editMode,
    handlePostContentChange,
    setPostContent,
    switchEditMode,
    handleEditPostFormSubmit,
  };
};

export default usePostUpdate;
