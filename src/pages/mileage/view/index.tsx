import EnhancedTable from 'src/components/common/CustomTable';
import axiosInstance from 'src/utils/axios';
import React, { ReactNode } from 'react';
import { setServerSideCookie } from 'src/auth/jwtCookie';
import { EDITMILEAGEREGISTER } from 'src/assets/data/modal/modals';
import SWModal from 'src/components/common/modal/SWModal';
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
 * @kind [마일리지 조회]
 * @brief 데이터 생성 함수
 *
 *  */
function createData(mileageRecord: IMileageRecord): Data {
  return {
    [MileageViewBoard.NUM]: mileageRecord.id,
    [MileageViewBoard.SEMESTER]: mileageRecord.semesterItem.semesterName,
    [MileageViewBoard.CATEGORY]: mileageRecord.semesterItem.item.category.name,
    [MileageViewBoard.ITEM]: mileageRecord.semesterItem.item.name,
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
const headCells = [
  {
    id: [MileageViewBoard.NUM],
    numeric: false,
    disablePadding: true,
    label: '번호',
  },
  {
    id: [MileageViewBoard.SEMESTER],
    numeric: true,
    disablePadding: false,
    label: '학기',
  },
  {
    id: [MileageViewBoard.CATEGORY],
    numeric: true,
    disablePadding: false,
    label: '카테고리명',
  },
  {
    id: [MileageViewBoard.ITEM],
    numeric: true,
    disablePadding: false,
    label: '마일리지 항목명',
  },
  {
    id: [MileageViewBoard.STUDENT_ID],
    numeric: true,
    disablePadding: false,
    label: '학번',
  },
  {
    id: [MileageViewBoard.STUDENT_NAME],
    numeric: true,
    disablePadding: false,
    label: '이름',
  },
  {
    id: [MileageViewBoard.POINT],
    numeric: true,
    disablePadding: false,
    label: '마일리지',
  },
  {
    id: [MileageViewBoard.LAST_MODIFIED_DATE],
    numeric: true,
    disablePadding: false,
    label: '최근 수정일',
  },
];

/**
 * @kind [마일리지 조회]
 * @breif 데이터 인터페이스
 */
interface Data {
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

interface IMileageRecord {
  id: number;
  studentName: string;
  sid: string;
  extraPoints: number;
  modDate: string;
  description1: string;
  category: {
    id: number;
    name: string;
    maxPoints: number;
  },
  semesterItem: {
    id: number;
    semesterName: string;
    item: {
      id: number;
      category: {
        id: number;
        name: string;
        maxPoints: number;
      },
      name: string;
      isDuplicable: boolean;
    },
    name: string;
  },
  points: number;
  description2: string;
}

const getServerSidePropsFunction: GetServerSideProps<{ fetchData: any }> = async (context) => {
  setServerSideCookie(context);

  const res = await axiosInstance.get('/api/mileage/records');
  const fetchData = res.data;
  return { props: { fetchData } };
};

export const getServerSideProps = withTryCatchForSSR(getServerSidePropsFunction);

export default function MileageView({
                                      fetchData,
                                      requireLogin,
                                      error,
                                    }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (requireLogin) {
    handleServerAuth403Error(error);
    return;
  }
  const convertedFetchList = fetchData?.list?.map((mileageRecord: IMileageRecord) => createData(
    mileageRecord,
  ));
  const semester = useSelector((state) => state.filter.semester);

  return <>
    <EnhancedTable originalRows={convertedFetchList} headCells={headCells} type="마일리지 조회" />
    <ExcelExport endpoint={PATH_API.excel.download.record} queryParams={{ semester }} />
  </>;
}
