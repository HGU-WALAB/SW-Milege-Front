import { StarIcon } from 'src/theme/overrides/CustomIcons';
import EnhancedTable from 'src/components/common/CustomTable';
import {
  MILEAGE,
  REGISTERED_DATE,
  MANAGE,
  CHECK_BOX,
  NUM,
  SEMESTER,
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
  NAME,
  MOD_DATE,
  CATEGORYID,
} from 'src/assets/data/fields';
import SWModal from 'src/components/common/modal/SWModal';
import { EDITGLOBALITEM, EDITITEM } from 'src/assets/data/modal/modals';
import { dispatch } from 'src/redux/store';
import { setMileageGlobalList } from 'src/redux/slices/data';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

/**
 * @component [마일리지 항목] 게시판
 */

/**
 * @kind [마일리지 항목]
 * @breif enum
 */

export enum MileageGlobalItemBoard {
  'NUM' = NUM,
  'CATEGORY' = CATEGORY,
  'ITEM' = ITEM,
  'DESCRIPTION1' = DESCRIPTION1,
  'DESCRIPTION2' = DESCRIPTION2,
  'SEMESTER_ITEM_COUNT' = SEMESTER_ITEM_COUNT,
  'ISVISIBLE' = ISVISIBLE,
  'MOD_DATE' = MOD_DATE,
  'MANAGE' = MANAGE,
}

/**
 * @kind [마일리지 항목]
 * @breif 데이터 인터페이스
 */
interface Data {
  [MileageGlobalItemBoard.CATEGORY]: string;
  [MileageGlobalItemBoard.ITEM]: string;
  [MileageGlobalItemBoard.DESCRIPTION1]: string;
  [MileageGlobalItemBoard.DESCRIPTION2]: string;
  [MileageGlobalItemBoard.SEMESTER_ITEM_COUNT]: number;
  [MileageGlobalItemBoard.ISVISIBLE]: boolean;
  [MileageGlobalItemBoard.MOD_DATE]: string;
  [MileageGlobalItemBoard.MANAGE]: string;
}

/**
 * @kind [마일리지 항목]
 * @brief 데이터 생성 함수
 *
 *  */
function createData(
  NUM: number,
  CATEGORY: string,
  ITEM: string,
  DESCRIPTION1: string,
  DESCRIPTION2: string,
  SEMESTER_ITEM_COUNT: number,
  ISVISIBLE: boolean,
  MOD_DATE: string,
  MANAGE: string
): Data {
  return {
    [MileageGlobalItemBoard.NUM]: NUM,
    [MileageGlobalItemBoard.CATEGORY]: CATEGORY,

    [MileageGlobalItemBoard.ITEM]: ITEM,

    [MileageGlobalItemBoard.DESCRIPTION1]: DESCRIPTION1,
    [MileageGlobalItemBoard.DESCRIPTION2]: DESCRIPTION2,
    [MileageGlobalItemBoard.SEMESTER_ITEM_COUNT]: SEMESTER_ITEM_COUNT,
    [MileageGlobalItemBoard.ISVISIBLE]: ISVISIBLE,
    [MileageGlobalItemBoard.MOD_DATE]: MOD_DATE,
    [MileageGlobalItemBoard.MANAGE]: MANAGE,
  };
}

/**
 * @kind [마일리지 항목]
 * @brief 테이블 헤더
 */
const headCells = [
  {
    id: [MileageGlobalItemBoard.NUM],
    numeric: false,
    disablePadding: true,
    label: '번호',
  },
  {
    id: [MileageGlobalItemBoard.CATEGORY],
    numeric: true,
    disablePadding: false,
    label: '카테고리명',
  },
  {
    id: [MileageGlobalItemBoard.ITEM],
    numeric: true,
    disablePadding: false,
    label: '항목명',
  },
  {
    id: [MileageGlobalItemBoard.DESCRIPTION1],
    numeric: true,
    disablePadding: false,
    label: '설명1',
  },
  {
    id: [MileageGlobalItemBoard.DESCRIPTION2],
    numeric: true,
    disablePadding: false,
    label: '설명2',
  },
  {
    id: [MileageGlobalItemBoard.SEMESTER_ITEM_COUNT],
    numeric: true,
    disablePadding: false,
    label: '학기별 항목 수',
  },
  {
    id: [MileageGlobalItemBoard.ISVISIBLE],
    numeric: true,
    disablePadding: false,
    label: '보이기',
  },
  {
    id: [MileageGlobalItemBoard.MOD_DATE],
    numeric: true,
    disablePadding: false,
    label: '최근 수정일',
  },
  {
    id: [MileageGlobalItemBoard.MANAGE],
    numeric: true,
    disablePadding: false,
    label: '관리',
  },
];

