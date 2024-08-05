import { Box, styled } from '@mui/material';
import { useSelector } from 'react-redux';
import CategoryAutoComplete from './CategoryAutoComplete';
import SemesterDropdown from './SemesterDropdown';
import ItemAutoComplete from './ItemAutoComplete';
import GradeDropdown from './GradeDropdown';
import DepartmentDropdown from './DepartmentDropDown';
import StudentNameAutoComplete from './StudentNameAutoComplete';
import StudentIdAutoComplete from './StudentIDAutoComplete';
import AdminIdAutoComplete from './AdminIdAutoComplete';
import { RootState } from 'src/redux/rootReducer';

export function removeDuplicates<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}


export default function Filtering() {
  const tableNum = useSelector((state: RootState) => state.component.componentNum);

  function renderComponentsForTableNums(allowedTableNums: number[], Component: React.ReactNode): React.ReactNode | null {
    return allowedTableNums.includes(tableNum) ? Component : null;
  }
  

  return (
    /**
     * tableNum 은 사이드바 메뉴의 순서(위에서부터 0)
     * @see /src/components/common/Drawer/Drawer.tsx#L211
     */
    <ResponsiveFilterBox>
      {/* {renderComponentsForTableNums([1], <CategoryTypeDropDown />)} */}
      {renderComponentsForTableNums([3, 4, 5, 6, 10], <SemesterDropdown />)}
      {renderComponentsForTableNums([2, 3, 4, 5], <CategoryAutoComplete />)}
      {/* {renderComponentsForTableNums([2], <IsVisibleDropdown />)} */}
      {renderComponentsForTableNums([2, 3, 4, 5], <ItemAutoComplete />)}
      {renderComponentsForTableNums([4, 6, 7, 10], <StudentIdAutoComplete />)}
      {renderComponentsForTableNums([4, 6, 7, 9, 10, 11], <StudentNameAutoComplete />)}
      {renderComponentsForTableNums([6, 7], <GradeDropdown />)}
      {renderComponentsForTableNums([6, 7, 10], <DepartmentDropdown />)}
      {renderComponentsForTableNums([8], <AdminIdAutoComplete />)}
    </ResponsiveFilterBox>
  );
}

const ResponsiveFilterBox = styled(Box)({
  padding: '10px 0px',
  overflowX: 'scroll',
  display: 'flex',
  width: '100%',
  gap: '10px',
});
