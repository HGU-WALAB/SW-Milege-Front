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
 * @component [마일리지 등록] 게시판
 */

/**
 * @kind [마일리지 등록]
 * @breif enum
 */

export enum MileageApplyBoard {
  'NUM' = NUM,
  'SEMESTER' = SEMESTER,
  'ITEM' = ITEM,
  'DESCRIPTION' = DESCRIPTION,
  'REGISTER_NUM' = REGISTER_NUN,
  'FILE' = FILE,
  'MODIFYIED_DATE' = MODIFYIED_DATE,
  'ADD' = ADD,
}

/**
 * @kind [마일리지 등록]
 * @breif 데이터 인터페이스
 */
interface Data {
  [MileageApplyBoard.SEMESTER]: number;
  [MileageApplyBoard.ITEM]: string;
  [MileageApplyBoard.DESCRIPTION]: string;
  [MileageApplyBoard.REGISTER_NUM]: number;
  [MileageApplyBoard.FILE]: string;
  [MileageApplyBoard.MODIFYIED_DATE]: string;
  [MileageApplyBoard.ADD]: string;
}

export default function MileageApply() {
  /**
   * @kind [마일리지 조회]
   * @brief 데이터 생성 함수
   *
   *  */
  function createData(
    num: number,
    semester: number,
    item: string,
    description: string,
    registerNum: number,
    file: string,
    modifyiedDate: string,
    add: string
  ): Data {
    return {
      [MileageApplyBoard.NUM]: num,
      [MileageApplyBoard.SEMESTER]: semester,
      [MileageApplyBoard.ITEM]: item,
      [MileageApplyBoard.DESCRIPTION]: description,
      [MileageApplyBoard.REGISTER_NUM]: registerNum,
      [MileageApplyBoard.FILE]: file,
      [MileageApplyBoard.MODIFYIED_DATE]: modifyiedDate,
      [MileageApplyBoard.ADD]: add,
    };
  }

  /**
   * @kind [마일리지 조회]
   * @brief 테이블 헤더
   */
  const headCells = [
    {
      id: [MileageApplyBoard.NUM],
      numeric: false,
      disablePadding: true,
      label: '번호',
    },
    {
      id: [MileageApplyBoard.CATEGORY],
      numeric: true,
      disablePadding: false,
      label: '카테고리명',
    },
    {
      id: [MileageApplyBoard.SEMESTER],
      numeric: true,
      disablePadding: false,
      label: '학기',
    },
    {
      id: [MileageApplyBoard.ITEM],
      numeric: true,
      disablePadding: false,
      label: '항목명',
    },
    {
      id: [MileageApplyBoard.STUDENT_ID],
      numeric: true,
      disablePadding: false,
      label: '학번',
    },
    {
      id: [MileageApplyBoard.STUDENT_NAME],
      numeric: true,
      disablePadding: false,
      label: '이름',
    },
    {
      id: [MileageApplyBoard.POINT],
      numeric: true,
      disablePadding: false,
      label: '포인트',
    },
    {
      id: [MileageApplyBoard.REGISTERED_DATE],
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
    createData(1, '전공 마일리지', 7, '웹 서비스 캠프', '21800446', '오인혁', 230, '2022-08-21'),
    createData(2, '비교과 - 전공활동', 6, 'pps 캠프', '21800447', '한시온', 230, '2022-08-21'),
    createData(3, '비교과 - 특강참여', 7, 'c언어 캠프', '21800448', '김민수', 230, '2022-08-21'),
    createData(
      4,
      '비교과 - 학회활동',
      6,
      '대경권 프로그래밍 대회',
      '21800449',
      '장유진',
      230,
      '2022-08-21'
    ),
    createData(5, '비교과 - 행사참여', 8, '와랩 스터디', '21800450', '정석민', 230, '2022-08-21'),
    createData(
      6,
      '비교과 - 연구활동',
      6,
      '웹 서비스 캠프',
      '21800451',
      '장유진',
      230,
      '2022-08-21'
    ),
    createData(7, '전공 마일리지', 7, '웹 서비스 캠프', '21800452', '박민지', 230, '2022-08-21'),
    createData(
      8,
      '비교과 - 전공활동',
      6,
      '웹 서비스 캠프',
      '21800453',
      '정가원',
      230,
      '2022-08-21'
    ),
  ];

  return <EnhancedTable rows={rows} headCells={headCells} />;
}
