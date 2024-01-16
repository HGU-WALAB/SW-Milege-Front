import { StarIcon } from 'src/theme/overrides/CustomIcons';
import EnhancedTable from 'src/components/common/CustomTable';

import {
  ID,
  ID,
  CATEGORY,
  SEMESTER,
  ITEM,
  NUM,
  NUM,
  STUDENT_ID,
  STUDENT_NAME,
  POINT,
  REGISTERED_DATE,
  ITEM_NAME,
  SID,
  POINTS,
  MOD_DATE,
  CATEGORY_NAME,
  NAME,
  COUNTS,
  EXTRAPOINTS,
  DESCRIPTION1,
  DESCRIPTION2,
  SEMESTER_ITEM_ID,
} from 'src/assets/data/fields';
import axiosInstance from 'src/utils/axios';
import React, { useEffect } from 'react';
import axios from 'axios';
import { getCookie, setCookie, setServerSideCookie } from 'src/auth/jwtCookie';
import { useDispatch } from 'react-redux';
import { EDITMILEAGEREGISTER } from 'src/assets/data/modal/modals';
import { formatDateToKorean } from 'src/utils/date/dateConverter';
import SWModal from 'src/components/common/modal/SWModal';
import { DOMAIN } from 'src/routes/paths';
import { withTryCatch, withTryCatchForSSR } from 'src/utils/withTryCatchForSSR';
import { handleServerAuth403Error } from 'src/auth/utils';

/**
 * @component [마일리지 조회] 게시판
 */

/**
 * @kind [마일리지 조회]
 * @breif enum
 */

export enum MileageViewBoard {
  'NUM' = NUM,
  'CATEGORY' = CATEGORY,
  'SEMESTER' = SEMESTER,
  'ITEM' = ITEM,
  'STUDENT_ID' = STUDENT_ID,
  'STUDENT_NAME' = STUDENT_NAME,
  'POINT' = POINT,
  'REGISTERED_DATE' = REGISTERED_DATE,
}

/**
 * @kind [마일리지 조회]
 * @brief 데이터 생성 함수
 *
 *  */
function createData(
  num: number,
  category: string,
  semester: string,
  item: string,
  studentId: number,
  studentName: string,
  point: number,
  registeredDate: string,
  edit: React.ReactNode
): Data {
  return {
    [MileageViewBoard.NUM]: num,
    [MileageViewBoard.CATEGORY]: category,
    [MileageViewBoard.SEMESTER]: semester,
    [MileageViewBoard.ITEM]: item,
    [MileageViewBoard.STUDENT_ID]: studentId,
    [MileageViewBoard.STUDENT_NAME]: studentName,
    [MileageViewBoard.POINT]: point,
    [MileageViewBoard.REGISTERED_DATE]: registeredDate,
    edit,
  };
}

/**
 * @kind [마일리지 조회]
 * @brief 테이블 헤더
 */
const headCells = [
  {
    id: [MileageViewBoard.NUM],
    numeric: false,
    disablePadding: true,
    label: '번호',
  },
  {
    id: [MileageViewBoard.CATEGORY],
    numeric: true,
    disablePadding: false,
    label: '카테고리명',
  },
  {
    id: [MileageViewBoard.SEMESTER],
    numeric: true,
    disablePadding: false,
    label: '학기',
  },
  {
    id: [MileageViewBoard.ITEM],
    numeric: true,
    disablePadding: false,
    label: '항목명',
  },
  {
    id: [MileageViewBoard.STUDENT_ID],
    numeric: true,
    disablePadding: false,
    label: '학번',
  },
  {
    id: [MileageViewBoard.STUDENT_NAME],
    numeric: true,
    disablePadding: false,
    label: '이름',
  },
  {
    id: [MileageViewBoard.POINT],
    numeric: true,
    disablePadding: false,
    label: '포인트',
  },
  {
    id: [MileageViewBoard.REGISTERED_DATE],
    numeric: true,
    disablePadding: false,
    label: '등록일',
  },
  {
    id: 'edit',
    numeric: true,
    disablePadding: false,
    label: '수정',
  },
];

/**
 * @number 1번 목록
 * @description 마일리지 항목 리스트
 */

