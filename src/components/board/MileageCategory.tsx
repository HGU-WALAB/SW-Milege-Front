import { StarIcon } from 'src/theme/overrides/CustomIcons';
import EnhancedTable from '../common/CustomTable';
import { MAX_MILEAGE, MANAGE, CHECK_BOX, NUM, CATEGORY } from 'src/assets/data/fields';

/**
 * @breif [마일리지 카테고리] 게시판
 */

export enum MileageCategoryBoard {
  'NUM' = NUM,
  'CATEGORY' = CATEGORY,
  'MAX_MILEAGE' = MAX_MILEAGE,
  'MANAGE' = MANAGE,
  'CHECK_BOX' = CHECK_BOX,
}

/**
 * @kind 마일리지 카테로리
 * @breif 데이터 인터페이스
 */
interface Data {
  [MileageCategoryBoard.CATEGORY]: string;
  [MileageCategoryBoard.MAX_MILEAGE]: number;
  [MileageCategoryBoard.MANAGE]: string;
  [MileageCategoryBoard.CHECK_BOX]: string;
}

/**
 * @kind 마일리지 카테고리
 * @brief 데이터 생성 함수
 *
 *  */
function createData(
  num: number,
  category: string,
  maxMileage: number,
  manage: string,
  checkBox: string
): Data {
  return {
    [MileageCategoryBoard.NUM]: num,
    [MileageCategoryBoard.CATEGORY]: category,
    [MileageCategoryBoard.MAX_MILEAGE]: maxMileage,
    [MileageCategoryBoard.MANAGE]: manage,
    [MileageCategoryBoard.CHECK_BOX]: checkBox,
  };
}

/**
 * @number 1번 헤더
 * @description 마일리지 카테고리 리스트
 */
const headCells = [
  {
    id: [MileageCategoryBoard.NUM],
    numeric: false,
    disablePadding: true,
    label: '번호',
  },
  {
    id: [MileageCategoryBoard.CATEGORY],
    numeric: true,
    disablePadding: false,
    label: '카테고리명',
  },
  {
    id: [MileageCategoryBoard.MAX_MILEAGE],
    numeric: true,
    disablePadding: false,
    label: '최대 마일리지',
  },
  {
    id: [MileageCategoryBoard.MANAGE],
    numeric: true,
    disablePadding: false,
    label: '관리',
  },
  {
    id: [MileageCategoryBoard.CHECK_BOX],
    numeric: true,
    disablePadding: false,
    label: '체크',
  },
];

/**
 * @number 1번 목록
 * @description 마일리지 카테고리 리스트
 */

const rows = [
  createData(1, '전공 마일리지', 7, '웹 서비스 캠프', <StarIcon />),
  createData(2, '비교과 - 연구활동', 6, '웹 서비스 캠프', <StarIcon />),
  createData(3, '비교과 - 전공활동', 6, '웹 서비스 캠프', <StarIcon />),
  createData(4, '비교과 - 특강참여', 7, '웹 서비스 캠프', <StarIcon />),
  createData(5, '비교과 - 학회활동', 6, '웹 서비스 캠프', <StarIcon />),
  createData(6, '비교과 - 행사참여', 8, '웹 서비스 캠프', <StarIcon />),
];

export default function MileageCategory() {
  return <EnhancedTable type="마일리지 카테고리" rows={rows} headCells={headCells} />;
}
