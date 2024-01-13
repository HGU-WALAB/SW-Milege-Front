import EnhancedTable from 'src/components/common/CustomTable';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {
  NUM,
  SID,
  GRADE,
  MANAGE,
  NAME,
  YEAR,
  SEMESTERCOUNT,
  EMAIL,
  MAJOR1,
  MAJOR2,
  LOGINCOUNT,
  DEPARTMENT,
  MAJOR,
  LASTLOGINDATE,
  REGDATE,
  ISCHECKED,
  MOBILE,
  MOD_DATE,
} from 'src/assets/data/fields';
import axiosInstance from 'src/utils/axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import SWModal from 'src/components/common/modal/SWModal';
import { EDITCATEGORY, EDITSTUDENT } from 'src/assets/data/modal/modals';
import { random } from 'lodash';
import { ReactNode } from 'react';
import { ID } from 'src/assets/data/fields';
import { formatDateToKorean } from 'src/utils/date/dateConverter';
import { setServerSideCookie } from 'src/auth/jwtCookie';
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

  'DEPARTMENT' = DEPARTMENT,
  'MAJOR' = MAJOR,
  'LASTLOGINDATE' = LASTLOGINDATE,
  'REGDATE' = REGDATE,
  'ISCHECKED' = ISCHECKED,
  'MOD_DATE' = MOD_DATE,
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
  [StudentManageBoard.DEPARTMENT]: string;
  [StudentManageBoard.MAJOR]: string;
  [StudentManageBoard.LASTLOGINDATE]: string;
  [StudentManageBoard.ISCHECKED]: string;
  [StudentManageBoard.MOD_DATE]: string;
  [StudentManageBoard.MANAGE]: string;
}
/**
 * @kind [학생 관리]
 * @brief 데이터 생성 함수
 *
 *  */
function createData(
  NUM: number,
  NAME: string,
  SID: number,
  GRADE: number,
  DEPARTMENT: string,
  MAJOR: string,
  LASTLOGINDATE: string,
  ISCHECKED: string,
  MOD_DATE: string,
  MANAGE: ReactNode
): Data {
  return {
    [StudentManageBoard.NUM]: NUM,
    [StudentManageBoard.NAME]: NAME,
    [StudentManageBoard.SID]: SID,
    [StudentManageBoard.GRADE]: GRADE,
    [StudentManageBoard.DEPARTMENT]: DEPARTMENT,
    [StudentManageBoard.MAJOR]: MAJOR,
    [StudentManageBoard.LASTLOGINDATE]: LASTLOGINDATE,
    [StudentManageBoard.ISCHECKED]: ISCHECKED,
    [StudentManageBoard.MOD_DATE]: MOD_DATE,
    [StudentManageBoard.MANAGE]: MANAGE,
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
    id: [StudentManageBoard.ISCHECKED],
    numeric: true,
    disablePadding: false,
    label: '승인',
  },
  {
    id: [StudentManageBoard.MOD_DATE],
    numeric: true,
    disablePadding: false,
    label: '최근 수정일',
  },
  {
    id: [StudentManageBoard.MANAGE],
    numeric: true,
    disablePadding: false,
    label: '수정',
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

    '전산전자공학부',
    'AI 컴퓨터공학심화',
    '2022-08-21',

    <CheckBoxIcon />,
    <ManageAccountsIcon />
  ),
  createData(
    2,
    '한시온',
    '21800447',
    '4(8)',

    '전산전자공학부',
    'AI 컴퓨터공학심화',
    '2022-08-21',

    <CheckBoxIcon />,
    <ManageAccountsIcon />
  ),
  createData(
    3,
    '김민수',
    '21800448',
    '4(8)',

    '전산전자공학부',
    'AI 컴퓨터공학심화',
    '2022-08-21',

    <CheckBoxIcon />,
    <ManageAccountsIcon />
  ),
  createData(
    4,
    '장유진',
    '21800449',
    '4(8)',

    '전산전자공학부',
    'AI 컴퓨터공학심화',
    '2022-08-21',

    <CheckBoxIcon />,
    <ManageAccountsIcon />
  ),
];

interface IStudent {
  [NAME]: string;
  [SID]: string;
  [YEAR]: number;
  [SEMESTERCOUNT]: number;
  [EMAIL]: string;
  [DEPARTMENT]: string;
  [MAJOR1]: string;
  [MAJOR2]: string;
  [LOGINCOUNT]: number;
  [LASTLOGINDATE]: string; // 더 정확한 타입을 원한다면 'Date' 타입을 사용할 수도 있습니다.

  [ISCHECKED]: boolean;
}

interface IStudentList {
  students: IStudent[];
}

export const getServerSideProps: GetServerSideProps<{
  fetchData: IStudentList;
}> = async (context) => {
  setServerSideCookie(context);
  // const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_API_KEY}/api/mileage/categories`);
  const res = await axiosInstance.get(`/api/mileage/students`);
  const fetchData = res.data;
  console.log(fetchData);

  return { props: { fetchData } };
};

export default function StudentManage({
  fetchData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const convertedFetchList = fetchData.list?.map((student) => {
    const beforeData = {
      [ID]: student[ID],
      [NAME]: student[NAME],
      [SID]: student[SID],

      [DEPARTMENT]: student[DEPARTMENT],
      [MAJOR1]: student[MAJOR1],
      [MAJOR2]: student[MAJOR2],

      [YEAR]: student[YEAR],
      [SEMESTERCOUNT]: student[SEMESTERCOUNT],
      [LASTLOGINDATE]: student[LASTLOGINDATE],
      [ISCHECKED]: student[ISCHECKED],
    };
    return createData(
      student[ID],
      student[NAME],
      student[SID],
      student[YEAR] + `( ${student[SEMESTERCOUNT]}학기 )`,
      student[DEPARTMENT],
      student[MAJOR1] + ' / ' + student[MAJOR2],
      student[LASTLOGINDATE]?.split('T')[0],
      student[ISCHECKED] ? (
        <CheckBoxIcon color="primary" />
      ) : (
        <CheckBoxOutlineBlankIcon color="primary" />
      ),
      formatDateToKorean(student[MOD_DATE]),
      <SWModal type={EDITSTUDENT} beforeData={beforeData} />
    );
  });

  return <EnhancedTable originalRows={convertedFetchList} headCells={headCells} type="학생 관리" />;
}
