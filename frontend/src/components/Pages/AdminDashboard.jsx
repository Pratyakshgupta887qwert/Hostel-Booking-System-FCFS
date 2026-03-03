import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// ... (keep existing initialLogs and other code)
const initialLogs = [
    { id: 1, student: '2315001659', room: 'Block C - 204', time: '2 mins ago', type: 'Online' },
    { id: 2, student: '2315001448', room: 'Block A - 105', time: '5 mins ago', type: 'Online' },
    { id: 3, student: '2315001967', room: 'Block A - 101', time: '8 mins ago', type: 'Offline (Admin)' },
];


const AdminDashboard = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [offlineForm, setOfflineForm] = useState({ studentId: '', hostelId: '', roomNumber: '' });
  const [activityLogs, setActivityLogs] = useState(initialLogs);

  // ... (keep useEffect and handleOfflineBooking as they are)
  useEffect(() => {
    const interval = setInterval(() => {
        const newLog = {
            id: Date.now(),
            student: `231500${Math.floor(1000 + Math.random() * 9000)}`,
            room: 'Block A - 108',
            time: 'Just now',
            type: 'Online'
        };
        setActivityLogs(prevLogs => [newLog, ...prevLogs].slice(0, 5));
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const handleOfflineBooking = (e) => {
    e.preventDefault();
    alert(`SIMULATION: Successfully locked bed...`);
    const newLog = { id: Date.now(), student: offlineForm.studentId, room: `Block ${offlineForm.hostelId} - ${offlineForm.roomNumber}`, time: 'Just now', type: 'Offline (Admin)' };
    setActivityLogs(prevLogs => [newLog, ...prevLogs].slice(0, 5));
    setOfflineForm({ studentId: '', hostelId: '', roomNumber: '' });
  };


  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header and System Overview cards remain the same */}
      <div className="bg-[#15202b]/40 border border-white/10 p-6 rounded-2xl backdrop-blur-md shadow-2xl">
        <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-lg">System Overview</h1>
        <p className="text-slate-300 text-sm mt-1 font-medium">Live FCFS Allocation Metrics & Manual Overrides</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* --- MODIFIED GRID TO FIT 4 ITEMS --- */}
        {[
          { label: 'Total Capacity', val: '1,200', color: 'text-white' },
          { label: 'Confirmed Allocations', val: '1,154', color: 'text-emerald-400' },
          { label: 'Available (Live Pool)', val: '46', color: 'text-[#3b9cff]' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-[#15202b]/60 p-6 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl">
            <p className="text-slate-300 text-sm font-bold uppercase tracking-wider">{stat.label}</p>
            <p className={`text-4xl font-black mt-3 drop-shadow-lg ${stat.color}`}>{stat.val}</p>
          </div>
        ))}
        
        {/* --- NEW CARD TO VIEW ALL BOOKINGS --- */}
        <div 
            onClick={() => navigate('/admin/bookings')}
            className="flex flex-col justify-center items-center bg-[#15202b]/60 p-6 rounded-2xl border border-dashed border-white/20 shadow-2xl backdrop-blur-xl hover:border-solid hover:border-[#137fec]/80 hover:bg-[#137fec]/10 transition-all duration-300 cursor-pointer group"
        >
            <div className="p-3 bg-[#137fec]/20 rounded-xl border border-[#137fec]/30 mb-3 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            </div>
            <p className="text-white font-bold text-center">View All Bookings</p>
            <p className="text-xs text-slate-400 text-center">Search & Filter Data</p>
        </div>
      </div>

      {/* Manual Booking and Live Feed sections remain the same */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#15202b]/60 p-8 rounded-2xl border border-[#137fec]/40 shadow-[0_15px_40px_rgba(19,127,236,0.15)] backdrop-blur-xl">
          {/* Manual Booking Form */}
          {/* ... (existing form code) ... */}
           <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6"><div className="p-3 bg-[#137fec]/20 rounded-xl border border-[#137fec]/30"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg></div><div><h2 className="text-xl font-extrabold text-white">Process Manual Booking</h2><p className="text-xs text-slate-300 mt-1">Bypasses payment but strictly enforces FCFS logic.</p></div></div>
           <form onSubmit={handleOfflineBooking} className="space-y-6">{/* ... (existing form inputs) ... */}<div className="flex justify-end pt-4"><button type="submit" className="py-3.5 px-8 rounded-xl text-sm font-bold text-white bg-[#137fec]/90 hover:bg-[#137fec] shadow-[0_0_20px_rgba(19,127,236,0.4)]">Commit Transaction</button></div></form>
        </div>
        <div className="bg-[#15202b]/60 p-6 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col">
           {/* Live Feed */}
           {/* ... (existing live feed code) ... */}
           <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4"><h3 className="text-lg font-extrabold text-white">Live Feed</h3><span className="flex h-3 w-3 relative"><span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative rounded-full h-3 w-3 bg-emerald-500"></span></span></div>
           <div className="flex-1 space-y-4">{activityLogs.map(log => (<div key={log.id} className="p-4 bg-[#0b1118]/60 rounded-xl border border-white/10"> {/*...log item...*/} </div>))}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;