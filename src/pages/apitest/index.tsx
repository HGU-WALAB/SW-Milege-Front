/**
 * @brief API 테스트 페이지
 * @description axiosInstance를 생성하고 Server Side Rendering을 통해 API를 호출하는 페이지
 */

import axiosInstance from 'src/utils/axios';
import { InferGetServerSidePropsType, GetServerSideProps } from 'next';

interface IGetMileageCategory {
  id: number;
  name: string;
  maxPoints: number;
}

export const getServerSideProps: GetServerSideProps<{
  fetchData: IGetMileageCategory[];
}> = async () => {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_API_KEY}/api/mileage/categories`);
  const res = await axiosInstance.get('/api/mileage/categories');
  const fetchData = res.data;
  console.log(fetchData);
  return { props: { fetchData } };
};

export default function Page({
  fetchData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      Next stars:
      <button
        onClick={() =>
          axiosInstance
            .post('/api/mileage/categories', {
              title: '전공 마일리지',
              description: '연구활ㅗ설명',
              maxPoints: 25,
            })
            .then((res) => console.log(res))
        }
      >
        카테고리 생성 api
      </button>
      <button
        onClick={() =>
          axiosInstance
            .patch(`/api/mileage/categories/2`, {
              title: '전공 마일리지',
              description: '연구활ㅗ설명',
              maxPoints: 20,
            })
            .then((res) => console.log(res))
        }
      >
        카테고리 update api
      </button>
      <button
        onClick={() =>
          axiosInstance.delete(`/api/mileage/categories/2`).then((res) => console.log(res))
        }
      >
        카테고리 delete api
      </button>
    </div>
  );
}
