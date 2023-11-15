import { useSelector } from 'react-redux';
import axiosInstance from 'src/utils/axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';

interface ISelectedItemsDeleteIcon {
  type: string;
}

export default function SelectedItemsDeleteIcon({ type }: ISelectedItemsDeleteIcon) {
  const selected = useSelector((state) => state.table.selectedId);
  const router = useRouter();
  console.log(type);

  const showDescendants = (id) => {
    axiosInstance.get(showDescendantsEndPoint(id)).then((res) => {
      alert(showErrorMessage(res));
    });
  };

  const showErrorMessage = (res) => {
    switch (type) {
      case '마일리지 카테고리':
        return `${res.data.list.map((item) => item.name + '\n')} 등 ${
          res.data.list.length
        }개의 하위 항목 때문에 삭제할 수 없습니다. 하위 항목을 먼저 삭제해주세요.`;
      case '마일리지 글로벌 항목':
        return `[ ${res.data.list.map((item) => item.semesterName + ' ')} ] 등 ${
          res.data.list.length
        } 개의 학기에서 사용 중이기 때문에 삭제할 수 없습니다. 하위 항목을 먼저 삭제해주세요. `;
      case '마일리지 학기별 항목':
        return `${res.data.count} 곳에서 사용 중입니다. \n ${res.data.list.map(
          (item) =>
            ' [ ' +
            item.semesterItem.semesterName +
            ' ] ' +
            item.item.name +
            ' - ' +
            item.studentName +
            ' ( ' +
            item.sid +
            ' ) '
        )} \n 등 ${
          res.data.list.length
        }명의 학생이 등록 되어 있기 때문에 삭제할 수 없습니다. 하위 항목을 먼저 삭제해주세요. `;
      case '학생 관리':
        return `${res.data.count} 곳에 등록되어 있는 학생입니다. \n ${res.data.list.map(
          (item) => ' [ ' + item.semesterItem.semesterName + ' ] ' + item.item.name
        )} \n 등 ${
          res.data.count
        }곳에 학생이 등록 되어 있기 때문에 삭제할 수 없습니다. 하위 항목을 먼저 삭제해주세요. `;
    }
  };

  const showDescendantsEndPoint = (id) => {
    switch (type) {
      case '마일리지 카테고리':
        return `/api/mileage/items/categories/${id}`;
      case '마일리지 글로벌 항목':
        return `/api/mileage/semesters/items/${id}`;
      case '마일리지 학기별 항목':
        return `/api/mileage/records/semesterItems/${id}`;
      case '학생 관리':
        return `/api/mileage/records/students/${id}`;
    }
  };

  const deleteEndPoint = () => {
    switch (type) {
      case '마일리지 카테고리':
        return '/api/mileage/categories';
      case '마일리지 글로벌 항목':
        return '/api/mileage/items';
      case '사용자 관리':
        return '/api/mileage/admins';
      case '학생 관리':
        return '/api/mileage/students';
      case '마일리지 학기별 항목':
        return '/api/mileage/semesters';
    }
  };

  async function deleteSelectedItems() {
    for (let i = 0; i < selected.length; ++i) {
      try {
        const res = await axiosInstance.delete(`${deleteEndPoint()}/${selected[i]}`);
        console.log(res);
        router.reload();
      } catch (err) {
        console.log(err);
        console.log('Current ID:', selected[i]);
        showDescendants(selected[i]);
        // alert('삭제에 실패하였습니다.');
        break; // 예외가 발생하면 루프를 중단
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  return (
    <DeleteIcon
      onClick={() => {
        if (window.confirm(`총 ${selected.length}개 항목을 정말 삭제하시겠습니까?`)) {
          deleteSelectedItems();
          // axiosInstance
          //   .delete(`${deleteEndPoint()}/${selected[i]}`)
          //   .then((res) => {
          //     console.log(res);
          //     router.reload();
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //     console.log('Current ID:', selected[i]);
          //     return;
          //     showDescendants(selected[i]);

          //     // alert('삭제에 실패하였습니다.');
          //   });
          // sleep(1);

          // selected.map(async (id) => {
          //   await axiosInstance
          //     .delete(`${deleteEndPoint()}/${id}`)
          //     .then((res) => {
          //       console.log(res);
          //       router.reload();
          //     })
          //     .catch((err) => {
          //       console.log(err);
          //       console.log('Current ID:', id);
          //       showDescendants(id);
          //       // alert('삭제에 실패하였습니다.');
          //     });
          // });
        } else {
          return;
        }
      }}
    />
  );
}