const rows = [
  createData(
    1,
    '전공 마일리지',
    '2022-01',
    '웹 서비스 캠프',
    '21800446',
    '오인혁',
    230,
    '2022-08-21'
  ),
  createData(
    2,
    '비교과 - 전공활동',
    '2022-01',
    'pps 캠프',
    '21800447',
    '한시온',
    230,
    '2022-08-21'
  ),
  createData(
    3,
    '비교과 - 특강참여',
    '2022-01',
    'c언어 캠프',
    '21800448',
    '김민수',
    230,
    '2022-08-21'
  ),
  createData(
    4,
    '비교과 - 학회활동',
    '2022-01',
    '대경권 프로그래밍 대회',
    '21800449',
    '장유진',
    230,
    '2022-08-21'
  ),
  createData(
    5,
    '비교과 - 행사참여',
    '2022-01',
    '와랩 스터디',
    '21800450',
    '정석민',
    230,
    '2022-08-21'
  ),
  createData(
    6,
    '비교과 - 연구활동',
    '2022-02',
    '웹 서비스 캠프',
    '21800451',
    '장유진',
    230,
    '2022-08-21'
  ),
  createData(
    7,
    '전공 마일리지',
    '2022-02',
    '웹 서비스 캠프',
    '21800452',
    '박민지',
    230,
    '2022-08-21'
  ),
  createData(
    8,
    '비교과 - 전공활동',
    '2022-02',
    '웹 서비스 캠프',
    '21800453',
    '정가원',
    230,
    '2022-08-21'
  ),
];
/**
 * @kind [마일리지 조회]
 * @breif 데이터 인터페이스
 */
interface Data {
  [MileageViewBoard.CATEGORY]: string;
  [MileageViewBoard.SEMESTER]: string;
  [MileageViewBoard.ITEM]: string;
  [MileageViewBoard.STUDENT_ID]: number;
  [MileageViewBoard.STUDENT_NAME]: string;
  [MileageViewBoard.POINT]: number;
  [MileageViewBoard.REGISTERED_DATE]: string;
}

interface IGetMileageRegisterList {
  description: string;
  count: number;
  list: Array<{
    id: number;
    semesterItem: {
      id: number;
      item: {
        id: number;
        name: string;
        modDate: string;
      };
      semesterName: string;
      points: number;
      itemMaxPoints: number;
      isMulti: boolean;
      modDate: string;
    };
    category: {
      id: number;
      name: string;
      categoryMaxPoints: number;
      modDate: string;
    };
    studentName: string;
    sid: string;
    counts: number;
    points: number;
    extraPoints: number;
    description1: string;
    modDate: string;
  }>;
}
const getServerSidePropsFunction: GetServerSideProps<{ fetchData: any }> = async (context) => {
  setServerSideCookie(context);

  const res = await axiosInstance.get('/api/mileage/records');
  const fetchData = res.data;
  return { props: { fetchData } };
};

export const getServerSideProps = withTryCatchForSSR(getServerSidePropsFunction);

export default function MileageView({
  fetchData,
  requireLogin,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (requireLogin) {
    handleServerAuth403Error(error);
    return;
  }

  const dispatch = useDispatch();

  /**
   * @brief 마일리지 카테고리 리스트 데이터
   */
  const convertedFetchList = fetchData?.list?.map((item, index) => {
    const beforeData = {
      [ID]: item.id,
      [CATEGORY_NAME]: item.category.name,
      [SEMESTER]: item.semesterItem.semesterName,
      [ITEM_NAME]: item.semesterItem.item.name,
      [SID]: item.sid,
      [NAME]: item.studentName,
      [POINTS]: item.points,
      [MOD_DATE]: item.modDate,
      [COUNTS]: item.counts,
      [EXTRAPOINTS]: item.extraPoints,
      [DESCRIPTION1]: item.description1,
      [SEMESTER_ITEM_ID]: item.semesterItem.id,
    };

    return createData(
      item[ID],
      item.category.name,
      item.semesterItem.semesterName,
      item.semesterItem.item.name,
      item[SID],
      item[STUDENT_NAME],
      item[POINTS],
      formatDateToKorean(item[MOD_DATE]),
      <SWModal type={EDITMILEAGEREGISTER} beforeData={beforeData} />
    );
  });

  return (
    <EnhancedTable originalRows={convertedFetchList} headCells={headCells} type="마일리지 조회" />
  );
}
