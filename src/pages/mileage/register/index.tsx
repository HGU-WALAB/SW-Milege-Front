import EnhancedTable from 'src/components/common/CustomTable';
import React, { ReactNode, useEffect, useState } from 'react';
import axiosInstance from 'src/utils/axios';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { setServerSideCookie } from 'src/auth/jwtCookie';
import { formatDateToKorean } from 'src/utils/date/dateConverter';
import { useDispatch, useSelector } from 'react-redux';
import { withTryCatchForSSR } from 'src/utils/withTryCatchForSSR';
import { handleServerAuth403Error } from 'src/auth/utils';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import SWModal from 'src/components/common/modal/SWModal';
import { ADDMILEAGEREGISTER, MANAGERREGISTEREDSTUDENTS } from 'src/assets/data/modal/modals';
import { ISemesterItemList } from 'src/pages/mileage/item/semester';
import ExcelExport from 'src/components/excel/ExcelExport';
import {
  NUM,
  SEMESTER,
  ITEM_NAME,
  DESCRIPTION1,
  POINTS,
  COUNTS,
  MOD_DATE,
  STUDENTS,
} from 'src/assets/data/fields';

/**
 * @component [마일리지 적립] 게시판
 */

/**
 * @kind [마일리지 적립]
 * @breif enum
 */

export enum MileageRegisterBoard {
  'NUM' = NUM,
  'SEMESTER' = SEMESTER,
  'ITEM_NAME' = ITEM_NAME,
  'DESCRIPTION1' = DESCRIPTION1,
  'POINTS' = POINTS,
  'COUNTS' = COUNTS,
  'MOD_DATE' = MOD_DATE,
  'STUDENTS' = STUDENTS,
}

/**
 * @kind [마일리지 적립]
 * @breif 데이터 인터페이스
 */
interface Data {
  [MileageRegisterBoard.NUM]: number;
  [MileageRegisterBoard.SEMESTER]: string;
  [MileageRegisterBoard.ITEM_NAME]: string;
  [MileageRegisterBoard.DESCRIPTION1]: string;
  [MileageRegisterBoard.POINTS]: number;
  [MileageRegisterBoard.COUNTS]: number;
  [MileageRegisterBoard.MOD_DATE]: string;
  [MileageRegisterBoard.STUDENTS]: ReactNode;
}

/**
 * @kind [마일리지 적립]
 * @brief 데이터 생성 함수
 *
 *  */
function createData(
  NUM: number,
  SEMESTER: string,
  ITEM_NAME: string,
  DESCRIPTION1: string,
  POINTS: number,
  COUNTS: number,
  MOD_DATE: string,
  STUDENTS: ReactNode
): Data {
  return {
    [MileageRegisterBoard.NUM]: NUM,
    [MileageRegisterBoard.SEMESTER]: SEMESTER,
    [MileageRegisterBoard.ITEM_NAME]: ITEM_NAME,
    [MileageRegisterBoard.DESCRIPTION1]: DESCRIPTION1,
    [MileageRegisterBoard.POINTS]: POINTS,
    [MileageRegisterBoard.COUNTS]: COUNTS,
    [MileageRegisterBoard.MOD_DATE]: MOD_DATE,
    [MileageRegisterBoard.STUDENTS]: STUDENTS,
  };
}

interface Record {
  id: number;
  studentName: string;
  counts: number;
  points: number;
  extraPoints: number;
  description1: string;
}

/**
 * @kind [학기별 마일리지 세부 항목]
 * @brief 테이블 헤더
 */
const headCells = [
  {
    id: [MileageRegisterBoard.NUM],
    numeric: false,
    disablePadding: true,
    label: '번호',
  },
  {
    id: [MileageRegisterBoard.SEMESTER],
    numeric: true,
    disablePadding: false,
    label: '학기',
  },
  {
    id: [MileageRegisterBoard.ITEM_NAME],
    numeric: true,
    disablePadding: false,
    label: '세부 항목명',
  },
  {
    id: [MileageRegisterBoard.DESCRIPTION1],
    numeric: true,
    disablePadding: false,
    label: '설명',
  },
  {
    id: [MileageRegisterBoard.POINTS],
    numeric: true,
    disablePadding: false,
    label: '마일리지',
  },
  {
    id: [MileageRegisterBoard.COUNTS],
    numeric: true,
    disablePadding: false,
    label: '등록수',
  },
  {
    id: [MileageRegisterBoard.MOD_DATE],
    numeric: true,
    disablePadding: false,
    label: '최근 수정일',
  },
  {
    id: [MileageRegisterBoard.STUDENTS],
    numeric: true,
    disablePadding: false,
    label: '학생 관리',
  },
];

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

const handleAllDelete = (id) => {
  if (window.confirm('등록된 학생 모두 삭제하시겠습니까?')) {
    axiosInstance.get(`/api/mileage/records/filter?semesterItemId=${id}`).then((res) => {
      res.data.list.forEach((item) => {
        axiosInstance.delete(`/api/mileage/records/${item.id}`).then(() => {
          alert(` ${item.student?.name} - ${item.student?.sid} 가 삭제 되었습니다.`);
        });
      });
    });
  }
};

const fetchToUseData = (data) =>
  data.list.map((semesterItem) => {
    const beforeData = {
      id: semesterItem.id,
      recordName: semesterItem.item.name,
      semesterItemId: semesterItem.id,
      semester: semesterItem.semesterName,
      itemName: semesterItem.item.name,
      categoryName: semesterItem.category.name,
    };

    return createData(
      semesterItem.id,
      // semesterItem.item.id,
      semesterItem.semesterName,
      semesterItem.item.name,
      semesterItem.item.description1,
      semesterItem.points,
      semesterItem.recordCount, //  학생수가 들어가야함
      formatDateToKorean(semesterItem.modDate),
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
}): InferGetServerSidePropsType<typeof getServerSideProps> {
  if (requireLogin) {
    handleServerAuth403Error(error);
    return;
  }

  const dispatch = useDispatch();
  const [convertedFetchList, setConvertedFetchList] = useState(fetchToUseData(fetchData));
  const semester = useSelector((state) => state.filter.semester);

  useEffect(() => {
    axiosInstance.get(`/api/mileage/semesters/${semester}/items`).then((res) => {
      setConvertedFetchList(fetchToUseData(res.data));
    });
  }, [semester]);

  return (
    <>
      <EnhancedTable originalRows={convertedFetchList} headCells={headCells} type="마일리지 적립" />
      <ExcelExport />
    </>
  );
}
