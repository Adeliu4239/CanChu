'use client';

import { useEffect } from 'react';
import Post from '@/component/Post';
import Nav from '@/component/Nav';
import SideBar from '@/component/SideBar';
import WriteZone from '@/component/WriteZone';
import { getCookie } from '@/utils/cookies.js';
import usePostSearch from '@/hooks/usePostSearch';
import useFriendsAndReqs from '@/hooks/useFriendsAndReqs';
import useScrollBottom from '@/hooks/useScrollBottom';
import PostSkeleton from '@/component/Skeletons/PostSkeleton';

export default function Home() {
  const { postDetail, nextCursor, loading, handlePostStateChange, handleMorePost } =
    usePostSearch();
  const { friendsList, friendsRequests, handleFriendStateChange } = useFriendsAndReqs();
  const handleGetMorePosts = () => {
    if (nextCursor !== null) {
      handleMorePost();
      console.log('get the posts!');
    }
  };
  useScrollBottom(handleGetMorePosts, 100);
  console.log('postDetail', postDetail);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Nav />
      <main>
        <aside>
          <SideBar
            isHomePage
            friendsList={friendsList}
            friendsInvite={friendsRequests}
            onFriendStateChange={handleFriendStateChange}
          />
        </aside>
        <section className="sideBarRwd">
          <SideBar
            isHomePage
            friendsList={friendsList}
            friendsInvite={friendsRequests}
            onFriendStateChange={handleFriendStateChange}
          />
        </section>
        <article>
          <section>
            <WriteZone onNewPostWrite={handlePostStateChange} />
          </section>
          {loading && <PostSkeleton />}
          {!loading && (
            <div>
              {postDetail?.length > 0 ? (
                postDetail.map((post) => (
                  <Post
                    key={post.id}
                    postData={post}
                    isHomePage
                    isPersonalPage={false}
                    editFlag={post.user_id.toString() === getCookie('user_id').toString()}
                    onPostUpdate={handlePostStateChange}
                  />
                ))
              ) : (
                <div className="textHint">No post updates</div>
              )}
            </div>
          )}
          {!loading && nextCursor === null && postDetail?.length > 0 && (
            <div className="textHint">No more posts</div>
          )}
        </article>
      </main>
    </>
  );
}
