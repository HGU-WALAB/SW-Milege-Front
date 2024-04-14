import { StarIcon } from 'src/theme/overrides/CustomIcons';
import EnhancedTable from '../common/CustomTable';
import AddIcon from '@mui/icons-material/Add';
import {
  NUM,
  SEMESTER,
  ITEM,
  DESCRIPTION,
  REGISTER_NUM,
  FILE,
  MODIFYIED_DATE,
  ADD,
} from 'src/assets/data/fields';
import AttachFileIcon from '@mui/icons-material/AttachFile';

/**
 * @component [마일리지 적립] 게시판
 */

/**
 * @kind [마일리지 적립]
 * @breif enum
 */

export enum MileageRegisterBoard {
  'NUM' = NUM,
  'SEMESTER' = SEMESTER,
  'ITEM' = ITEM,
  'DESCRIPTION' = DESCRIPTION,
  'REGISTER_NUM' = REGISTER_NUM,
  'FILE' = FILE,
  'MODIFYIED_DATE' = MODIFYIED_DATE,
  'ADD' = ADD,
}

/**
 * @kind [마일리지 적립]
 * @breif 데이터 인터페이스
 */
interface Data {
  [MileageRegisterBoard.SEMESTER]: string;
  [MileageRegisterBoard.ITEM]: string;
  [MileageRegisterBoard.DESCRIPTION]: string;
  [MileageRegisterBoard.REGISTER_NUM]: number;
  [MileageRegisterBoard.FILE]: string;
  [MileageRegisterBoard.MODIFYIED_DATE]: string;
  [MileageRegisterBoard.ADD]: string;
}

export default function MileageRegister() {
  /**
   * @kind [마일리지 적립]
   * @brief 데이터 생성 함수
   *
   *  */
  function createData(
    num: number,
    semester: string,
    item: string,
    description: string,
    registerNum: number,
    file: string,
    modifyiedDate: string,
    add: string
  ): Data {
    return {
      [MileageRegisterBoard.NUM]: num,
      [MileageRegisterBoard.SEMESTER]: semester,
      [MileageRegisterBoard.ITEM]: item,
      [MileageRegisterBoard.DESCRIPTION]: description,
      [MileageRegisterBoard.REGISTER_NUM]: registerNum,
      [MileageRegisterBoard.FILE]: file,
      [MileageRegisterBoard.MODIFYIED_DATE]: modifyiedDate,
      [MileageRegisterBoard.ADD]: add,
    };
  }

  /**
   * @kind [마일리지 적립]
   * @brief 테이블 헤더
   */
  const headCells = [
    {
      id: [MileageRegisterBoard.NUM],
      numeric: false,
      disablePadding: true,
      label: '번호',
    },
    {
      id: [MileageRegisterBoard.SEMESTER],
      numeric: true,
      disablePadding: false,
      label: '학기',
    },
    {
      id: [MileageRegisterBoard.ITEM],
      numeric: true,
      disablePadding: false,
      label: '항목명',
    },
    {
      id: [MileageRegisterBoard.DESCRIPTION],
      numeric: true,
      disablePadding: false,
      label: '내용',
    },
    {
      id: [MileageRegisterBoard.REGISTER_NUM],
      numeric: true,
      disablePadding: false,
      label: '등록수',
    },
    {
      id: [MileageRegisterBoard.FILE],
      numeric: true,
      disablePadding: false,
      label: '파일',
    },
    {
      id: [MileageRegisterBoard.MODIFYIED_DATE],
      numeric: true,
      disablePadding: false,
      label: '수정일',
    },
    {
      id: [MileageRegisterBoard.ADD],
      numeric: true,
      disablePadding: false,
      label: '추가',
    },
  ];

  /**
   * @kind [마일리지 적립]
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

  return <EnhancedTable originalRows={rows} headCells={headCells} type="마일리지 적립" />;
}
