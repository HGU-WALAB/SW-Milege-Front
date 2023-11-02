export function formatDateToKorean(inputDate: string) {
  // 주어진 날짜 형식을 Date 객체로 변환
  let parsedDate = new Date(inputDate);

  // 각 항목(년, 월, 일, 시, 분)을 추출
  let year = parsedDate.getFullYear().toString().slice(-2);
  let month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
  let day = parsedDate.getDate().toString().padStart(2, '0');
  let hours = parsedDate.getHours().toString().padStart(2, '0');
  let minutes = parsedDate.getMinutes().toString().padStart(2, '0');

  // 원하는 형식으로 날짜 문자열 생성
  let formattedDate = `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;

  return formattedDate;
}
