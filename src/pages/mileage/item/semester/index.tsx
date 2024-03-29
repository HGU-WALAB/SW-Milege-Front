import { StarIcon } from 'src/theme/overrides/CustomIcons';
import EnhancedTable from 'src/components/common/CustomTable';
import {
  MILEAGE,
  ISVISIBLE,
  REGISTERED_DATE,
  CHECK_BOX,
  NUM,
  DESCRIPTION,
  DESCRIPTION1,
  SEMESTERITEM,
  DESCRIPTION2,
  FILE_DESCRIPTION,
  ISVISIBLE_STUDENT,
  ISINPUT_STUDENT,
  ISDUPLICATE_RECORD,
  ISEVALUATE_CSEE,
  ISEVALUATE_PORTFOLIO,
  ISEVALUATE_FUSION,
  MOD_DATE,
  MAX_MAILEAGE,
  SEMESTERITEMID,
} from 'src/assets/data/fields';
import SWModal from 'src/components/common/modal/SWModal';
import { EDITITEM } from 'src/assets/data/modal/modals';
import { useSelector, dispatch } from 'src/redux/store';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setMileageSemesterList } from 'src/redux/slices/data';
import axiosInstance from 'src/utils/axios';
import {
  CATEGORY,
  SEMESTER,
  ITEM,
  POINTS,
  MANAGE,
  ITEM_MAX_POINTS,
  IS_MULTI,
} from '../../../../assets/data/fields';
import { setServerSideCookie } from 'src/auth/jwtCookie';
import { formatDateToKorean } from 'src/utils/date/dateConverter';
import { setSemester } from 'src/redux/slices/filter';
import { handleServerAuth403Error } from 'src/auth/utils';
import { withTryCatchForSSR } from 'src/utils/withTryCatchForSSR';
import MileageSemesterItem from '../../../../components/board/MileageSemesterItem';

/**
 * @component [마일리지 학기별 항목] 게시판
 */

/**
 * @kind [마일리지 학기별 항목]
 * @breif enum
 */

export enum MileageSemesterItemBoard {
  'NUM' = NUM,
  'CATEGORY' = CATEGORY,
  'SEMESTER' = SEMESTER,
  'ITEM' = ITEM,
  'POINTS' = POINTS,
  'ITEM_MAX_POINTS' = ITEM_MAX_POINTS,
  'MOD_DATE' = MOD_DATE,
  'MANAGE' = MANAGE,
  'IS_MULTI' = IS_MULTI,
}

/**
 * @kind [마일리지 학기별 항목]
 * @breif 데이터 인터페이스
 */
interface Data {
  [MileageSemesterItemBoard.CATEGORY]: string;
  [MileageSemesterItemBoard.SEMESTER]: string;
  [MileageSemesterItemBoard.ITEM]: string;
  [MileageSemesterItemBoard.POINTS]: number;
  [MileageSemesterItemBoard.ITEM_MAX_POINTS]: number;
  [MileageSemesterItemBoard.MOD_DATE]: string;
  [MileageSemesterItemBoard.MANAGE]: string;
  [MileageSemesterItemBoard.IS_MULTI]: boolean;
}

/**
 * @kind [마일리지 학기별 항목]
 * @brief 데이터 생성 함수
 *
 *  */
function createData(
  NUM: number,
  CATEGORY: string,
  SEMESTER: string,
  ITEM: string,
  POINTS: number,
  ITEM_MAX_POINTS: number,
  MOD_DATE: string,
  MANAGE: string,
  IS_MULTI: boolean
): Data {
  return {
    [MileageSemesterItemBoard.NUM]: NUM,
    [MileageSemesterItemBoard.CATEGORY]: CATEGORY,
    [MileageSemesterItemBoard.SEMESTER]: SEMESTER,
    [MileageSemesterItemBoard.ITEM]: ITEM,
    [MileageSemesterItemBoard.POINTS]: POINTS,
    [MileageSemesterItemBoard.ITEM_MAX_POINTS]: ITEM_MAX_POINTS,
    [MileageSemesterItemBoard.MOD_DATE]: MOD_DATE,
    [MileageSemesterItemBoard.MANAGE]: MANAGE,
    [MileageSemesterItemBoard.IS_MULTI]: IS_MULTI,
  };
}

