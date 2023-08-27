import EnhancedTable from 'src/components/common/CustomTable';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
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
  MANAGE,
} from 'src/assets/data/fields';
import axiosInstance from 'src/utils/axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

/**
 * @component [학생 관리] 게시판
 */

/**
 * @kind [학생 관리]
 * @breif enum
 */

export enum StudentManageBoard {
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
  'MANAGE' = MANAGE,
}

/**
 * @kind [학생 관리]
 * @breif 데이터 인터페이스
 */
interface Data {
  [StudentManageBoard.STUDENT_NAME]: string;
  [StudentManageBoard.STUDENT_ID]: number;
  [StudentManageBoard.GRADE]: number;
  [StudentManageBoard.CONTACT]: number;
  [StudentManageBoard.DEPARTMENT]: string;
  [StudentManageBoard.MAJOR]: string;
  [StudentManageBoard.FREQUENCY]: string;
  [StudentManageBoard.REGISTERED_DATE]: string;
  [StudentManageBoard.APPROVE]: string;
  [StudentManageBoard.MANAGE]: string;
}
/**
 * @kind [학생 관리]
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
  manage: string
): Data {
  return {
    [StudentManageBoard.NUM]: num,
    [StudentManageBoard.STUDENT_NAME]: studentName,
    [StudentManageBoard.STUDENT_ID]: studentId,
    [StudentManageBoard.GRADE]: grade,
    [StudentManageBoard.CONTACT]: contact,
    [StudentManageBoard.DEPARTMENT]: department,
    [StudentManageBoard.MAJOR]: major,
    [StudentManageBoard.FREQUENCY]: frequency,
    [StudentManageBoard.REGISTERED_DATE]: registeredDate,
    [StudentManageBoard.APPROVE]: approve,
    [StudentManageBoard.MANAGE]: manage,
  };
}

/**
 * @kind [학생 관리]
 * @brief 테이블 헤더
 */
const headCells = [
  {
    id: [StudentManageBoard.NUM],
    numeric: false,
    disablePadding: true,
    label: '번호',
  },
  {
    id: [StudentManageBoard.STUDENT_NAME],
    numeric: true,
    disablePadding: false,
    label: '이름',
  },
  {
    id: [StudentManageBoard.STUDENT_ID],
    numeric: true,
    disablePadding: false,
    label: '학번',
  },
  {
    id: [StudentManageBoard.GRADE],
    numeric: true,
    disablePadding: false,
    label: '학년',
  },
  {
    id: [StudentManageBoard.CONTACT],
    numeric: true,
    disablePadding: false,
    label: '연락처',
  },
  {
    id: [StudentManageBoard.DEPARTMENT],
    numeric: true,
    disablePadding: false,
    label: '학부',
  },
  {
    id: [StudentManageBoard.MAJOR],
    numeric: true,
    disablePadding: false,
    label: '전공',
  },
  {
    id: [StudentManageBoard.FREQUENCY],
    numeric: true,
    disablePadding: false,
    label: '빈도수',
  },
  {
    id: [StudentManageBoard.REGISTERED_DATE],
    numeric: true,
    disablePadding: false,
    label: '등록일',
  },
  {
    id: [StudentManageBoard.APPROVE],
    numeric: true,
    disablePadding: false,
    label: '승인',
  },
  {
    id: [StudentManageBoard.MANAGE],
    numeric: true,
    disablePadding: false,
    label: '신청 취소',
  },
];

/**
 * @kind [학생 관리]
 * @description 마일리지 항목 리스트
 */

const rows = [
  createData(
    1,
    '오인혁',
    '21800446',
    '4(8)',
    '010-6536-6217',
    '전산전자공학부',
    'AI 컴퓨터공학심화',
    '2022-08-21',
    '2022-08-20',
    <CheckBoxIcon />,
    <ManageAccountsIcon />
  ),
  createData(
    2,
    '한시온',
    '21800447',
    '4(8)',
    '010-6536-6217',
    '전산전자공학부',
    'AI 컴퓨터공학심화',
    '2022-08-21',
    '2022-08-20',
    <CheckBoxIcon />,
    <ManageAccountsIcon />
  ),
  createData(
    3,
    '김민수',
    '21800448',
    '4(8)',
    '010-6536-6217',
    '전산전자공학부',
    'AI 컴퓨터공학심화',
    '2022-08-21',
    '2022-08-20',
    <CheckBoxIcon />,
    <ManageAccountsIcon />
  ),
  createData(
    4,
    '장유진',
    '21800449',
    '4(8)',
    '010-6536-6217',
    '전산전자공학부',
    'AI 컴퓨터공학심화',
    '2022-08-21',
    '2022-08-20',
    <CheckBoxIcon />,
    <ManageAccountsIcon />
  ),
];

interface IStudent {
  name: string;
  sid: string;
  year: number;
  semesterCount: number;
  mobile: string;
  email: string;
  department: string;
  major1: string;
  major2: string;
  loginCount: number;
  lastLoginDate: string; // 더 정확한 타입을 원한다면 'Date' 타입을 사용할 수도 있습니다.
  regDate: string; // 더 정확한 타입을 원한다면 'Date' 타입을 사용할 수도 있습니다.
  isApproved: boolean;
}

interface IStudentList {
  students: IStudent[];
}

export const getServerSideProps: GetServerSideProps<{
  fetchData: IStudentList;
}> = async () => {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_API_KEY}/api/mileage/categories`);
  const res = await axiosInstance.get(`/api/mileage/students`);
  const fetchData = res.data;
  console.log(fetchData);

  return { props: { fetchData } };
};

export default function StudentManage({
  fetchData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log('dd', fetchData);

  console.log('!!');
  return <EnhancedTable originalRows={rows} headCells={headCells} type="학생 관리" />;
}
