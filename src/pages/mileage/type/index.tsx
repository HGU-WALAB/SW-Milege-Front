import EnhancedTable from 'src/components/common/CustomTable';
import {
  MAX_MILEAGE,
  MANAGE,
  CHECK_BOX,
  DESCRIPTION,
  NAME,
  ID,
  TYPE,
  TITLE,
  MOD_DATE,
  ITEM_COUNT,
  CATEGORY_MAX_POINTS,
  ORDER_IDX,
  CATEGORY_COUNT,
  LIST,
} from 'src/assets/data/fields';
import SWModal from 'src/components/common/modal/SWModal';
import { EDITTYPE, SHOWLIST } from 'src/assets/data/modal/modals';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { dispatch } from 'src/redux/store';
import { setMileageCategoryList } from 'src/redux/slices/data';
import { setServerSideCookie } from 'src/auth/jwtCookie';
import axiosInstance from 'src/utils/axios';
import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import MileageCategory from 'src/components/board/MileageCategory';
import { setCategoryList } from 'src/redux/slices/filter';
import { DESCRIPTION1, CATEGORY, DESCRIPTION2, NUM } from '../../../assets/data/fields';
import axios from 'axios';
import { getCookie } from '../view';
import { formatDateToKorean } from 'src/utils/date/dateConverter';
import { withTryCatchForSSR } from 'src/utils/withTryCatchForSSR';
import { handleServerAuth403Error } from 'src/auth/utils';

/**
 * @breif [마일리지 타입] 게시판
 */

export enum MileageTypeBoard {
  'NUM' = NUM,
  'NAME' = NAME,
  'DESCRIPTION' = DESCRIPTION,
  'CATEGORY_COUNT' = CATEGORY_COUNT,
  'MOD_DATE' = MOD_DATE,
  'MANAGE' = MANAGE,
  'LIST' = LIST,
}

/**
 * @kind 마일리지 카테로리
 * @breif 데이터 인터페이스
 */

interface Data {
  [MileageTypeBoard.NUM]: number;
  [MileageTypeBoard.NAME]: string;
  [MileageTypeBoard.DESCRIPTION]: string;
  [MileageTypeBoard.CATEGORY_COUNT]: number;
  [MileageTypeBoard.MOD_DATE]: string;
  [MileageTypeBoard.MANAGE]: ReactNode;
  [MileageTypeBoard.LIST]: ReactNode;
}

/**
 * @kind 마일리지 카테고리
 * @brief 데이터 생성 함수
 *
 */

function createData(
  NUM: number,
  NAME: string,
  DESCRIPTION: string,
  CATEGORY_COUNT: number,
  MOD_DATE: string,
  MANAGE: ReactNode,
  LIST: ReactNode
): Data {
  return {
    [MileageTypeBoard.NUM]: NUM,
    [MileageTypeBoard.NAME]: NAME,
    [MileageTypeBoard.DESCRIPTION1]: DESCRIPTION,
    [MileageTypeBoard.CATEGORY_COUNT]: CATEGORY_COUNT,
    [MileageTypeBoard.MOD_DATE]: MOD_DATE,
    [MileageTypeBoard.MANAGE]: MANAGE,
    [MileageTypeBoard.LIST]: LIST,
  };
}

/**
 * @number 1번 헤더
 * @description 마일리지 카테고리 리스트
 */
const headCells = [
  {
    id: [MileageTypeBoard.NUM],
    numeric: false,
    disablePadding: true,
    label: '번호',
  },
  {
    id: [MileageTypeBoard.NAME],
    numeric: true,
    disablePadding: false,
    label: '이름',
  },
  {
    id: [MileageTypeBoard.DESCRIPTION],
    numeric: true,
    disablePadding: false,
    label: '설명',
  },
  {
    id: [MileageTypeBoard.CATEGORY_COUNT],
    numeric: true,
    disablePadding: false,
    label: '하위 마일리지 세부항목 개수',
  },
  {
    id: [MileageTypeBoard.MOD_DATE],
    numeric: true,
    disablePadding: false,
    label: '최근 수정일',
  },
  {
    id: [MileageTypeBoard.MANAGE],
    numeric: true,
    disablePadding: false,
    label: '관리',
  },
  {
    id: [MileageTypeBoard.LIST],
    numeric: true,
    disablePadding: false,
    label: '목록',
  },
];

interface IList {
  id: number;
  name: string;
  description: string;
  categoryCount: string;
  modDate: Date;
}

interface IGetMileageType {
  description: string;
  count: number;
  list: IList[];
}



const getServerSidePropsFunction: GetServerSideProps<{
  fetchData: IGetMileageType;
}> = async (context) => {
  setServerSideCookie(context);
  const res = await axiosInstance.get('/api/mileage/types');
  const fetchData = res.data;
  return { props: { fetchData } };
};

export const getServerSideProps = withTryCatchForSSR(getServerSidePropsFunction);

export default function MileageType({
  fetchData,
  requireLogin,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (requireLogin) {
    handleServerAuth403Error(error);
    return;
  }

  /**
   * @brief 마일리지 카테고리 리스트 데이터
   */

  const dispatch = useDispatch();
  const convertedFetchList = fetchData?.list?.map((item, index) => {
    const {
      id,
      name,
      description,
      mileageItemCount,
      modDate,
    } = item;

    const beforeData = {
      [ID]: id,
      [NAME]: name,
      [DESCRIPTION]: description,
      [CATEGORY_COUNT]: mileageItemCount,
      [MOD_DATE]: modDate,
    };

    return createData(
      item[ID],
      item[NAME],
      item[DESCRIPTION],
      item[CATEGORY_COUNT],
      formatDateToKorean(item[MOD_DATE]),
      <SWModal type={EDITTYPE} beforeData={beforeData} />,
      <SWModal type={SHOWLIST} beforeData={beforeData} />
    );
  });

  return <EnhancedTable originalRows={convertedFetchList} headCells={headCells} type="마일리지 타입" />;
}
