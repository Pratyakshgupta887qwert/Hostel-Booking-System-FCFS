import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname.includes('/admin');

  const handleLogout = () => {
    // In a real app, you'd clear localStorage here.
    // localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0b1118]/60 backdrop-blur-xl border-b border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-18 items-center py-4">
          
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate(isAdmin ? '/admin/dashboard' : '/student/dashboard')}>
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#137fec]/30 to-transparent border border-[#137fec]/40 shadow-[0_0_15px_rgba(19,127,236,0.2)] group-hover:shadow-[0_0_25px_rgba(19,127,236,0.4)] transition-all duration-300 backdrop-blur-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
              </svg>
            </div>
            <div>
              <h1 className="text-white font-bold tracking-tight text-lg leading-tight drop-shadow-md">GLA Hostel Portal</h1>
              <p className="text-[10px] text-[#3b9cff] uppercase tracking-widest font-bold">{isAdmin ? 'Admin Console' : 'Student Portal'}</p>
            </div>
          </div>

          <div className="flex items-center gap-5">
             <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-semibold text-white tracking-wide drop-shadow-sm">{isAdmin ? 'Admin User' : 'Bharat Dixit'}</span>
                <span className="text-xs text-slate-300 font-mono">{isAdmin ? 'admin@gla.ac.in' : '2315000598@gla.ac.in'}</span>
             </div>
             <div className="flex items-center gap-3 pl-4 border-l border-white/20">
               <div className="relative">
                 <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${isAdmin ? 'AU' : 'BD'}&backgroundColor=137fec`} alt="avatar" className="h-9 w-9 rounded-full ring-2 ring-white/20 shadow-lg" />
                 <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-emerald-400 rounded-full border-2 border-[#0b1118]"></div>
               </div>
               <button onClick={handleLogout} className="p-2 text-slate-300 hover:text-red-400 hover:bg-red-400/20 rounded-lg transition-all" title="Logout">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
               </button>
             </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;