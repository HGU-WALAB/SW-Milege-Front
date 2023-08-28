import { StarIcon } from 'src/theme/overrides/CustomIcons';
import EnhancedTable from 'src/components/common/CustomTable';
import AddIcon from '@mui/icons-material/Add';
import {
  NUM,
  SEMESTER,
  ITEM,
  DESCRIPTION,
  FILE,
  MODIFYIED_DATE,
  ADD,
  STUDENTS,
  POINTS,
  DESCRIPTION2,
  STUDENT_ID,
} from 'src/assets/data/fields';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { REGISTER_NUM, STUDENT_NAME, DESCRIPTION1 } from '../../../assets/data/fields';
import { ReactNode } from 'react';
import Link from 'next/link';
import axiosInstance from 'src/utils/axios';
import SWModal from 'src/components/common/modal/SWModal';
import { ADDMILEAGEREGISTER, EDITMILEAGEREGISTER } from 'src/assets/data/modal/modals';
import CollapsibleTable from 'src/components/common/CollapsibleTable';

/**
 * @component [마일리지 등록] 게시판
 */

/**
 * @kind [마일리지 등록]
 * @breif enum
 */

export enum MileageRegisterBoard {
  'NUM' = NUM,
  'SEMESTER' = SEMESTER,
  'ITEM' = ITEM,
  'REGISTER_NUM' = REGISTER_NUM,
  'ADD' = ADD,
  'STUDENTS' = STUDENTS,
}

/**
 * @kind [마일리지 등록]
 * @breif 데이터 인터페이스
 */
interface Data {
  [MileageRegisterBoard.SEMESTER]: string;
  [MileageRegisterBoard.ITEM]: string;
  [MileageRegisterBoard.REGISTER_NUM]: number;
  [MileageRegisterBoard.ADD]: ReactNode;
  [MileageRegisterBoard.STUDENTS]: any;
}

/**
 * @kind [마일리지 등록]
 * @brief 데이터 생성 함수
 *
 *  */
function createData(
  NUM: number,
  SEMESTER: string,
  ITEM: string,
  REGISTER_NUM: number,
  ADD: ReactNode,
  STUDENTS: any
): Data {
  return {
    [MileageRegisterBoard.NUM]: NUM,
    [MileageRegisterBoard.SEMESTER]: SEMESTER,
    [MileageRegisterBoard.ITEM]: ITEM,

    [MileageRegisterBoard.REGISTER_NUM]: REGISTER_NUM,

    [MileageRegisterBoard.ADD]: ADD,
    [MileageRegisterBoard.STUDENTS]: STUDENTS,
  };
}

// index + 1,
//         record.semesterName,
//         record.itemName,
//         record.records.length,
//         <SWModal type={EDITCATEGORY} beforeData={beforeData} />

/**
 * @kind [마일리지 등록]
 * @brief 테이블 헤더
 */
const headCells = [
  {
    id: [MileageRegisterBoard.NUM],
    numeric: false,
    disablePadding: true,
    label: '번호',
  },
  {
    id: [MileageRegisterBoard.SEMESTER],
    numeric: true,
    disablePadding: false,
    label: '학기',
  },
  {
    id: [MileageRegisterBoard.ITEM],
    numeric: true,
    disablePadding: false,
    label: '항목명',
  },
  {
    id: [MileageRegisterBoard.REGISTER_NUM],
    numeric: true,
    disablePadding: false,
    label: '등록수',
  },
  {
    id: [MileageRegisterBoard.ADD],
    numeric: true,
    disablePadding: false,
    label: '추가',
  },
];

/**
 * @kind [마일리지 등록]
 * @description 마일리지 항목 리스트
 */

