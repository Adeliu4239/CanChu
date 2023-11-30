import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import getRelativeTime from '@/utils/getRelativeTime';
import styles from '@/styles/page.module.scss';

function Comment({ comment }) {
  const [showFullContent, setShowFullContent] = useState(false);

  const truncatedContent =
    comment.content && comment.content.length > 100
      ? `${comment.content.substring(0, 100)}...`
      : comment.content;

  const handleViewMoreClick = () => {
    setShowFullContent(true);
  };

  return (
    <div key={comment.id} className={styles.commentBox}>
      <div className={styles.commentPhoto}>
        <Link href={`/user/${comment.user.id}`}>
          <Image
            src={comment.user.picture ? comment.user.picture : '/picture.png'}
            alt={comment.user.name ? comment.user.name : 'Unknown'}
            className={styles.image}
            width={32}
            height={32}
          />
        </Link>
      </div>
      <div className={styles.commentMessageAndTime}>
        <div className={styles.commentMessage}>
          <Link href={`/user/${comment.user.id}`}>
            <div className={styles.commenterName}>
              {comment.user.name ? comment.user.name : 'Unknown'}
            </div>
          </Link>
          <span className={styles.commentText}>
            {showFullContent ? comment.content : truncatedContent}
          </span>
          {!showFullContent && comment.content?.length > 100 && (
            <span>
              <button type="button" className={styles.hintComment} onClick={handleViewMoreClick}>
                查看更多
              </button>
            </span>
          )}
        </div>
        <div className={styles.commentTime}>
          {comment.created_at ? getRelativeTime(comment.created_at) : 'Unknown'}
        </div>
      </div>
    </div>
  );
}

export default Comment;
