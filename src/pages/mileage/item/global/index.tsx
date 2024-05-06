import EnhancedTable from 'src/components/common/CustomTable';
import SWModal from 'src/components/common/modal/SWModal';
import { EDITGLOBALITEM } from 'src/assets/data/modal/modals';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {
  NUM,
  TYPE,
  CATEGORY,
  ITEM,
  DESCRIPTION1,
  SEMESTER_ITEM_COUNT,
  MOD_DATE,
  POINT,
  ITEM_MAX_POINTS,
  MANAGE,
} from 'src/assets/data/fields';
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
  'NUM' = NUM,
  'TYPE' = TYPE,
  'CATEGORY' = CATEGORY,
  'ITEM' = ITEM,
  'DESCRIPTION1' = DESCRIPTION1,
  'SEMESTER_ITEM_COUNT' = SEMESTER_ITEM_COUNT,
  'MOD_DATE' = MOD_DATE,
  'POINT' = POINT,
  'ITEM_MAX_POINTS' = ITEM_MAX_POINTS,
  'MANAGE' = MANAGE,
}

/**
 * @kind [마일리지 항목]
 * @breif 데이터 인터페이스
 */
interface Data {
  [MileageGlobalItemBoard.NUM]: number;
  [MileageGlobalItemBoard.TYPE]: string;
  [MileageGlobalItemBoard.CATEGORY]: string;
  [MileageGlobalItemBoard.ITEM]: string;
  [MileageGlobalItemBoard.DESCRIPTION1]: string;
  [MileageGlobalItemBoard.SEMESTER_ITEM_COUNT]: number;
  [MileageGlobalItemBoard.POINT]: number;
  [MileageGlobalItemBoard.ITEM_MAX_POINTS]: number;
  [MileageGlobalItemBoard.MOD_DATE]: string;
  [MileageGlobalItemBoard.MANAGE]: ReactNode;
}

/**
 * @kind [마일리지 항목]
 * @brief 데이터 생성 함수
 *
 *  */
function createData(
  NUM: number,
  TYPE: string,
  CATEGORY: string,
  ITEM: string,
  POINT: number,
  ITEM_MAX_POINTS: number,
  DESCRIPTION1: string,
  SEMESTER_ITEM_COUNT: number,
  MOD_DATE: string,
  MANAGE: string
): Data {
  return {
    [MileageGlobalItemBoard.NUM]: NUM,
    [MileageGlobalItemBoard.TYPE]: TYPE,
    [MileageGlobalItemBoard.CATEGORY]: CATEGORY,
    [MileageGlobalItemBoard.ITEM]: ITEM,
    [MileageGlobalItemBoard.POINT]: POINT,
    [MileageGlobalItemBoard.ITEM_MAX_POINTS]: ITEM_MAX_POINTS,
    [MileageGlobalItemBoard.DESCRIPTION1]: DESCRIPTION1,
    [MileageGlobalItemBoard.SEMESTER_ITEM_COUNT]: SEMESTER_ITEM_COUNT,
    [MileageGlobalItemBoard.MOD_DATE]: formatDateToKorean(MOD_DATE),
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
    id: [MileageGlobalItemBoard.TYPE],
    numeric: true,
    disablePadding: false,
    label: '타입',
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
    id: [MileageGlobalItemBoard.POINT],
    numeric: true,
    disablePadding: false,
    label: '마일리지',
  },
  {
    id: [MileageGlobalItemBoard.ITEM_MAX_POINTS],
    numeric: true,
    disablePadding: false,
    label: '적립 가능 최대 마일리지',
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
    label: '사용되는 학기 수',
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
  isCseeGeneral: boolean;
  isCseeSpecial: boolean;
  isIctConvergence: boolean;
  isDuplicable: boolean;
  isVisible: boolean;
  isStudentVisible: boolean;
  isStudentInput: boolean;
  modDate: string;
  semesterItemCount: number;
  semesterNameList: [string];
  mileageType: {
    id: number;
    name: string;
    modDate: string;
  };
  mileage: number;
  itemMaxPoints: number;
  description1: string;
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

const fetchToUseData = (data) => {
  return data?.list.map((item) => {
    return createData(
      item.id,
      item.mileageType.name,
      item.category.name,
      item.name,
      item.mileage,
      item.itemMaxPoints,
      item.description1,
      item.semesterItemCount,
      item.modDate,
      <SWModal type={EDITGLOBALITEM} beforeData={item} />
    );
  });
};

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

  const [convertedFetchList, setConvertedFetchList] = useState(fetchToUseData(fetchData));

  return (
    <>
      <EnhancedTable
        originalRows={convertedFetchList}
        headCells={headCells}
        type="마일리지 세부 항목"
      />
      <ExcelExport />
      <ExcelImport endpoint={PATH_API.excel.upload.item} />
    </>
  );
}
