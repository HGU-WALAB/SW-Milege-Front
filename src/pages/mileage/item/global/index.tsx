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
  FILE_DESCRIPTION,
  ISVISIBLE_STUDENT,
  IS_STUDENT_INPUT,
  ISEVALUATE_CSEE,
  ISEVALUATE_PORTFOLIO,
  ISEVALUATE_FUSION,
  MAX_MAILEAGE,
  NAME,
  ITEM_MAX_POINTS,
  MOD_DATE,
  CATEGORYID,
} from 'src/assets/data/fields';
import SWModal from 'src/components/common/modal/SWModal';
import { EDITGLOBALITEM, EDITITEM } from 'src/assets/data/modal/modals';
import { dispatch } from 'src/redux/store';
import { setMileageGlobalList } from 'src/redux/slices/data';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import axiosInstance from 'src/utils/axios';
import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import MileageCategory from 'src/components/board/MileageCategory';
import { setItemList, setSemesterList } from 'src/redux/slices/filter';
import { ID, CATEGORY, ITEM, ISVISIBLE, SEMESTER_ITEM_COUNT } from '../../../../assets/data/fields';
import { setServerSideCookie } from 'src/auth/jwtCookie';
import { formatDateToKorean } from 'src/utils/date/dateConverter';
import { withTryCatchForSSR } from 'src/utils/withTryCatchForSSR';
import { handleServerAuth403Error } from 'src/auth/utils';


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
  'SEMESTER_ITEM_COUNT' = SEMESTER_ITEM_COUNT,
  'ISVISIBLE' = ISVISIBLE,
  'MOD_DATE' = MOD_DATE,
  'ITEM_MAX_POINTS' = ITEM_MAX_POINTS
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
  [MileageGlobalItemBoard.SEMESTER_ITEM_COUNT]: number;
  [MileageGlobalItemBoard.ITEM_MAX_POINTS]: number;
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
  SEMESTER_ITEM_COUNT: number,
  ITEM_MAX_POINTS: number,
  ISVISIBLE: boolean,
  MOD_DATE: string,
  MANAGE: string
): Data {
  return {
    [MileageGlobalItemBoard.NUM]: NUM,
    [MileageGlobalItemBoard.CATEGORY]: CATEGORY,

    [MileageGlobalItemBoard.ITEM]: ITEM,

    [MileageGlobalItemBoard.DESCRIPTION1]: DESCRIPTION1,
    [MileageGlobalItemBoard.SEMESTER_ITEM_COUNT]: SEMESTER_ITEM_COUNT,
    [MileageGlobalItemBoard.ITEM_MAX_POINTS]: ITEM_MAX_POINTS,
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
    label: '비고',
  },
  {
    id: [MileageGlobalItemBoard.SEMESTER_ITEM_COUNT],
    numeric: true,
    disablePadding: false,
    label: '학기별 항목 수',
  },
  {
    id: [MileageGlobalItemBoard.ITEM_MAX_POINTS],
    numeric: true,
    disablePadding: false,
    label: '최대 마일리지',
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
  stuType: 'C' | 'F' | 'CF';
}

interface IGlobalItemList {
  items: IGlobalItem[];
}

const getServerSidePropsFunction: GetServerSideProps<{
  fetchData: IGlobalItemList;
}> = async (context) => {
  setServerSideCookie(context);
  const res = await axiosInstance.get('/api/mileage/items');
  const fetchData = res.data;
  return { props: { fetchData } };
};

export const getServerSideProps = withTryCatchForSSR(getServerSidePropsFunction);

export default function MileageCategory({
  fetchData,
  requireLogin,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (requireLogin) {
    handleServerAuth403Error(error);
    return;
  }

  const dispatch = useDispatch();
  const convertedFetchList = fetchData.list?.map((item, index) => {
    const {
      id,
      category,
      name: itemName,
      description1,
      isVisible,
      isStudentVisible,
      stuType,
      isPortfolio,
      isStudentInput,
      itemMaxPoints,
    } = item;

    const beforeData = {
      [ID]: id,
      [CATEGORYID]: category.id,
      [ITEM]: itemName,
      [DESCRIPTION1]: description1,
      [ISVISIBLE]: isVisible,
      [ISVISIBLE_STUDENT]: isStudentVisible,
      [IS_STUDENT_INPUT]: isStudentInput,
      [ISEVALUATE_CSEE]: stuType === 'F' ? false : true,
      [ISEVALUATE_PORTFOLIO]: isPortfolio,
      [ISEVALUATE_FUSION]: stuType === 'C' ? false : true,
      [ITEM_MAX_POINTS]: itemMaxPoints,
    };

    return createData(
      item[ID],
      item[CATEGORY][NAME],
      item[NAME],
      item[DESCRIPTION1],
      item[SEMESTER_ITEM_COUNT],
      item[ITEM_MAX_POINTS],
      item[ISVISIBLE],
      formatDateToKorean(item[MOD_DATE]),
      <SWModal type={EDITGLOBALITEM} beforeData={beforeData} />
    );
  });

  return (
    <EnhancedTable
      originalRows={convertedFetchList}
      headCells={headCells}
      type="마일리지 세부 항복"
    />
  );
}
