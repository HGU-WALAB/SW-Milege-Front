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

export default function MileageCategory() {
  const data = useSelector((state) => state.data.mileageCategoryList);
  const dispatch = useDispatch();

  const rows = [
    createData(1, '전공 마일리지', 7, <SWModal type={EDITCATEGORY} beforeData={IParams} />),
    createData(2, '비교과 - 연구활동', 6, <SWModal type={EDITCATEGORY} beforeData={IParams} />),
    createData(3, '비교과 - 전공활동', 6, <SWModal type={EDITCATEGORY} beforeData={IParams} />),
    createData(4, '비교과 - 특강참여', 7, <SWModal type={EDITCATEGORY} beforeData={IParams} />),
    createData(5, '비교과 - 학회활동', 6, <SWModal type={EDITCATEGORY} beforeData={IParams} />),
    createData(6, '비교과 - 행사참여', 8, <SWModal type={EDITCATEGORY} beforeData={IParams} />),
  ];

  /**
   * SSR을 이용해서 미리 받아와야 할듯 !!
   */
  useEffect(() => {
    dispatch(setMileageCategoryList(rows));
  }, []);

  return <EnhancedTable originalRows={data} headCells={headCells} type="마일리지 카테고리" />;
}
