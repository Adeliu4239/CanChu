import { useEffect } from 'react';

function useScrollBottom(callback, distanceToBottom) {
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight;
      const visibleHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      if (totalHeight - visibleHeight - scrollPosition <= distanceToBottom) {
        callback();
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [callback, distanceToBottom]);
}

export default useScrollBottom;
