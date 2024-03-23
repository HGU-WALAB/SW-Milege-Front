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
 * @component [마일리지 항목] 게시판
 */

/**
 * @kind [마일리지 항목]
 * @breif enum
 */

export enum MileageItemBoard {
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
 * @kind [마일리지 항목]
 * @breif 데이터 인터페이스
 */
interface Data {
  [MileageItemBoard.CATEGORY]: string;
  [MileageItemBoard.SEMESTER]: string;
  [MileageItemBoard.ITEM]: string;
  [MileageItemBoard.MILEAGE]: number;
  [MileageItemBoard.ISVISIBLE]: boolean;
  [MileageItemBoard.REGISTERED_DATE]: string;
  [MileageItemBoard.MANAGE]: string;
}

export default function MileageItem() {
  /**
   * @kind [마일리지 항목]
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
      [MileageItemBoard.NUM]: num,
      [MileageItemBoard.CATEGORY]: category,
      [MileageItemBoard.SEMESTER]: semester,
      [MileageItemBoard.ITEM]: item,
      [MileageItemBoard.MILEAGE]: mileage,
      [MileageItemBoard.ISVISIBLE]: isVisible,
      [MileageItemBoard.REGISTERED_DATE]: registeredDate,
      [MileageItemBoard.MANAGE]: manage,
    };
  }

  /**
   * @kind [마일리지 항목]
   * @brief 테이블 헤더
   */
  const headCells = [
    {
      id: [MileageItemBoard.NUM],
      numeric: false,
      disablePadding: true,
      label: '번호',
    },
    {
      id: [MileageItemBoard.CATEGORY],
      numeric: true,
      disablePadding: false,
      label: '카테고리명',
    },
    {
      id: [MileageItemBoard.SEMESTER],
      numeric: true,
      disablePadding: false,
      label: '학기',
    },
    {
      id: [MileageItemBoard.ITEM],
      numeric: true,
      disablePadding: false,
      label: '항목명',
    },
    {
      id: [MileageItemBoard.MILEAGE],
      numeric: true,
      disablePadding: false,
      label: '마일리지',
    },
    {
      id: [MileageItemBoard.ISVISIBLE],
      numeric: true,
      disablePadding: false,
      label: '보이기',
    },
    {
      id: [MileageItemBoard.REGISTERED_DATE],
      numeric: true,
      disablePadding: false,
      label: '등록일',
    },
    {
      id: [MileageItemBoard.MANAGE],
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
   * @kind [마일리지 항목]

   * @description 마일리지 항목 리스트
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
      <StarIcon />
    ),
    createData(
      6,
      '비교과 - 행사참여',
      '2022-02',
      '웹 서비스 캠프',
      30,
      'y',
      '2023-08-21',
      <StarIcon />
    ),
  ];


  return <EnhancedTable rows={rows} headCells={headCells} type="마일리지 항목" />;

}
