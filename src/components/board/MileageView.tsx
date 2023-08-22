import { StarIcon } from 'src/theme/overrides/CustomIcons';
import EnhancedTable from '../common/CustomTable';
import {
  NUM,
  CATEGORY,
  SEMESTER,
  ITEM,
  STUDENT_ID,
  STUDENT_NAME,
  POINT,
  REGISTERED_DATE,
} from 'src/assets/data/fields';

/**
 * @component [마일리지 조회] 게시판
 */

/**
 * @kind [마일리지 조회]
 * @breif enum
 */

export enum MileageViewBoard {
  'NUM' = NUM,
  'CATEGORY' = CATEGORY,
  'SEMESTER' = SEMESTER,
  'ITEM' = ITEM,
  'STUDENT_ID' = STUDENT_ID,
  'STUDENT_NAME' = STUDENT_NAME,
  'POINT' = POINT,
  'REGISTERED_DATE' = REGISTERED_DATE,
}

/**
 * @kind [마일리지 조회]
 * @breif 데이터 인터페이스
 */
interface Data {
  [MileageViewBoard.CATEGORY]: string;
  [MileageViewBoard.SEMESTER]: number;
  [MileageViewBoard.ITEM]: string;
  [MileageViewBoard.STUDENT_ID]: number;
  [MileageViewBoard.STUDENT_NAME]: boolean;
  [MileageViewBoard.POINT]: number;
  [MileageViewBoard.REGISTERED_DATE]: string;
}

export default function MileageItem() {
  /**
   * @kind [마일리지 조회]
   * @brief 데이터 생성 함수
   *
   *  */
  function createData(
    num: number,
    category: string,
    semester: number,
    item: string,
    studentId: number,
    studentName: string,
    point: number,
    registeredDate: string
  ): Data {
    return {
      [MileageViewBoard.NUM]: num,
      [MileageViewBoard.CATEGORY]: category,
      [MileageViewBoard.SEMESTER]: semester,
      [MileageViewBoard.ITEM]: item,
      [MileageViewBoard.STUDENT_ID]: studentId,
      [MileageViewBoard.STUDENT_NAME]: studentName,
      [MileageViewBoard.POINT]: point,
      [MileageViewBoard.REGISTERED_DATE]: registeredDate,
    };
  }

  /**
   * @kind [마일리지 조회]
   * @brief 테이블 헤더
   */
  const headCells = [
    {
      id: [MileageViewBoard.NUM],
      numeric: false,
      disablePadding: true,
      label: '번호',
    },
    {
      id: [MileageViewBoard.CATEGORY],
      numeric: true,
      disablePadding: false,
      label: '카테고리명',
    },
    {
      id: [MileageViewBoard.SEMESTER],
      numeric: true,
      disablePadding: false,
      label: '학기',
    },
    {
      id: [MileageViewBoard.ITEM],
      numeric: true,
      disablePadding: false,
      label: '항목명',
    },
    {
      id: [MileageViewBoard.STUDENT_ID],
      numeric: true,
      disablePadding: false,
      label: '학번',
    },
    {
      id: [MileageViewBoard.STUDENT_NAME],
      numeric: true,
      disablePadding: false,
      label: '이름',
    },
    {
      id: [MileageViewBoard.POINT],
      numeric: true,
      disablePadding: false,
      label: '포인트',
    },
    {
      id: [MileageViewBoard.REGISTERED_DATE],
      numeric: true,
      disablePadding: false,
      label: '등록일',
    },
  ];

  /**
   * @number 1번 목록
   * @description 마일리지 항목 리스트
   */

  const rows = [
    createData(1, '전공 마일리지', 7, '웹 서비스 캠프', 30, 'y', '2023-08-21', <StarIcon />),
    createData(2, '비교과 - 연구활동', 6, '웹 서비스 캠프', 30, 'y', '2023-08-21', <StarIcon />),
    createData(3, '비교과 - 전공활동', 6, '웹 서비스 캠프', 30, 'y', '2023-08-21', <StarIcon />),
    createData(4, '비교과 - 특강참여', 7, '웹 서비스 캠프', 30, 'y', '2023-08-21', <StarIcon />),
    createData(5, '비교과 - 학회활동', 6, '웹 서비스 캠프', 30, 'y', '2023-08-21', <StarIcon />),
    createData(6, '비교과 - 행사참여', 8, '웹 서비스 캠프', 30, 'y', '2023-08-21', <StarIcon />),
  ];

  return <EnhancedTable type="마일리지 항목" rows={rows} headCells={headCells} />;
}
