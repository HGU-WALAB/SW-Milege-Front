import EnhancedTable from 'src/components/common/CustomTable';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {
  NUM,
  STUDENT_NAME,
  STUDENT_ID,
  GRADE,
  CONTACT,
  DEPARTMENT,
  MAJOR,
  FREQUENCY,
  REGISTERED_DATE,
  APPROVE,
  REJECT,
  ID,
  NAME,
  SID,
  MAJOR1,
  MAJOR2,
  YEAR,
  SEMESTERCOUNT,
  LASTLOGINDATE,
  ISCHECKED,
  MOD_DATE,
  SEMESTER_NAME,
  SEMESTER,
  ISAPPROVED,
  EMAIL,
  REGDATE,
} from 'src/assets/data/fields';
import { EDITSTUDENT } from 'src/assets/data/modal/modals';
import { setServerSideCookie } from 'src/auth/jwtCookie';
import axiosInstance from 'src/utils/axios';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import SWModal from 'src/components/common/modal/SWModal';
import { ReactNode } from 'react';
import { withTryCatchForSSR } from 'src/utils/withTryCatchForSSR';
import { handleServerAuth403Error } from 'src/auth/utils';
import ExcelExport from 'src/components/excel/ExcelExport';
import { PATH_API } from 'src/routes/paths';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

/**
 * @component [신청자 관리] 게시판
 */

/**
 * @kind [신청자 관리]
 * @breif enum
 */

export enum RegisterManageBoard {
  'NUM' = NUM,
  'SEMESTER' = SEMESTER,
  'STUDENT_NAME' = STUDENT_NAME,
  'STUDENT_ID' = STUDENT_ID,
  'GRADE' = GRADE,
  'CONTACT' = CONTACT,
  'DEPARTMENT' = DEPARTMENT,
  'MAJOR' = MAJOR,
  'FREQUENCY' = FREQUENCY,
  'REGISTERED_DATE' = REGISTERED_DATE,
  'APPROVE' = APPROVE,
  'REJECT' = REJECT,
}

/**
 * @kind [신청자 관리]
 * @breif 데이터 인터페이스
 */
interface Data {
  [RegisterManageBoard.STUDENT_NAME]: string;
  [RegisterManageBoard.SEMESTER]: string;
  [RegisterManageBoard.STUDENT_ID]: number;
  [RegisterManageBoard.GRADE]: number;
  [RegisterManageBoard.CONTACT]: number;
  [RegisterManageBoard.DEPARTMENT]: string;
  [RegisterManageBoard.MAJOR]: string;
  [RegisterManageBoard.FREQUENCY]: string;
  [RegisterManageBoard.REGISTERED_DATE]: string;
  [RegisterManageBoard.APPROVE]: string;
  [RegisterManageBoard.REJECT]: string;
}

/**
 * @kind [신청자 관리]
 * @brief 데이터 생성 함수
 *
 *  */
function createData(
  num: number,
  semester: string,
  studentName: string,
  studentId: number,
  grade: string,
  contact: string,
  department: string,
  major: string,
  registeredDate: string,
  approve: ReactNode,
  modal: ReactNode
): Data {
  return {
    [RegisterManageBoard.NUM]: num,
    [RegisterManageBoard.SEMESTER]: semester,
    [RegisterManageBoard.STUDENT_NAME]: studentName,
    [RegisterManageBoard.STUDENT_ID]: studentId,
    [RegisterManageBoard.GRADE]: grade,
    [RegisterManageBoard.CONTACT]: contact,
    [RegisterManageBoard.DEPARTMENT]: department,
    [RegisterManageBoard.MAJOR]: major,
    [RegisterManageBoard.REGISTERED_DATE]: registeredDate,
    [RegisterManageBoard.APPROVE]: approve,
    [RegisterManageBoard.REJECT]: modal,
  };
}

/**
 * @kind [신청자 관리]
 * @brief 테이블 헤더
 */
