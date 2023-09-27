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
  RECORD_NAME,
  SEMESTERITEMID,
  SEMESTER_NAME,
  ITEM_NAME,
  CATEGORY_NAME,
  MOD_DATE,
} from 'src/assets/data/fields';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { REGISTER_NUM, STUDENT_NAME, DESCRIPTION1 } from '../../../assets/data/fields';
import { ReactNode } from 'react';
import Link from 'next/link';
import axiosInstance from 'src/utils/axios';
import SWModal from 'src/components/common/modal/SWModal';
import {
  ADDMILEAGEREGISTER,
  EDITMILEAGEREGISTER,
  REGISTEREDSTUDENTS,
} from 'src/assets/data/modal/modals';
import CollapsibleTable from 'src/components/common/CollapsibleTable';
import CRUDStudentTable from 'src/components/common/Table/CRUDStudentTable';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { IconButton, Tooltip } from '@mui/material';
import { Box } from '@mui/system';

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
  'ITEM_NAME' = ITEM_NAME,
  'DESCRIPTION1' = DESCRIPTION1,
  'POINTS' = POINTS,
  'COUNTS' = COUNTS,
  'MOD_DATE' = MOD_DATE,
  'STUDENTS' = STUDENTS,
}

/**
 * @kind [마일리지 등록]
 * @breif 데이터 인터페이스
 */
interface Data {
  [MileageRegisterBoard.NUM]: number;
  [MileageRegisterBoard.SEMESTER]: string;
  [MileageRegisterBoard.ITEM_NAME]: string;
  [MileageRegisterBoard.DESCRIPTION1]: string;
  [MileageRegisterBoard.POINTS]: number;
  [MileageRegisterBoard.COUNTS]: number;
  [MileageRegisterBoard.MOD_DATE]: string;
  [MileageRegisterBoard.STUDENTS]: ReactNode;
}

/**
 * @kind [마일리지 등록]
 * @brief 데이터 생성 함수
 *
 *  */
function createData(
  NUM: number,
  SEMESTER: string,
  ITEM_NAME: string,
  DESCRIPTION1: string,
  POINTS: number,
  COUNTS: number,
  MOD_DATE: string,
  STUDENTS: ReactNode
): Data {
  return {
    [MileageRegisterBoard.NUM]: NUM,
    [MileageRegisterBoard.SEMESTER]: SEMESTER,
    [MileageRegisterBoard.ITEM_NAME]: ITEM_NAME,
    [MileageRegisterBoard.DESCRIPTION1]: DESCRIPTION1,
    [MileageRegisterBoard.POINTS]: POINTS,
    [MileageRegisterBoard.COUNTS]: COUNTS,
    [MileageRegisterBoard.MOD_DATE]: MOD_DATE,
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

/**
 * @kind [마일리지 학기별 항목]
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
    id: [MileageRegisterBoard.ITEM_NAME],
    numeric: true,
    disablePadding: false,
    label: '항목명',
  },
  {
    id: [MileageRegisterBoard.DESCRIPTION1],
    numeric: true,
    disablePadding: false,
    label: '설명',
  },
  {
    id: [MileageRegisterBoard.POINTS],
    numeric: true,
    disablePadding: false,
    label: '포인트',
  },
  {
    id: [MileageRegisterBoard.COUNTS],
    numeric: true,
    disablePadding: false,
    label: '등록수',
  },
  {
    id: [MileageRegisterBoard.MOD_DATE],
    numeric: true,
    disablePadding: false,
    label: '최근 수정일',
  },
  {
    id: [MileageRegisterBoard.STUDENTS],
    numeric: true,
    disablePadding: false,
    label: '학생 관리 (조회 , 추가 , 모두 삭제)',
  },
];

export const getServerSideProps: GetServerSideProps<{
  fetchData: ISemesterItemList;
}> = async () => {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_API_KEY}/api/mileage/categories`);
  const res = await axiosInstance.get('/api/mileage/semesters/2022-01/items');
  const fetchData = res.data;
  console.log('!!!DD', fetchData);
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

  // const convertedFetchList = fetchData.semesterItemsWithRecords?.map((record, index) => {
  //   /**
  //    * @brief innerData
  //    * @description 2단 테이블의 내부 데이터
  //    */
  //   const students = record.records?.map((item, index) => {
  //     /**
  //      * @brief innerData의 update 전달 데이터
  //      */

  //     const beforeData = {
  //       [SEMESTERITEMID]: record[ID],
  //       [STUDENT_ID]: item[ID],
  //       [COUNTS]: item[COUNTS],
  //       [POINTS]: item[POINTS],
  //       [EXTRAPOINTS]: item[EXTRAPOINTS],
  //       [DESCRIPTION1]: item[DESCRIPTION1],
  //       [DESCRIPTION2]: item[DESCRIPTION2],
  //     };

  //     return {
  //       [STUDENT_NAME]: item[STUDENT_NAME],
  //       [STUDENT_ID]: item[ID],
  //       [POINTS]: item[POINTS],
  //       [DESCRIPTION1]: item[DESCRIPTION1],
  //       [DESCRIPTION2]: item[DESCRIPTION2],
  //       edit: <SWModal type={EDITMILEAGEREGISTER} beforeData={beforeData} />,
  //     };
  //   });

  //   return createData(
  //     index + 1,
  //     record[SEMESTER_NAME],
  //     record[CATEGORY_NAME],
  //     record[ITEM_NAME],
  //     record.records.length,
  //     <SWModal type={ADDMILEAGEREGISTER} />,
  //     students
  //   );
  // });

  const handleAllDelete = (id) => {
    if (window.confirm('등록된 학생 모두 삭제하시겠습니까?')) {
      axiosInstance.get(`/api/mileage/records/filter?semesterItemId=${id}`).then((res) => {
        console.log(res.data);
        res.data.list.map((item) => {
          axiosInstance.delete(`/api/mileage/records/${item.id}`).then((res) => {
            console.log(res);
            alert(` ${item.student.name} - ${item.student.sid} 가 삭제 되었습니다.`);
          });
        });
      });
    }
  };
  const convertedFetchList = fetchData.list?.map((semesterItem, index) => {
    const beforeData = {
      [ID]: semesterItem.id,
      [RECORD_NAME]: semesterItem.item.name,
    };

    return createData(
      semesterItem.id,
      // semesterItem.item.id,
      semesterItem.semesterName,
      semesterItem.item.name,
      semesterItem.item.description1,
      semesterItem.points,
      semesterItem.id, //  학생수가 들어가야함
      semesterItem.modDate,
      <Box sx={{ display: 'flex' }}>
        {/* <Tooltip title="등록된 학생 리스트 확인"> */}
        <SWModal type={REGISTEREDSTUDENTS} beforeData={beforeData} />
        {/* </Tooltip> */}
        {/* <Tooltip title="학생 추가"> */}
        <SWModal type={ADDMILEAGEREGISTER} beforeData={beforeData} />
        {/* </Tooltip> */}
        {/* <Tooltip title="등록된 학생 모두 삭제"> */}
        <IconButton onClick={() => handleAllDelete(semesterItem.item.id)}>
          <DeleteIcon />
        </IconButton>
        {/* </Tooltip> */}
      </Box>
    );
  });

  return (
    <>
      <EnhancedTable originalRows={convertedFetchList} headCells={headCells} type="마일리지 등록" />
    </>
  );
  // <CollapsibleTable rows={convertedFetchList} type="마일리지 등록" />;
}
