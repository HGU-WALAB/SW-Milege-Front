import EnhancedTable from 'src/components/common/CustomTable';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {
  NUM,
  NAME,
  EMAIL,
  AUTHORITY,
  FREQUENCY,
  ID,
  MANAGE,
  TITLE,
  DESCRIPTION1,
  DESCRIPTION2,
  ORDER_IDX,
  LASTLOGINDATE,
  LOGINCOUNT,
  LEVEL,
} from 'src/assets/data/fields';
import UserManage from '../../../components/board/UserManage';
import axiosInstance from 'src/utils/axios';
import { MOD_DATE } from '../../../assets/data/fields';
import SWModal from 'src/components/common/modal/SWModal';
import { EDITMANAGER } from 'src/assets/data/modal/modals';

/**
 * @component [사용자 관리] 게시판
 */

/**
 * @kind [사용자 관리]
 * @breif enum
 */

export enum UserManageBoard {
  'NUM' = NUM,
  'NAME' = NAME,
  'EMAIL' = EMAIL,
  'AUTHORITY' = AUTHORITY,
  'FREQUENCY' = FREQUENCY,
  'MOD_DATE' = MOD_DATE,
  'MANAGE' = MANAGE,
}

/**
 * @kind [사용자 관리]
 * @breif 데이터 인터페이스
 */
interface Data {
  [UserManageBoard.NAME]: string;
  [UserManageBoard.EMAIL]: string;
  [UserManageBoard.AUTHORITY]: string;
  [UserManageBoard.FREQUENCY]: string;
  [UserManageBoard.MOD_DATE]: string;
  [UserManageBoard.MANAGE]: ReactNode;
}
/**
 * @kind [사용자 관리]
 * @brief 데이터 생성 함수
 *
 *  */
function createData(
  num: number,
  name: string,
  email: string,
  authority: string,
  frequency: string,
  modDate: string,
  manage: ReactNode
): Data {
  return {
    [UserManageBoard.NUM]: num,
    [UserManageBoard.NAME]: name,
    [UserManageBoard.EMAIL]: email,
    [UserManageBoard.AUTHORITY]: authority,
    [UserManageBoard.FREQUENCY]: frequency,
    [UserManageBoard.MOD_DATE]: modDate,
    [UserManageBoard.MANAGE]: manage,
  };
}

/**
 * @kind [사용자 관리]
 * @brief 테이블 헤더
 */
const headCells = [
  {
    id: [UserManageBoard.NUM],
    numeric: false,
    disablePadding: true,
    label: '번호',
  },
  {
    id: [UserManageBoard.NAME],
    numeric: true,
    disablePadding: false,
    label: '이름',
  },
  {
    id: [UserManageBoard.EMAIL],
    numeric: true,
    disablePadding: false,
    label: '이메일',
  },
  {
    id: [UserManageBoard.AUTHORITY],
    numeric: true,
    disablePadding: false,
    label: '권한',
  },
  {
    id: [UserManageBoard.FREQUENCY],
    numeric: true,
    disablePadding: false,
    label: '최근 로그인 ( 로그인 횟수 )',
  },
  {
    id: [UserManageBoard.MOD_DATE],
    numeric: true,
    disablePadding: false,
    label: '최근 수정일',
  },
  {
    id: [UserManageBoard.MANAGE],
    numeric: true,
    disablePadding: false,
    label: '수정',
  },
];

/**
 * @kind [사용자 관리]
 * @description 마일리지 항목 리스트
 */

const rows = [
  createData(1, '오인혁', '21800446@email.com', '관리자', '20(2023-08-22)'),
  createData(2, '한시온', '21800447@email.com', '관리자', '20(2023-08-22)'),
  createData(3, '장유진', '21800448@email.com', '관리자', '20(2023-08-22)'),
  createData(4, '장소연', '21800449@email.com', '관리자', '20(2023-08-22)'),
  createData(5, '김광', '21800450', '관리자', '20(2023-08-22)'),
];

export const getServerSideProps: GetServerSideProps<{
  fetchData: any;
}> = async () => {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_API_KEY}/api/mileage/categories`);
  const res = await axiosInstance.get('/api/mileage/admins');
  const fetchData = res.data;
  console.log(fetchData);
  return { props: { fetchData } };
};

export default function UserManage({
  fetchData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const levelConverter = (level) => {
    switch (level) {
      case 0:
        return '관리자';
      case 1:
        return '담당자';
      case 2:
        return '일반';
      case 3:
        return '미등록';
    }
  };
  /**
   * @brief 마일리지 관리자 데이터
   */

  const convertedFetchList = fetchData.list?.map((item) => {
    const beforeData = {
      [ID]: item[ID],
      [NAME]: item[NAME],
      [EMAIL]: item[EMAIL],
      [LEVEL]: item[LEVEL],
      [LASTLOGINDATE]: item[LASTLOGINDATE],
    };

    return createData(
      item[ID],
      item[NAME],
      item[EMAIL],
      levelConverter(item[LEVEL]),
      item[LASTLOGINDATE] + ` ( ${item[LOGINCOUNT]} )`,
      item[MOD_DATE],
      <SWModal type={EDITMANAGER} beforeData={beforeData} />
    );
  });

  return (
    <EnhancedTable originalRows={convertedFetchList} headCells={headCells} type="사용자 관리" />
  );
}
