import { ErrorMessage, Field, Form, Formik } from 'formik';
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

interface ILastSemesterItem {
  id: number;
  category: {
    id: number;
    name: string;
  };
  item: {
    id: number;
    name: string;
  };
  itemMaxPoints: number;
  points: number;
}

function not(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a: readonly number[], b: readonly number[]) {
  return [...a, ...not(b, a)];
}

export default function SemesterMagicianForm({ handleClose }) {
  const modalType = useSelector((state) => state.modal.modalType);

  const [lastSemester, setLastSemester] = React.useState('2023-02');
  const [thisSemester, setThisSemester] = React.useState('2023-02');

  const [checked, setChecked] = React.useState<ILastSemesterItem[]>([]);
  const [left, setLeft] = React.useState<ILastSemesterItem[]>();
  const [right, setRight] = React.useState<ILastSemesterItem[]>([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items: ILastSemesterItem[]) => intersection(checked, items).length;

  const handleToggleAll = (items: ILastSemesterItem[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title: React.ReactNode, items: ILastSemesterItem[]) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items?.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items?.length && numberOfChecked(items) !== 0}
            disabled={items?.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items?.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: 200,
          height: 230,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items?.map((item: ILastSemesterItem) => {
          const labelId = `transfer-list-all-item-${item.item.name}-label`;

          return (
            <ListItem key={item.id} role="listitem" button onClick={handleToggle(item)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(item) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': item.id,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={item.id} primary={`${item.item.name + 1}`} />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  React.useEffect(() => {
    axiosInstance.get(`/api/mileage/semesters/${lastSemester}/items`).then((res) => {
      setLeft(res.data.list);
    });
  }, [lastSemester]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        console.log();
      }}
    >
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>
          <SemesterMagicianSelect semester={lastSemester} setSemester={setLastSemester} />
          {customList(lastSemester, left)}
        </Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <SemesterMagicianSelect semester={thisSemester} setSemester={setThisSemester} />
          {customList(thisSemester, right)}
        </Grid>
      </Grid>

      <ButtonFlexBox>
        <CancelButton modalType={modalType} handleClose={handleClose} />
        <SubmitButton />
      </ButtonFlexBox>
    </form>
  );
}
