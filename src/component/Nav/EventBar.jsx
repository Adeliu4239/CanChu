import { useEffect, useState } from 'react';
import getRelativeTime from '@/utils/getRelativeTime.js';
import styles from '@/styles/nav.module.scss';

export default function EventBar({ event, onRead }) {
  const [readed, setReaded] = useState(event.is_read);

  const readEvent = (eventId) => {
    setReaded(true);
    onRead(eventId);
  };
  useEffect(() => {
    if (event.is_read) {
      setReaded(true);
    }
  }, [event]);

  return (
    <button
      type="button"
      className={styles.notifiContent}
      onClick={() => readEvent(event.id)}
      disabled={readed}
    >
      <div className={styles.notifiContentBox}>
        <div className={`${styles.notif} ${readed ? styles.colorGray : ''}`}>{event.summary}</div>
        <div className={`${styles.notifTime} ${readed ? styles.colorGray : ''}`}>
          {getRelativeTime(event.created_at)}
        </div>
      </div>
      {!readed && (
        <div className={styles.checkNotif}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6ZM9.37311 3.74641C9.08022 3.45351 8.60535 3.45351 8.31245 3.74641L5.25 6.81434L3.90533 5.46967C3.61244 5.17678 3.13756 5.17678 2.84467 5.46967C2.55178 5.76256 2.55178 6.23744 2.84467 6.53033L4.71967 8.40533C5.01256 8.69822 5.48744 8.69822 5.78033 8.40533L9.37311 4.80707C9.66601 4.51417 9.66601 4.0393 9.37311 3.74641Z"
              fill="#5458F7"
            />
          </svg>
        </div>
      )}
    </button>
  );
}
