import { use, useEffect, useState } from 'react';
import CRUDStudentTable from '../common/Table/CRUDStudentTable';
import { Box } from '@mui/system';
import axiosInstance from 'src/utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import { setStudentList } from 'src/redux/slices/modal';

const dumi = [
  {
    id: 15,
    studentName: '오인혁',
    studentSid: '21800446',
    counts: 3.0,
    points: null,
    extraPoints: 7,
    description1: '비고',
    // description2: '설명2',
    modDate: '2023-08-31T20:59:40',
  },
  {
    id: 17,
    studentName: '오인혁',
    studentSid: '21800446',
    counts: 3.0,
    points: null,
    extraPoints: 7,
    description1: '비고',
    description2: '설명2',
    modDate: '2023-09-04T23:15:18',
  },
];

export default function StudentsModal() {
  return <CRUDStudentTable />;
}
