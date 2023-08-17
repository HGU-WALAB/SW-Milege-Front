import { Box, Table, TextField } from '@mui/material';
import CustomTable1 from 'src/components/Template/CustomTable1';
import CustomTable2 from 'src/components/Template/CustomTable2';
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
        <CustomTextField label="TextField" variant="outlined" />
        <TextField label="TextField" variant="standard" />
      </TemplateBox>
      <TemplateBox width="400px" height="200px"></TemplateBox>
      <TemplateBox width="1000px" height="1200px">
        <CustomTable1 />

        <CustomTable2 />
      </TemplateBox>
    </Box>
  );
}
