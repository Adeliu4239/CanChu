import { useState } from 'react';

export default function usePostSearch() {
  const [loading, setLoading] = useState(false);

  const handleLoading = () => {
    setLoading(!loading);
  };

  return { loading, handleLoading };
}
