import EnhancedTable from 'src/components/common/CustomTable';
import SWModal from 'src/components/common/modal/SWModal';
import { EDITGLOBALITEM } from 'src/assets/data/modal/modals';
import { useDispatch } from 'react-redux';

import axiosInstance from 'src/utils/axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { setServerSideCookie } from 'src/auth/jwtCookie';
import { formatDateToKorean } from 'src/utils/date/dateConverter';
import { withTryCatchForSSR } from 'src/utils/withTryCatchForSSR';
import { handleServerAuth403Error } from 'src/auth/utils';
import { ReactNode } from 'react';


/**
 * @component [마일리지 항목] 게시판
 */

/**
 * @kind [마일리지 항목]
 * @breif enum
 */

export enum MileageGlobalItemBoard {
  NUM = 'num',
  CATEGORY = 'CATEGORY',
  ITEM = 'ITEM',
  DESCRIPTION1 = 'DESCRIPTION1',
  SEMESTER_ITEM_COUNT = 'SEMESTER_ITEM_COUNT',
  IS_VISIBLE = 'IS_VISIBLE',
  MOD_DATE = 'MOD_DATE',
  ITEM_MAX_POINTS = 'ITEM_MAX_POINTS',
  MANAGE = 'MANAGE',
}

/**
 * @kind [마일리지 항목]
 * @breif 데이터 인터페이스
 */
interface Data {
  [MileageGlobalItemBoard.NUM]: number;
  [MileageGlobalItemBoard.CATEGORY]: string;
  [MileageGlobalItemBoard.ITEM]: string;
  [MileageGlobalItemBoard.DESCRIPTION1]: string;
  [MileageGlobalItemBoard.SEMESTER_ITEM_COUNT]: number;
  [MileageGlobalItemBoard.ITEM_MAX_POINTS]: number;
  [MileageGlobalItemBoard.IS_VISIBLE]: boolean;
  [MileageGlobalItemBoard.MOD_DATE]: string;
  [MileageGlobalItemBoard.MANAGE]: ReactNode;
}

/**
 * @kind [마일리지 항목]
 * @brief 데이터 생성 함수
 *
 *  */
function createData(
  item: IGlobalItem,
  MANAGE: ReactNode,
): Data {
  return {
    [MileageGlobalItemBoard.NUM]: item.id,
    [MileageGlobalItemBoard.CATEGORY]: item.category.name,
    [MileageGlobalItemBoard.ITEM]: item.name,
    [MileageGlobalItemBoard.ITEM_MAX_POINTS]: item.itemMaxPoints,
    [MileageGlobalItemBoard.SEMESTER_ITEM_COUNT]: item.semesterItemCount,
    [MileageGlobalItemBoard.IS_VISIBLE]: item.isVisible,
    [MileageGlobalItemBoard.DESCRIPTION1]: item.description1,
    [MileageGlobalItemBoard.MOD_DATE]: formatDateToKorean(item.modDate),
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
    label: '카테고리',
  },
  {
    id: [MileageGlobalItemBoard.ITEM],
    numeric: true,
    disablePadding: false,
    label: '항목명',
  },
  {
    id: [MileageGlobalItemBoard.ITEM_MAX_POINTS],
    numeric: true,
    disablePadding: false,
    label: '적립 가능 최대 마일리지',
  },
  {
    id: [MileageGlobalItemBoard.SEMESTER_ITEM_COUNT],
    numeric: true,
    disablePadding: false,
    label: '학기별 세부 항목 개수',
  },
  {
    id: [MileageGlobalItemBoard.IS_VISIBLE],
    numeric: true,
    disablePadding: false,
    label: '보이기',
  },
  {
    id: [MileageGlobalItemBoard.DESCRIPTION1],
    numeric: true,
    disablePadding: false,
    label: '비고',
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

export interface IGlobalItem {
  id: number;
  category: {
    id: number;
    name: string;
    maxPoints: number;
  };
  name: string;
  isPortfolio: boolean;
  isVisible: boolean;
  isStudentVisible: boolean;
  isStudentInput: boolean;
  modDate: string;
  semesterItemCount: number;
  mileageType: {
    id: number;
    name: string;
  };
  itemMaxPoints: number;
  description1: string;
  stuType?: string;
}

interface IGetMileageItem {
  description: string;
  count: number;
  list: [IGlobalItem];
}

const getServerSidePropsFunction: GetServerSideProps<{
  fetchData: IGetMileageItem;
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
  const convertedFetchList = fetchData.list?.map((item) =>
    createData(item, <SWModal type={EDITGLOBALITEM} beforeData={item} />));

  return (
    <EnhancedTable
      originalRows={convertedFetchList}
      headCells={headCells}
      type="마일리지 세부 항목"
    />
  );
}
