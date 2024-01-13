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
} from '../../../../assets/data/fields';
import { setServerSideCookie } from 'src/auth/jwtCookie';
import { formatDateToKorean } from 'src/utils/date/dateConverter';
import { setSemester } from 'src/redux/slices/filter';

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
  MANAGE: string
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
    id: [MileageSemesterItemBoard.MOD_DATE],
    numeric: true,
    disablePadding: false,
    label: '최큰 수정일',
  },
  {
    id: [MileageSemesterItemBoard.MANAGE],
    numeric: true,
    disablePadding: false,
    label: '관리',
  },
];

const IParams = {
  [CATEGORY]: '카테고리테스트',
  [SEMESTER]: '2022-01',
  [ITEM]: '웹 서비스 캠프',
  [MILEAGE]: 30,
  [MAX_MAILEAGE]: 50,
  [DESCRIPTION1]: '설명 1',
  [DESCRIPTION2]: '설명 2',
  [FILE_DESCRIPTION]: '첨부파일 설명',
  [ISVISIBLE]: true,
  [ISVISIBLE_STUDENT]: false,
  [ISINPUT_STUDENT]: false,
  [ISDUPLICATE_RECORD]: false,
  [ISEVALUATE_CSEE]: false,
  [ISEVALUATE_PORTFOLIO]: false,
  [ISEVALUATE_FUSION]: false,
};

/**
   * @kind [마일리지 학기별 항목]

   * @description 마일리지 학기별 항목 리스트
   */

const rows = [
  createData(
    1,
    '전공 마일리지',
    '2022-01',
    '웹 서비스 캠프',
    30,
    true,
    '2023-08-21',

    <SWModal type={EDITITEM} beforeData={IParams} />
  ),
  createData(
    2,
    '비교과 - 연구활동',
    '2022-01',
    '웹 서비스 캠프',
    30,
    true,
    '2023-08-21',

    <SWModal type={EDITITEM} beforeData={IParams} />
  ),
  createData(
    3,
    '비교과 - 전공활동',
    '2022-01',
    '웹 서비스 캠프',
    30,
    true,
    '2023-08-21',

    <SWModal type={EDITITEM} beforeData={IParams} />
  ),
  createData(
    4,
    '비교과 - 특강참여',
    '2022-01',
    '웹 서비스 캠프',
    30,
    false,
    '2023-08-21',

    <SWModal type={EDITITEM} beforeData={IParams} />
  ),
  createData(
    5,
    '비교과 - 학회활동',
    '2022-02',
    '웹 서비스 캠프',
    30,
    true,
    '2023-08-21',
    <SWModal type={EDITITEM} beforeData={IParams} />
  ),
  createData(
    6,
    '비교과 - 행사참여',
    '2022-02',
    '웹 서비스 캠프',
    30,
    false,
    '2023-08-21',
    <SWModal type={EDITITEM} beforeData={IParams} />
  ),
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

export const getServerSideProps: GetServerSideProps<{
  fetchData: ISemesterItemList;
  nowSemester?: string;
}> = async (context) => {
  setServerSideCookie(context);

  const semesterRes = await axiosInstance.get(`api/mileage/semesters/currentSemester`);
  const nowSemester = semesterRes.data.data.name;
  const res = await axiosInstance.get(`/api/mileage/semesters/${nowSemester}/items`);

  console.log(nowSemester);

  let fetchData = res.data;
  console.log(fetchData);
  return { props: { fetchData, nowSemester } };
};

const fetchToUseData = (data) => {
  return data.list.map((semesterItem) => {
    const beforeData = {
      [SEMESTERITEMID]: semesterItem.id,
      itemId: semesterItem.item.id,
      [CATEGORY]: semesterItem.category.name,
      [SEMESTER]: semesterItem.semesterName,
      [ITEM]: semesterItem.item.name,
      [MILEAGE]: semesterItem.points,
      [ITEM_MAX_POINTS]: semesterItem.itemMaxPoints,
    };
    return createData(
      semesterItem.id,
      semesterItem.category.name,
      semesterItem.semesterName,
      semesterItem.item.name,
      semesterItem.points,
      semesterItem.itemMaxPoints,
      formatDateToKorean(semesterItem.modDate),
      <SWModal type={EDITITEM} beforeData={beforeData} />
    );
  });
};

export default function MileageCategory({
  fetchData,
  nowSemester,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // const data = useSelector((state) => state.data.mileageSemesterList);
  const dispatch = useDispatch();
  // const [updatedData, setUpdatedData] = useState(fetchToUseData(fetchData));
  const [convertedFetchList, setConvertedFetchList] = useState(fetchToUseData(fetchData));

  const semester = useSelector((state) => state.filter.semester);
  dispatch(setSemester(semester === '전체' ? nowSemester : semester));

  useEffect(() => {
    axiosInstance
      .get(`/api/mileage/semesters/${semester === '전체' ? nowSemester : semester}/items`)
      .then((res) => {
        setConvertedFetchList(fetchToUseData(res.data));
      });
  }, [semester]);

  console.log(convertedFetchList);
  return (
    <EnhancedTable
      originalRows={convertedFetchList}
      headCells={headCells}
      type="마일리지 학기별 항목"
    />
  );
}
