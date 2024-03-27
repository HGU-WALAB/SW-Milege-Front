import { useSelector } from 'react-redux';
import axiosInstance from 'src/utils/axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import { all } from 'axios';

interface ISelectedItemsDeleteIcon {
  type: string;
}

export default function SelectedItemsDeleteIcon({ type }: ISelectedItemsDeleteIcon) {
  const selected = useSelector((state) => state.table.selectedId);
  const router = useRouter();

  const showDescendants = (id) => {
    axiosInstance.get(showDescendantsEndPoint(id)).then((res) => {
      alert(showErrorMessage(res));
    });
  };

  const showErrorMessage = (res) => {
    switch (type) {
      case '마일리지 타입':
        return `${res.data.list.map((item) => item.name)} 등 ${
          res.data.list.length
        } 개의 하위 항목 때문에 삭제 할 수 없습니다. 하위 항목을 먼저 삭제해주세요.`;
      case '마일리지 카테고리':
        return `${res.data.list.map((item) => item.name)} 등 ${
          res.data.list.length
        }개의 하위 항목 때문에 삭제할 수 없습니다. 하위 항목을 먼저 삭제해주세요.`;
      case '마일리지 세부 항복':
        return `[ ${res.data.list.map((item) => item.semesterName + ' ')} ] 등 ${
          res.data.list.length
        } 개의 학기에서 사용 중이기 때문에 삭제할 수 없습니다. 하위 항목을 먼저 삭제해주세요. `;
      case '학기별 마일리지 세부 항목':
        return `${res.data.count} 곳에서 사용 중입니다. ${res.data.list.map(
          (item) =>
            '\n [ ' +
            item.semesterItem.semesterName +
            ' ] ' +
            item.item.name +
            ' - ' +
            item.studentName +
            ' ( ' +
            item.sid +
            ' ) '
        )} 등 ${
          res.data.list.length
        }명의 학생이 등록 되어 있기 때문에 삭제할 수 없습니다. 하위 항목을 먼저 삭제해주세요. `;
      case '학생 관리':
        return `${res.data.count} 곳에 등록되어 있는 학생입니다. \n ${res.data.list.map(
          (item) => ' [ ' + item.semesterItem.semesterName + ' ] ' + item.item.name
        )} \n 등 ${
          res.data.count
        }곳에 학생이 등록 되어 있기 때문에 삭제할 수 없습니다. 하위 항목을 먼저 삭제해주세요. `;
      case '마일리지 적립':
        return `${res.data.count} 곳에서 사용 중입니다. ${res.data.list.map(
          (item) =>
            '\n [ ' +
            item.semesterItem.semesterName +
            ' ] ' +
            item.item.name +
            ' - ' +
            item.studentName +
            ' ( ' +
            item.sid +
            ' ) '
        )} 등 ${
          res.data.list.length
        }명의 학생이 등록 되어 있기 때문에 삭제할 수 없습니다. 하위 항목을 먼저 삭제해주세요. `;
    }
  };

  const showDescendantsEndPoint = (id: number) => {
    switch (type) {
      case '마일리지 타입':
        return `/api/mileage/categories/types/${id}`;
      case '마일리지 카테고리':
        return `/api/mileage/items/categories/${id}`;
      case '마일리지 세부 항복':
        return `/api/mileage/semesters/items/${id}`;
      case '학기별 마일리지 세부 항목':
        return `/api/mileage/records/semesterItems/${id}`;
      case '학생 관리':
        return `/api/mileage/records/students/${id}`;
      case '마일리지 적립':
        return `/api/mileage/records/semesterItems/${id}`;
      case '신청자 관리':
        return `/api/mileage/records/students/${id}`;
    }
  };

  const deleteEndPoint = () => {
    switch (type) {
      case '마일리지 타입':
        return '/api/mileage/types';
      case '마일리지 카테고리':
        return '/api/mileage/categories';
      case '마일리지 세부 항복':
        return '/api/mileage/items';
      case '사용자 관리':
        return '/api/mileage/admins';
      case '학생 관리':
        return '/api/mileage/students';
      case '학기별 마일리지 세부 항목':
        return '/api/mileage/semesters';
      case '마일리지 적립':
        return `/api/mileage/semesters`;
      case '마일리지 조회':
        return '/api/mileage/records';
      case '신청자 관리':
        return '/api/mileage/students';
      case '관리자':
        return `/api/mileage/admins`;
    }
  };

  async function deleteSelectedItems() {
    const allDelete = async () => {
      let i = 0;
      for (i = 0; i < selected.length; ++i) {
        try {
          const res = await axiosInstance.delete(`${deleteEndPoint()}/${selected[i]}`);
        } catch (err) {
          await showDescendants(selected[i]);
          break;
        }
        // await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      alert(`총 ${i}개의 항목이 삭제 되었습니다.`);
      router.reload();
    };

    await allDelete();
  }

  return (
    <DeleteIcon
      onClick={() => {
        if (window.confirm(`총 ${selected.length}개 항목을 정말 삭제하시겠습니까?`)) {
          deleteSelectedItems();
        } else {
          return;
        }
      }}
    />
  );
}
