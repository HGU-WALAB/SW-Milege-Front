import React, { ReactNode } from 'react';
import EnhancedTable from 'src/components/common/CustomTable';
import SWModal from 'src/components/common/modal/SWModal';
import { EDITTYPE, SHOWLIST } from 'src/assets/data/modal/modals';
import { setServerSideCookie } from 'src/auth/jwtCookie';
import axiosInstance from 'src/utils/axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { formatDateToKorean } from 'src/utils/date/dateConverter';
import { withTryCatchForSSR } from 'src/utils/withTryCatchForSSR';
import { handleServerAuth403Error } from 'src/auth/utils';

/**
 * @breif [마일리지 타입] 게시판
 */

export enum MileageTypeBoard {
  NUM = 'num',
  NAME = 'name',
  DESCRIPTION = 'description',
  CATEGORY_COUNT = 'categoryCount',
  MOD_DATE = 'modDate',
  MANAGE = 'manage',
  LIST = 'list',
}

/**
 * @kind 마일리지 타입
 * @breif 데이터 인터페이스
 */

export interface MileageTypeData {
  [MileageTypeBoard.NUM]: number;
  [MileageTypeBoard.NAME]: string;
  [MileageTypeBoard.DESCRIPTION]: string;
  [MileageTypeBoard.CATEGORY_COUNT]: number;
  [MileageTypeBoard.MOD_DATE]: string;
  [MileageTypeBoard.MANAGE]: ReactNode;
  [MileageTypeBoard.LIST]: ReactNode;
}

/**
 * @kind  마일리지 타입
 * @brief 데이터 생성 함수
 *
 */

function createData(type: IListType, MANAGE: ReactNode, LIST: ReactNode): MileageTypeData {
  return {
    [MileageTypeBoard.NUM]: type.id,
    [MileageTypeBoard.NAME]: type.name,
    [MileageTypeBoard.DESCRIPTION]: type.description,
    [MileageTypeBoard.CATEGORY_COUNT]: type.mileageItemCount,
    [MileageTypeBoard.MOD_DATE]: formatDateToKorean(type.modDate),
    [MileageTypeBoard.MANAGE]: MANAGE,
    [MileageTypeBoard.LIST]: LIST,
  };
}

/**
 * @number 1번 헤더
 * @description 마일리지 카테고리 리스트
 */

interface HeadCell {
  id: string;
  numeric: boolean;
  disablePadding: boolean;
  label: string;
}

const headCells: HeadCell[] = [
  {
    id: MileageTypeBoard.NUM,
    numeric: false,
    disablePadding: true,
    label: '번호',
  },
  {
    id: MileageTypeBoard.NAME,
    numeric: true,
    disablePadding: false,
    label: '타입명',
  },
  {
    id: MileageTypeBoard.DESCRIPTION,
    numeric: true,
    disablePadding: false,
    label: '설명',
  },
  {
    id: MileageTypeBoard.CATEGORY_COUNT,
    numeric: true,
    disablePadding: false,
    label: '카테고리 수',
  },
  {
    id: MileageTypeBoard.MOD_DATE,
    numeric: true,
    disablePadding: false,
    label: '수정일',
  },
  {
    id: MileageTypeBoard.MANAGE,
    numeric: true,
    disablePadding: false,
    label: '관리',
  },
  {
    id: MileageTypeBoard.LIST,
    numeric: true,
    disablePadding: false,
    label: '목록',
  },
];

export interface IListType {
  id: number;
  name: string;
  description: string;
  mileageItemCount: number;
  modDate: string;
}

export interface IGetMileageType {
  description: string;
  count: number;
  list: IListType[];
}

const getServerSidePropsFunction: GetServerSideProps<{
  fetchData: IGetMileageType | null;
  requireLogin: boolean;
  error: string | null;
}> = async (context) => {
  setServerSideCookie(context);

  try {
    const { data } = await axiosInstance.get('/api/mileage/types');
    return {
      props: {
        fetchData: data,
        requireLogin: false,
        error: null,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    if (error.response?.status === 403) {
      return {
        props: {
          fetchData: null,
          requireLogin: true,
          error: 'Unauthorized',
        },
      };
    }
    return {
      props: {
        fetchData: null,
        requireLogin: false,
        error: error.message || 'An error occurred',
      },
    };
  }
};

export const getServerSideProps = withTryCatchForSSR(getServerSidePropsFunction);

export default function MileageType({
  fetchData,
  requireLogin,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (requireLogin) {
    handleServerAuth403Error(error);
    return null;
  }

  /**
   * @brief 마일리지 카테고리 리스트 데이터
   */
  
  const convertedFetchList = fetchData?.list?.map((item) =>
    createData(
      item,
      <SWModal type={EDITTYPE} beforeData={item} />,
      <SWModal type={SHOWLIST} beforeData={item} />
    )
  );

  return (
    <EnhancedTable originalRows={convertedFetchList} headCells={headCells} type="마일리지 타입" />
  );
}
