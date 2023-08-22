import { StarIcon } from 'src/theme/overrides/CustomIcons';
import EnhancedTable from '../common/CustomTable';
import AddIcon from '@mui/icons-material/Add';
import {
  NUM,
  SEMESTER,
  ITEM,
  STUDENT_NAME,
  STUDENT_ID,
  CONTACT,
  SCHOLARSHIP,
  REGISTER_NUM,
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
  'CONTACT' = CONTACT,
  'SCHOLARSHIP' = SCHOLARSHIP,
  'REGISTER_NUM' = REGISTER_NUM,
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
  [MileageResultBoard.SCHOLARSHIP]: string;
  [MileageResultBoard.REGISTER_NUM]: number;
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
    scholarship: string,
    registerNum: number,
    message: string,
    manage: string
  ): Data {
    return {
      [MileageResultBoard.NUM]: num,
      [MileageResultBoard.SEMESTER]: semester,
      [MileageResultBoard.ITEM]: item,
      [MileageResultBoard.STUDENT_NAME]: studentName,
      [MileageResultBoard.STUDENT_ID]: studentId,
      [MileageResultBoard.CONTACT]: contact,
      [MileageResultBoard.SCHOLARSHIP]: scholarship,
      [MileageResultBoard.REGISTER_NUM]: registerNum,
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
      id: [MileageResultBoard.DESCRIPTION],
      numeric: true,
      disablePadding: false,
      label: '내용',
    },
    {
      id: [MileageResultBoard.REGISTER_NUM],
      numeric: true,
      disablePadding: false,
      label: '등록수',
    },
    {
      id: [MileageResultBoard.FILE],
      numeric: true,
      disablePadding: false,
      label: '파일',
    },
    {
      id: [MileageResultBoard.MODIFYIED_DATE],
      numeric: true,
      disablePadding: false,
      label: '수정일',
    },
    {
      id: [MileageResultBoard.ADD],
      numeric: true,
      disablePadding: false,
      label: '추가',
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
      '웹 서비스 구축에 필요한 스터디를 진행하고 직접 자신만의 웹페이지를 만들어보는 과정',
      23,
      <AttachFileIcon />,
      '2021-01-21',
      <AddIcon />
    ),
    createData(
      2,
      '2022-01',
      'C언어 캠프',
      'C언어의 기초에 대해 공부하고 C언어를 이용하여 간단한 프로그램을 만들어보는 과정',
      23,
      <AttachFileIcon />,
      '2022-01-23',
      <AddIcon />
    ),
    createData(
      3,
      '2022-01',
      '파이썬 캠프',
      '파이썬 기초를 공부하고 파이썬을 이용하여 간단한 프로그램을 만들어보는 과정',
      15,
      <AttachFileIcon />,
      '2022-01-31',
      <AddIcon />
    ),
    createData(
      4,
      '2022-01',
      'C++ 캠프',
      'C++ 기초를 공부하고 C++을 이용하여 간단한 프로그램을 만들어보는 과정',
      15,
      <AttachFileIcon />,
      '2022-01-31',
      <AddIcon />
    ),
    createData(
      5,
      '2022-01',
      '자바 캠프',
      '자바 기초를 공부하고 자바를 이용하여 간단한 프로그램을 만들어보는 과정',
      15,
      <AttachFileIcon />,
      '2022-01-31',
      <AddIcon />
    ),
    createData(
      6,
      '2022-02',
      '웹 서비스 캠프',
      '웹 서비스 구축에 필요한 스터디를 진행하고 직접 자신만의 웹페이지를 만들어보는 과정',
      23,
      <AttachFileIcon />,
      '2021-01-21',
      <AddIcon />
    ),
    createData(
      7,
      '2022-02',
      '데이터 구조',
      '데이터 구조에 대해 공부하고 간단한 프로그램을 만들어보는 과정',
      23,
      <AttachFileIcon />,
      '2021-01-21',
      <AddIcon />
    ),
    createData(
      8,
      '2022-02',
      '데이터베이스',
      '데이터베이스에 대해 공부하고 간단한 프로그램을 만들어보는 과정',
      23,
      <AttachFileIcon />,
      '2021-01-21',
      <AddIcon />
    ),
  ];

  return <EnhancedTable rows={rows} headCells={headCells} />;
}
