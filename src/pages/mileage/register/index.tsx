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
  EXTRAPOINTS,
  COUNTS,
  ID,
  RECORD_ID,
  SEMESTERITEMID,
  SEMESTER_NAME,
  ITEM_NAME,
  CATEGORY_NAME,
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
  'CATEGORY_NAME' = CATEGORY_NAME,
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
  [MileageRegisterBoard.CATEGORY_NAME]: string;
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
  CATEGORY_NAME: string,
  ITEM: string,
  REGISTER_NUM: number,
  ADD: ReactNode,
  STUDENTS: any
): Data {
  return {
    [MileageRegisterBoard.NUM]: NUM,
    [MileageRegisterBoard.SEMESTER]: SEMESTER,
    [MileageRegisterBoard.CATEGORY_NAME]: CATEGORY_NAME,
    [MileageRegisterBoard.ITEM]: ITEM,

    [MileageRegisterBoard.REGISTER_NUM]: REGISTER_NUM,

    [MileageRegisterBoard.ADD]: ADD,
    [MileageRegisterBoard.STUDENTS]: STUDENTS,
  };
}

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
  const res = await axiosInstance.get('/api/mileage/semesters/2022-01/items/records');
  const fetchData = res.data;
  console.log(fetchData);
  return { props: { fetchData } };
};
export default function MileageRegister({
  fetchData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  /**
   * @brief outerData + innerData
   * @description 2단 테이블의 모든 데이터
   * @schema
      const convertedFetchList = 
        [
          {
            num,
            semester,
            categoryName
            item,
            registerNum,
            add,      // 학생 추가 모달
            students: 
            [
              {
                studentName,
                studentId,
                point,
                description1,
                description2,
                edit, //학생 정보 수정 모달
              }
            ]
          },
          ...
        ]
   */

  const convertedFetchList = fetchData.list?.map((record, index) => {
    /**
     * @brief innerData
     * @description 2단 테이블의 내부 데이터
     */
    const students = record.records?.map((item, index) => {
      /**
       * @brief innerData의 update 전달 데이터
       */

      const beforeData = {
        [SEMESTERITEMID]: record[ID],
        [STUDENT_ID]: item[ID],
        [COUNTS]: item[COUNTS],
        [POINTS]: item[POINTS],
        [EXTRAPOINTS]: item[EXTRAPOINTS],
        [DESCRIPTION1]: item[DESCRIPTION1],
        [DESCRIPTION2]: item[DESCRIPTION2],
      };

      return {
        [STUDENT_NAME]: item[STUDENT_NAME],
        [STUDENT_ID]: item[ID],
        [POINTS]: item[POINTS],
        [DESCRIPTION1]: item[DESCRIPTION1],
        [DESCRIPTION2]: item[DESCRIPTION2],
        edit: <SWModal type={EDITMILEAGEREGISTER} beforeData={beforeData} />,
      };
    });

    return createData(
      index + 1,
      record[SEMESTER_NAME],
      record[CATEGORY_NAME],
      record[ITEM_NAME],
      record.records.length,
      <SWModal type={ADDMILEAGEREGISTER} />,
      students
    );
  });

  console.log(convertedFetchList);

  return <CollapsibleTable rows={convertedFetchList} type="마일리지 등록" />;
}
