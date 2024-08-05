import EnhancedTable from 'src/components/common/CustomTable';
import SWModal from 'src/components/common/modal/SWModal';
import { EDITITEM } from 'src/assets/data/modal/modals';
import { useSelector } from 'src/redux/store';
import { ReactNode, useEffect, useState } from 'react';
import axiosInstance from 'src/utils/axios';
import { setServerSideCookie } from 'src/auth/jwtCookie';
import { handleServerAuth403Error } from 'src/auth/utils';
import { withTryCatchForSSR } from 'src/utils/withTryCatchForSSR';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import ExcelExport from 'src/components/excel/ExcelExport';
import { PATH_API } from 'src/routes/paths';
import { formatDateToKorean } from 'src/utils/date/dateConverter';

/**
 * @component [학기별 마일리지 항목] 게시판
 */

/**
 * @kind [학기별 마일리지 항목]
 * @breif enum
 */

export enum MileageSemesterItemBoard {
  NUM = 'num',
  CATEGORY = 'category',
  SEMESTER = 'semester',
  ITEM = 'item',
  SPECIFIC_ITEM_NAME = 'specificItemName',
  POINTS = 'points',
  ITEM_MAX_POINTS = 'itemMaxPoints',
  MOD_DATE = 'modDate',
  MANAGE = 'manage',
}

/**
 * @kind [학기별 마일리지 항목]
 * @breif 데이터 인터페이스
 */
export interface SemesterMileageItemsData {
  [MileageSemesterItemBoard.NUM]: number;
  [MileageSemesterItemBoard.SEMESTER]: string;
  [MileageSemesterItemBoard.CATEGORY]: string;
  [MileageSemesterItemBoard.ITEM]: string;
  [MileageSemesterItemBoard.SPECIFIC_ITEM_NAME]: string;
  [MileageSemesterItemBoard.POINTS]: number;
  [MileageSemesterItemBoard.ITEM_MAX_POINTS]: number;
  [MileageSemesterItemBoard.MOD_DATE]: string;
  [MileageSemesterItemBoard.MANAGE]: ReactNode;
}

/**
 * @kind [학기별 마일리지 항목]
 * @brief 데이터 생성 함수
 *
 *  */
function createData(semesterItem: ISemesterItem, MANAGE: ReactNode): SemesterMileageItemsData {
  return {
    [MileageSemesterItemBoard.NUM]: semesterItem.id,
    [MileageSemesterItemBoard.SEMESTER]: semesterItem.semesterName,
    [MileageSemesterItemBoard.CATEGORY]: semesterItem.category.name,
    [MileageSemesterItemBoard.ITEM]: semesterItem.item.name,
    [MileageSemesterItemBoard.SPECIFIC_ITEM_NAME]: semesterItem.name,
    [MileageSemesterItemBoard.POINTS]: semesterItem.points,
    [MileageSemesterItemBoard.ITEM_MAX_POINTS]: semesterItem.itemMaxPoints,
    [MileageSemesterItemBoard.MOD_DATE]: formatDateToKorean(semesterItem.modDate),
    [MileageSemesterItemBoard.MANAGE]: MANAGE,
  };
}

/**
 * @kind [학기별 마일리지 항목]
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
    id: [MileageSemesterItemBoard.SEMESTER],
    numeric: true,
    disablePadding: false,
    label: '학기',
  },
  {
    id: [MileageSemesterItemBoard.CATEGORY],
    numeric: true,
    disablePadding: false,
    label: '카테고리명',
  },
  {
    id: [MileageSemesterItemBoard.ITEM],
    numeric: true,
    disablePadding: false,
    label: '마일리지 항목명',
  },
  {
    id: [MileageSemesterItemBoard.SPECIFIC_ITEM_NAME],
    numeric: true,
    disablePadding: false,
    label: '학기별 마일리지 항목명',
  },
  {
    id: [MileageSemesterItemBoard.POINTS],
    numeric: true,
    disablePadding: false,
    label: '마일리지',
  },
  {
    id: [MileageSemesterItemBoard.ITEM_MAX_POINTS],
    numeric: true,
    disablePadding: false,
    label: '적립 가능 최대 마일리지',
  },
  // {
  //   id: [MileageSemesterItemBoard.IS_MULTI],
  //   numeric: true,
  //   disablePadding: false,
  //   label: '중복 가능 여부',
  // },
  {
    id: [MileageSemesterItemBoard.MOD_DATE],
    numeric: true,
    disablePadding: false,
    label: '최근 수정일',
  },
  {
    id: [MileageSemesterItemBoard.MANAGE],
    numeric: true,
    disablePadding: false,
    label: '관리',
  },
];

export interface IItem {
  id: number;
  name: string;
  isDuplicable: boolean;
}

export interface ICategory {
  id: number;
  name: string;
  maxPoints: number;
}

export interface ISemesterItem {
  id: number;
  item: IItem;
  category: ICategory;
  name: string;
  semesterName: string;
  points: number;
  recordCount: number;
  itemMaxPoints: number;
  modDate: string;
}

export interface ISemesterItemList {
  list: ISemesterItem[];
}

const getServerSidePropsFunction: GetServerSideProps<{
  requireLogin: boolean;
  error: string | null;
  fetchData: ISemesterItemList;
  nowSemester?: string;
}> = async (context) => {
  try {
    setServerSideCookie(context);

    const semesterRes = await axiosInstance.get(`/api/mileage/semesters/currentSemester`);
    const nowSemester = semesterRes.data.data.name;
    const res = await axiosInstance.get(`/api/mileage/semesters/${nowSemester}/items`);
    const fetchData: ISemesterItemList = res.data;

    return {
      props: {
        requireLogin: false,
        error: null,
        fetchData,
        nowSemester,
      },
    };
  } catch (error) {
    return {
      props: {
        requireLogin: false,
        error: error.message,
        fetchData: { list: [] },
        nowSemester: undefined,
      },
    };
  }
};

export const getServerSideProps = withTryCatchForSSR(getServerSidePropsFunction);

const fetchToUseData = (data: ISemesterItemList) => {
  return data?.list.map((semesterItem: ISemesterItem) => {
    return createData(semesterItem, <SWModal type={EDITITEM} beforeData={semesterItem} />);
  });
};

export default function MileageSemesterItem({
  fetchData,
  requireLogin,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (requireLogin) {
    handleServerAuth403Error(error);
    return;
  }
  const [convertedFetchList, setConvertedFetchList] = useState(fetchToUseData(fetchData));
  const semester = useSelector((state) => state.filter.semester);

  useEffect(() => {
    axiosInstance.get(`/api/mileage/semesters/${semester}/items`).then((res) => {
      setConvertedFetchList(fetchToUseData(res.data));
    });
  }, [semester]);

  return (
    <>
      <EnhancedTable
        originalRows={convertedFetchList}
        headCells={headCells}
        type="학기별 마일리지 항목"
      />
      <ExcelExport endpoint={PATH_API.excel.download.semesterItem} queryParams={{ semester }} />
    </>
  );
}
