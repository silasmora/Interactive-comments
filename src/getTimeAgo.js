export function getTimeAgo(date) {
  const now = new Date();
  const diff = now - date;
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;

  if (diff < minute) {
    return Math.floor(diff / 1000) + ' seconds ago';
  } else if (diff < hour) {
    return Math.floor(diff / minute) + ' minutes ago';
  } else if (diff < day) {
    return Math.floor(diff / hour) + ' hours ago';
  } else if (diff < week) {
    return Math.floor(diff / day) + ' days ago';
  } else {
    return date.toLocaleString();
  }
}

