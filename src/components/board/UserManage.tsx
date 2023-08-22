import EnhancedTable from '../common/CustomTable';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
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
  MANAGE,
} from 'src/assets/data/fields';

/**
 * @component [사용자 관리] 게시판
 */

/**
 * @kind [사용자 관리]
 * @breif enum
 */

export enum UserManageBoard {
  'NUM' = NUM,
  'NAME' = NAME,
  'EMAIL' = EMAIL,
  'AUTHORITY' = AUTHORITY,
  'FREQUENCY' = FREQUENCY,
}

/**
 * @kind [사용자 관리]
 * @breif 데이터 인터페이스
 */
interface Data {
  [UserManageBoard.NAME]: string;
  [UserManageBoard.EMAIL]: string;
  [UserManageBoard.AUTHORITY]: string;
  [UserManageBoard.FREQUENCY]: string;
}

export default function UserManage() {
  /**
   * @kind [사용자 관리]
   * @brief 데이터 생성 함수
   *
   *  */
  function createData(
    num: number,
    name: string,
    email: string,
    authority: string,
    frequency: string
  ): Data {
    return {
      [UserManageBoard.NUM]: num,
      [UserManageBoard.NAME]: name,
      [UserManageBoard.EMAIL]: email,
      [UserManageBoard.AUTHORITY]: authority,
      [UserManageBoard.FREQUENCY]: frequency,
    };
  }

  /**
   * @kind [사용자 관리]
   * @brief 테이블 헤더
   */
  const headCells = [
    {
      id: [UserManageBoard.NUM],
      numeric: false,
      disablePadding: true,
      label: '번호',
    },
    {
      id: [UserManageBoard.NAME],
      numeric: true,
      disablePadding: false,
      label: '이름',
    },
    {
      id: [UserManageBoard.EMAIL],
      numeric: true,
      disablePadding: false,
      label: '이메일',
    },
    {
      id: [UserManageBoard.AUTHORITY],
      numeric: true,
      disablePadding: false,
      label: '권한',
    },
    {
      id: [UserManageBoard.FREQUENCY],
      numeric: true,
      disablePadding: false,
      label: '빈도수',
    },
  ];

  /**
   * @kind [사용자 관리]
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
      <ManageAccountsIcon />
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
      <ManageAccountsIcon />
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
      <ManageAccountsIcon />
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
      <ManageAccountsIcon />
    ),
  ];

  return <EnhancedTable rows={rows} headCells={headCells} />;
}
