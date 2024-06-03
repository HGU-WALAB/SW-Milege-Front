import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { ButtonFlexBox } from '../common/modal/SWModal';
import {
  TITLE,
  CATEGORY,
  DESCRIPTION,
  MAX_MILEAGE,
  MAX_POINTS,
  NUM,
  POINT,
  SEMESTER,
  MILEAGE,
} from 'src/assets/data/fields';
import * as Yup from 'yup';
import { ADDCATEGORY, ADDITEM, EDITCATEGORY, EDITITEM } from 'src/assets/data/modal/modals';
import { TextField, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { dispatch } from 'src/redux/store';
import { closeModal } from 'src/redux/slices/modal';
import CancelButton from '../common/modal/CancelButton';
import SubmitButton from '../common/modal/SubmitButton';
import axiosInstance from 'src/utils/axios';
import { useRouter } from 'next/router';
import SemesterSelect from '../common/Select/SemesterSelect';
import GlobalItemSelect from '../common/Select/GlobalItemSelect';

import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import SemesterMagicianSelect from '../common/Select/SemesterMagicianSelect';
import { last } from 'lodash';
import SemesterItemTransferList from '../common/TransferList/SemesterItemTransferList';

export default function SemesterMagicianForm({ handleClose }) {
  const modalType = useSelector((state) => state.modal.modalType);

  const [left, setLeft] = useState<ILastSemesterItem[]>();
  const [right, setRight] = useState<ILastSemesterItem[]>([]);

  const [lastSemester, setLastSemester] = useState('2023-02');
  const [thisSemester, setThisSemester] = useState('2023-02');

  const handleSubmit = (e) => {
    e.preventDefault();

    const bodyData = {
      copyFrom: right.map((item) => item.id),
      copyTo: thisSemester,
    };

    axiosInstance.post(`/api/mileage/semesters/multiple`, bodyData).then((res) => {
      alert(res.data);
      handleClose();
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <SemesterItemTransferList
        right={right}
        setRight={setRight}
        left={left}
        setLeft={setLeft}
        lastSemester={lastSemester}
        setLastSemester={setLastSemester}
        thisSemester={thisSemester}
        setThisSemester={setThisSemester}
      />

      <ButtonFlexBox>
        <CancelButton modalType={modalType} handleClose={handleClose} />
        <SubmitButton />
      </ButtonFlexBox>
    </form>
  );
}
