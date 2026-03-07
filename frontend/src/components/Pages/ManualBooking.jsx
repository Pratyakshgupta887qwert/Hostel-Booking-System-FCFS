import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ManualBooking = () => {
  const navigate = useNavigate();
  const [offlineForm, setOfflineForm] = useState({
    studentId: "",
    hostelBlock: "Block A (Boys)", // Default value for clarity
    roomNumber: "",
    roomType: "AC", // Default value
    capacity: "2", // Default value
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper function to display capacity text in alerts/logs
  const getCapacityText = (capacity) => {
    switch (String(capacity)) {
      case "1":
        return "Single Seater";
      case "2":
        return "Double Seater";
      case "3":
        return "Triple Seater";
      default:
        return `${capacity} Seater`;
    }
  };

  const handleOfflineBooking = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("[API SIM] Admin processing manual booking:", offlineForm);

    // Simulate API call with FCFS logic
    setTimeout(() => {
      const roomDetails = `${offlineForm.hostelBlock} - Room ${offlineForm.roomNumber} (${offlineForm.roomType}, ${getCapacityText(offlineForm.capacity)})`;
      alert(
        `SIMULATION: Successfully locked bed for Student ID: ${offlineForm.studentId}.\n\nDetails: ${roomDetails}\n\nThe transaction has been committed.`,
      );
      setIsSubmitting(false);
      // Reset form to default state
      setOfflineForm({
        studentId: "",
        hostelBlock: "Block A (Boys)",
        roomNumber: "",
        roomType: "AC",
        capacity: "2",
      });
      navigate("/admin/dashboard"); // Go back to dashboard after success
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between bg-[#15202b]/40 border border-white/10 p-6 rounded-2xl backdrop-blur-md shadow-2xl">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="group p-2.5 bg-[#0b1118]/60 hover:bg-white/10 rounded-xl border border-white/10 transition-all cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-slate-300 group-hover:text-white"
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
              Process Manual Booking
            </h1>
            <p className="text-slate-300 text-sm mt-1 font-medium">
              Bypasses payment but strictly enforces Database Row-Locking.
            </p>
          </div>
        </div>
      </div>

      {/* --- FORM --- */}
      <div className="lg:col-span-2 bg-[#15202b]/60 p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl">
        <form onSubmit={handleOfflineBooking} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Student ID */}
            <div className="space-y-2 md:col-span-1">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-300">
                Student ID
              </label>
              <input
                required
                type="text"
                placeholder="231500XXXX"
                value={offlineForm.studentId}
                onChange={(e) =>
                  setOfflineForm({ ...offlineForm, studentId: e.target.value })
                }
                className="block w-full px-4 py-3.5 bg-[#0b1118]/70 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#137fec] focus:ring-1 focus:ring-[#137fec] transition-all"
              />
            </div>

            {/* Academic / Hostel Block */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-300">
                Academic Block (Hostel)
              </label>
              <select
                required
                value={offlineForm.hostelBlock}
                name="hostelBlock"
                onChange={(e) =>
                  setOfflineForm({
                    ...offlineForm,
                    hostelBlock: e.target.value,
                  })
                }
                className="block w-full px-4 py-3.5 bg-[#0b1118]/70 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#137fec] focus:ring-1 focus:ring-[#137fec] appearance-none cursor-pointer"
              >
                <option value="Block A (Boys)">Block A (Boys)</option>
                <option value="Block B (Boys)">Block B (Boys)</option>
                <option value="Block C (Girls)">Block C (Girls)</option>
              </select>
            </div>

            {/* Room Number */}
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-300">
                Room Number
              </label>
              <input
                required
                type="text"
                placeholder="e.g. 101"
                value={offlineForm.roomNumber}
                onChange={(e) =>
                  setOfflineForm({ ...offlineForm, roomNumber: e.target.value })
                }
                className="block w-full px-4 py-3.5 bg-[#0b1118]/70 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#137fec] focus:ring-1 focus:ring-[#137fec]"
              />
            </div>

            {/* Room Type (AC/Non-AC) */}
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-300">
                Room Type
              </label>
              <select
                required
                value={offlineForm.roomType}
                name="roomType"
                onChange={(e) =>
                  setOfflineForm({ ...offlineForm, roomType: e.target.value })
                }
                className="block w-full px-4 py-3.5 bg-[#0b1118]/70 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#137fec] focus:ring-1 focus:ring-[#137fec] appearance-none cursor-pointer"
              >
                <option value="AC">AC</option>
                <option value="Non-AC">Non-AC</option>
              </select>
            </div>

            {/* Seater Capacity */}
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-300">
                Seater
              </label>
              <select
                required
                value={offlineForm.capacity}
                name="capacity"
                onChange={(e) =>
                  setOfflineForm({ ...offlineForm, capacity: e.target.value })
                }
                className="block w-full px-4 py-3.5 bg-[#0b1118]/70 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#137fec] focus:ring-1 focus:ring-[#137fec] appearance-none cursor-pointer"
              >
                <option value="1">Single Bed</option>
                <option value="2">Double Bed</option>
                <option value="3">Triple Bed</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-4 mt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-3.5 px-8 rounded-xl text-sm font-bold text-white bg-[#137fec]/90 border border-[#137fec]/50 hover:bg-[#137fec] shadow-[0_0_20px_rgba(19,127,236,0.4)] transition-all transform hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
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
                "Commit Transaction"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManualBooking;
