import { DatePicker } from '@mui/lab';
import { Box, Chip, Pagination, Skeleton, Stack, Table, TextField } from '@mui/material';
import CustomModal from 'src/components/Template/CustomModal';

import CustomTable1 from 'src/components/Template/CustomTable1';
import CustomTable2 from 'src/components/Template/CustomTable2';
import CustomToggle from 'src/components/Template/CustomToggle';
import DropDown from 'src/components/Template/DropDown';
import DropDown2 from 'src/components/Template/DropDown2';
import FilledButton from 'src/components/Template/FilledButton';
import OutlinedButton from 'src/components/Template/OutlinedButton';
import TemplateBox from 'src/components/Template/TemplateBox';
import TextButton from 'src/components/Template/TextButton';

import { CustomTextField } from 'src/components/custom-input';

export default function Template() {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        p: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '50px',
      }}
    >
      <TemplateBox width="400px" height="200px">
        <FilledButton text="FilledButton" px="20px" py="5px" />
        <OutlinedButton variant="outlined" text="outlinedButton" px="20px" py="5px" />
        <TextButton variant="text" text="textButton" px="20px" py="5px" />
      </TemplateBox>

      <TemplateBox width="400px" height="200px">
        <CustomTextField label="내용 입력" variant="outlined" />
        <TextField label="내용 입력" variant="standard" />
      </TemplateBox>
      <TemplateBox width="450px" height="200px">
        <Pagination count={10} variant="outlined" />
        <Box sx={{ height: '30px' }}></Box>
        <Pagination count={10} shape="rounded" />
      </TemplateBox>
      <TemplateBox width="1000px" height="800px">
        <CustomTable1 />
        <CustomTable2 />
      </TemplateBox>
      <TemplateBox>
        <DropDown />
        <DropDown2 />
        <Skeleton sx={{ height: '200px' }} />
        <Stack direction="row" spacing={1}>
          <Chip label="primary" color="primary" />
          <Chip label="success" color="primary" variant="outlined" />
        </Stack>
        <CustomToggle />
        <CustomModal />
      </TemplateBox>
    </Box>
  );
}
