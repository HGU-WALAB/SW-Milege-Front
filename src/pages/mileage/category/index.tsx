import EnhancedTable from 'src/components/common/CustomTable';
import {
  MAX_MILEAGE,
  MANAGE,
  CHECK_BOX,
  DESCRIPTION,
  NAME,
  ID,
  TYPE,
  ORDER_IDX,
  TITLE,
  MOD_DATE,
  ITEM_COUNT,
} from 'src/assets/data/fields';
import SWModal from 'src/components/common/modal/SWModal';
import { EDITCATEGORY } from 'src/assets/data/modal/modals';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { dispatch } from 'src/redux/store';
import { setMileageCategoryList } from 'src/redux/slices/data';
import { setServerSideCookie } from 'src/auth/jwtCookie';
/**
 * @breif [마일리지 카테고리] 게시판
 */

export enum MileageCategoryBoard {
  'NUM' = NUM,
  'CATEGORY' = CATEGORY,
  'TYPE' = TYPE,
  'ORDER_IDX' = ORDER_IDX,
  'DESCRIPTION1' = DESCRIPTION1,
  'DESCRIPTION2' = DESCRIPTION2,
  'ITEM_COUNT' = ITEM_COUNT,
  'MOD_DATE' = MOD_DATE,
  'MANAGE' = MANAGE,
}

/**
 * @kind 마일리지 카테로리
 * @breif 데이터 인터페이스
 */

interface Data {
  [MileageCategoryBoard.NUM]: number;
  [MileageCategoryBoard.CATEGORY]: string;
  [MileageCategoryBoard.TYPE]: string;
  [MileageCategoryBoard.ORDER_IDX]: number;
  [MileageCategoryBoard.DESCRIPTION1]: string;
  [MileageCategoryBoard.DESCRIPTION2]: string;
  [MileageCategoryBoard.ITEM_COUNT]: number;
  [MileageCategoryBoard.MOD_DATE]: string;
  [MileageCategoryBoard.MANAGE]: ReactNode;
}

/**
 * @kind 마일리지 카테고리
 * @brief 데이터 생성 함수
 *
 *  */

function createData(
  NUM: number,
  CATEGORY: string,
  TYPE: string,
  ORDER_IDX: number,
  DESCRIPTION1: string,
  DESCRIPTION2: string,
  ITEM_COUNT: number,
  MOD_DATE: string,
  MANAGE: ReactNode
): Data {
  return {
    [MileageCategoryBoard.NUM]: NUM,
    [MileageCategoryBoard.CATEGORY]: CATEGORY,
    [MileageCategoryBoard.TYPE]: TYPE,
    [MileageCategoryBoard.ORDER_IDX]: ORDER_IDX,
    [MileageCategoryBoard.DESCRIPTION1]: DESCRIPTION1,
    [MileageCategoryBoard.DESCRIPTION2]: DESCRIPTION2,
    [MileageCategoryBoard.ITEM_COUNT]: ITEM_COUNT,
    [MileageCategoryBoard.MOD_DATE]: MOD_DATE,
    [MileageCategoryBoard.MANAGE]: MANAGE,
  };
}

/**
 * @number 1번 헤더
 * @description 마일리지 카테고리 리스트
 */
const headCells = [
  {
    id: [MileageCategoryBoard.NUM],
    numeric: false,
    disablePadding: true,
    label: '번호',
  },
  {
    id: [MileageCategoryBoard.CATEGORY],
    numeric: true,
    disablePadding: false,
    label: '카테고리명',
  },
  {
    id: [MileageCategoryBoard.TYPE],
    numeric: true,
    disablePadding: false,
    label: '타입',
  },
  {
    id: [MileageCategoryBoard.ORDER_IDX],
    numeric: true,
    disablePadding: false,
    label: '우선 순위',
  },
  {
    id: [MileageCategoryBoard.DESCRIPTION1],
    numeric: true,
    disablePadding: false,
    label: '설명1',
  },

  {
    id: [MileageCategoryBoard.DESCRIPTION2],
    numeric: true,
    disablePadding: false,
    label: '설명2',
  },
  {
    id: [MileageCategoryBoard.ITEM_COUNT],
    numeric: true,
    disablePadding: false,
    label: '하위 항목 개수',
  },
  {
    id: [MileageCategoryBoard.MOD_DATE],
    numeric: true,
    disablePadding: false,
    label: '최근 수정일',
  },
  {
    id: [MileageCategoryBoard.MANAGE],
    numeric: true,
    disablePadding: false,
    label: '관리',
  },
];

/**
 * 더미 객체
 */

const IParams = {
  [NUM]: 1,
  [CATEGORY]: '카테고리테스트',
  [DESCRIPTION1]: '설명 테스트',
  [DESCRIPTION2]: '설명 테스트',
};

/**
 * @number 1번 목록
 * @description 마일리지 카테고리 리스트
 */

import axiosInstance from 'src/utils/axios';
import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import MileageCategory from 'src/components/board/MileageCategory';
import { setCategoryList } from 'src/redux/slices/filter';
import { DESCRIPTION1, CATEGORY, DESCRIPTION2, NUM } from '../../../assets/data/fields';
import axios from 'axios';
import { getCookie } from '../view';
import { formatDateToKorean } from 'src/utils/date/dateConverter';

interface IList {
  id: number;
  name: string;
  description1: string;
  description2: string;
  orderIdx: number;
  itemType: string;
  isMulti: boolean;
}

interface IGetMileageCategory {
  description: string;
  count: number;
  list: IList[];
}

export const getServerSideProps: GetServerSideProps<{
  fetchData: IGetMileageCategory[];
}> = async (context) => {
  setServerSideCookie(context);
  const res = await axiosInstance.get('/api/mileage/categories');
  const fetchData = res.data;
  console.log(fetchData);
  return { props: { fetchData } };
};

export default function MileageCategory({
  fetchData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const dispatch = useDispatch();

  /**
   * @brief 마일리지 카테고리 리스트 데이터
   */

  const convertedFetchList = fetchData.list?.map((item, index) => {
    const beforeData = {
      [ID]: item[ID],
      [TITLE]: item[NAME],
      [TYPE]: item[TYPE],
      [DESCRIPTION1]: item[DESCRIPTION1],
      [DESCRIPTION2]: item[DESCRIPTION2],
      [ORDER_IDX]: item[ORDER_IDX],
    };

    return createData(
      item[ID],
      item[NAME],
      item[TYPE],
      item[ORDER_IDX],
      item[DESCRIPTION1],
      item[DESCRIPTION2],
      item[ITEM_COUNT],
      formatDateToKorean(item[MOD_DATE]),
      <SWModal type={EDITCATEGORY} beforeData={beforeData} />
    );
  });

  return (
    <EnhancedTable
      originalRows={convertedFetchList}
      headCells={headCells}
      type="마일리지 카테고리"
    />
  );
}
