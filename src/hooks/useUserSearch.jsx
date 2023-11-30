import { useState } from 'react';
import { apiUserSearch } from '@/api/api.js';
import debounce from '@/utils/debounce.js';

const useUserSearch = () => {
  const [searchUser, setSearchUser] = useState('');
  const [searchUserResults, setSearchUserResults] = useState([]);

  const handleSearch = debounce(async (searchTerm) => {
    if (searchTerm === '') {
      setSearchUserResults([]);
      return;
    }
    try {
      const response = await apiUserSearch(searchTerm);
      const searchResult = response.data.data.users;
      setSearchUserResults(searchResult.length > 0 ? searchResult : null);
    } catch (error) {
      console.error('搜尋失敗:', error);
    }
    console.log('Searching for:', searchTerm);
  }, 500);

  const handleInputChange = (event) => {
    setSearchUser(event.target.value.trim());
    handleSearch(event.target.value.trim());
  };

  return {
    searchUser,
    searchUserResults,
    handleInputChange,
  };
};

export default useUserSearch;
