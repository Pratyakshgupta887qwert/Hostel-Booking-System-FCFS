import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const mockRooms = [
    { id: 101, number: '101', capacity: 2, available: 1 },
    { id: 102, number: '102', capacity: 2, available: 0 },
    { id: 103, number: '103', capacity: 3, available: 3 },
    { id: 104, number: '104', capacity: 2, available: 2 },
    { id: 105, number: '105', capacity: 3, available: 1 },
    { id: 106, number: '106', capacity: 2, available: 2 },
];

const RoomSelection = () => {
  const { id } = useParams(); // Hostel ID
  const navigate = useNavigate();
  const [loadingRoomId, setLoadingRoomId] = useState(null);
  const [rooms] = useState(mockRooms);

  const handleBookRoom = (roomId) => {
    setLoadingRoomId(roomId);
    // --- SIMULATE BACKEND DATABASE LOCK ---
    // This delay mimics the time taken for the `SELECT ... FOR UPDATE` transaction
    console.log(`[FCFS] Attempting to lock bed in Room ${roomId}...`);
    setTimeout(() => {
      console.log(`[FCFS] Lock successful! Redirecting to checkout.`);
      setLoadingRoomId(null);
      navigate('/student/checkout');
    }, 1500);
  };

  const renderBeds = (capacity, available) => {
    const beds = [];
    const occupied = capacity - available;
    for (let i = 0; i < capacity; i++) {
      beds.push(
        <div key={i} className={`p-2 rounded-lg flex-1 flex justify-center border backdrop-blur-sm shadow-inner ${i < occupied ? 'bg-[#0b1118]/80 border-white/10' : 'bg-emerald-500/20 border-emerald-500/30'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 drop-shadow-md ${i < occupied ? 'text-slate-600' : 'text-emerald-400'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M20 9.557V3h-2v2H6V3H4v6.557C2.81 10.25 2 11.525 2 13v4h2v-2h16v2h2v-4c0-1.475-.81-2.75-2-3.443zM18 7H6v2h12V7zM4 13c0-.552.449-1 1-1h14c.552 0 1 .448 1 1v2H4v-2z"/></svg>
        </div>
      );
    }
    return <div className="flex gap-2 w-full mt-4">{beds}</div>;
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fadeIn">
      <div className="flex items-center justify-between border-b border-white/10 pb-6 bg-[#15202b]/40 p-6 rounded-2xl backdrop-blur-md shadow-lg">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="group p-2.5 bg-[#0b1118]/60 hover:bg-white/10 rounded-xl border border-white/10 transition-all backdrop-blur-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-300 group-hover:text-white transition-colors" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
          </button>
          <div>
            <h1 className="text-2xl font-extrabold text-white drop-shadow-md">Block A</h1>
            <p className="text-slate-300 text-sm font-medium">Select your specific room</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Status</p>
          <div className="flex gap-3 text-xs font-bold bg-[#0b1118]/40 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-sm">
            <span className="flex items-center gap-1.5 text-emerald-400"><span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span> Available</span>
            <span className="flex items-center gap-1.5 text-slate-400"><span className="w-2 h-2 rounded-full bg-slate-500"></span> Occupied</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {rooms.map(room => (
          <div 
            key={room.id}
            className={`flex flex-col rounded-2xl border p-5 bg-[#15202b]/60 backdrop-blur-xl shadow-2xl transition-all ${room.available === 0 ? 'border-red-500/20 opacity-70' : 'border-white/10 hover:border-[#137fec]/50 hover:bg-[#15202b]/70 hover:-translate-y-1 hover:shadow-[0_15px_30px_-10px_rgba(19,127,236,0.25)]'}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Room No.</span>
                <h3 className="text-3xl font-black text-white mt-1 drop-shadow-md">{room.number}</h3>
              </div>
              <div className={`px-2.5 py-1 rounded-md text-xs font-bold border backdrop-blur-md ${room.available === 0 ? 'bg-red-500/20 text-red-300 border-red-500/30' : 'bg-[#137fec]/20 text-[#3b9cff] border-[#137fec]/30'}`}>
                {room.capacity} Seater
              </div>
            </div>

            {renderBeds(room.capacity, room.available)}

            <div className="mt-auto pt-6">
              <button
                onClick={() => handleBookRoom(room.id)}
                disabled={room.available === 0 || loadingRoomId !== null}
                className={`w-full py-3 rounded-xl text-sm font-bold flex justify-center items-center transition-all backdrop-blur-md ${ room.available === 0 ? 'bg-[#0b1118]/80 border border-white/10 text-slate-500 cursor-not-allowed' : 'bg-[#137fec]/90 text-white border border-[#137fec]/50 hover:bg-[#137fec] shadow-[0_0_20px_rgba(19,127,236,0.3)] hover:scale-[1.02]'}`}
              >
                {loadingRoomId === room.id ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : room.available === 0 ? 'Sold Out' : 'Lock Bed (FCFS)'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomSelection;