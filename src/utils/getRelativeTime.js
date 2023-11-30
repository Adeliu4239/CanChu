import { formatDistanceToNow, parseISO } from 'date-fns';

function getRelativeTime(createdAt) {
  try {
    const createdDate = parseISO(createdAt);
    const currentDate = new Date();
    const fiveDaysAgo = new Date(currentDate.getTime() - 5 * 24 * 60 * 60 * 1000);
    const timeAgo = formatDistanceToNow(createdDate, {
      addSuffix: true,
    });
    if (fiveDaysAgo > createdDate.getTime()) {
      return createdAt;
    }
    return timeAgo;
  } catch (error) {
    console.log(error);
    return createdAt;
  }
}
export default getRelativeTime;
