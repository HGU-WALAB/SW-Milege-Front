import * as React from 'react';
import { useState, useEffect } from 'react';
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
import { last } from 'lodash';
import SemesterMagicianSelect from '../Select/SemesterMagicianSelect';
import axiosInstance from 'src/utils/axios';
import { Box, Chip, Typography } from '@mui/material';
import ModalTitle from '../modal/ModalTitle';

function not(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a: readonly number[], b: readonly number[]) {
  return [...a, ...not(b, a)];
}
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

export default function SemesterItemTransferList({
  left,
  setLeft,
  right,
  setRight,
  lastSemester,
  thisSemester,
  setLastSemester,
  setThisSemester,
}) {
  const [checked, setChecked] = useState<ILastSemesterItem[]>([]);

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
    if (
      numberOfChecked(items) === items.filter((item) => !checkListDuplicated(item.item.id)).length
    ) {
      setChecked(not(checked, items));
    } else {
      setChecked(items.filter((item) => !checkListDuplicated(item.item.id)));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  // const handleCheckedLeft = () => {
  //   setLeft(left.concat(rightChecked));
  //   setRight(not(right, rightChecked));
  //   setChecked(not(checked, rightChecked));
  // };

  const checkListDuplicated = (list: ILastSemesterItem[], id: number) => {
    if (right.some((item) => item.item.id === id) && list.some((item) => item.item.id === id)) {
      return true;
    }
    return false;
  };
  

  const customList = (title: React.ReactNode, items: ILastSemesterItem[], isLeftList: boolean) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1, color: 'primary.main' }}
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
          minHeight: 230,
          bgcolor: 'background.paper',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
        }}
        dense
        component="div"
        role="list"
      >
        {items?.map((item: ILastSemesterItem) => {
          const labelId = `transfer-list-all-item-${item.item.name}-label`;
  
          return (
            <ListItem
              disabled={isLeftList && checkListDuplicated(items, item.item.id)}
              key={item.id}
              role="listitem"
              button
              onClick={handleToggle(item)}
              sx={{
                backgroundColor: isLeftList && checkListDuplicated(items, item.item.id) ? 'lightGray' : 'none',
              }}
            >
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
  
              <ListItemText id={item.id} primary={`${item.item.name}`} />
              {isLeftList && checkListDuplicated(items, item.item.id) && (
                <Typography
                  color="primary"
                  variant="body2"
                  sx={{
                    ml: 2,
                    fontWeight: 'bold',
                  }}
                >
                  중복
                </Typography>
              )}
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
  

  useEffect(() => {
    axiosInstance.get(`/api/mileage/semesters/${lastSemester}/items`).then((res) => {
      setLeft(res.data.list);
    });
  }, [lastSemester]);

  useEffect(() => {
    axiosInstance.get(`/api/mileage/semesters/${thisSemester}/items`).then((res) => {
      setRight(res.data.list);
    });
  }, [thisSemester]);

  return (
    <Box sx={{ mb: '30px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', height: '30px' }}></Box>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>
          <Typography variant="h6" sx={{ my: '10px' }}>
            복사할 학기 선택
          </Typography>
          <SemesterMagicianSelect semester={lastSemester} setSemester={setLastSemester} />
          {customList(`복사할 학기별 항목 (${lastSemester})`, left, true)}
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
            {/* <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button> */}
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="h6" sx={{ my: '10px' }}>
            붙여넣을 학기 선택
          </Typography>
          <SemesterMagicianSelect semester={thisSemester} setSemester={setThisSemester} />
          {customList(`붙여 넣을 학기별 항목 (${thisSemester})`, right, false)}
        </Grid>
      </Grid>
    </Box>
  );
  
}
