import { Board } from 'src/assets/data/board/board';
import EnhancedTable from '../CustomTable';
import MileageCategory from 'src/components/board/MileageCategory';

export const ComponentReturn = (text) => {
  switch (text) {
    case Board['마일리지 카테고리']:
      //   return <EnhancedTable type="마일리지 카테고리" />;
      return <MileageCategory />;
    // return <div>d</div>;
    case Board['마일리지 항목']:
      // return <EnhancedTable type="마일리지 카테고리" />;
      return <div>dd</div>;
    case Board['마일리지 조회']:
      return <SearchIcon />;
    case Board['마일리지 등록']:
      return <InputIcon />;
    case Board['신청자 관리']:
      return <AssignmentIndIcon />;
    case Board['학생 관리']:
      return <Face6Icon />;
    case Board['사용자 관리']:
      return <PersonIcon />;
    case Board['학생별 마일리지 현황']:
      return <DonutSmallIcon />;
    case Board['마일리지 선정결과']:
      return <GavelIcon />;
    case Board['설정']:
      return <SettingsIcon />;
    default:
      return <div>Not Found </div>;
  }
};
