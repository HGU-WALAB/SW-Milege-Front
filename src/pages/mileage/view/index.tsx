import EnhancedTable from 'src/components/common/CustomTable';
import axiosInstance from 'src/utils/axios';
import React from 'react';
import { setServerSideCookie } from 'src/auth/jwtCookie';
import { withTryCatchForSSR } from 'src/utils/withTryCatchForSSR';
import { handleServerAuth403Error } from 'src/auth/utils';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { formatDateToKorean } from 'src/utils/date/dateConverter';
import ExcelExport from 'src/components/excel/ExcelExport';
import { PATH_API } from 'src/routes/paths';
import { useSelector } from 'src/redux/store';

/**
 * @component [마일리지 조회] 게시판
 */

/**
 * @kind [마일리지 조회]
 * @breif enum
 */

export enum MileageViewBoard {
  NUM = 'num',
  CATEGORY = 'category',
  SEMESTER = 'semester',
  ITEM = 'item',
  SPECIFIC_ITEM_NAME = 'specificItemName',
  STUDENT_ID = 'studentId',
  STUDENT_NAME = 'studentName',
  POINT = 'point',
  LAST_MODIFIED_DATE = 'registeredDate',
}

/**
 * 
 * @kind [마일리지 조회]
 * @brief 데이터 인터페이스
 */
export interface MileageViewData {
  [MileageViewBoard.NUM]: number;
  [MileageViewBoard.CATEGORY]: string;
  [MileageViewBoard.SEMESTER]: string;
  [MileageViewBoard.ITEM]: string;
  [MileageViewBoard.SPECIFIC_ITEM_NAME]: string;
  [MileageViewBoard.STUDENT_ID]: string;
  [MileageViewBoard.STUDENT_NAME]: string;
  [MileageViewBoard.POINT]: number;
  [MileageViewBoard.LAST_MODIFIED_DATE]: string;
}


/** 
 * @kind [마일리지 조회]
 * @brief 데이터 생성 함수
 */

function createData(mileageRecord: IMileageRecord): MileageViewData {
  return {
    [MileageViewBoard.NUM]: mileageRecord.id,
    [MileageViewBoard.SEMESTER]: mileageRecord.semesterItem.semesterName,
    [MileageViewBoard.CATEGORY]: mileageRecord.semesterItem.item.category.name,
    [MileageViewBoard.ITEM]: mileageRecord.semesterItem.item.name,
    [MileageViewBoard.SPECIFIC_ITEM_NAME]: mileageRecord.semesterItem.name,
    [MileageViewBoard.STUDENT_ID]: mileageRecord.sid,
    [MileageViewBoard.STUDENT_NAME]: mileageRecord.studentName,
    [MileageViewBoard.POINT]: mileageRecord.points,
    [MileageViewBoard.LAST_MODIFIED_DATE]: formatDateToKorean(mileageRecord.modDate),
  };
}



/**
 * @kind [마일리지 조회]
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
    id: MileageViewBoard.NUM,
    numeric: false,
    disablePadding: true,
    label: '번호',
  },
  {
    id: MileageViewBoard.SEMESTER,
    numeric: true,
    disablePadding: false,
    label: '학기',
  },
  {
    id: MileageViewBoard.CATEGORY,
    numeric: true,
    disablePadding: false,
    label: '카테고리명',
  },
  {
    id: MileageViewBoard.ITEM,
    numeric: true,
    disablePadding: false,
    label: '마일리지 항목명',
  },
  {
    id: MileageViewBoard.STUDENT_ID,
    numeric: true,
    disablePadding: false,
    label: '학번',
  },
  {
    id: MileageViewBoard.STUDENT_NAME,
    numeric: true,
    disablePadding: false,
    label: '이름',
  },
  {
    id: MileageViewBoard.POINT,
    numeric: true,
    disablePadding: false,
    label: '마일리지',
  },
  {
    id: MileageViewBoard.LAST_MODIFIED_DATE,
    numeric: true,
    disablePadding: false,
    label: '최근 수정일',
  },
];



interface IMileageRecord {
  id: number;
  studentName: string;
  sid: string;
  extraPoints: number;
  modDate: string;
  description: string;
  category: {
    id: number;
    name: string;
    maxPoints: number;
  };
  semesterItem: {
    id: number;
    semesterName: string;
    item: {
      id: number;
      category: {
        id: number;
        name: string;
        maxPoints: number;
      };
      name: string;
      isDuplicable: boolean;
    };
    name: string;
  };
  points: number;
}

interface IMileageRecordList {
  description: string;
  count: number;
  list: IMileageRecord[];
}

const getServerSidePropsFunction: GetServerSideProps<{
  requireLogin: boolean;
  error: string | null;
  fetchData: IMileageRecordList | null;
}> = async (context) => {
 setServerSideCookie(context);

 try{
    const { data } = await axiosInstance.get('/api/mileage/records');
    return {
      props: {
        requireLogin: false,
        error: null,
        fetchData: data,
      },
    };
 }
 catch (error) {
  console.error('Error fetching data:', error);
  if (error.response?.status === 403) {
    return {
      props: {
        fetchData: null,
        requireLogin: true,
        error: 'Unauthorized',
      },
    };
  }
  return {
    props: {
      fetchData: null,
      requireLogin: false,
      error: error.message || 'An error occurred',
    },
  };
  }
};

export const getServerSideProps = withTryCatchForSSR(getServerSidePropsFunction);

export default function MileageView({
  fetchData,
  requireLogin,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (requireLogin) {
    handleServerAuth403Error(error);
    return null;
  }

  /**
   * @brief 마일리지 조회 리스트 데이터
   */


  const convertedFetchList = fetchData?.list?.map((mileageRecord: IMileageRecord) =>
    createData(mileageRecord)
  );
  const semester = useSelector((state) => state.filter.semester);

  return (
    <>
      <EnhancedTable originalRows={convertedFetchList} headCells={headCells} type="마일리지 조회" />
      <ExcelExport endpoint={PATH_API.excel.download.record} queryParams={{ semester }} />
    </>
  );
}
