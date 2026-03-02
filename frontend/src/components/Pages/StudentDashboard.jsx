import React from 'react';
import { useNavigate } from 'react-router-dom';

// Static data for the logged-in student's booking
const bookingDetails = {
  studentName: 'Bharat Dixit',
  studentId: '2315000598',
  hostelName: 'Block A',
  roomNumber: '101',
  roomCapacity: 2, // 1 for Single, 2 for Double, 3 for Triple
  status: 'Confirmed',
  academicYear: '2026-2027',
  paymentDate: 'Feb 15, 2026'
};

// Helper function to get room type from capacity
const getRoomType = (capacity) => {
  switch (capacity) {
    case 1: return 'Single Seater';
    case 2: return 'Double Seater';
    case 3: return 'Triple Seater';
    default: return `${capacity} Seater`;
  }
};


const StudentDashboard = () => {
  const navigate = useNavigate();

  // If there were no booking, you would redirect or show a different component.
  // For this demo, we assume the booking exists.
  // if (!bookingDetails) {
  //   return <NoBookingFoundComponent />;
  // }
  
  const roomType = getRoomType(bookingDetails.roomCapacity);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* --- HEADER --- */}
      <div className="bg-[#15202b]/40 border border-white/10 p-6 rounded-2xl backdrop-blur-md shadow-2xl">
        <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-lg">My Accommodation</h1>
        <p className="text-slate-300 text-sm mt-1 font-medium">Welcome! Here are the details of your confirmed room allocation.</p>
      </div>

      {/* --- MAIN BOOKING DETAILS CARD --- */}
      <div className="bg-[#15202b]/60 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Left Side: Student & Status */}
          <div className="md:col-span-1 md:border-r md:border-white/10 md:pr-8">
            <div className="flex items-center gap-4">
              <img 
                src="https://api.dicebear.com/7.x/initials/svg?seed=BD&backgroundColor=137fec" 
                alt="avatar" 
                className="h-16 w-16 rounded-full ring-4 ring-white/10 shadow-lg" 
              />
              <div>
                <h2 className="text-xl font-bold text-white drop-shadow-md">{bookingDetails.studentName}</h2>
                <p className="text-sm text-slate-300 font-mono">{bookingDetails.studentId}</p>
              </div>
            </div>
            
            <div className="mt-8 space-y-2">
              <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Allocation Status</p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-sm font-bold text-emerald-300">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                </span>
                {bookingDetails.status}
              </div>
            </div>
          </div>
          
          {/* Right Side: Room Details */}
          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                {/* HOSTEL BLOCK */}
                <div className="p-5 bg-[#0b1118]/60 rounded-xl border border-white/10 shadow-inner">
                    <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Hostel Block</p>
                    <p className="text-2xl font-black text-white drop-shadow-md">{bookingDetails.hostelName}</p>
                </div>

                {/* ROOM NUMBER */}
                <div className="p-5 bg-[#0b1118]/60 rounded-xl border border-white/10 shadow-inner">
                    <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Room No.</p>
                    <p className="text-2xl font-black text-[#3b9cff] drop-shadow-md">{bookingDetails.roomNumber}</p>
                </div>

                {/* ROOM TYPE */}
                <div className="p-5 bg-[#0b1118]/60 rounded-xl border border-white/10 shadow-inner">
                    <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Room Type</p>
                    <p className="text-2xl font-black text-white drop-shadow-md">{roomType}</p>
                </div>
            </div>
            
            <div className="border-t border-white/10 pt-6 space-y-3">
                 <div className="flex justify-between text-sm"><span className="text-slate-300 font-medium">Academic Year</span><span className="text-white font-bold">{bookingDetails.academicYear}</span></div>
                 <div className="flex justify-between text-sm"><span className="text-slate-300 font-medium">Payment Completed On</span><span className="text-white font-bold">{bookingDetails.paymentDate}</span></div>
            </div>

          </div>
        </div>
      </div>

      {/* --- ACTIONS & SUPPORT --- */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
         <button className="w-full sm:w-auto py-3 px-6 rounded-xl text-sm font-bold text-white bg-[#137fec]/90 border border-[#137fec]/50 hover:bg-[#137fec] shadow-[0_0_20px_rgba(19,127,236,0.4)] transition-all transform hover:scale-[1.02] backdrop-blur-md">
            Download Payment Receipt
         </button>
         <button className="w-full sm:w-auto py-3 px-6 rounded-xl text-sm font-bold text-slate-200 bg-[#15202b]/60 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-md">
            Report an Issue
         </button>
      </div>

    </div>
  );
};

export default StudentDashboard;