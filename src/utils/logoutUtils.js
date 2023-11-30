// logoutUtils.js

import { removeCookie } from '@/utils/cookies.js';

export default function handleLogout(logout, router, redirectURL) {
  removeCookie('token');
  removeCookie('user_id');
  localStorage.removeItem('user_name');
  localStorage.removeItem('user');
  logout();
  router.push(redirectURL);
}
