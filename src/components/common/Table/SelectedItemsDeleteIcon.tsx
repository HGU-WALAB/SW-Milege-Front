import { useSelector } from 'react-redux';
import axiosInstance from 'src/utils/axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';

interface ISelectedItemsDeleteIcon {
  type: string;
}

export default function SelectedItemsDeleteIcon({ type }: ISelectedItemsDeleteIcon) {
  const selected = useSelector((state) => state.data.selectedId);
  const router = useRouter();
  console.log(type);

  const deleteEndPoint = () => {
    switch (type) {
      case '마일리지 카테고리':
        return '/api/mileage/categories';
      case '마일리지 글로벌 항목':
        return '/api/mileage/items';
      case '사용자 관리':
        return '/api/mileage/admins';
    }
  };

  return (
    <DeleteIcon
      onClick={() => {
        if (
          window.confirm(`${selected}번 (총 ${selected.length}개) 항목을 정말 삭제하시겠습니까?`)
        ) {
          selected.map((id) => {
            axiosInstance
              .delete(`${deleteEndPoint()}/${id}`)
              .then((res) => {
                console.log(res);
                alert(`항목 ${id}번이 삭제되었습니다.`);
                router.reload();
              })
              .catch((err) => {
                console.log(err);
                alert('삭제에 실패하였습니다.');
              });
          });
        } else {
          return;
        }
      }}
    />
  );
}
