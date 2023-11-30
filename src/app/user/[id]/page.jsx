'use client';

import { useEffect } from 'react';
import Nav from '@/component/Nav.jsx';
import Post from '@/component/Post.jsx';
import SideBar from '@/component/SideBar.jsx';
import WriteZone from '@/component/WriteZone.jsx';
import PersonalPanel from '@/component/PersonalPanel.jsx';
import usePostSearch from '@/hooks/usePostSearch';
import useTheUserDetail from '@/hooks/useTheUserDetail.jsx';
import useScrollBottom from '@/hooks/useScrollBottom';
import PostSkeleton from '@/component/Skeletons/PostSkeleton.jsx';
import { getCookie } from '@/utils/cookies.js';

export default function Home({ params }) {
  const { postDetail, nextCursor, loading, handlePostStateChange, handleMorePost } = usePostSearch(
    params.id,
  );
  const { userDetail, handleUserDetailChange } = useTheUserDetail(params.id);
  const mineFlag = params.id.toString() === getCookie('user_id').toString();
  const handleGetMorePosts = () => {
    if (nextCursor !== null) {
      handleMorePost();
      console.log('get the posts!');
    }
  };
  useScrollBottom(handleGetMorePosts, 100);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Nav />
      <PersonalPanel userData={userDetail} />
      <main>
        <aside>
          <SideBar
            userDetail={userDetail}
            isMyUserPage={mineFlag}
            onUserDetailChange={handleUserDetailChange}
          />
        </aside>
        <article>
          {mineFlag && (loading || !loading) && (
            <section>
              <WriteZone onNewPostWrite={handlePostStateChange} />
            </section>
          )}
          {loading && <PostSkeleton />}
          {!loading && (
            <div>
              {postDetail?.length > 0 ? (
                postDetail.map((post) => (
                  <Post
                    key={post.id}
                    postData={post}
                    isHomePage
                    isPersonalPage={mineFlag}
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
