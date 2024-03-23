import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CategoryIcon from '@mui/icons-material/Category';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import SearchIcon from '@mui/icons-material/Search';
import InputIcon from '@mui/icons-material/Input';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Face6Icon from '@mui/icons-material/Face6';
import PersonIcon from '@mui/icons-material/Person';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import GavelIcon from '@mui/icons-material/Gavel';
import SettingsIcon from '@mui/icons-material/Settings';
import PublicIcon from '@mui/icons-material/Public';
import { Board } from 'src/assets/data/board/board';
import EqualizerIcon from '@mui/icons-material/Equalizer';
export const IconReturn = (text) => {
  switch (text) {
    case Board['마일리지 카테고리']:
      return <CategoryIcon />;
    case Board['마일리지 세부 항목']:
      return <PublicIcon />;
    case Board['학기별 마일리지 세부 항목']:
      return <AllInboxIcon />;
    case Board['마일리지 조회']:
      return <SearchIcon />;
    case Board['마일리지 적립']:
      return <InputIcon />;
    case Board['신청자 관리']:
      return <AssignmentIndIcon />;
    case Board['학생 관리']:
      return <Face6Icon />;
    case Board['관리자']:
      return <PersonIcon />;
    case Board['학생별 마일리지 현황']:
      return <DonutSmallIcon />;
    case Board['마일리지 선정결과']:
      return <GavelIcon />;
    case Board['신청 기간 설정']:
      return <SettingsIcon />;
    case Board['통계']:
      return <EqualizerIcon />;
    default:
      return <div>Not Found </div>;
  }
};
