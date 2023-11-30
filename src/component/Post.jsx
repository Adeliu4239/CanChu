/* eslint-disable no-nested-ternary */
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import Comment from '@/component/Comment.jsx';
import styles from '@/styles/page.module.scss';
import getRelativeTime from '@/utils/getRelativeTime.js';
import useComments from '@/hooks/useComments';
import useLike from '@/hooks/useLike';
import usePostUpdate from '@/hooks/usePostUpdate';
import { useUser } from '../app/userContext.jsx';

export default function Post({
  postData,
  isHomePage,
  isPersonalPage,
  isPostDetailPage,
  onPostUpdate,
}) {
  const { user } = useUser();
  const { id, name, picture } = user;
  const isPostOwner = id === postData.user_id;
  const [post, setPostData] = useState(postData);
  const [showFullContent, setShowFullContent] = useState(false);
  const { comments, newComment, handleFormSubmit, handleCommentInputChange } = useComments(
    post.comments,
    post.id,
    onPostUpdate,
  );
  const { isLiked, likeCount, handleLike } = useLike(post.is_liked, post.like_count, post.id);
  const { editMode, newPostContent, setPostContent, switchEditMode, handleEditPostFormSubmit } =
    usePostUpdate(post, post.id, setPostData);

  const truncatedContent =
    post.context && post.context?.length > 200
      ? `${post.context.substring(0, 200)}...`
      : post.context;

  const handleViewMoreClick = () => {
    setShowFullContent(true);
  };

  useEffect(() => {
    setPostData(postData);
    setPostContent(postData.context);
  }, [postData]);
  return (
    <div className={styles['frame-layout']}>
      {(isPersonalPage || isPostOwner) && !editMode && (
        <button type="button" className={styles.editPan} onClick={switchEditMode}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <rect width="24" height="24" rx="3" fill="#5458F7" />
            <path
              d="M18.5158 4.6938C17.5905 3.76873 16.0947 3.76873 15.1693 4.6938L13.8975 5.96103L18.0341 10.0964L19.306 8.82495C20.2313 7.89988 20.2313 6.40456 19.306 5.47948L18.5158 4.6938ZM5.87345 13.9868C5.6157 14.2444 5.41711 14.5613 5.30302 14.9119L4.05231 18.6628C3.92977 19.0261 4.02696 19.4274 4.29738 19.702C4.56781 19.9765 4.96922 20.0695 5.33683 19.947L9.08898 18.6966C9.43546 18.5784 9.75236 18.384 10.0143 18.1264L17.0834 11.0553L12.9425 6.91567L5.87345 13.9868Z"
              fill="white"
            />
          </svg>
        </button>
      )}
      <div id={post.id} className={styles['article-layout']}>
        <div className={styles['writer-layout']}>
          <div className={styles['writer-photo']}>
            <Link href={`/user/${post.user_id}`}>
              <Image
                src={isPersonalPage ? picture : post.picture ? post.picture : '/picture.png'}
                className={styles.image}
                alt={isPersonalPage ? name : post.name ? post.name : 'Unknown'}
                width={75}
                height={75}
              />
            </Link>
          </div>
          <div className={styles['writer-name']}>
            {isPersonalPage ? name : post.name ? post.name : 'Unknown'}
            {isHomePage ? (
              <Link href={`/posts/${post.id}`}>
                <span className={styles['post-time']}>
                  {post.created_at ? getRelativeTime(post.created_at) : 'Unknown'}
                </span>
              </Link>
            ) : (
              <span className={styles['post-time']}>
                {post.created_at ? getRelativeTime(post.created_at) : 'Unknown'}
              </span>
            )}
          </div>
        </div>
        {!editMode ? (
          <div className={styles['article-content']}>
            <div className="markdown-body" style={{ fontSize: '18px' }}>
              <ReactMarkdown>
                {showFullContent || isPostDetailPage ? post.context : truncatedContent}
              </ReactMarkdown>
              <span>
                {!(showFullContent || isPostDetailPage) && post.context?.length > 200 && (
                  <button type="button" className={styles.hint} onClick={handleViewMoreClick}>
                    查看更多
                  </button>
                )}
              </span>
            </div>
          </div>
        ) : (
          <>
            <div className={styles['article-content']}>
              <MdEditor
                className={styles.articleEdit}
                modelValue={newPostContent}
                language="en-US"
                previewTheme="github"
                codeTheme="github"
                showCodeRowNumber
                onChange={setPostContent}
                onSave={handleEditPostFormSubmit}
              />
            </div>
            <button
              type="button"
              className={`${styles.articleEditButton} ${styles.blue}`}
              onClick={handleEditPostFormSubmit}
            >
              確認
            </button>
            <button
              type="button"
              className={`${styles.articleEditButton} ${styles.gray}`}
              onClick={switchEditMode}
            >
              取消
            </button>
          </>
        )}
      </div>
      <div className={styles['function-layout']}>
        <hr className={styles.line} />
        <div className={styles['icon-layout']}>
          <div className={styles['icon-button']}>
            {isLiked ? (
              <Image
                src="/heart-2 1.png"
                className={styles.searchPic}
                alt="user-pic"
                width={28}
                height={28}
                onClick={handleLike}
                style={{ cursor: 'pointer' }}
              />
            ) : (
              <Image
                src="/heart.png"
                className={styles.searchPic}
                alt="user-pic"
                width={24}
                height={24}
                onClick={handleLike}
                style={{ cursor: 'pointer' }}
              />
            )}
          </div>
          <div className={styles['icon-button']}>
            <Image
              src="/Fb-comment.png"
              className={styles.searchPic}
              alt="user-pic"
              width={20}
              height={20}
            />
          </div>
        </div>
        <hr className={styles.line} />
      </div>
      <div className={styles['info-layout']}>
        {isPostDetailPage ? (
          <>
            <div className={styles['info-text']}>{likeCount} 人喜歡這則貼文</div>
            <div className={styles['info-text']}>
              {post.comment_count ? post.comment_count : '0'}則留言
            </div>
          </>
        ) : (
          <>
            <Link href={`/posts/${post.id}`}>
              <div className={styles['info-text']}>{likeCount} 人喜歡這則貼文</div>
            </Link>
            <Link href={`/posts/${post.id}`}>
              <div className={styles['info-text']}>
                {post.comment_count ? post.comment_count : '0'}則留言
              </div>
            </Link>
          </>
        )}
      </div>
      <hr className={`${styles.line} ${styles['info-line']}`} />
      {isPostDetailPage &&
        (comments && comments.length > 0 ? (
          comments.map((comment) => <Comment key={comment.id} comment={comment} />)
        ) : (
          <div className="textHint">No comment updates</div>
        ))}

      {isPostDetailPage ? (
        <div className={styles['comment-layout']}>
          <div className={styles['user-pic']}>
            <Image
              src={picture || '/picture.png'}
              className={styles.image}
              alt="user-pic"
              width={50}
              height={50}
            />
          </div>
          <div className={styles['comment-bar']}>
            <form
              form="commentForm"
              id="commentForm"
              method="post"
              className={styles['comment-bar']}
              onSubmit={handleFormSubmit}
            >
              <textarea
                value={newComment}
                className={styles['comment-bar-input']}
                onChange={handleCommentInputChange}
                placeholder="留個言吧"
              />
            </form>
            <button type="submit" form="commentForm">
              <Image src="/arrow.png" alt="user-pic" width={25} height={25} />
            </button>
          </div>
        </div>
      ) : (
        <Link href={`/posts/${post.id}`}>
          <div className={styles['comment-layout']}>
            <div className={styles['user-pic']}>
              <Image
                src={picture || '/picture.png'}
                className={styles.image}
                alt="user-pic"
                width={50}
                height={50}
              />
            </div>
            <div className={styles['comment-bar']}>
              <div>留個言吧!</div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}
