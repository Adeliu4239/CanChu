import { useState } from 'react';
import { apiUserSignIn } from '@/api/api.js';
import { setCookie } from '@/utils/cookies.js';
import { useUser } from 'app/userContext';

const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();

  const login = async (email, password, router) => {
    try {
      setLoading(true);

      if (!email || !password) {
        setError('請完整填寫表單');
        setLoading(false);
        return;
      }

      const requestBody = {
        provider: 'native',
        email: email.trim(),
        password: password.trim(),
      };

      const response = await apiUserSignIn(requestBody);
      console.log('登入成功:', response.data);

      setLoading(false);
      const token = response.data.data.access_token;
      const userID = response.data.data.user.id;
      const userName = response.data.data.user.name;
      const userData = response.data.data.user;
      if (userData.picture === '') {
        userData.picture = '/picture.png';
      }
      setCookie('token', token, 1800);
      setCookie('user_id', userID, 1800);
      localStorage.setItem('user_name', userName);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      router.push('/');
    } catch (LoginError) {
      console.error('登入失敗:', LoginError.response);
      const { status } = LoginError.response;
      console.error('登入失敗:', status);
      setError(status);
      setLoading(false);
    }
  };

  return { login, error, loading, setError };
};

export default useLogin;
