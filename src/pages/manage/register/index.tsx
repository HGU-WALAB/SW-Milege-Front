import EnhancedTable from 'src/components/common/CustomTable';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
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
} from 'src/assets/data/fields';
import { EDITSTUDENT } from 'src/assets/data/modal/modals';
import { setServerSideCookie } from 'src/auth/jwtCookie';
import axiosInstance from 'src/utils/axios';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { formatDateToKorean } from 'src/utils/date/dateConverter';
import SWModal from 'src/components/common/modal/SWModal';

/**
 * @component [신청자 관리] 게시판
 */

/**
 * @kind [신청자 관리]
 * @breif enum
 */

export enum RegisterManageBoard {
  'NUM' = NUM,
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
  studentName: string,
  studentId: number,
  grade: number,
  contact: number,
  department: string,
  major: string,
  frequency: string,
  registeredDate: string,
  approve: string,
  reject: string
): Data {
  return {
    [RegisterManageBoard.NUM]: num,
    [RegisterManageBoard.STUDENT_NAME]: studentName,
    [RegisterManageBoard.STUDENT_ID]: studentId,
    [RegisterManageBoard.GRADE]: grade,
    [RegisterManageBoard.CONTACT]: contact,
    [RegisterManageBoard.DEPARTMENT]: department,
    [RegisterManageBoard.MAJOR]: major,
    [RegisterManageBoard.FREQUENCY]: frequency,
    [RegisterManageBoard.REGISTERED_DATE]: registeredDate,
    [RegisterManageBoard.APPROVE]: approve,
    [RegisterManageBoard.REJECT]: reject,
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
    label: '등록일',
  },
  {
    id: [RegisterManageBoard.APPROVE],
    numeric: true,
    disablePadding: false,
    label: '승인 여부',
  },
  {
    id: [RegisterManageBoard.APPROVE],
    numeric: true,
    disablePadding: false,
    label: '마지막 로그인 날짜',
  },
  {
    id: [RegisterManageBoard.REJECT],
    numeric: true,
    disablePadding: false,
    label: '수정',
  },
];

/**
 * @kind [신청자 관리]
 * @description 마일리지 항목 리스트
 */

// const rows = [
//   createData(
//     1,
//     '오인혁',
//     '21800446',
//     '4(8)',
//     '010-6536-6217',
//     '전산전자공학부',
//     'AI 컴퓨터공학심화',
//     '2022-08-21',
//     '2022-08-20',
//     <CheckBoxIcon />,
//     <HighlightOffIcon />
//   ),
//   createData(
//     2,
//     '한시온',
//     '21800447',
//     '4(8)',
//     '010-6536-6217',
//     '전산전자공학부',
//     'AI 컴퓨터공학심화',
//     '2022-08-21',
//     '2022-08-20',
//     <CheckBoxIcon />,
//     <HighlightOffIcon />
//   ),
//   createData(
//     3,
//     '김민수',
//     '21800448',
//     '4(8)',
//     '010-6536-6217',
//     '전산전자공학부',
//     'AI 컴퓨터공학심화',
//     '2022-08-21',
//     '2022-08-20',
//     <CheckBoxIcon />,
//     <HighlightOffIcon />
//   ),
//   createData(
//     4,
//     '장유진',
//     '21800449',
//     '4(8)',
//     '010-6536-6217',
//     '전산전자공학부',
//     'AI 컴퓨터공학심화',
//     '2022-08-21',
//     '2022-08-20',
//     <CheckBoxIcon />,
//     <HighlightOffIcon />
//   ),
// ];

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

export const getServerSideProps: GetServerSideProps<{
  fetchData: IGetApplicationList;
}> = async (context) => {
  setServerSideCookie(context);
  // const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_API_KEY}/api/mileage/categories`);
  const semesterRes = await axiosInstance.get(`api/mileage/semesters/currentSemester`);
  const nowSemester = semesterRes.data.data.name;
  const res = await axiosInstance.get(`/api/mileage/apply/semester/${nowSemester}`);
  const fetchData = res.data;
  console.log(fetchData);

  return { props: { fetchData } };
};

export default function RegisterManage({
  fetchData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const convertedFetchList = fetchData.list?.map((regData) => {
    const beforeData = {
      [ID]: regData[ID],
      [NAME]: regData.student[NAME],
      [SID]: regData.student[SID],
      [DEPARTMENT]: regData.student[DEPARTMENT],
      [MAJOR1]: regData.student[MAJOR1],
      [MAJOR2]: regData.student[MAJOR2],
      [YEAR]: regData.student[YEAR],
      [SEMESTERCOUNT]: regData.student[SEMESTERCOUNT],
      [LASTLOGINDATE]: regData.student[LASTLOGINDATE],
      [ISCHECKED]: regData.student[ISCHECKED],
    };
    return createData(
      regData[ID],
      regData.student[NAME],
      regData.student[SID],
      regData.student[YEAR] + `( ${regData.student[SEMESTERCOUNT]}학기 )`,
      regData.student[DEPARTMENT],
      regData.student[MAJOR1] + ` ${regData.student[MAJOR2]}`,
      regData.student[LASTLOGINDATE]?.split('T')[0],
      regData.student[ISCHECKED] ? (
        <CheckBoxIcon color="primary" />
      ) : (
        <CheckBoxOutlineBlankIcon color="primary" />
      ),
      formatDateToKorean(regData.student[MOD_DATE]),
      <SWModal type={EDITSTUDENT} beforeData={beforeData} />
    );
  });
  return (
    <EnhancedTable originalRows={convertedFetchList} headCells={headCells} type="신청자 관리" />
  );
}
