import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ErrorMessage, Field } from 'formik';
import { useSelector } from 'react-redux';
import { CATEGORYID, DEPARTMENT, SEMESTER } from 'src/assets/data/fields';
import { engToKor } from '../modal/SWModal';

export default function DepartmentSelect({ name }) {
  const majors = [
    'ACE',
    'AI',
    'GE',
    'GM',
    'ICT융합',
    'UIL',
    '건설공학',
    '경영학',
    '경제학',
    '공연영상학',
    '국제지역학',
    '기계공학',
    '도시환경공학',
    '사회복지학',
    '상담심리학',
    '생명과학부',
    '시각디자인',
    '언론정보학',
    '영어',
    '전자공학',
    '전자제어공학',
    '제품디자인',
    '컴퓨터공학',
    '한국법',
  ];

  const MySelect = ({ field, form, ...props }) => (
    <Select {...field} {...props}>
      {majors.map((major, index) => (
        <MenuItem key={index} value={majors}>
          {majors}
        </MenuItem>
      ))}
    </Select>
  );

  return (
    <FormControl sx={{ width: '100%' }}>
      <InputLabel id="demo-simple-select-label">{engToKor(name)}</InputLabel>
      <Field as={MySelect} name={name} />
      <ErrorMessage name={name} />
    </FormControl>
  );
}
