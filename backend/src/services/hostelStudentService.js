import HostelStudent from "../models/hostelStudentModel.js";

export const ensureHostelStudentExists = async (student) => {
  let hostelStudent = await HostelStudent.findByPk(student.roll_number);

  if (!hostelStudent) {
    hostelStudent = await HostelStudent.create({
      roll_number: student.roll_number,
      year: student.year,
      gender: student.gender,
    });
  }

  return hostelStudent;
};
