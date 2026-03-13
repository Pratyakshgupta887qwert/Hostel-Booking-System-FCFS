import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const initialLogs = [ /* ... keep as is ... */ ];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activityLogs, setActivityLogs] = useState(initialLogs);

  useEffect(() => { /* ... keep as is ... */ }, []);

  const adminControls = [
    {
      title: 'Manual Booking',
      description: 'Allocate a room for a student directly.',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>,
      path: '/admin/booking'
    },
    {
      title: 'View All Bookings',
      description: 'Search and filter all allocations.',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
      path: '/admin/bookings'
    },
    {
      title: 'Manage Rooms',
      description: 'Add new rooms to the allocation pool.',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10m16-5H4m16 0l-3.42-3.42M20 12l-3.42 3.42" /></svg>,
      path: '/admin/rooms'
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* --- HEADER --- */}
      <div className="bg-[#15202b]/40 border border-white/10 p-6 rounded-2xl backdrop-blur-md shadow-2xl">
        <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-lg">Admin Dashboard</h1>
        <p className="text-slate-300 text-sm mt-1 font-medium">System Metrics & Management Controls</p>
      </div>

      {/* --- STATS OVERVIEW --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Capacity', val: '1,200', color: 'text-white' },
          { label: 'Confirmed Allocations', val: '1,154', color: 'text-emerald-400' },
          { label: 'Available (Live Pool)', val: '46', color: 'text-[#3b9cff]' },
        ].map((stat, idx) => ( <div key={idx} className="bg-[#15202b]/60 p-6 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl"><p className="text-slate-300 text-sm font-bold uppercase tracking-wider">{stat.label}</p><p className={`text-4xl font-black mt-3 drop-shadow-lg ${stat.color}`}>{stat.val}</p></div> ))}
      </div>
      
      {/* --- ADMIN CONTROLS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {adminControls.map(control => (
          <div key={control.title} onClick={() => navigate(control.path)}
            className="bg-[#15202b]/60 p-6 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl hover:-translate-y-1 hover:border-[#137fec]/50 hover:bg-[#15202b]/80 transition-all duration-300 cursor-pointer group"
          >
            <div className="p-4 bg-[#137fec]/20 rounded-xl border border-[#137fec]/30 w-min mb-4 group-hover:scale-110 transition-transform">{control.icon}</div>
            <h3 className="text-lg font-bold text-white">{control.title}</h3>
            <p className="text-sm text-slate-400 mt-1">{control.description}</p>
          </div>
        ))}
      </div>

      {/* --- LIVE FEED --- */}
      <div className="bg-[#15202b]/60 p-6 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col">
        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4"><h3 className="text-lg font-extrabold text-white">Live Feed</h3><span className="flex h-3 w-3 relative"><span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative rounded-full h-3 w-3 bg-emerald-500"></span></span></div>
        <div className="flex-1 space-y-4">{/* ... (Live feed mapping logic) ... */}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;