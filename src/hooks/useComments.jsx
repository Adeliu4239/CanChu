import { useState, useEffect } from 'react';
import { apiCommentWrite } from '@/api/api.js';
import Swal from 'sweetalert2';

function useComments(initialComments, postId, onPostUpdate) {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!newComment) {
      Swal.fire({
        icon: 'error',
        title: '留言失敗',
        text: '請輸入內容',
      });
      return;
    }

    try {
      const requestBody = {
        content: newComment,
      };
      const response = await apiCommentWrite(postId, requestBody);
      console.log('留言成功:', response.data);
      setNewComment('');
      onPostUpdate();
    } catch (error) {
      console.error('留言失敗:', error);
    }
  };

  const handleCommentInputChange = (event) => {
    setNewComment(event.target.value);
  };

  return {
    comments,
    newComment,
    handleFormSubmit,
    handleCommentInputChange,
  };
}

export default useComments;
