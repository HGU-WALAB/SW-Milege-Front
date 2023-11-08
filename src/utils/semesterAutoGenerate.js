export const generateSemesters = (currentYear) => {
  const startYear = currentYear - 4;
  const endYear = currentYear + 1;
  const semesters = ['전체'];

  for (let year = startYear; year <= endYear; year += 1) {
    semesters.push(`${year}-01`);
    semesters.push(`${year}-02`);
  }

  return semesters;
};

const currentDate = new Date();
export const currentYear = currentDate.getFullYear();
