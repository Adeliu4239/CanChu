export default function MockFriend(apiFunction, tellFunction) {
  const executeFunction = async (postId, content, onNewPostWrite) => {
    try {
      const response = await tellFunction(content);
      const aiResponse = await response.text();
      console.log(aiResponse);
      if (aiResponse) {
        const requestBody = {
          content: aiResponse,
        };
        await apiFunction(postId, requestBody);
        onNewPostWrite();
      }
    } catch (error) {
      console.error('處理 AI 回應錯誤:', error);
    }
  };
  return { executeFunction };
}
