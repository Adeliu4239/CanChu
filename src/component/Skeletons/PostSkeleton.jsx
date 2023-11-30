import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from '@/styles/page.module.scss';

export default function PostSkeleton() {
  return (
    <div className={styles['frame-layout']}>
      <div className={styles['article-layout']}>
        <div className={styles['writer-layout']}>
          <Skeleton circle className={styles['writer-photo']} />
          <Skeleton count={2} className={styles['writer-name']} />
        </div>
        <Skeleton count={5} />
      </div>
      <div className={styles['function-layout']}>
        <div className={styles['icon-layout']}>
          <Skeleton circle className={styles['icon-button']} />
          <Skeleton circle className={styles['icon-button']} />
        </div>
      </div>
      <Skeleton className={styles['info-layout']} />
      <div className={styles['comment-layout']}>
        <Skeleton circle className={styles['user-pic']} />
        <Skeleton className={styles['comment-bar']} />
      </div>
    </div>
  );
}
