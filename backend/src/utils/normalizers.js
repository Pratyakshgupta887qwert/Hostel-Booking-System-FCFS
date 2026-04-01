export const normalizeRoomNumber = (value) => {
  return String(value).trim().toUpperCase();
};

export const normalizeBoolean = (value) => {
  const val = String(value).trim().toLowerCase();

  if (["true", "yes", "ac", "y"].includes(val)) return true;
  if (["false", "no", "nonac", "n", "non-ac"].includes(val)) return false;

  return null;
};
