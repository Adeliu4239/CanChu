// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import { getCookie } from '../utils/cookies';

const apiRequestWithTypeJson = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_DOMAIN,
  headers: {
    'Content-Type': 'application/json',
  },
});
const apiRequestWithAuthToken = () => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_DOMAIN,
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
    },
  });
};
const apiRequestWithTypeJsonAndAuthToken = () => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_DOMAIN,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`,
    },
  });
};
const apiRequestWithTypeFormdataAndAuthToken = () => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_DOMAIN,
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};
// Mock friend api
const apiMockFriendJoker = () => {
  const jokerToken = process.env.NEXT_PUBLIC_JOKER_ACCESS_TOKEN;
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_DOMAIN,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jokerToken}`,
    },
  });
};
const apiMockFriendTinder = () => {
  const tinderToken = process.env.NEXT_PUBLIC_TinderFriend_ACCESS_TOKEN;
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_DOMAIN,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tinderToken}`,
    },
  });
};
const apiMockFriendCustom = () => {
  const customToken = process.env.NEXT_PUBLIC_CUSTOM_ACCESS_TOKEN;
  console.log(process.env.NEXT_PUBLIC_CUSTOM_ACCESS_TOKEN);
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_DOMAIN,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${customToken}`,
    },
  });
};
// User 相關的 api
export const apiUserSignIn = (data) => apiRequestWithTypeJson.post('/users/signin', data);
export const apiUserLogout = (data) => apiRequestWithTypeJson.post('/signOut', data);
export const apiUserSignUp = (data) => apiRequestWithTypeJson.post('/users/signup', data);
export const apiUserInfo = () =>
  apiRequestWithAuthToken().get(`/users/${getCookie('user_id')}/profile`);
export const apiGetUserOrOtherUserDetail = (id) =>
  apiRequestWithAuthToken().get(`/users/${id}/profile`);
export const apiUpdateUserDetail = (data) =>
  apiRequestWithTypeJsonAndAuthToken().put(`/users/profile`, data);

// 文章相關的 api
export const apiArticleWrite = (data) => apiRequestWithTypeJsonAndAuthToken().post('/posts', data);
export const apiCommentWrite = (postID, data) =>
  apiRequestWithTypeJsonAndAuthToken().post(`/posts/${postID}/comment`, data);
export const apiArticleGet = (postID) => apiRequestWithAuthToken().get(`/posts/${postID}`);
export const apiSendArticleLike = (postID) =>
  apiRequestWithAuthToken().post(`/posts/${postID}/like`);
export const apiDeleteArticleLike = (postID) =>
  apiRequestWithAuthToken().delete(`/posts/${postID}/like`);
export const apiArticleUpdate = (postID, data) =>
  apiRequestWithTypeJsonAndAuthToken().put(`/posts/${postID}`, data);

// 搜尋相關的 api
export const apiPostSearch = (id) => {
  if (id) return apiRequestWithAuthToken().get(`/posts/search?user_id=${id}`);
  return apiRequestWithAuthToken().get(`/posts/search`);
};
export const apiPostSearchMore = (id, nextCursor) => {
  if (id) return apiRequestWithAuthToken().get(`/posts/search?user_id=${id}&cursor=${nextCursor}}`);
  return apiRequestWithAuthToken().get(`/posts/search?cursor=${nextCursor}}`);
};
export const apiUserSearch = (name) =>
  apiRequestWithAuthToken().get(`/users/search?keyword=${name}`);

// 照片相關的 api
export const apiPhotoUpload = (data) =>
  apiRequestWithTypeFormdataAndAuthToken().put('/users/picture', data);

// 好友相關的 api
export const apiAllUserFriend = () => apiRequestWithAuthToken().get(`/friends`);
export const apiUserFriendPending = () => apiRequestWithAuthToken().get(`/friends/pending`);
export const apiFriendAdd = (userID) =>
  apiRequestWithAuthToken().post(`/friends/${userID}/request`);
export const apiFriendAgree = (friendshipID) =>
  apiRequestWithAuthToken().post(`/friends/${friendshipID}/agree`);
export const apiFriendDelete = (friendshipID) =>
  apiRequestWithAuthToken().delete(`/friends/${friendshipID}`);

// event 相關的 api
export const apiEventGet = () => apiRequestWithAuthToken().get(`/events`);
export const apiEventRead = (eventId) => apiRequestWithAuthToken().post(`/events/${eventId}/read`);

// mock friend api
export const apiMockFriendJokerLaughAtYou = (postID, aiResponse) =>
  apiMockFriendJoker().post(`/posts/${postID}/comment`, aiResponse);
export const apiMockFriendTinderResponse = (postID, aiResponse) =>
  apiMockFriendTinder().post(`/posts/${postID}/comment`, aiResponse);
export const apiMockFriendCustomResponse = (postID, aiResponse) =>
  apiMockFriendCustom().post(`/posts/${postID}/comment`, aiResponse);
