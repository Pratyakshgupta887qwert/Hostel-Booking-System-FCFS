import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// --- MOCK DATA (Updated with hostelType) ---
const initialRooms = [
  {
    id: 1,
    block: "Block A",
    hostelType: "Boys",
    roomNumber: "101",
    type: "AC",
    capacity: 2,
    available: 1,
  },
  {
    id: 2,
    block: "Block A",
    hostelType: "Boys",
    roomNumber: "102",
    type: "AC",
    capacity: 2,
    available: 0,
  },
  {
    id: 3,
    block: "Block C",
    hostelType: "Girls",
    roomNumber: "201",
    type: "Non-AC",
    capacity: 3,
    available: 3,
  },
  {
    id: 4,
    block: "Block B",
    hostelType: "Boys",
    roomNumber: "110",
    type: "AC",
    capacity: 1,
    available: 1,
  },
];

const RoomManagement = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState(initialRooms);

  // Updated state to handle block names that include the type
  const [newRoom, setNewRoom] = useState({
    block: "Block A (Boys)",
    roomNumber: "",
    type: "AC",
    capacity: "2",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoom((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddRoom = (e) => {
    e.preventDefault();
    if (!newRoom.roomNumber) {
      alert("Please enter a room number.");
      return;
    }
    setIsSubmitting(true);
    console.log("[API SIM] Uploading new room data:", newRoom);

    // Simulate API call
    setTimeout(() => {
      // Logic to parse 'Block A (Boys)' into separate block and type fields
      const blockParts = newRoom.block.match(/(.+) \((.+)\)/);
      const blockName = blockParts ? blockParts[1] : newRoom.block; // e.g., "Block A"
      const hostelType = blockParts ? blockParts[2] : "N/A"; // e.g., "Boys"

      const newRoomData = {
        id: Date.now(),
        block: blockName,
        hostelType: hostelType,
        roomNumber: newRoom.roomNumber,
        type: newRoom.type,
        capacity: parseInt(newRoom.capacity),
        available: parseInt(newRoom.capacity),
      };

      setRooms((prev) => [newRoomData, ...prev]);
      setNewRoom({
        block: "Block A (Boys)",
        roomNumber: "",
        type: "AC",
        capacity: "2",
      }); // Reset form
      setIsSubmitting(false);
      console.log("[API SIM] Upload successful!");
    }, 1500);
  };

  const getCapacityText = (capacity) => {
    if (capacity === 1) return "Single Seater";
    if (capacity === 2) return "Double Seater";
    if (capacity === 3) return "Triple Seater";
    return `${capacity} Seater`;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between bg-[#15202b]/40 border border-white/10 p-6 rounded-2xl backdrop-blur-md shadow-2xl">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="group p-2.5 bg-[#0b1118]/60 hover:bg-white/10 rounded-xl border border-white/10 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-slate-300 group-hover:text-white cursor-pointer"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-lg">
              Room Management
            </h1>
            <p className="text-slate-300 text-sm mt-1 font-medium">
              Add new rooms to the allocation pool.
            </p>
          </div>
        </div>
      </div>

      {/* --- ADD ROOM FORM --- */}
      <div className="bg-[#15202b]/60 p-6 sm:p-8 rounded-2xl border border-[#137fec]/40 shadow-[0_15px_40px_rgba(19,127,236,0.15)] backdrop-blur-xl">
        <h2 className="text-xl font-extrabold text-white drop-shadow-md mb-6">
          Upload New Room
        </h2>
        <form onSubmit={handleAddRoom} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-300">
                Block Name
              </label>
              <select
                name="block"
                value={newRoom.block}
                onChange={handleInputChange}
                className="block w-full px-4 py-3.5 bg-[#0b1118]/70 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#137fec] focus:ring-1 focus:ring-[#137fec] transition-all shadow-inner appearance-none cursor-pointer"
              >
                <option value="Block A (Boys)">Block A (Boys)</option>
                <option value="Block B (Boys)">Block B (Boys)</option>
                <option value="Block C (Girls)">Block C (Girls)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-300">
                Room Number
              </label>
              <input
                name="roomNumber"
                type="text"
                placeholder="e.g., 103"
                value={newRoom.roomNumber}
                onChange={handleInputChange}
                className="block w-full px-4 py-3.5 bg-[#0b1118]/70 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#137fec] focus:ring-1 focus:ring-[#137fec] transition-all shadow-inner cursor-auto"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-300">
                Room Type
              </label>
              <select
                name="type"
                value={newRoom.type}
                onChange={handleInputChange}
                className="block w-full px-4 py-3.5 bg-[#0b1118]/70 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#137fec] focus:ring-1 focus:ring-[#137fec] transition-all shadow-inner appearance-none cursor-pointer"
              >
                <option>AC</option>
                <option>Non-AC</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-300">
                Seater
              </label>
              <select
                name="capacity"
                value={newRoom.capacity}
                onChange={handleInputChange}
                className="block w-full px-4 py-3.5 bg-[#0b1118]/70 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#137fec] focus:ring-1 focus:ring-[#137fec] transition-all shadow-inner appearance-none cursor-pointer"
              >
                <option value="1">Single</option>
                <option value="2">Double</option>
                <option value="3">Triple</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-3 px-8 rounded-xl text-sm font-bold text-white bg-[#137fec]/90 border border-[#137fec]/50 hover:bg-[#137fec] shadow-[0_0_20px_rgba(19,127,236,0.4)] transition-all transform hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Add Room"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* --- EXISTING ROOMS TABLE --- */}
      <div className="bg-[#15202b]/60 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl overflow-hidden">
        <h3 className="text-lg font-extrabold text-white drop-shadow-md p-6 border-b border-white/10">
          Existing Rooms Pool
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-300">
            <thead className="text-xs text-slate-300 uppercase bg-[#0b1118]/60">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Room No.
                </th>
                <th scope="col" className="px-6 py-4">
                  Block
                </th>
                <th scope="col" className="px-6 py-4">
                  Hostel Type
                </th>{" "}
                {/* <-- NEW COLUMN HEADER */}
                <th scope="col" className="px-6 py-4">
                  Room Type
                </th>
                <th scope="col" className="px-6 py-4">
                  Capacity
                </th>
                <th scope="col" className="px-6 py-4">
                  Available Beds
                </th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr
                  key={room.id}
                  className="border-b border-white/10 hover:bg-[#15202b]/80 transition-colors"
                >
                  <td className="px-6 py-4 font-bold text-[#3b9cff]">
                    {room.roomNumber}
                  </td>
                  <td className="px-6 py-4 font-medium text-white">
                    {room.block}
                  </td>
                  {/* --- NEW COLUMN DATA --- */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase backdrop-blur-md border ${
                        room.hostelType === "Boys"
                          ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                          : "bg-pink-500/20 text-pink-300 border-pink-500/30"
                      }`}
                    >
                      {room.hostelType}
                    </span>
                  </td>
                  <td className="px-6 py-4">{room.type}</td>
                  <td className="px-6 py-4">
                    {getCapacityText(room.capacity)}
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-emerald-400">
                    {room.available} / {room.capacity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RoomManagement;
