import HostelStudent from "../models/hostelStudentModel.js";

export const ensureHostelStudentExists = async (student) => {
  const [hostelStudent] = await HostelStudent.findOrCreate({
    where: { roll_number: student.roll_number },
    defaults: {
      year: student.year,
      gender: student.gender,
    },
  });

  return hostelStudent;
};
