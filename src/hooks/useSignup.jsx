import { useState } from 'react';
import { apiUserSignUp } from '@/api/api.js';

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const signUp = async (email, username, password) => {
    try {
      setLoading(true);

      const requestBody = {
        email,
        name: username,
        password,
      };

      const response = await apiUserSignUp(JSON.stringify(requestBody));
      setLoading(false);
      console.log('註冊成功:', response.data);
      setSuccess(true);
      // router.push('/login');
    } catch (Regerror) {
      console.error('註冊失敗:', Regerror);
      setLoading(false);
      setError(Regerror.response.status);
      setSuccess(false);
    }
  };

  return { signUp, loading, error, success, setError };
};

export default useSignUp;
