import EnhancedTable from 'src/components/common/CustomTable';
import SWModal from 'src/components/common/modal/SWModal';
import { EDITCATEGORY } from 'src/assets/data/modal/modals';
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

enum MileageCategoryBoard {
  NUM = 'num',
  CATEGORY = 'category',
  DESCRIPTION = 'description',
  ORDER_IDX = 'orderIdx',
  ITEM_COUNT = 'itemCount',
  CATEGORY_MAX_POINTS = 'categoryMaxPoints',
  MOD_DATE = 'modDate',
  MANAGE = 'MANAGE',
}

/**
 * @kind 마일리지 카테고리
 * @brief 데이터 생성 함수
 *
 *  */

function createData(data: IListCategory, MANAGE: ReactNode): MileageCategoryData {
  return {
    [MileageCategoryBoard.NUM]: data.id,
    [MileageCategoryBoard.CATEGORY]: data.name,
    [MileageCategoryBoard.CATEGORY_MAX_POINTS]: data.maxPoints,
    [MileageCategoryBoard.DESCRIPTION]: data.description,
    [MileageCategoryBoard.ITEM_COUNT]: data.itemCount,
    [MileageCategoryBoard.MOD_DATE]: formatDateToKorean(data.modDate),
    [MileageCategoryBoard.MANAGE]: MANAGE,
  };
}

/**
 * @kind 마일리지 카테로리
 * @breif 데이터 인터페이스
 */

export interface MileageCategoryData {
  [MileageCategoryBoard.NUM]: number;
  [MileageCategoryBoard.CATEGORY]: string;
  [MileageCategoryBoard.DESCRIPTION]: string;
  [MileageCategoryBoard.ITEM_COUNT]: number;
  [MileageCategoryBoard.CATEGORY_MAX_POINTS]: number;
  [MileageCategoryBoard.MOD_DATE]: string;
  [MileageCategoryBoard.MANAGE]: ReactNode;
}

/**
 * @brief 마일리지 카테고리 리스트 헤더
 */

interface HeadCell {
  id: string;
  numeric: boolean;
  disablePadding: boolean;
  label: string;
}

const headCells: HeadCell[] = [
  {
    id: MileageCategoryBoard.NUM,
    numeric: false,
    disablePadding: true,
    label: '번호',
  },
  {
    id: MileageCategoryBoard.CATEGORY,
    numeric: true,
    disablePadding: false,
    label: '카테고리명',
  },
  {
    id: MileageCategoryBoard.CATEGORY_MAX_POINTS,
    numeric: true,
    disablePadding: false,
    label: '적립 가능 최대 마일리지',
  },
  {
    id: MileageCategoryBoard.DESCRIPTION,
    numeric: true,
    disablePadding: false,
    label: '비고',
  },
  {
    id: MileageCategoryBoard.ITEM_COUNT,
    numeric: true,
    disablePadding: false,
    label: '하위 항목 개수',
  },
  {
    id: MileageCategoryBoard.MOD_DATE,
    numeric: true,
    disablePadding: false,
    label: '최근 수정일',
  },
  {
    id: MileageCategoryBoard.MANAGE,
    numeric: true,
    disablePadding: false,
    label: '관리',
  },
];

export interface IListCategory {
  id: number;
  name: string;
  orderIdx: number;
  itemCount: number;
  modDate: string;
  description: string;
  maxPoints: number;
}

interface IGetMileageCategory {
  description: string;
  count: number;
  list: IListCategory[];
}

const getServerSidePropsFunction: GetServerSideProps<{
  fetchData: IGetMileageCategory | null;
  requireLogin: boolean;
  error: string | null;
}> = async (context) => {
  setServerSideCookie(context);
  try {
    const res = await axiosInstance.get('/api/mileage/categories');
    const fetchData = res.data;
    return { props: { fetchData, requireLogin: false, error: null } };
  } catch (error) {
    if (error.response && error.response.status === 403) {
      return { props: { fetchData: null, requireLogin: true, error: 'Unauthorized' } };
    } else {
      return { props: { fetchData: null, requireLogin: false, error: 'Failed to fetch data' } };
    }
  }
};

export const getServerSideProps = withTryCatchForSSR(getServerSidePropsFunction);

export default function MileageCategory({
  fetchData,
  requireLogin,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (requireLogin) {
    handleServerAuth403Error(error);
    return null;
  }

  /**
   * @brief 마일리지 카테고리 리스트 데이터
   */
  const convertedFetchList = fetchData?.list?.map(
    (item: IListCategory): MileageCategoryData =>
      createData(item, <SWModal type={EDITCATEGORY} beforeData={item} />)
  );

  return (
    <>
      <EnhancedTable
        originalRows={convertedFetchList}
        headCells={headCells}
        type="마일리지 카테고리"
      />
      <ExcelExport endpoint={PATH_API.excel.download.category} />
    </>
  );
}