const IParams = {
  [CATEGORY]: '카테고리테스트',
  [ITEM]: '웹 서비스 캠프',

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

   * @kind [마일리지 항목]

   * @description 마일리지 항목 리스트
   */

const rows = [
  createData(
    1,
    '전공 마일리지',

    '웹 서비스 캠프',

    true,
    '2023-08-21',

    <SWModal type={EDITGLOBALITEM} beforeData={IParams} />
  ),
  createData(
    2,
    '비교과 - 연구활동',

    '웹 서비스 캠프',

    true,
    '2023-08-21',

    <SWModal type={EDITGLOBALITEM} beforeData={IParams} />
  ),
  createData(
    3,
    '비교과 - 전공활동',

    '웹 서비스 캠프',

    false,
    '2023-08-21',

    <SWModal type={EDITGLOBALITEM} beforeData={IParams} />
  ),
  createData(
    4,
    '비교과 - 특강참여',

    '웹 서비스 캠프',

    false,
    '2023-08-21',

    <SWModal type={EDITGLOBALITEM} beforeData={IParams} />
  ),
  createData(
    5,
    '비교과 - 학회활동',

    '웹 서비스 캠프',

    true,
    '2023-08-21',
    <SWModal type={EDITGLOBALITEM} beforeData={IParams} />
  ),
  createData(
    6,
    '비교과 - 행사참여',

    '웹 서비스 캠프',

    true,
    '2023-08-21',
    <SWModal type={EDITGLOBALITEM} beforeData={IParams} />
  ),
];

import axiosInstance from 'src/utils/axios';
import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import MileageCategory from 'src/components/board/MileageCategory';
import { setItemList, setSemesterList } from 'src/redux/slices/filter';
import { ID, CATEGORY, ITEM, ISVISIBLE, SEMESTER_ITEM_COUNT } from '../../../../assets/data/fields';
import { setServerSideCookie } from 'src/auth/jwtCookie';
import { formatDateToKorean } from 'src/utils/date/dateConverter';

interface ICategory {
  id: number;
  name: string;
  maxPoints: number;
}

interface IGlobalItem {
  id: number;
  category: ICategory;
  itemName: string;
  isPortfolio: boolean;
  description1: string;
  description2: string;
  stuType: 'C' | 'F' | 'CF';
}

interface IGlobalItemList {
  items: IGlobalItem[];
}

export const getServerSideProps: GetServerSideProps<{
  fetchData: IGlobalItemList;
}> = async (context) => {
  setServerSideCookie(context);
  const res = await axiosInstance.get('/api/mileage/items');
  const fetchData = res.data;
  console.log(fetchData);
  return { props: { fetchData } };
};

export default function MileageCategory({
  fetchData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const dispatch = useDispatch();
  console.log('Check', fetchData);
  const convertedFetchList = fetchData.list?.map((item, index) => {
    const {
      id,
      category,
      name: itemName,
      description1,
      description2,
      isVisible,
      isStudentVisible,
      isMulti,
      stuType,
      isPortfolio,
    } = item;

    const beforeData = {
      [ID]: id,
      [CATEGORYID]: category.id,
      [ITEM]: itemName,
      [DESCRIPTION1]: description1,
      [DESCRIPTION2]: description2,
      [ISVISIBLE]: isVisible,
      [ISVISIBLE_STUDENT]: isStudentVisible,
      [ISINPUT_STUDENT]: false,
      [ISDUPLICATE_RECORD]: isMulti,
      [ISEVALUATE_CSEE]: stuType === 'F' ? false : true,
      [ISEVALUATE_PORTFOLIO]: isPortfolio,
      [ISEVALUATE_FUSION]: stuType === 'C' ? false : true,
    };

  return createData(
      item[ID],
      item[CATEGORY][NAME],
      item[NAME],
      item[DESCRIPTION1],
      item[DESCRIPTION2],
      item[SEMESTER_ITEM_COUNT],
      item[ISVISIBLE],
      formatDateToKorean(item[MOD_DATE]),
      <SWModal type={EDITGLOBALITEM} beforeData={beforeData} />
    );
  });

  return (
    <EnhancedTable
      originalRows={convertedFetchList}
      headCells={headCells}
      type="마일리지 글로벌 항목"
    />
  );
}