// const rows = [
//   createData(
//     1,
//     '2022-01',
//     '웹 서비스 캠프',
//     '웹 서비스 구축에 필요한 스터디를 진행하고 직접 자신만의 웹페이지를 만들어보는 과정',
//     23,
//     <AttachFileIcon />,
//     '2021-01-21',
//     <AddIcon />
//   ),
//   createData(
//     2,
//     '2022-01',
//     'C언어 캠프',
//     'C언어의 기초에 대해 공부하고 C언어를 이용하여 간단한 프로그램을 만들어보는 과정',
//     23,
//     <AttachFileIcon />,
//     '2022-01-23',
//     <AddIcon />
//   ),
//   createData(
//     3,
//     '2022-01',
//     '파이썬 캠프',
//     '파이썬 기초를 공부하고 파이썬을 이용하여 간단한 프로그램을 만들어보는 과정',
//     15,
//     <AttachFileIcon />,
//     '2022-01-31',
//     <AddIcon />
//   ),
//   createData(
//     4,
//     '2022-01',
//     'C++ 캠프',
//     'C++ 기초를 공부하고 C++을 이용하여 간단한 프로그램을 만들어보는 과정',
//     15,
//     <AttachFileIcon />,
//     '2022-01-31',
//     <AddIcon />
//   ),
//   createData(
//     5,
//     '2022-01',
//     '자바 캠프',
//     '자바 기초를 공부하고 자바를 이용하여 간단한 프로그램을 만들어보는 과정',
//     15,
//     <AttachFileIcon />,
//     '2022-01-31',
//     <AddIcon />
//   ),
//   createData(
//     6,
//     '2022-02',
//     '웹 서비스 캠프',
//     '웹 서비스 구축에 필요한 스터디를 진행하고 직접 자신만의 웹페이지를 만들어보는 과정',
//     23,
//     <AttachFileIcon />,
//     '2021-01-21',
//     <AddIcon />
//   ),
//   createData(
//     7,
//     '2022-02',
//     '데이터 구조',
//     '데이터 구조에 대해 공부하고 간단한 프로그램을 만들어보는 과정',
//     23,
//     <AttachFileIcon />,
//     '2021-01-21',
//     <AddIcon />
//   ),
//   createData(
//     8,
//     '2022-02',
//     '데이터베이스',
//     '데이터베이스에 대해 공부하고 간단한 프로그램을 만들어보는 과정',
//     23,
//     <AttachFileIcon />,
//     '2021-01-21',
//     <AddIcon />
//   ),
// ];
interface Record {
  id: number;
  studentName: string;
  counts: number;
  points: number;
  extraPoints: number;
  description1: string;
  description2: string;
}

interface semesterItemsWithStudents {
  id: number;
  itemName: string;
  categoryName: string;
  semesterName: string;
  points: number;
  itemMaxPoints: number;
  categoryMaxPoints: number;
  records: Record[];
}

type semesterItemsWithStudentList = semesterItemsWithStudents[];

export const getServerSideProps: GetServerSideProps<{
  fetchData: semesterItemsWithStudentList;
}> = async () => {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_API_KEY}/api/mileage/categories`);
  const res = await axiosInstance.get('/api/mileage/semesters/2023-01/items/records');
  const fetchData = res.data;
  console.log(fetchData);
  return { props: { fetchData } };
};
export default function MileageRegister({
  fetchData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const convertedFetchList = fetchData.semesterItemsWithRecords?.map((record, index) => {
    // const rows = fetchData.semesterItemsWithRecords?.map((record, innerIndex) => {
    const students = record.records?.map((item, index) => {
      const beforeData = {
        semesterItemId: record.id,
        studentId: item.studentId,
        recordId: item.id,
        counts: item.counts,
        points: item.points,
        extraPoints: item.extraPoints,
        description1: item.description1,
        description2: item.description2,
      };
      return {
        [STUDENT_NAME]: item[STUDENT_NAME],
        [STUDENT_ID]: item.id,
        [POINTS]: item[POINTS],
        [DESCRIPTION1]: item[DESCRIPTION1],
        [DESCRIPTION2]: item[DESCRIPTION2],
        edit: <SWModal type={EDITMILEAGEREGISTER} beforeData={beforeData} />,
      };
    });

    return createData(
      index + 1,
      record.semesterName,
      <Link href={`/mileage/register/${index + 1}`}>{record.itemName}</Link>,
      record.records.length,
      <SWModal
        type={ADDMILEAGEREGISTER}
        // Before adding this, make sure SWModal can accept beforeData prop
      />,
      students
    );
    // });

    // record.records.map((item, index) => {
    //   const beforeData = {
    //     semesterItemId: record.id,
    //     studentId: item.studentId,
    //     recordId: item.id,
    //     counts: item.counts,
    //     points: item.points,
    //     extraPoints: item.extraPoints,
    //     description1: item.description1,
    //     description2: item.description2,
    //   };
    // });
    // const beforeData = {
    //   semesterItemId: record[index].id,
    //   studentId: record[index].records.id,
    //   recordId: record[index].records.id,
    //   counts: record[index].records.counts,
    //   points: record[index].records.points,
    //   extraPoints: record[index].records.extraPoints,
    //   description1: record[index].records.description1,
    //   description2: record[index].records.description2,
    // };

    // return rows;
  });

  return (
    <CollapsibleTable rows={convertedFetchList} />
    // <EnhancedTable originalRows={convertedFetchList} headCells={headCells} type="마일리지 등록" />
  );
}
