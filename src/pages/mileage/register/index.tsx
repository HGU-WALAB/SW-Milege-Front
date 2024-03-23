import { StarIcon } from 'src/theme/overrides/CustomIcons';
import EnhancedTable from 'src/components/common/CustomTable';
import AddIcon from '@mui/icons-material/Add';
import {
  NUM,
  SEMESTER,
  ITEM,
  DESCRIPTION,
  FILE,
  MODIFYIED_DATE,
  ADD,
  STUDENTS,
  POINTS,
  DESCRIPTION2,
  STUDENT_ID,
  EXTRAPOINTS,
  COUNTS,
  ID,
  RECORD_NAME,
  SEMESTERITEMID,
  SEMESTER_NAME,
  ITEM_NAME,
  CATEGORY_NAME,
  MOD_DATE,
  SEMESTER_ITEM_ID,
} from 'src/assets/data/fields';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { REGISTER_NUM, STUDENT_NAME, DESCRIPTION1 } from '../../../assets/data/fields';
import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import axiosInstance from 'src/utils/axios';
import SWModal from 'src/components/common/modal/SWModal';
import {
  ADDMILEAGEREGISTER,
  EDITMILEAGEREGISTER,
  REGISTEREDSTUDENTS,
} from 'src/assets/data/modal/modals';
import CollapsibleTable from 'src/components/common/CollapsibleTable';
import CRUDStudentTable from 'src/components/common/Table/CRUDStudentTable';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { IconButton, Tooltip } from '@mui/material';
import { Box } from '@mui/system';
import { setServerSideCookie } from 'src/auth/jwtCookie';
import { formatDateToKorean } from 'src/utils/date/dateConverter';
import { setSemester } from 'src/redux/slices/filter';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { withTryCatchForSSR } from 'src/utils/withTryCatchForSSR';
import { handleServerAuth403Error } from 'src/auth/utils';

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
  description2: string;
}

interface semesterItemsWithStudents {
  id: number;
  itemName: string;
  categoryName: string;
  semesterName: string;
  points: number;
  itemMaxPoints: number;
  categoryMaxPoints: number;
  records: Record[];
}

type semesterItemsWithStudentList = semesterItemsWithStudents[];

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
    label: '항목명',
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
    label: '학생 관리 (조회 , 추가 , 모두 삭제)',
  },
];

const getServerSidePropsFunction: GetServerSideProps<{
  fetchData: ISemesterItemList;
}> = async (context) => {
  setServerSideCookie(context);

  const semesterRes = await axiosInstance.get(`/api/mileage/semesters/currentSemester`);
  const nowSemester = semesterRes.data.data.name;
  const res = await axiosInstance.get(`/api/mileage/semesters/${nowSemester}/items`);

  let fetchData = res.data;
  return { props: { fetchData } };
};

export const getServerSideProps = withTryCatchForSSR(getServerSidePropsFunction);

const fetchToUseData = (data) => {
  return data.list.map((semesterItem, index) => {
    const beforeData = {
      [ID]: semesterItem.id,
      [RECORD_NAME]: semesterItem.item.name,
      [SEMESTER_ITEM_ID]: semesterItem.id,
      [SEMESTER]: semesterItem.semesterName,
      [ITEM_NAME]: semesterItem.item.name,
      [CATEGORY_NAME]: semesterItem.category.name,
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
        <SWModal type={REGISTEREDSTUDENTS} beforeData={beforeData} />
        <SWModal type={ADDMILEAGEREGISTER} beforeData={beforeData} />
        <IconButton onClick={() => handleAllDelete(semesterItem.id)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    );
  });
};

const handleAllDelete = (id) => {
  if (window.confirm('등록된 학생 모두 삭제하시겠습니까?')) {
    axiosInstance.get(`/api/mileage/records/filter?semesterItemId=${id}`).then((res) => {
      res.data.list.map((item) => {
        axiosInstance.delete(`/api/mileage/records/${item.id}`).then((res) => {
          alert(` ${item.student?.name} - ${item.student?.sid} 가 삭제 되었습니다.`);
        });
      });
    });
  }
};

export default function MileageRegister({
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

  const semester = useSelector((state) => state.filter.semester);

  useEffect(() => {
    axiosInstance.get(`/api/mileage/semesters/${semester}/items`).then((res) => {
      setConvertedFetchList(fetchToUseData(res.data));
    });
  }, [semester]);

  return (
    <>
      <EnhancedTable originalRows={convertedFetchList} headCells={headCells} type="마일리지 적립" />
    </>
  );
}
