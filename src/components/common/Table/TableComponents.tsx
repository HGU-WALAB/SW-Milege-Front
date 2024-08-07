import { Board } from 'src/assets/data/board/board';
import EnhancedTable from '../CustomTable';
import MileageCategory from 'src/components/board/MileageCategory';
import SearchIcon from '@mui/icons-material/Search';
import InputIcon from '@mui/icons-material/Input';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Face6Icon from '@mui/icons-material/Face6';
import PersonIcon from '@mui/icons-material/Person';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import GavelIcon from '@mui/icons-material/Gavel';
import SettingsIcon from '@mui/icons-material/Settings';
import MileageItem from 'src/components/board/MileageSemesterItem';
import MileageView from 'src/components/board/MileageView';
import MileageRegister from 'src/components/board/MileageRegister';
import RegisterManage from 'src/components/board/RegisterManage';
import StudentManage from 'src/components/board/StudentManage';
import UserManage from 'src/components/board/UserManage';
import MileageResult from 'src/components/board/MileageResult';
import MileageGlobalItem from 'src/components/board/MileageGlobalItem';

export const ComponentReturn = (text) => {
  switch (text) {
    case Board['마일리지 카테고리']:
      return <MileageCategory />;
    case Board['마일리지 항목']:
      return <MileageGlobalItem />;
    case Board['학기별 마일리지 항목']:
      return <MileageItem />;
    case Board['마일리지 조회']:
      return <MileageView />;
    case Board['마일리지 적립']:
      return <MileageRegister />;
    case Board['신청자 관리']:
      return <RegisterManage />;
    case Board['학생 관리']:
      return <StudentManage />;
    case Board['사용자 관리']:
      return <UserManage />;
    case Board['학생별 마일리지 현황']:
      return <DonutSmallIcon />;
    case Board['마일리지 선정결과']:
      return <MileageResult />;
    case Board['설정']:
      return <SettingsIcon />;
    default:
      return <div>Not Found </div>;
  }
};
