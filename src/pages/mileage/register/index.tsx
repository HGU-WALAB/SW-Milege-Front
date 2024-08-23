import React, { ReactNode, useEffect, useState } from 'react';
import EnhancedTable from 'src/components/common/CustomTable';
import axiosInstance from 'src/utils/axios';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { Box, IconButton } from '@mui/material';
import { setServerSideCookie } from 'src/auth/jwtCookie';
import { useDispatch, useSelector } from 'react-redux';
import { withTryCatchForSSR } from 'src/utils/withTryCatchForSSR';
import { handleServerAuth403Error } from 'src/auth/utils';
import { GetServerSideProps } from 'next';
import SWModal from 'src/components/common/modal/SWModal';
import { ADDMILEAGEREGISTER, MANAGERREGISTEREDSTUDENTS } from 'src/assets/data/modal/modals';
import { ISemesterItemList } from 'src/pages/mileage/item/semester';
import ExcelExport from 'src/components/excel/ExcelExport';
import { PATH_API } from 'src/routes/paths';
import { formatDateToKorean } from 'src/utils/date/dateConverter';
import { ISemesterItem } from 'src/pages/mileage/item/semester';
import { RootState } from 'src/redux/store';

/**
 * @component [마일리지 적립] 게시판
 */

/**
 * @kind [마일리지 적립]
 * @brief enum
 */

export enum MileageRegisterBoard {
  NUM = 'num',
  SEMESTER = 'semester',
  CATEGORY = 'category',
  ITEM_NAME = 'item',
  SPECIFIC_ITEM_NAME = 'specificItemName',
  DESCRIPTION = 'description',
  POINTS = 'points',
  COUNTS = 'counts',
  MOD_DATE = 'modDate',
  MANAGE = 'MANAGE',
}

/**
 * @kind [마일리지 적립]
 * @brief 데이터 인터페이스
 */
export interface MileageRegisterData {
  [MileageRegisterBoard.NUM]: number;
  [MileageRegisterBoard.SEMESTER]: string;
  [MileageRegisterBoard.CATEGORY]: string;
  [MileageRegisterBoard.ITEM_NAME]: string;
  [MileageRegisterBoard.SPECIFIC_ITEM_NAME]: string;
  [MileageRegisterBoard.POINTS]: number;
  [MileageRegisterBoard.COUNTS]: number;
  [MileageRegisterBoard.MOD_DATE]: string;
  [MileageRegisterBoard.MANAGE]: ReactNode;
}

/**
 * @kind [마일리지 적립]
 * @brief 데이터 생성 함수
 */
function createData(semesterItem: ISemesterItem, MANAGE: ReactNode): MileageRegisterData {
  return {
    [MileageRegisterBoard.NUM]: semesterItem.id,
    [MileageRegisterBoard.SEMESTER]: semesterItem.semesterName,
    [MileageRegisterBoard.CATEGORY]: semesterItem.category.name,
    [MileageRegisterBoard.ITEM_NAME]: semesterItem.item.name,
    [MileageRegisterBoard.SPECIFIC_ITEM_NAME]: semesterItem.name,
    [MileageRegisterBoard.POINTS]: semesterItem.points,
    [MileageRegisterBoard.COUNTS]: semesterItem.recordCount,
    [MileageRegisterBoard.MOD_DATE]: formatDateToKorean(semesterItem.modDate),
    [MileageRegisterBoard.MANAGE]: MANAGE,
  };
}

