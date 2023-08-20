/**
 * @number 1번 헤더
 * @description 마일리지 카테고리 리스트
 */
const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: '번호',
  },
  {
    id: 'calories',
    numeric: true,
    disablePadding: false,
    label: '카테고리명',
  },
  {
    id: 'fat',
    numeric: true,
    disablePadding: false,
    label: '학기',
  },
  {
    id: 'carbs',
    numeric: true,
    disablePadding: false,
    label: '항목명',
  },
  {
    id: 'caloriess',
    numeric: true,
    disablePadding: false,
    label: '마일리지',
  },
  {
    id: 'fatt',
    numeric: true,
    disablePadding: false,
    label: '보이기',
  },
  {
    id: 'carbss',
    numeric: true,
    disablePadding: false,
    label: '등록일',
  },

  {
    id: 'carbsss',
    numeric: true,
    disablePadding: false,
    label: '관리',
  },
];

/**
 * @number 1번 목록
 * @description 마일리지 카테고리 리스트
 */

const rows = [
  createData('1', '전공 마일리지', 7, '웹 서비스 캠프', 15, 'Y', '2023-04-18', <StarIcon />),
  createData('2', '비교과 - 연구활동', 6, '웹 서비스 캠프', 5, 'Y', '2023-04-17', <StarIcon />),
  createData('3', '비교과 - 전공활동', 6, '웹 서비스 캠프', 25, 'Y', '2023-04-19', <StarIcon />),
  createData('4', '비교과 - 특강참여', 7, '웹 서비스 캠프', 35, 'Y', '2023-04-20', <StarIcon />),
  createData('5', '비교과 - 학회활동', 6, '웹 서비스 캠프', 5, 'Y', '2023-04-21', <StarIcon />),
  createData('6', '비교과 - 행사참여', 8, '웹 서비스 캠프', 5, 'Y', '2023-04-22', <StarIcon />),
];
