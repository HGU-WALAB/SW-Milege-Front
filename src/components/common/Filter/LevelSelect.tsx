import { FormControl, InputLabel, MenuItem, Select, styled } from '@mui/material';
import { ErrorMessage, Field } from 'formik';
import { LEVEL } from 'src/assets/data/fields';

export default function LevelSelect() {
  const LEVELS = [
    {
      id: 0,
      label: '관리자',
      value: '0',
    },
    {
      id: 1,
      label: '담당자',
      value: '1',
    },
    {
      id: 2,
      label: '일반',
      value: '2',
    },
    {
      id: 3,
      label: '미등록',
      value: '3',
    },
  ];

  const MySelect = ({ field, form, ...props }) => (
    <StyledSelect {...field} {...props}>
      {LEVELS.map((level) => (
        <MenuItem key={level.id} value={level.value}>
          {level.label}
        </MenuItem>
      ))}
    </StyledSelect>
  );

  return (
    <StyledFormControl variant="outlined" fullWidth>
      <InputLabel id="level-select-label">권한</InputLabel>
      <Field as={MySelect} name={LEVEL} label="권한" />
      <ErrorMessage name={LEVEL} />
    </StyledFormControl>
  );
}

const StyledFormControl = styled(FormControl)`
  & .MuiOutlinedInput-root {
    fieldset {
      border-color: black;
    }
  }
`;

const StyledSelect = styled(Select)`
  &.MuiOutlinedInput-root {
    fieldset {
      border-color: black;
    }
  }
`;
