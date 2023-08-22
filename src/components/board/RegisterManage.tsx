import { StarIcon } from 'src/theme/overrides/CustomIcons';
import EnhancedTable from '../common/CustomTable';
import { FREQUENCY } from '../../assets/data/fields';

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
 * @component [신청자 관리] 게시판
 */

/**
 * @kind [신청자 관리]
 * @breif enum
 */

export enum RegisterManageBoard {
  'NUM' = NUM,
  'CATEGORY' = CATEGORY,
  'STUDENT_NAME' = STUDENT_NAME,
  'STUDENT_ID' = STUDENT_ID,
  'GRADE' = GRADE,
  'CONTACT' = CONTACT,
  'DEPARTMENT' = DEPARTMENT,
  'MAJOR' = MAJOR,
  'FREQUENCY' = FREQUENCY,
  'REGISTERED_DATE' = REGISTERED_DATE,
  'APPROVE' = APPROVE,
  'REJECT' = REJECT,
}

/**
 * @kind [신청자 관리]
 * @breif 데이터 인터페이스
 */
interface Data {
  [RegisterManageBoard.CATEGORY]: string;
  [RegisterManageBoard.STUDENT_NAME]: string;
  [RegisterManageBoard.STUDENT_ID]: number;
  [RegisterManageBoard.GRADE]: number;
  [RegisterManageBoard.CONTACT]: number;
  [RegisterManageBoard.DEPARTMENT]: string;
  [RegisterManageBoard.MAJOR]: string;
  [RegisterManageBoard.FREQUENCY]: string;
  [RegisterManageBoard.REGISTERED_DATE]: string;
  [RegisterManageBoard.APPROVE]: string;
  [RegisterManageBoard.REJECT]: string;
}

export default function RegisterManage() {
  /**
   * @kind [신청자 관리]
   * @brief 데이터 생성 함수
   *
   *  */
  function createData(
    num: number,
    category: string,
    studentName: string,
    studentId: number,
    grade: number,
    contact: number,
    department: string,
    major: string,
    frequency: string,
    registeredDate: string,
    approve: string,
    reject: string
  ): Data {
    return {
      [RegisterManageBoard.NUM]: num,
      [RegisterManageBoard.CATEGORY]: category,
      [RegisterManageBoard.STUDENT_NAME]: studentName,
      [RegisterManageBoard.STUDENT_ID]: studentId,
      [RegisterManageBoard.GRADE]: grade,
      [RegisterManageBoard.CONTACT]: contact,
      [RegisterManageBoard.DEPARTMENT]: department,
      [RegisterManageBoard.MAJOR]: major,
      [RegisterManageBoard.FREQUENCY]: frequency,
      [RegisterManageBoard.REGISTERED_DATE]: registeredDate,
      [RegisterManageBoard.APPROVE]: approve,
      [RegisterManageBoard.REJECT]: reject,
    };
  }

  /**
   * @kind [신청자 관리]
   * @brief 테이블 헤더
   */
  const headCells = [
    {
      id: [RegisterManageBoard.NUM],
      numeric: false,
      disablePadding: true,
      label: '번호',
    },
    {
      id: [RegisterManageBoard.CATEGORY],
      numeric: true,
      disablePadding: false,
      label: '카테고리명',
    },
    {
      id: [RegisterManageBoard.SEMESTER],
      numeric: true,
      disablePadding: false,
      label: '학기',
    },
    {
      id: [RegisterManageBoard.ITEM],
      numeric: true,
      disablePadding: false,
      label: '항목명',
    },
    {
      id: [RegisterManageBoard.STUDENT_ID],
      numeric: true,
      disablePadding: false,
      label: '학번',
    },
    {
      id: [RegisterManageBoard.STUDENT_NAME],
      numeric: true,
      disablePadding: false,
      label: '이름',
    },
    {
      id: [RegisterManageBoard.POINT],
      numeric: true,
      disablePadding: false,
      label: '포인트',
    },
    {
      id: [RegisterManageBoard.REGISTERED_DATE],
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
    createData(
      1,
      '전공 마일리지',
      '2022-01',
      '웹 서비스 캠프',
      '21800446',
      '오인혁',
      230,
      '2022-08-21'
    ),
    createData(
      2,
      '비교과 - 전공활동',
      '2022-01',
      'pps 캠프',
      '21800447',
      '한시온',
      230,
      '2022-08-21'
    ),
    createData(
      3,
      '비교과 - 특강참여',
      '2022-01',
      'c언어 캠프',
      '21800448',
      '김민수',
      230,
      '2022-08-21'
    ),
    createData(
      4,
      '비교과 - 학회활동',
      '2022-01',
      '대경권 프로그래밍 대회',
      '21800449',
      '장유진',
      230,
      '2022-08-21'
    ),
    createData(
      5,
      '비교과 - 행사참여',
      '2022-01',
      '와랩 스터디',
      '21800450',
      '정석민',
      230,
      '2022-08-21'
    ),
    createData(
      6,
      '비교과 - 연구활동',
      '2022-02',
      '웹 서비스 캠프',
      '21800451',
      '장유진',
      230,
      '2022-08-21'
    ),
    createData(
      7,
      '전공 마일리지',
      '2022-02',
      '웹 서비스 캠프',
      '21800452',
      '박민지',
      230,
      '2022-08-21'
    ),
    createData(
      8,
      '비교과 - 전공활동',
      '2022-02',
      '웹 서비스 캠프',
      '21800453',
      '정가원',
      230,
      '2022-08-21'
    ),
  ];

  return <EnhancedTable rows={rows} headCells={headCells} />;
}
