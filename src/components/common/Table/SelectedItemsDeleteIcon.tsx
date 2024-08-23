import { useSelector } from 'react-redux';
import axiosInstance from 'src/utils/axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import { RootState } from 'src/redux/store';
import { Button, Typography } from '@mui/material';

interface ISelectedItemsDeleteIcon {
  type: string;
}

interface Item {
  name: string;
  semesterName?: string;
  studentName?: string;
  sid?: string;
  semesterItem?: {
    semesterName: string;
  };
}

interface ApiResponse {
  data: {
    list: Item[];
    count?: number;
  };
}

export default function SelectedItemsDeleteIcon({ type }: ISelectedItemsDeleteIcon) {
  const selected = useSelector((state: RootState) => state.table.selectedId);
  const router = useRouter();

  const showDescendants = async (id: number): Promise<void> => {
    try {
      const res = await axiosInstance.get(showDescendantsEndPoint(id));
      alert(showErrorMessage(res));
    } catch (error) {
      console.error('Error fetching descendants:', error);
    }
  };

  const showErrorMessage = (res: ApiResponse): string => {
    switch (type) {
      case '마일리지 타입':
        return `${res.data.list.map((item) => item.name).join(', ')} 등 ${
          res.data.list.length
        }개의 하위 항목 때문에 삭제할 수 없습니다. 하위 항목을 먼저 삭제해주세요.`;
      case '마일리지 카테고리':
        return `${res.data.list.map((item) => item.name).join(', ')} 등 ${
          res.data.list.length
        }개의 하위 항목 때문에 삭제할 수 없습니다. 하위 항목을 먼저 삭제해주세요.`;
      case '마일리지 항목':
        return `[ ${res.data.list.map((item) => item.semesterName).join(', ')} ] 등 ${
          res.data.list.length
        }개의 학기에서 사용 중이기 때문에 삭제할 수 없습니다. 하위 항목을 먼저 삭제해주세요. `;
      case '학기별 마일리지 항목':
        return `${res.data.count}곳에서 사용 중입니다. ${res.data.list
          .map(
            (item) =>
              `\n [ ${item.semesterItem?.semesterName} ] ${item.name} - ${item.studentName} ( ${item.sid} ) `
          )
          .join(', ')} 등 ${
          res.data.list.length
        }명의 학생이 등록되어 있기 때문에 삭제할 수 없습니다. 하위 항목을 먼저 삭제해주세요. `;
      case '학생 관리':
        return `${res.data.count}곳에 등록되어 있는 학생입니다. \n ${res.data.list
          .map((item) => ` [ ${item.semesterItem?.semesterName} ] ${item.name}`)
          .join(', ')} \n 등 ${
          res.data.count
        }곳에 학생이 등록되어 있기 때문에 삭제할 수 없습니다. 하위 항목을 먼저 삭제해주세요. `;
      case '마일리지 적립':
        return `${res.data.count}곳에서 사용 중입니다. ${res.data.list
          .map(
            (item) =>
              `\n [ ${item.semesterItem?.semesterName} ] ${item.name} - ${item.studentName} ( ${item.sid} ) `
          )
          .join(', ')} 등 ${
          res.data.list.length
        }명의 학생이 등록되어 있기 때문에 삭제할 수 없습니다. 하위 항목을 먼저 삭제해주세요. `;
      default:
        return '';
    }
  };

  const showDescendantsEndPoint = (id: number): string => {
    switch (type) {
      case '마일리지 타입':
        return `/api/mileage/items/types/${id}`;
      case '마일리지 카테고리':
        return `/api/mileage/items/categories/${id}`;
      case '마일리지 항목':
        return `/api/mileage/semesters/items/${id}`;
      case '학기별 마일리지 항목':
        return `/api/mileage/records/semesterItems/${id}`;
      case '학생 관리':
        return `/api/mileage/records/students/${id}`;
      case '마일리지 적립':
        return `/api/mileage/records/semesterItems/${id}`;
      case '신청자 관리':
        return `/api/mileage/records/students/${id}`;
      default:
        return '';
    }
  };

  const deleteEndPoint = (): string => {
    switch (type) {
      case '마일리지 타입':
        return '/api/mileage/types';
      case '마일리지 카테고리':
        return '/api/mileage/categories';
      case '마일리지 항목':
        return '/api/mileage/items';
      case '사용자 관리':
        return '/api/mileage/admins';
      case '학생 관리':
        return '/api/mileage/students';
      case '학기별 마일리지 항목':
        return '/api/mileage/semesters';
      case '마일리지 적립':
        return '/api/mileage/semesters';
      case '마일리지 조회':
        return '/api/mileage/records';
      case '신청자 관리':
        return '/api/mileage/students';
      case '관리자':
        return '/api/mileage/admins';
      default:
        return '';
    }
  };

  async function deleteSelectedItems() {
    const allDelete = async () => {
      let i = 0;
      for (i = 0; i < selected.length; ++i) {
        try {
          await axiosInstance.delete(`${deleteEndPoint()}/${selected[i]}`);
        } catch (err) {
          await showDescendants(selected[i]);
          break;
        }
      }
      alert(`총 ${i}개의 항목이 삭제되었습니다.`);
      router.reload();
    };

    await allDelete();
  }

  return (
    <Button
      onClick={() => {
        if (window.confirm(`총 ${selected.length}개 항목을 정말 삭제하시겠습니까?`)) {
          deleteSelectedItems();
        }
      }}
    >
      <DeleteIcon />
      <Typography variant="body2" color="inherit" fontWeight={700} sx={{ marginLeft: 1 }}>
        {selected.length}개 삭제
      </Typography>
    </Button>
  );
}
