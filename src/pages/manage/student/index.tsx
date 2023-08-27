import EnhancedTable from 'src/components/common/CustomTable';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {
  NUM,
  SID,
  GRADE,
  MOBILE,
  DEPARTMENT,
  MAJOR,
  LASTLOGINDATE,
  REGDATE,
  ISAPPROVED,
  MANAGE,
  NAME,
  YEAR,
  SEMESTERCOUNT,
  EMAIL,
  MAJOR1,
  MAJOR2,
} from 'src/assets/data/fields';
import axiosInstance from 'src/utils/axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import SWModal from 'src/components/common/modal/SWModal';
import { EDITCATEGORY, EDITSTUDENT } from 'src/assets/data/modal/modals';
import { random } from 'lodash';

/**
 * @component [학생 관리] 게시판
 */

/**
 * @kind [학생 관리]
 * @breif enum
 */

export enum StudentManageBoard {
  'NUM' = NUM,
  'NAME' = NAME,
  'SID' = SID,
  'GRADE' = GRADE,
  'MOBILE' = MOBILE,
  'DEPARTMENT' = DEPARTMENT,
  'MAJOR' = MAJOR,
  'LASTLOGINDATE' = LASTLOGINDATE,
  'REGDATE' = REGDATE,
  'ISAPPROVED' = ISAPPROVED,
  'MANAGE' = MANAGE,
}

/**
 * @kind [학생 관리]
 * @breif 데이터 인터페이스
 */
interface Data {
  [StudentManageBoard.NAME]: string;
  [StudentManageBoard.SID]: number;
  [StudentManageBoard.GRADE]: number;
  [StudentManageBoard.MOBILE]: number;
  [StudentManageBoard.DEPARTMENT]: string;
  [StudentManageBoard.MAJOR]: string;
  [StudentManageBoard.LASTLOGINDATE]: string;
  [StudentManageBoard.REGDATE]: string;
  [StudentManageBoard.ISAPPROVED]: string;
  [StudentManageBoard.MANAGE]: string;
}
/**
 * @kind [학생 관리]
 * @brief 데이터 생성 함수
 *
 *  */
function createData(
  num: number,
  name: string,
  sid: number,
  grade: number,
  mobile: number,
  department: string,
  major: string,
  lastLoginDate: string,
  regDate: string,
  isApproved: string,
  manage: string
): Data {
  return {
    [StudentManageBoard.NUM]: num,
    [StudentManageBoard.NAME]: name,
    [StudentManageBoard.SID]: sid,
    [StudentManageBoard.GRADE]: grade,
    [StudentManageBoard.MOBILE]: mobile,
    [StudentManageBoard.DEPARTMENT]: department,
    [StudentManageBoard.MAJOR]: major,
    [StudentManageBoard.LASTLOGINDATE]: lastLoginDate,
    [StudentManageBoard.REGDATE]: regDate,
    [StudentManageBoard.ISAPPROVED]: isApproved,
    [StudentManageBoard.MANAGE]: manage,
  };
}

/**
 * @kind [학생 관리]
 * @brief 테이블 헤더
 */ const headCells = [
  {
    id: [StudentManageBoard.NUM],
    numeric: false,
    disablePadding: true,
    label: '번호',
  },
  {
    id: [StudentManageBoard.NAME],
    numeric: true,
    disablePadding: false,
    label: '이름',
  },
  {
    id: [StudentManageBoard.SID],
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
    id: [StudentManageBoard.MOBILE],
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
    id: [StudentManageBoard.LASTLOGINDATE],
    numeric: true,
    disablePadding: false,
    label: '빈도수',
  },
  {
    id: [StudentManageBoard.REGDATE],
    numeric: true,
    disablePadding: false,
    label: '등록일',
  },
  {
    id: [StudentManageBoard.ISAPPROVED],
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
  [NAME]: string;
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

  const convertedFetchList = fetchData.students?.map((student) => {
    const beforeData = {
      [NAME]: student[NAME],
      [SID]: student[SID],
      [YEAR]: student[YEAR],
      [SEMESTERCOUNT]: student[SEMESTERCOUNT],
      [MOBILE]: student[MOBILE],
      [EMAIL]: student[EMAIL],
      [DEPARTMENT]: student[DEPARTMENT],
      [MAJOR1]: student[MAJOR1],
      [MAJOR2]: student[MAJOR2],
      [LASTLOGINDATE]: student[LASTLOGINDATE],
      [REGDATE]: student[REGDATE],
      [ISAPPROVED]: student[ISAPPROVED],
    };
    return createData(
      random(1, 100),
      student.name,
      student.sid,
      student.year,
      student.mobile,
      student.department,
      student.major1 + ' / ' + student.major2,
      student.lastLoginDate.split('T')[0],
      student.regDate.split('T')[0],
      student.isApproved ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />,
      <SWModal type={EDITSTUDENT} beforeData={beforeData} />
    );
  });

  console.log('!!');
  return <EnhancedTable originalRows={convertedFetchList} headCells={headCells} type="학생 관리" />;
}
