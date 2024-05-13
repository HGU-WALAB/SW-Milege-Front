import { StarIcon } from 'src/theme/overrides/CustomIcons';
import EnhancedTable from '../common/CustomTable';
import AddIcon from '@mui/icons-material/Add';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {
  NUM,
  SEMESTER,
  ITEM,
  STUDENT_NAME,
  STUDENT_ID,
  CONTACT,
  DEPARTMENT,
  SCHOLARSHIP,
  MESSAGE,
  MANAGE,
} from 'src/assets/data/fields';
import AttachFileIcon from '@mui/icons-material/AttachFile';

/**
 * @component [마일리지 선정결과] 게시판
 */

/**
 * @kind [마일리지 선정결과]
 * @breif enum
 */

export enum MileageResultBoard {
  'NUM' = NUM,
  'SEMESTER' = SEMESTER,
  'ITEM' = ITEM,
  'STUDENT_NAME' = STUDENT_NAME,
  'STUDENT_ID' = STUDENT_ID,
  'DEPARTMENT' = DEPARTMENT,
  'CONTACT' = CONTACT,
  'SCHOLARSHIP' = SCHOLARSHIP,
  'MESSAGE' = MESSAGE,
  'MANAGE' = MANAGE,
}

/**
 * @kind [마일리지 선정결과]
 * @breif 데이터 인터페이스
 */
interface Data {
  [MileageResultBoard.SEMESTER]: string;
  [MileageResultBoard.ITEM]: string;
  [MileageResultBoard.STUDENT_NAME]: string;
  [MileageResultBoard.STUDENT_ID]: number;
  [MileageResultBoard.CONTACT]: number;
  [MileageResultBoard.DEPARTMENT]: string;
  [MileageResultBoard.SCHOLARSHIP]: string;
  [MileageResultBoard.MESSAGE]: string;
  [MileageResultBoard.MANAGE]: string;
}

export default function MileageResult() {
  /**
   * @kind [마일리지 선정결과]
   * @brief 데이터 생성 함수
   *
   *  */
  function createData(
    num: number,
    semester: string,
    item: string,
    studentName: string,
    studentId: number,

    contact: number,
    department: string,
    scholarship: string,
    message: string,
    manage: string
  ): Data {
    return {
      [MileageResultBoard.NUM]: num,
      [MileageResultBoard.SEMESTER]: semester,
      [MileageResultBoard.ITEM]: item,
      [MileageResultBoard.STUDENT_NAME]: studentName,
      [MileageResultBoard.STUDENT_ID]: studentId,
      [MileageResultBoard.DEPARTMENT]: department,
      [MileageResultBoard.CONTACT]: contact,

      [MileageResultBoard.SCHOLARSHIP]: scholarship,
      [MileageResultBoard.MESSAGE]: message,
      [MileageResultBoard.MANAGE]: manage,
    };
  }

  /**
   * @kind [마일리지 선정결과]
   * @brief 테이블 헤더
   */
  const headCells = [
    {
      id: [MileageResultBoard.NUM],
      numeric: false,
      disablePadding: true,
      label: '번호',
    },
    {
      id: [MileageResultBoard.SEMESTER],
      numeric: true,
      disablePadding: false,
      label: '학기',
    },
    {
      id: [MileageResultBoard.ITEM],
      numeric: true,
      disablePadding: false,
      label: '항목명',
    },
    {
      id: [MileageResultBoard.STUDENT_ID],
      numeric: true,
      disablePadding: false,
      label: '학번',
    },
    {
      id: [MileageResultBoard.STUDENT_NAME],
      numeric: true,
      disablePadding: false,
      label: '학생명',
    },
    {
      id: [MileageResultBoard.DEPARTMENT],
      numeric: true,
      disablePadding: false,
      label: '학부',
    },
    {
      id: [MileageResultBoard.CONTACT],
      numeric: true,
      disablePadding: false,
      label: '연락처',
    },

    {
      id: [MileageResultBoard.SCHOLARSHIP],
      numeric: true,
      disablePadding: false,
      label: '장학금',
    },
    {
      id: [MileageResultBoard.MESSAGE],
      numeric: true,
      disablePadding: false,
      label: '메세지',
    },
    {
      id: [MileageResultBoard.MANAGE],
      numeric: true,
      disablePadding: false,
      label: '관리',
    },
  ];

  /**
   * @kind [마일리지 선정결과]
   * @description 마일리지 항목 리스트
   */

  const rows = [
    createData(
      1,
      '2022-01',
      '웹 서비스 캠프',
      '오인혁',
      '21800446',
      '전산전자공학부',
      '010-1234-5678',
      '전액 장학금',
      '축하드립니다.',
      <ManageAccountsIcon />
    ),
    createData(
      2,
      '2022-01',
      '웹 서비스 캠프',
      '오인혁2',
      '21800447',
      '전산전자공학부',
      '010-1234-5678',
      '전액 장학금',
      '축하드립니다.',
      <ManageAccountsIcon />
    ),
  ];

  return <EnhancedTable originalRows={rows} headCells={headCells} type="마일리지 선정결과" />;
}
