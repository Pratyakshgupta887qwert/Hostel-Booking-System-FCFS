import XLSX from "xlsx";

export const parseExcel = (buffer) => {
  const workbook = XLSX.read(buffer, { type: "buffer" });

  if (workbook.SheetNames.length !== 1) {
    throw new Error("Excel file must contain exactly one sheet");
  }

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const data = XLSX.utils.sheet_to_json(sheet, { defval: "" });

  return data;
};
