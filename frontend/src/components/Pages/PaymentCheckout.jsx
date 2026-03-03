import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentCheckout = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          alert("Time expired! Your bed lock has been released back to the pool.");
          navigate('/student/dashboard');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  const handlePayment = () => {
    alert("Simulating Razorpay Gateway... Payment successful!");
    // In a real app, the backend webhook would confirm the booking.
    // The frontend can optimistically redirect.
    navigate('/student/dashboard');
  }

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const isWarning = timeLeft < 60;

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <div className="text-center mb-10 bg-[#15202b]/40 border border-white/10 p-6 rounded-2xl backdrop-blur-md shadow-2xl">
        <h1 className="text-3xl font-extrabold text-white drop-shadow-lg">Complete Reservation</h1>
        <p className="text-slate-300 font-medium mt-2">Your bed is temporarily locked. Complete payment to secure it.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-[#15202b]/60 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl">
            <h2 className="text-lg font-bold text-white border-b border-white/10 pb-4 mb-6 drop-shadow-sm">Allocation Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-5 bg-[#0b1118]/60 rounded-xl border border-white/10 shadow-inner">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Hostel Block</p>
                  <p className="text-lg font-bold text-white drop-shadow-md">Block A (Boys)</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Room No.</p>
                  <p className="text-xl font-black text-[#3b9cff] drop-shadow-md">101</p>
                </div>
              </div>
              
              <div className="space-y-3 pt-4 px-2">
                <div className="flex justify-between text-sm"><span className="text-slate-300 font-medium">Student Name</span><span className="text-white font-bold drop-shadow-sm">Bharat Dixit</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-300 font-medium">University ID</span><span className="text-white font-mono font-bold">2315000598</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-300 font-medium">Academic Year</span><span className="text-white font-bold">2026-2027</span></div>
              </div>

              <div className="flex justify-between items-center pt-6 mt-6 border-t border-white/10 px-2">
                <span className="text-base font-medium text-slate-200">Total Hostel Fee</span>
                <span className="text-3xl font-black text-white drop-shadow-lg">₹ 45,000</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className={`sticky top-28 bg-[#15202b]/60 border rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl transition-colors duration-500 ${isWarning ? 'border-red-500/50 shadow-[0_0_40px_rgba(239,68,68,0.2)]' : 'border-[#137fec]/40 shadow-[0_0_40px_rgba(19,127,236,0.15)]'}`}>
            
            <div className="text-center mb-8 bg-[#0b1118]/40 py-6 rounded-xl border border-white/5">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-3 drop-shadow-sm">Bed Lock Expires In</p>
              <div className={`text-5xl font-black font-mono tracking-wider drop-shadow-xl ${isWarning ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                {formatTime(timeLeft)}
              </div>
            </div>

            <div className="space-y-4">
              <button onClick={handlePayment} className="w-full py-4 px-4 rounded-xl text-sm font-extrabold text-[#0b1118] bg-emerald-400 hover:bg-emerald-300 shadow-[0_0_25px_rgba(52,211,153,0.4)] transition-all duration-200 transform hover:scale-[1.02]">
                Pay Securely via Razorpay
              </button>
              <p className="text-[10px] text-center text-slate-400 px-4 leading-relaxed font-medium">
                By clicking pay, you agree to the university's non-refundable allocation policy. If payment fails, your FCFS lock will be immediately released.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCheckout;