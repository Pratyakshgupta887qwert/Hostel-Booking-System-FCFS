import Hostel from "./hostelModel.js";
import HostelAllowedYear from "./hostelAllowedYearModel.js";
import Room from "./roomModel.js";
import HostelStudent from "./hostelStudentModel.js";

/* ---------------------------
   Associations
---------------------------- */

// Hostel → Allowed Years
Hostel.hasMany(HostelAllowedYear, {
  foreignKey: "hostel_id",
  onDelete: "CASCADE",
});

HostelAllowedYear.belongsTo(Hostel, {
  foreignKey: "hostel_id",
});

// Hostel → Rooms
Hostel.hasMany(Room, {
  foreignKey: "hostel_id",
  onDelete: "CASCADE",
});

Room.belongsTo(Hostel, {
  foreignKey: "hostel_id",
});

/* Hostel ↔ HostelStudent */
Hostel.hasMany(HostelStudent, {
  foreignKey: "hostel_id",
  onDelete: "SET NULL",
});

HostelStudent.belongsTo(Hostel, {
  foreignKey: "hostel_id",
});

/* Room ↔ HostelStudent */
Room.hasMany(HostelStudent, {
  foreignKey: ["hostel_id", "room_number"],
});

HostelStudent.belongsTo(Room, {
  foreignKey: ["hostel_id", "room_number"],
});

export { Hostel, HostelAllowedYear, Room };
