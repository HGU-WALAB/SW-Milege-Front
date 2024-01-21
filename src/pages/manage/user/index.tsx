import EnhancedTable from 'src/components/common/CustomTable';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {
  NUM,
  NAME,
  AID,
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
import { setServerSideCookie } from 'src/auth/jwtCookie';
import { formatDateToKorean } from 'src/utils/date/dateConverter';
import { handleServerAuth403Error } from 'src/auth/utils';
import { withTryCatchForSSR } from 'src/utils/withTryCatchForSSR';
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
  'AID' = AID,
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
  [UserManageBoard.AID]: string;
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
  aid: string,
  authority: string,
  frequency: string,
  modDate: string,
  manage: ReactNode
): Data {
  return {
    [UserManageBoard.NUM]: num,
    [UserManageBoard.NAME]: name,
    [UserManageBoard.AID]: aid,
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
    id: [UserManageBoard.AID],
    numeric: true,
    disablePadding: false,
    label: '직번',
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
    label: '최근 로그인 날짜 ( 로그인 횟수 )',
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

const getServerSidePropsFunction: GetServerSideProps<{
  fetchData: any;
}> = async (context) => {
  setServerSideCookie(context);
  const res = await axiosInstance.get('/api/mileage/admins');
  const fetchData = res.data;
  console.log(fetchData);
  return { props: { fetchData } };
};

export const getServerSideProps = withTryCatchForSSR(getServerSidePropsFunction);

export default function UserManage({
  fetchData,
  requireLogin,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (requireLogin) {
    handleServerAuth403Error(error);
    return;
  }

  /**
   * @brief 마일리지 관리자 데이터
   */

  const convertedFetchList = fetchData.list?.map((item) => {
    const beforeData = {
      [ID]: item[ID],
      [NAME]: item[NAME],
      [AID]: item[AID],
      [LEVEL]: item[LEVEL],
      [LASTLOGINDATE]: item[LASTLOGINDATE],
    };

    return createData(
      item[ID],
      item[NAME],
      item[AID],
      levelConverter(item[LEVEL]),
      item[LASTLOGINDATE] + ` ( ${item[LOGINCOUNT]} )`,
      formatDateToKorean(item[MOD_DATE]),
      <SWModal type={EDITMANAGER} beforeData={beforeData} />
    );
  });

  return <EnhancedTable originalRows={convertedFetchList} headCells={headCells} type="관리자" />;
}
