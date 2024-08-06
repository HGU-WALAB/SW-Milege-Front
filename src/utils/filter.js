import axiosInstance from './axios';
import { setSemester, setCurrentSemester } from '../redux/slices/filter';
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

export const filteringInit = async () => {
  try {
    const [
      resSemester,
      resType,
      resCategory,
      resSemesterList,
      resGlobalItem,
      resStudents,
      resAdmins,
    ] = await Promise.all([
      axiosInstance.get(`/api/mileage/semesters/currentSemester`),
      axiosInstance.get('/api/mileage/types'),
      axiosInstance.get('/api/mileage/categories'),
      axiosInstance.get('/api/mileage/semesters'),
      axiosInstance.get('/api/mileage/items'),
      axiosInstance.get(`/api/mileage/students`),
      axiosInstance.get('/api/mileage/admins'),
    ]);

    const currentSemester = resSemester.data.data.name;
    // dispatch(setSemester(currentSemester));
    dispatch(setCurrentSemester(currentSemester));

    const typeData = resType.data;
    dispatch(setTypeList(typeData.list?.map((type) => ({ id: type.id, name: type.name }))));

    const categoryData = resCategory.data;
    dispatch(
      setCategoryList(
        categoryData.list?.map((category) => ({
          id: category.id,
          name: category.name,
          maxPoints: category.maxPoints,
        }))
      )
    );

    const semesterList = resSemesterList.data.list.map((sem) => sem.name).reverse();
    dispatch(setSemesterList(semesterList));

    const globalItemData = resGlobalItem.data;
    dispatch(
      setItemList(
        globalItemData.list?.map((item) => ({
          id: item.id,
          name: item.name,
          itemMaxPoints: item.itemMaxPoints,
        }))
      )
    );

    const studentData = resStudents.data;
    dispatch(
      setStudentList(
        studentData.list?.map((student) => ({
          id: student.id,
          name: student.name,
          sid: student.sid,
        }))
      )
    );

    const adminData = resAdmins.data;
    dispatch(
      setAdminList(
        adminData.list?.map((admin) => ({
          name: admin.name,
          aid: admin.aid,
        }))
      )
    );
  } catch (error) {
    console.error('Error initializing filtering data:', error);
  }
};
