import axiosInstance from './axios';
import { setSemester } from '../redux/slices/filter';
import {
  setAdminList,
  setCategoryList,
  setItemList,
  setDetailedItemBySemesterList,
  setSemesterList,
  setStudentList,
  setTypeList,
} from '../redux/slices/filterList';
import { dispatch } from '../redux/store';
import { setCurrentSemester } from '../redux/slices/data';

export const filteringInit = async () => {
  const resSemester = await axiosInstance.get(`/api/mileage/semesters/currentSemester`);
  const currentSemester = resSemester.data.data.name;
  await dispatch(setSemester(currentSemester));
  await dispatch(setCurrentSemester(currentSemester));

  const resType = await axiosInstance.get('/api/mileage/types');
  const typeData = resType.data;
  await dispatch(setTypeList(typeData.list?.map((type) => ({ id: type.id, name: type.name }))));

  const resCategory = await axiosInstance.get('/api/mileage/categories');
  const categoryData = resCategory.data;

  await dispatch(
    setCategoryList(
      categoryData.list?.map((category) => ({
        id: category.id,
        name: category.name,
        maxPoints: category.maxPoints,
      }))
    )
  );

  const resSemesterList = await axiosInstance.get('/api/mileage/semesters');
  const semesterList = resSemesterList.data.list.map((sem) => sem.name).reverse();

  await dispatch(setSemesterList(semesterList));

  const resGlobalItem = await axiosInstance.get('/api/mileage/items');
  const globalItemData = await resGlobalItem.data;
  await dispatch(
    setItemList(
      globalItemData.list?.map((item) => ({
        id: item.id,
        name: item.name,
        itemMaxPoints: item.itemMaxPoints,
      }))
    )
  );

  // const resDetailSemesterItem = await axiosInstance.get(`/api/mileage/semesters/${currentSemester}/items`);

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

  const resAdmins = await axiosInstance.get('/api/mileage/admins');
  const adminData = await resAdmins.data;
  await dispatch(
    setAdminList(
      adminData.list?.map((admin) => ({
        name: admin.name,
        aid: admin.aid,
      }))
    )
  );
};
