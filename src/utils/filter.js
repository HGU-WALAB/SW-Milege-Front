import axiosInstance from './axios';
import { setSemester } from '../redux/slices/filter';
import { setCategoryList, setItemList, setStudentList } from '../redux/slices/filterList';
import { dispatch } from '../redux/store';
import { setCurrentSemester } from '../redux/slices/data';

export const filteringInit = async () => {
  const resSemester = await axiosInstance.get(`/api/mileage/semesters/currentSemester`);
  const currentSemester = resSemester.data.data.name;
  await dispatch(setSemester(currentSemester));
  await dispatch(setCurrentSemester(currentSemester));

  const resCategory = await axiosInstance.get('/api/mileage/categories');
  const categoryData = resCategory.data;
  await dispatch(
    setCategoryList(
      categoryData.list?.map((category) => ({ id: category.id, name: category.name }))
    )
  );

  const resGlobalItem = await axiosInstance.get('/api/mileage/items');
  const globalItemData = await resGlobalItem.data;
  await dispatch(
    setItemList(globalItemData.list?.map((item) => ({ id: item.id, name: item.name })))
  );

  const resStudents = await axiosInstance.get(`/api/mileage/students`);
  const studentData = await resStudents.data;
  await dispatch(
    setStudentList(
      studentData.list?.map((student) => ({
        id: student.id,
        name: student.name,
        sid: student.sid,
      }))
    )
  );
};
