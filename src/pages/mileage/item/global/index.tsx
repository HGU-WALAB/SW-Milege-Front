import { useEffect, useState } from 'react';
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
import ExcelExport from 'src/components/excel/ExcelExport';
import ExcelImport from 'src/components/excel/ExcelImport';
import { setAllMileageList } from 'src/redux/slices/filterList';
import { PATH_API } from 'src/routes/paths';

/**
 * @component [마일리지 항목] 게시판
 */

/**
 * @kind [마일리지 항목]
 * @breif enum
 */

export enum MileageGlobalItemBoard {
  NUM = 'num',
  TYPE = 'type',
  CATEGORY = 'category',
  ITEM = 'item',
  DESCRIPTION = 'description',
  SEMESTER_ITEM_COUNT = 'semesterItemCount',
  MOD_DATE = 'modDate',
  MILEAGE = 'Mileage',
  ITEM_MAX_POINTS = 'itemMaxPoints',
  MANAGE = 'Manage',
}

/**
 * @kind [마일리지 항목]
 * @breif 데이터 인터페이스
 */
export interface MileageGlobalItemData {
  [MileageGlobalItemBoard.NUM]: number;
  [MileageGlobalItemBoard.TYPE]: string;
  [MileageGlobalItemBoard.CATEGORY]: string;
  [MileageGlobalItemBoard.ITEM]: string;
  [MileageGlobalItemBoard.MILEAGE]: number;
  [MileageGlobalItemBoard.ITEM_MAX_POINTS]: number;
  [MileageGlobalItemBoard.DESCRIPTION]: string;
  [MileageGlobalItemBoard.SEMESTER_ITEM_COUNT]: number;
  [MileageGlobalItemBoard.MOD_DATE]: string;
  [MileageGlobalItemBoard.MANAGE]: ReactNode;
}

/**
 * @kind [마일리지 항목]
 * @brief 데이터 생성 함수
 *
 *  */
function createData(item: IGlobalItem, MANAGE: ReactNode): MileageGlobalItemData {
  return {
    [MileageGlobalItemBoard.NUM]: item.id,
    [MileageGlobalItemBoard.TYPE]: item.mileageType.name,
    [MileageGlobalItemBoard.CATEGORY]: item.category.name,
    [MileageGlobalItemBoard.ITEM]: item.name,
    [MileageGlobalItemBoard.MILEAGE]: item.mileage,
    [MileageGlobalItemBoard.ITEM_MAX_POINTS]: item.itemMaxPoints,
    [MileageGlobalItemBoard.DESCRIPTION]: item.description,
    [MileageGlobalItemBoard.SEMESTER_ITEM_COUNT]: item.semesterItemCount,
    [MileageGlobalItemBoard.MOD_DATE]: formatDateToKorean(item.modDate),
    [MileageGlobalItemBoard.MANAGE]: MANAGE,
  };
}

/**
 * @kind [마일리지 항목]
 * @brief 테이블 헤더
 */

interface HeadCell {
  id: string;
  numeric: boolean;
  disablePadding: boolean;
  label: string;
}

const headCells: HeadCell[] = [
  {
    id: MileageGlobalItemBoard.NUM,
    numeric: false,
    disablePadding: true,
    label: '번호',
  },
  {
    id: MileageGlobalItemBoard.TYPE,
    numeric: true,
    disablePadding: false,
    label: '타입',
  },
  {
    id: MileageGlobalItemBoard.CATEGORY,
    numeric: true,
    disablePadding: false,
    label: '카테고리',
  },
  {
    id: MileageGlobalItemBoard.ITEM,
    numeric: true,
    disablePadding: false,
    label: '마일리지 항목명',
  },
  {
    id: MileageGlobalItemBoard.MILEAGE,
    numeric: true,
    disablePadding: false,
    label: '마일리지',
  },
  {
    id: MileageGlobalItemBoard.ITEM_MAX_POINTS,
    numeric: true,
    disablePadding: false,
    label: '적립 가능 최대 마일리지',
  },
  {
    id: MileageGlobalItemBoard.DESCRIPTION,
    numeric: true,
    disablePadding: false,
    label: '비고',
  },
  {
    id: MileageGlobalItemBoard.SEMESTER_ITEM_COUNT,
    numeric: true,
    disablePadding: false,
    label: '학기별 마일리지 항목 개수',
  },
  {
    id: MileageGlobalItemBoard.MOD_DATE,
    numeric: true,
    disablePadding: false,
    label: '최근 수정일',
  },
  {
    id: MileageGlobalItemBoard.MANAGE,
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
  isCseeGeneral: boolean;
  isCseeSpecial: boolean;
  isIctConvergence: boolean;
  isDuplicable: boolean;
  isVisible: boolean;
  isStudentVisible: boolean;
  isStudentInput: boolean;
  modDate: string;
  semesterItemCount: number;
  mileageType: {
    id: number;
    name: string;
    modDate: string;
  };
  mileage: number;
  itemMaxPoints: number;
  description: string;
}

interface IGetMileageItem {
  description: string;
  count: number;
  list: [IGlobalItem];
}

const getServerSidePropsFunction: GetServerSideProps<{
  fetchData: IGetMileageItem | null;
  requireLogin: boolean;
  error: string | null;
}> = async (context) => {
  setServerSideCookie(context);

  try {
    const res = await axiosInstance.get('/api/mileage/items');
    const fetchData = res.data;
    return { props: { fetchData, requireLogin: false, error: null } };
  } catch (err) {
    if (err.response && err.response.status === 403) {
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
  const dispatch = useDispatch();
  const [convertedFetchList, setConvertedFetchList] = useState<MileageGlobalItemData[] | null>(
    null
  );

  useEffect(() => {
    if (requireLogin) {
      handleServerAuth403Error(error);
      return;
    }

    const list = fetchData.list?.map((item) =>
      createData(item, <SWModal type={EDITGLOBALITEM} beforeData={item} />)
    );
    setConvertedFetchList(list);
    dispatch(setAllMileageList(fetchData.list));
  }, [fetchData, requireLogin, error, dispatch]);

  if (requireLogin) {
    handleServerAuth403Error(error);
    return null;
  }

  return (
    <>
      {convertedFetchList && (
        <EnhancedTable
          originalRows={convertedFetchList}
          headCells={headCells}
          type="마일리지 항목"
        />
      )}
      <ExcelExport endpoint={PATH_API.excel.download.globalItem} />
      <ExcelExport endpoint={PATH_API.excel.download.format.item} buttonText="엑셀양식 다운로드" />
      <ExcelImport endpoint={PATH_API.excel.upload.item} />
    </>
  );
}
