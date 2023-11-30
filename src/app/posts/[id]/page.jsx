'use client';

import { Suspense } from 'react';
import Nav from '@/component/Nav';
import Post from '@/component/Post';
import useThePostDetail from '@/hooks/useThePostDetail';
import PostSkeleton from '@/component/Skeletons/PostSkeleton';

export default function Page({ params }) {
  const { postDetail, loading, handlePostDetailChange } = useThePostDetail(params.id);

  return (
    <Suspense fallback={<PostSkeleton />}>
      <Nav />
      <main>
        <article style={{ margin: '32px auto 0px' }}>
          {loading && <PostSkeleton />}
          {!loading && (
            <Post postData={postDetail} isPostDetailPage onPostUpdate={handlePostDetailChange} />
          )}
        </article>
      </main>
    </Suspense>
  );
}