/**
 * @kind [학기별 마일리지 항목]
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
    id: MileageRegisterBoard.NUM,
    numeric: false,
    disablePadding: true,
    label: '번호',
  },
  {
    id: MileageRegisterBoard.SEMESTER,
    numeric: true,
    disablePadding: false,
    label: '학기',
  },
  {
    id: MileageRegisterBoard.CATEGORY,
    numeric: true,
    disablePadding: false,
    label: '카테고리',
  },
  {
    id: MileageRegisterBoard.ITEM_NAME,
    numeric: true,
    disablePadding: false,
    label: '마일리지 항목명',
  },
  {
    id: MileageRegisterBoard.SPECIFIC_ITEM_NAME,
    numeric: true,
    disablePadding: false,
    label: '학기별 마일리지 항목명',
  },
  {
    id: MileageRegisterBoard.POINTS,
    numeric: true,
    disablePadding: false,
    label: '마일리지',
  },
  {
    id: MileageRegisterBoard.COUNTS,
    numeric: true,
    disablePadding: false,
    label: '등록수',
  },
  {
    id: MileageRegisterBoard.MOD_DATE,
    numeric: true,
    disablePadding: false,
    label: '최근 수정일',
  },
  {
    id: MileageRegisterBoard.MANAGE,
    numeric: true,
    disablePadding: false,
    label: '학생 관리',
  },
];

/**
 * @kind [마일리지 적립] 데이터 형식
 */
export interface IRegister {
  id: number;
  recordName: string;
  semesterItemId: number;
  semester: string;
  itemName: string;
  categoryName: string;
}

const getServerSidePropsFunction: GetServerSideProps<{
  fetchData: ISemesterItemList;
}> = async (context) => {
  setServerSideCookie(context);

  const semesterRes = await axiosInstance.get(`/api/mileage/semesters/currentSemester`);
  const nowSemester = semesterRes.data.data.name;
  const res = await axiosInstance.get(`/api/mileage/semesters/${nowSemester}/items`);
  const fetchData = res.data;

  return { props: { fetchData } };
};

export const getServerSideProps = withTryCatchForSSR(getServerSidePropsFunction);

const handleAllDelete = (id: number) => {
  if (window.confirm('등록된 학생 모두 삭제하시겠습니까?')) {
    axiosInstance.get(`/api/mileage/records/filter?semesterItemId=${id}`).then((res) => {
      if (res.data.list.length === 0) {
        alert('등록된 학생이 없습니다.');
      } else {
        res.data.list.forEach((item: { student?: { name?: string; sid?: string }; id: number }) => {
          axiosInstance.delete(`/api/mileage/records/${item.id}`).then(() => {
            alert(` ${item.student?.name} - ${item.student?.sid} 가 삭제 되었습니다.`);
          });
        });
      }
    });
  }
};

const fetchToUseData = (data: ISemesterItemList) =>
  data?.list?.map((semesterItem: ISemesterItem) => {
    const beforeData: IRegister = {
      id: semesterItem.id,
      recordName: semesterItem.item.name,
      semesterItemId: semesterItem.id,
      semester: semesterItem.semesterName,
      itemName: semesterItem.item.name,
      categoryName: semesterItem.category.name,
    };

    return createData(
      semesterItem,
      <Box sx={{ display: 'flex' }}>
        <SWModal type={MANAGERREGISTEREDSTUDENTS} beforeData={beforeData} />
        <SWModal type={ADDMILEAGEREGISTER} beforeData={beforeData} />
        <IconButton onClick={() => handleAllDelete(semesterItem.id)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    );
  });

export default function MileageRegister({
  fetchData,
  requireLogin,
  error,
}: {
  fetchData: ISemesterItemList | null;
  requireLogin: boolean;
  error: string | null;
}): React.JSX.Element {
  if (requireLogin) {
    handleServerAuth403Error(error);
    return null;
  }

  const [convertedFetchList, setConvertedFetchList] = useState(fetchToUseData(fetchData));
  const semester = useSelector((state: RootState) => state.filter.semester);

  useEffect(() => {
    axiosInstance.get(`/api/mileage/semesters/${semester}/items`).then((res) => {
      setConvertedFetchList(fetchToUseData(res.data));
    });
  }, [semester]);

  return (
    <>
      <EnhancedTable originalRows={convertedFetchList} headCells={headCells} type="마일리지 적립" />
      <ExcelExport endpoint={PATH_API.excel.download.format.record} />
    </>
  );
}
