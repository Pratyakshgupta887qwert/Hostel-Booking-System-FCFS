import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- MOCK DATA ---
// In a real application, this data would be fetched from your backend API
const allBookingsData = [
  { id: 1, studentId: '2315000598', studentName: 'Bharat Dixit', hostel: 'Block A', room: '101', date: '2026-02-15' },
  { id: 2, studentId: '2315001659', studentName: 'Pratyaksh Gupta', hostel: 'Block C', room: '204', date: '2026-02-15' },
  { id: 3, studentId: '2315001448', studentName: 'Nayan Goyal', hostel: 'Block A', room: '105', date: '2026-02-15' },
  { id: 4, studentId: '2315001967', studentName: 'Sanjana Kumari', hostel: 'Block C', room: '208', date: '2026-02-16' },
  { id: 5, studentId: '2315000123', studentName: 'Aarav Sharma', hostel: 'Block B', room: '112', date: '2026-02-16' },
  { id: 6, studentId: '2315000456', studentName: 'Isha Verma', hostel: 'Block C', room: '301', date: '2026-02-17' },
  { id: 7, studentId: '2315000789', studentName: 'Rohan Mehra', hostel: 'Block A', room: '101', date: '2026-02-17' },
  { id: 8, studentId: '2315001111', studentName: 'Priya Singh', hostel: 'Block C', room: '204', date: '2026-02-18' },
];

const AllBookings = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [hostelFilter, setHostelFilter] = useState('all');

  const filteredBookings = allBookingsData.filter(booking => {
    const matchesSearch = booking.studentId.includes(searchTerm) || 
                          booking.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = hostelFilter === 'all' || booking.hostel === hostelFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between bg-[#15202b]/40 border border-white/10 p-6 rounded-2xl backdrop-blur-md shadow-2xl">
        <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="group p-2.5 bg-[#0b1118]/60 hover:bg-white/10 rounded-xl border border-white/10 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-300 group-hover:text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
            </button>
            <div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-lg">All Student Bookings</h1>
                <p className="text-slate-300 text-sm mt-1 font-medium">View and manage all confirmed room allocations.</p>
            </div>
        </div>
      </div>
      
      {/* --- CONTROLS: SEARCH & FILTER --- */}
      <div className="bg-[#15202b]/60 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-2">Search by Student ID or Name</label>
            <input 
              type="text" 
              placeholder="e.g., 2315000598 or Bharat Dixit" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full px-4 py-3 bg-[#0b1118]/70 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#137fec] focus:ring-1 focus:ring-[#137fec] transition-all shadow-inner" 
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-2">Filter by Hostel</label>
            <select 
              value={hostelFilter}
              onChange={(e) => setHostelFilter(e.target.value)}
              className="block w-full px-4 py-3 bg-[#0b1118]/70 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#137fec] focus:ring-1 focus:ring-[#137fec] transition-all shadow-inner appearance-none"
            >
              <option value="all">All Hostels</option>
              <option value="Block A">Block A</option>
              <option value="Block B">Block B</option>
              <option value="Block C">Block C</option>
            </select>
          </div>
        </div>
      </div>

      {/* --- BOOKINGS TABLE --- */}
      <div className="bg-[#15202b]/60 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-300">
            <thead className="text-xs text-slate-300 uppercase bg-[#0b1118]/60 border-b border-white/10">
              <tr>
                <th scope="col" className="px-6 py-4">Student ID</th>
                <th scope="col" className="px-6 py-4">Student Name</th>
                <th scope="col" className="px-6 py-4">Hostel Block</th>
                <th scope="col" className="px-6 py-4">Room No.</th>
                <th scope="col" className="px-6 py-4">Booking Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-white/10 hover:bg-[#15202b]/80 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-white">{booking.studentId}</td>
                    <td className="px-6 py-4 font-medium text-white">{booking.studentName}</td>
                    <td className="px-6 py-4">{booking.hostel}</td>
                    <td className="px-6 py-4 font-bold text-[#3b9cff]">{booking.room}</td>
                    <td className="px-6 py-4">{booking.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-10 px-6 text-slate-400">
                    No matching bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllBookings;