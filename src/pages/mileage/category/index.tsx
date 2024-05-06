import EnhancedTable from 'src/components/common/CustomTable';
import SWModal from 'src/components/common/modal/SWModal';
import { EDITCATEGORY } from 'src/assets/data/modal/modals';
import { useDispatch } from 'react-redux';
import { setServerSideCookie } from 'src/auth/jwtCookie';
import axiosInstance from 'src/utils/axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { formatDateToKorean } from 'src/utils/date/dateConverter';
import { withTryCatchForSSR } from 'src/utils/withTryCatchForSSR';
import { handleServerAuth403Error } from 'src/auth/utils';
import { ReactNode } from 'react';
import ExcelExport from 'src/components/excel/ExcelExport';
import { PATH_API } from 'src/routes/paths';

/**
 * @breif [마일리지 카테고리] 게시판
 */

// enum MileageCategoryBoard {
//   NUM = 'num',
//   CATEGORY = 'name',
//   DESCRIPTION1 = 'description1',
//   ORDER_IDX = 'orderIdx',
//   ITEM_COUNT = 'itemCount',
//   CATEGORY_MAX_POINTS = 'categoryMaxPoints',
//   MOD_DATE = 'modDate',
//   MANAGE = 'MANAGE',
// }

enum MileageCategoryBoard {
  'NUM' = NUM,
  'CATEGORY' = CATEGORY,
  'DESCRIPTION1' = DESCRIPTION1,
  'ITEM_COUNT' = ITEM_COUNT,
  'CATEGORY_MAX_POINTS' = CATEGORY_MAX_POINTS,
  'MOD_DATE' = MOD_DATE,
  'MANAGE' = MANAGE,
}

/**
 * @kind 마일리지 카테고리
 * @brief 데이터 생성 함수
 *
 *  */

function createData(data: IList, MANAGE: ReactNode): BoardColumn {
  return {
    [MileageCategoryBoard.NUM]: data.id,
    [MileageCategoryBoard.CATEGORY]: data.name,
    [MileageCategoryBoard.CATEGORY_MAX_POINTS]: data.maxPoints,
    [MileageCategoryBoard.DESCRIPTION1]: data.description1,
    [MileageCategoryBoard.ITEM_COUNT]: data.itemCount,
    [MileageCategoryBoard.MOD_DATE]: formatDateToKorean(data.modDate),
    [MileageCategoryBoard.MANAGE]: MANAGE,
  };
}

/**
 * @kind 마일리지 카테로리
 * @breif 데이터 인터페이스
 */

interface BoardColumn {
  [MileageCategoryBoard.NUM]: number;
  [MileageCategoryBoard.CATEGORY]: string;
  [MileageCategoryBoard.DESCRIPTION1]: string;
  [MileageCategoryBoard.ITEM_COUNT]: number;
  [MileageCategoryBoard.CATEGORY_MAX_POINTS]: number;
  [MileageCategoryBoard.MOD_DATE]: string;
  [MileageCategoryBoard.MANAGE]: ReactNode;
}

/**
 * @number 1번 헤더
 * @description 마일리지 카테고리 리스트
 */
const headCells = [
  {
    id: [MileageCategoryBoard.NUM],
    numeric: false,
    disablePadding: true,
    label: '번호',
  },
  {
    id: [MileageCategoryBoard.CATEGORY],
    numeric: true,
    disablePadding: false,
    label: '카테고리명',
  },
  {
    id: [MileageCategoryBoard.CATEGORY_MAX_POINTS],
    numeric: true,
    disablePadding: false,
    label: '적립 가능 최대 마일리지',
  },
  {
    id: [MileageCategoryBoard.DESCRIPTION1],
    numeric: true,
    disablePadding: false,
    label: '비고',
  },
  {
    id: [MileageCategoryBoard.ITEM_COUNT],
    numeric: true,
    disablePadding: false,
    label: '하위 항목 개수',
  },
  {
    id: [MileageCategoryBoard.MOD_DATE],
    numeric: true,
    disablePadding: false,
    label: '최근 수정일',
  },
  {
    id: [MileageCategoryBoard.MANAGE],
    numeric: true,
    disablePadding: false,
    label: '관리',
  },
];

export interface IList {
  id: number;
  name: string;
  orderIdx: number;
  itemCount: number;
  modDate: string;
  description1: string;
  maxPoints: number;
}

interface IGetMileageCategory {
  description: string;
  count: number;
  list: IList[];
}

const getServerSidePropsFunction: GetServerSideProps<{
  fetchData: IGetMileageCategory;
}> = async (context) => {
  setServerSideCookie(context);
  const res = await axiosInstance.get('/api/mileage/categories');
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

  /**
   * @brief 마일리지 카테고리 리스트 데이터
   */

  const convertedFetchList = fetchData.list?.map(
    (item: IList): BoardColumn =>
      createData(item, <SWModal type={EDITCATEGORY} beforeData={item} />)
  );

  return <>
    <EnhancedTable
      originalRows={convertedFetchList}
      headCells={headCells}
      type="마일리지 카테고리"
    />
    <ExcelExport endpoint={PATH_API.excel.download.category} />
  </>;
}
