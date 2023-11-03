import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

export function formatDateToISOString(date) {
  const now = new Date(date).toISOString();
  return now.slice(0, 19);
}

// export function formatDateToISOStringExceptT(date) {
//   const now = new Date(date).toISOString();
//   return now.slice(0, 16); // 초를 제거하고 T를 포함한 형식으로 반환
// }

export function getCurrentKST() {
  const now = new Date();
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Seoul',
  };

  const parts = new Intl.DateTimeFormat('en-US', options).formatToParts(now);
  const { year, month, day, hour, minute, second } = Object.fromEntries(
    parts.map(({ type, value }) => [type, value])
  );

  return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
}
