import EnhancedTable from 'src/components/common/CustomTable';
import { MAX_MILEAGE, MANAGE, CHECK_BOX, NUM, CATEGORY, DESCRIPTION } from 'src/assets/data/fields';
import SWModal from 'src/components/common/modal/SWModal';
import { EDITCATEGORY } from 'src/assets/data/modal/modals';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { dispatch } from 'src/redux/store';
import { setMileageCategoryList } from 'src/redux/slices/data';

/**
 * @breif [마일리지 카테고리] 게시판
 */

export enum MileageCategoryBoard {
  'NUM' = NUM,
  'CATEGORY' = CATEGORY,
  'MAX_MILEAGE' = MAX_MILEAGE,
  'MANAGE' = MANAGE,
}

/**
 * @kind 마일리지 카테로리
 * @breif 데이터 인터페이스
 */

interface Data {
  [MileageCategoryBoard.NUM]: number;
  [MileageCategoryBoard.CATEGORY]: string;
  [MileageCategoryBoard.MAX_MILEAGE]: number;
  [MileageCategoryBoard.MANAGE]: ReactNode;
}

/**
 * @kind 마일리지 카테고리
 * @brief 데이터 생성 함수
 *
 *  */

function createData(num: number, category: string, maxMileage: number, manage: ReactNode): Data {
  return {
    [MileageCategoryBoard.NUM]: num,
    [MileageCategoryBoard.CATEGORY]: category,
    [MileageCategoryBoard.MAX_MILEAGE]: maxMileage,
    [MileageCategoryBoard.MANAGE]: manage,
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
    id: [MileageCategoryBoard.MAX_MILEAGE],
    numeric: true,
    disablePadding: false,
    label: '최대 마일리지',
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
  [CATEGORY]: '카테고리테스트',
  [DESCRIPTION]: '설명 테스트',
  [MAX_MILEAGE]: 5,
};
/**
 * @number 1번 목록
 * @description 마일리지 카테고리 리스트
 */

import axiosInstance from 'src/utils/axios';
import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import MileageCategory from 'src/components/board/MileageCategory';
import { setCategoryList } from 'src/redux/slices/filter';

interface IGetMileageCategory {
  id: number;
  name: string;
  maxPoints: number;
}

export const getServerSideProps: GetServerSideProps<{
  fetchData: IGetMileageCategory[];
}> = async () => {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_API_KEY}/api/mileage/categories`);
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

  const convertedFetchList = fetchData.categories?.map((item) => {
    const beforeData = {
      [NUM]: item.id,
      [CATEGORY]: item.name,
      [DESCRIPTION]: 'descriptionTest',
      [MAX_MILEAGE]: item.maxPoints,
    };
    return createData(
      item.id,
      item.name,
      item.maxPoints,
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
