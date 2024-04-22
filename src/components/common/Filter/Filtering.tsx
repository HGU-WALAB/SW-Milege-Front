import { Box, styled } from '@mui/material';
import CategoryAutoComplete from './CategoryAutoComplete';
import SemesterDropdown from './SemesterDropdown';
import IsVisibleDropdown from './IsVisibleDropdown';
import ItemAutoComplete from './ItemAutoComplete';
import GradeDropdown from './GradeDropdown';
import DepartmentDropdown from './DepartmentDropDown';
import StudentNameAutoComplete from './StudentNameAutoComplete';
import { useSelector } from 'react-redux';
import CategoryTypeDropDown from './CategoryTypeDropDown';
import StudentIdAutoComplete from './StudentIDAutoComplete';
import AdminIdAutoComplete from './AdminIdAutoComplete';

const ResponsiveFilterBox = styled(Box)({
  padding: '10px 0px',
  overflowX: 'scroll',
  display: 'flex',
  width: '100%',
  gap: '10px',
});

export function removeDuplicates(arr) {
  return [...new Set(arr)];
}

export default function Filtering() {
  const tableNum = useSelector((state) => state.component.componentNum);

  function renderComponentsForTableNums(allowedTableNums, Component) {
    return allowedTableNums.includes(tableNum) ? Component : null;
  }
  return (
    <ResponsiveFilterBox>
      {renderComponentsForTableNums([1], <CategoryTypeDropDown />)}
      {renderComponentsForTableNums([1, 2, 3, 4], <CategoryAutoComplete />)}
      {renderComponentsForTableNums([3, 4, 5, 6, 10], <SemesterDropdown />)}
      {renderComponentsForTableNums([2], <IsVisibleDropdown />)}
      {renderComponentsForTableNums([2, 3, 4, 5], <ItemAutoComplete />)}
      {renderComponentsForTableNums([4, 6, 7, 9, 10, 11], <StudentNameAutoComplete />)}
      {renderComponentsForTableNums([6, 7], <GradeDropdown />)}
      {renderComponentsForTableNums([6, 7, 10], <DepartmentDropdown />)}
      {renderComponentsForTableNums([4, 6, 7, 10], <StudentIdAutoComplete />)}
      {renderComponentsForTableNums([8], <AdminIdAutoComplete />)}
    </ResponsiveFilterBox>
  );
}