const headCells = [
  {
    id: [RegisterManageBoard.NUM],
    numeric: false,
    disablePadding: true,
    label: '번호',
  },
  {
    id: [RegisterManageBoard.SEMESTER],
    numeric: true,
    disablePadding: false,
    label: '학기',
  },
  {
    id: [RegisterManageBoard.STUDENT_NAME],
    numeric: true,
    disablePadding: false,
    label: '이름',
  },
  {
    id: [RegisterManageBoard.STUDENT_ID],
    numeric: true,
    disablePadding: false,
    label: '학번',
  },
  {
    id: [RegisterManageBoard.GRADE],
    numeric: true,
    disablePadding: false,
    label: '학년',
  },
  {
    id: [RegisterManageBoard.CONTACT],
    numeric: true,
    disablePadding: false,
    label: '이메일',
  },
  {
    id: [RegisterManageBoard.DEPARTMENT],
    numeric: true,
    disablePadding: false,
    label: '학부',
  },
  {
    id: [RegisterManageBoard.MAJOR],
    numeric: true,
    disablePadding: false,
    label: '전공',
  },
  {
    id: [RegisterManageBoard.REGISTERED_DATE],
    numeric: true,
    disablePadding: false,
    label: '신청일',
  },
  {
    id: [RegisterManageBoard.APPROVE],
    numeric: true,
    disablePadding: false,
    label: '승인 여부',
  },
  {
    id: [RegisterManageBoard.REJECT],
    numeric: true,
    disablePadding: false,
    label: '수정',
  },
];

interface IStudent {
  id: number;
  name: string;
  sid: string;
  department: string;
  major1: string;
  major2: string;
  year: number;
  semesterCount: number;
  loginCount: number;
  lastLoginDate: string;
  isChecked: boolean;
  modDate: string;
}

interface IApplication {
  id: number;
  semesterName: string;
  isApproved: boolean;
  student: IStudent;
  modDate: string;
}

interface IGetApplicationList {
  description: string;
  count: number;
  list: IApplication[];
}

const getServerSidePropsFunction: GetServerSideProps<{
  fetchData: IGetApplicationList;
}> = async (context) => {
  setServerSideCookie(context);
  const semesterRes = await axiosInstance.get(`/api/mileage/semesters/currentSemester`);
  const nowSemester = semesterRes.data.data.name;
  const res = await axiosInstance.get(`/api/mileage/apply/semester/${nowSemester}`);
  const fetchData = res.data;

  return { props: { fetchData, nowSemester } };
};

export const getServerSideProps = withTryCatchForSSR(getServerSidePropsFunction);

const fetchToUseData = (data, semester) =>
  data.list.map((regData) => {
    const beforeData = {
      [NAME]: regData.student[NAME],
      [ID]: regData.student[SID],
      [DEPARTMENT]: regData.student[DEPARTMENT],
      [MAJOR1]: regData.student[MAJOR1],
      [MAJOR2]: regData.student[MAJOR2],
      [YEAR]: regData.student[YEAR],
      [SEMESTERCOUNT]: regData.student[SEMESTERCOUNT],
      [LASTLOGINDATE]: regData.student[LASTLOGINDATE],
      [ISAPPROVED]: regData.student[ISAPPROVED],
    };

    return createData(
      regData.student[SID],
      semester,
      regData.student[NAME],
      regData.student[SID],
      `${regData.student[YEAR]}(${regData.student[SEMESTERCOUNT]}학기)`,
      regData.student[EMAIL],
      regData.student[DEPARTMENT],
      `${regData.student[MAJOR1]}\n${regData.student[MAJOR2]}`,
      regData[REGDATE]?.split('T')[0],
      regData.student[ISAPPROVED] ? (
        <CheckBoxIcon color="primary" />
      ) : (
        <CheckBoxOutlineBlankIcon color="primary" />
      ),
      <SWModal type={EDITSTUDENT} beforeData={beforeData} />
    );
  });

export default function RegisterManage({
  fetchData,
  nowSemester,
  requireLogin,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (requireLogin) {
    handleServerAuth403Error(error);
    return;
  }
  return (
    <>
      <EnhancedTable
        originalRows={fetchToUseData(fetchData, nowSemester)}
        headCells={headCells}
        type="신청자 관리"
      />
      <ExcelExport endpoint={PATH_API.excel.download.register} queryParams={{ nowSemester }} />
    </>
  );
}
