import EnhancedTable from 'src/components/common/CustomTable';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {
  NUM,
  STUDENT_NAME,
  STUDENT_ID,
  GRADE,
  CONTACT,
  DEPARTMENT,
  MAJOR,
  FREQUENCY,
  REGISTERED_DATE,
  APPROVE,
  REJECT,
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
      id: [RegisterManageBoard.STUDENT_NAME],
      numeric: true,
      disablePadding: false,
      label: '이름',
    },
    {
      id: [RegisterManageBoard.STUDENT_ID],
      numeric: true,
      disablePadding: false,
      label: '학번',
    },
    {
      id: [RegisterManageBoard.GRADE],
      numeric: true,
      disablePadding: false,
      label: '학년',
    },
    {
      id: [RegisterManageBoard.CONTACT],
      numeric: true,
      disablePadding: false,
      label: '연락처',
    },
    {
      id: [RegisterManageBoard.DEPARTMENT],
      numeric: true,
      disablePadding: false,
      label: '학부',
    },
    {
      id: [RegisterManageBoard.MAJOR],
      numeric: true,
      disablePadding: false,
      label: '전공',
    },
    {
      id: [RegisterManageBoard.FREQUENCY],
      numeric: true,
      disablePadding: false,
      label: '빈도수',
    },
    {
      id: [RegisterManageBoard.REGISTERED_DATE],
      numeric: true,
      disablePadding: false,
      label: '등록일',
    },
    {
      id: [RegisterManageBoard.APPROVE],
      numeric: true,
      disablePadding: false,
      label: '승인',
    },
    {
      id: [RegisterManageBoard.REJECT],
      numeric: true,
      disablePadding: false,
      label: '신청 취소',
    },
  ];

  /**
   * @kind [신청자 관리]
   * @description 마일리지 항목 리스트
   */

  const rows = [
    createData(
      1,
      '오인혁',
      '21800446',
      '4(8)',
      '010-6536-6217',
      '전산전자공학부',
      'AI 컴퓨터공학심화',
      '2022-08-21',
      '2022-08-20',
      <CheckBoxIcon />,
      <HighlightOffIcon />
    ),
    createData(
      2,
      '한시온',
      '21800447',
      '4(8)',
      '010-6536-6217',
      '전산전자공학부',
      'AI 컴퓨터공학심화',
      '2022-08-21',
      '2022-08-20',
      <CheckBoxIcon />,
      <HighlightOffIcon />
    ),
    createData(
      3,
      '김민수',
      '21800448',
      '4(8)',
      '010-6536-6217',
      '전산전자공학부',
      'AI 컴퓨터공학심화',
      '2022-08-21',
      '2022-08-20',
      <CheckBoxIcon />,
      <HighlightOffIcon />
    ),
    createData(
      4,
      '장유진',
      '21800449',
      '4(8)',
      '010-6536-6217',
      '전산전자공학부',
      'AI 컴퓨터공학심화',
      '2022-08-21',
      '2022-08-20',
      <CheckBoxIcon />,
      <HighlightOffIcon />
    ),
  ];

  return <EnhancedTable originalRows={rows} headCells={headCells} type="신청자 관리" />;
}