/**
 * @kind [마일리지 학기별 항목]
 * @brief 테이블 헤더
 */
const headCells = [
  {
    id: [MileageSemesterItemBoard.NUM],
    numeric: false,
    disablePadding: true,
    label: '번호',
  },
  {
    id: [MileageSemesterItemBoard.CATEGORY],
    numeric: true,
    disablePadding: false,
    label: '카테고리명',
  },
  {
    id: [MileageSemesterItemBoard.SEMESTER],
    numeric: true,
    disablePadding: false,
    label: '학기',
  },
  {
    id: [MileageSemesterItemBoard.ITEM],
    numeric: true,
    disablePadding: false,
    label: '항목명',
  },
  {
    id: [MileageSemesterItemBoard.POINTS],
    numeric: true,
    disablePadding: false,
    label: '포인트',
  },
  {
    id: [MileageSemesterItemBoard.ITEM_MAX_POINTS],
    numeric: true,
    disablePadding: false,
    label: '항목 최대 포인트',
  },
  {
    id: [MileageSemesterItemBoard.IS_MULTI],
    numeric: true,
    disablePadding: false,
    label: '중복 가능 여부',
  },
  {
    id: [MileageSemesterItemBoard.MOD_DATE],
    numeric: true,
    disablePadding: false,
    label: '최근 수정일',
  },
  {
    id: [MileageSemesterItemBoard.MANAGE],
    numeric: true,
    disablePadding: false,
    label: '관리',
  },
];

interface IItem {
  id: number;
  itemName: string;
  isPortfolio: boolean;
  description1: string;
  description2: string;
  stuType: string; // 'C', 'F', 'CF' 중 하나로 제한하려면 "C" | "F" | "CF"와 같이 명시할 수 있습니다.
}

interface ICategory {
  id: number;
  name: string;
  maxPoints: number;
}

interface ISemesterItem {
  item: IItem;
  category: ICategory;
  semesterName: string;
  weight: number;
}
export interface ISemesterItemList {
  semesterItems: ISemesterItem[];
}

const getServerSidePropsFunction: GetServerSideProps<{
  fetchData: ISemesterItemList;
  nowSemester?: string;
}> = async (context) => {
  setServerSideCookie(context);

  const semesterRes = await axiosInstance.get(`/api/mileage/semesters/currentSemester`);
  const nowSemester = await semesterRes.data.data.name;
  const res = await axiosInstance.get(`/api/mileage/semesters/${nowSemester}/items`);

  let fetchData = res.data;

  return { props: { fetchData } };
};

export const getServerSideProps = withTryCatchForSSR(getServerSidePropsFunction);

const fetchToUseData = (data) => {
  return data?.list.map((semesterItem) => {
    const beforeData = {
      [SEMESTERITEMID]: semesterItem.id,
      itemId: semesterItem.item.id,
      [CATEGORY]: semesterItem.category.name,
      [SEMESTER]: semesterItem.semesterName,
      [ITEM]: semesterItem.item.name,
      [MILEAGE]: semesterItem.points,
      [IS_MULTI]: semesterItem.isMulti,
      [ITEM_MAX_POINTS]: semesterItem.itemMaxPoints,
    };
    return createData(
      semesterItem.id,
      semesterItem.category.name,
      semesterItem.semesterName,
      semesterItem.item.name,
      semesterItem.points,
      semesterItem.itemMaxPoints,
      semesterItem.isMulti,
      formatDateToKorean(semesterItem.modDate),
      <SWModal type={EDITITEM} beforeData={beforeData} />
    );
  });
};

export default function MileageSemesterItem({
  fetchData,
  requireLogin,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (requireLogin) {
    handleServerAuth403Error(error);
    return;
  }

  const dispatch = useDispatch();

  const [convertedFetchList, setConvertedFetchList] = useState(fetchToUseData(fetchData));

  const semester = useSelector((state) => state.filter.semester);

  useEffect(() => {
    axiosInstance.get(`/api/mileage/semesters/${semester}/items`).then((res) => {
      setConvertedFetchList(fetchToUseData(res.data));
    });
  }, [semester]);

  return (
    <EnhancedTable
      originalRows={convertedFetchList}
      headCells={headCells}
      type="마일리지 학기별 항목"
    />
  );
}
