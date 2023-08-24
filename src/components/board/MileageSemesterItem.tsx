import { StarIcon } from 'src/theme/overrides/CustomIcons';
import EnhancedTable from '../common/CustomTable';
import {
  MILEAGE,
  ISVISIBLE,
  REGISTERED_DATE,
  MANAGE,
  CHECK_BOX,
  NUM,
  CATEGORY,
  SEMESTER,
  ITEM,
  DESCRIPTION,
  DESCRIPTION1,
  DESCRIPTION2,
  FILE_DESCRIPTION,
  ISVISIBLE_STUDENT,
  ISINPUT_STUDENT,
  ISDUPLICATE_RECORD,
  ISEVALUATE_CSEE,
  ISEVALUATE_PORTFOLIO,
  ISEVALUATE_FUSION,
  MAX_MAILEAGE,
} from 'src/assets/data/fields';
import SWModal from '../common/modal/SWModal';
import { EDITITEM } from 'src/assets/data/modal/modals';

/**
 * @component [마일리지 학기별 항목] 게시판
 */

/**
 * @kind [마일리지 학기별 항목]
 * @breif enum
 */

export enum MileageSemesterItemBoard {
  'NUM' = NUM,
  'CATEGORY' = CATEGORY,
  'SEMESTER' = SEMESTER,
  'ITEM' = ITEM,
  'MILEAGE' = MILEAGE,
  'ISVISIBLE' = ISVISIBLE,
  'REGISTERED_DATE' = REGISTERED_DATE,
  'MANAGE' = MANAGE,
}

/**
 * @kind [마일리지 학기별 항목]
 * @breif 데이터 인터페이스
 */
interface Data {
  [MileageSemesterItemBoard.CATEGORY]: string;
  [MileageSemesterItemBoard.SEMESTER]: string;
  [MileageSemesterItemBoard.ITEM]: string;
  [MileageSemesterItemBoard.MILEAGE]: number;
  [MileageSemesterItemBoard.ISVISIBLE]: boolean;
  [MileageSemesterItemBoard.REGISTERED_DATE]: string;
  [MileageSemesterItemBoard.MANAGE]: string;
}

export default function MileageSemesterItem() {
  /**
   * @kind [마일리지 학기별 항목]
   * @brief 데이터 생성 함수
   *
   *  */
  function createData(
    num: number,
    category: string,
    semester: string,
    item: string,
    mileage: number,
    isVisible: boolean,
    registeredDate: string,
    manage: string
  ): Data {
    return {
      [MileageSemesterItemBoard.NUM]: num,
      [MileageSemesterItemBoard.CATEGORY]: category,
      [MileageSemesterItemBoard.SEMESTER]: semester,
      [MileageSemesterItemBoard.ITEM]: item,
      [MileageSemesterItemBoard.MILEAGE]: mileage,
      [MileageSemesterItemBoard.ISVISIBLE]: isVisible,
      [MileageSemesterItemBoard.REGISTERED_DATE]: registeredDate,
      [MileageSemesterItemBoard.MANAGE]: manage,
    };
  }

  /**
   * @kind [마일리지 학기별 항목]
   * @brief 테이블 헤더
   */
  const headCells = [
    {
      id: [MileageSemesterItemBoard.NUM],
      numeric: false,
      disablePadding: true,
      label: '번호',
    },
    {
      id: [MileageSemesterItemBoard.CATEGORY],
      numeric: true,
      disablePadding: false,
      label: '카테고리명',
    },
    {
      id: [MileageSemesterItemBoard.SEMESTER],
      numeric: true,
      disablePadding: false,
      label: '학기',
    },
    {
      id: [MileageSemesterItemBoard.ITEM],
      numeric: true,
      disablePadding: false,
      label: '항목명',
    },
    {
      id: [MileageSemesterItemBoard.MILEAGE],
      numeric: true,
      disablePadding: false,
      label: '마일리지',
    },
    {
      id: [MileageSemesterItemBoard.ISVISIBLE],
      numeric: true,
      disablePadding: false,
      label: '보이기',
    },
    {
      id: [MileageSemesterItemBoard.REGISTERED_DATE],
      numeric: true,
      disablePadding: false,
      label: '등록일',
    },
    {
      id: [MileageSemesterItemBoard.MANAGE],
      numeric: true,
      disablePadding: false,
      label: '관리',
    },
  ];

  const IParams = {
    [CATEGORY]: '카테고리테스트',
    [SEMESTER]: '2022-01',
    [ITEM]: '웹 서비스 캠프',
    [MILEAGE]: 30,
    [MAX_MAILEAGE]: 50,
    [DESCRIPTION1]: '설명 1',
    [DESCRIPTION2]: '설명 2',
    [FILE_DESCRIPTION]: '첨부파일 설명',
    [ISVISIBLE]: true,
    [ISVISIBLE_STUDENT]: false,
    [ISINPUT_STUDENT]: false,
    [ISDUPLICATE_RECORD]: false,
    [ISEVALUATE_CSEE]: false,
    [ISEVALUATE_PORTFOLIO]: false,
    [ISEVALUATE_FUSION]: false,
  };

  /**
   * @kind [마일리지 학기별 항목]

   * @description 마일리지 학기별 항목 리스트
   */

  const rows = [
    createData(
      1,
      '전공 마일리지',
      '2022-01',
      '웹 서비스 캠프',
      30,
      'y',
      '2023-08-21',

      <SWModal type={EDITITEM} beforeData={IParams} />
    ),
    createData(
      2,
      '비교과 - 연구활동',
      '2022-01',
      '웹 서비스 캠프',
      30,
      'y',
      '2023-08-21',

      <SWModal type={EDITITEM} beforeData={IParams} />
    ),
    createData(
      3,
      '비교과 - 전공활동',
      '2022-01',
      '웹 서비스 캠프',
      30,
      'y',
      '2023-08-21',

      <SWModal type={EDITITEM} beforeData={IParams} />
    ),
    createData(
      4,
      '비교과 - 특강참여',
      '2022-01',
      '웹 서비스 캠프',
      30,
      'y',
      '2023-08-21',

      <SWModal type={EDITITEM} beforeData={IParams} />
    ),
    createData(
      5,
      '비교과 - 학회활동',
      '2022-02',
      '웹 서비스 캠프',
      30,
      'y',
      '2023-08-21',
      <SWModal type={EDITITEM} beforeData={IParams} />
    ),
    createData(
      6,
      '비교과 - 행사참여',
      '2022-02',
      '웹 서비스 캠프',
      30,
      'y',
      '2023-08-21',
      <SWModal type={EDITITEM} beforeData={IParams} />
    ),
  ];

  return <EnhancedTable rows={rows} headCells={headCells} type="마일리지 학기별 항목" />;
}
