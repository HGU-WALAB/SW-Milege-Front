export function formatDateToKorean(inputDate: string) {
  if (!inputDate) return '미정';
  // 주어진 날짜 형식을 Date 객체로 변환
  const parsedDate = new Date(inputDate);

  // 각 항목(년, 월, 일, 시, 분)을 추출
  const year = parsedDate.getFullYear().toString();
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
  const day = parsedDate.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}
