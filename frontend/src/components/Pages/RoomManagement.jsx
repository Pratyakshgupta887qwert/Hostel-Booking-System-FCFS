import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// --- MOCK DATA to simulate a response from the /preview API ---
// This mimics the backend processing an Excel file and comparing it to the database.
const mockPreviewData = {
  summary: {
    currentTotalBeds: 150,
    afterUploadTotalBeds: 154,
    newRooms: 2,
    updatedRooms: 1,
    unchangedRooms: 1,
    invalidRows: 1,
  },
  rooms: [
    { room_number: '101', total_beds: 3, is_ac: true, status: 'unchanged', notes: 'No changes detected.' },
    { room_number: '102', total_beds: 2, is_ac: false, status: 'updated', notes: 'Bed count changed from 3 to 2.' },
    { room_number: '103', total_beds: 3, is_ac: true, status: 'new', notes: 'This room will be created.' },
    { room_number: '104', total_beds: 2, is_ac: true, status: 'new', notes: 'This room will be created.' },
    { original_row_data: '105 | five | Yes', status: 'invalid', notes: 'Error: total_beds must be a number.' },
  ]
};


const RoomManagement = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [selectedHostel, setSelectedHostel] = useState('1'); // Default to Block A
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewData, setPreviewData] = useState(null);

  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(file.type)) {
        setError('Invalid file type. Please upload an .xlsx or .xls file.');
        setSelectedFile(null);
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5 MB limit
        setError('File is too large. Maximum size is 5 MB.');
        setSelectedFile(null);
        return;
      }
      setError('');
      setSelectedFile(file);
    }
  };

  const handlePreviewUpload = () => {
    if (!selectedFile) {
      setError('Please select an Excel file to upload.');
      return;
    }
    setIsLoadingPreview(true);
    setError('');
    setPreviewData(null);
    
    // --- SIMULATE API CALL to /api/admin/hostels/:id/rooms/preview ---
    console.log(`[API SIM] Uploading ${selectedFile.name} for Hostel ID ${selectedHostel} to generate preview...`);
    setTimeout(() => {
      // In a real app, you would get this data from your backend.
      setPreviewData(mockPreviewData);
      setIsLoadingPreview(false);
    }, 2000);
  };
  
  const handleConfirmUpload = () => {
    setIsConfirming(true);
    setError('');

    // --- SIMULATE API CALL to /api/admin/hostels/:id/rooms/confirm ---
    console.log(`[API SIM] Confirming changes for Hostel ID ${selectedHostel}...`);
    setTimeout(() => {
      alert('Upload Confirmed! The room mapping has been updated successfully in a single transaction.');
      setIsConfirming(false);
      // Reset the state to allow a new upload
      handleCancel();
    }, 2000);
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreviewData(null);
    setError('');
    if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear file input
    }
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'new': return <span className="px-2 py-1 text-[10px] font-bold uppercase rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">New</span>;
      case 'updated': return <span className="px-2 py-1 text-[10px] font-bold uppercase rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">Updated</span>;
      case 'unchanged': return <span className="px-2 py-1 text-[10px] font-bold uppercase rounded bg-slate-500/20 text-slate-300 border border-slate-500/30">Unchanged</span>;
      case 'invalid': return <span className="px-2 py-1 text-[10px] font-bold uppercase rounded bg-red-500/20 text-red-300 border border-red-500/30">Invalid</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between bg-[#15202b]/40 border border-white/10 p-6 rounded-2xl backdrop-blur-md shadow-2xl">
          <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-lg">Room Mapping via Excel Upload</h1>
              <p className="text-slate-300 text-sm mt-1 font-medium">Safely add or update rooms in bulk for a specific hostel.</p>
          </div>
      </div>
      
      {/* --- UPLOAD FORM --- */}
      {!previewData && (
        <div className="bg-[#15202b]/60 p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-300">Step 1: Select Hostel</label>
                  <select value={selectedHostel} onChange={(e) => setSelectedHostel(e.target.value)} className="block w-full px-4 py-3.5 bg-[#0b1118]/70 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#137fec]">
                      <option value="1">Block A (Boys)</option><option value="2">Block B (Boys)</option><option value="3">Block C (Girls)</option>
                  </select>
              </div>
              <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-300">Step 2: Upload File</label>
                  <input ref={fileInputRef} type="file" onChange={handleFileChange} accept=".xlsx, .xls" className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#137fec]/20 file:text-[#3b9cff] hover:file:bg-[#137fec]/30 cursor-pointer"/>
              </div>
              <button onClick={handlePreviewUpload} disabled={isLoadingPreview || !selectedFile} className="py-3.5 px-8 rounded-xl text-sm font-bold text-white bg-[#137fec]/90 hover:bg-[#137fec] shadow-[0_0_20px_rgba(19,127,236,0.4)] flex items-center justify-center gap-2 disabled:bg-slate-600 disabled:cursor-not-allowed">
                  {isLoadingPreview ? <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle><path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.96 7.96 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" fill="currentColor"></path></svg> : 'Upload & Preview'}
              </button>
          </div>
          {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
        </div>
      )}

      {/* --- PREVIEW SECTION --- */}
      {previewData && (
        <div className="bg-[#15202b]/60 p-6 sm:p-8 rounded-2xl border border-[#137fec]/40 shadow-[0_15px_40px_rgba(19,127,236,0.15)] backdrop-blur-xl space-y-8">
            <div>
                <h2 className="text-2xl font-extrabold text-white drop-shadow-md">Step 3: Preview Changes</h2>
                <p className="text-sm text-slate-300 mt-1">Review the changes below. No rooms have been modified yet.</p>
            </div>

            {/* Preview Summary */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                <div className="p-4 bg-[#0b1118]/60 rounded-xl border border-white/10"><p className="text-xs text-slate-400 font-bold uppercase">Current Beds</p><p className="text-2xl font-black text-white mt-1">{previewData.summary.currentTotalBeds}</p></div>
                <div className="p-4 bg-[#0b1118]/60 rounded-xl border border-white/10"><p className="text-xs text-slate-400 font-bold uppercase">New Beds</p><p className="text-2xl font-black text-emerald-400 mt-1">{previewData.summary.afterUploadTotalBeds}</p></div>
                <div className="p-4 bg-sky-500/10 rounded-xl border border-sky-500/20"><p className="text-xs text-sky-300 font-bold uppercase">New Rooms</p><p className="text-2xl font-black text-sky-300 mt-1">{previewData.summary.newRooms}</p></div>
                <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20"><p className="text-xs text-amber-300 font-bold uppercase">Updated</p><p className="text-2xl font-black text-amber-300 mt-1">{previewData.summary.updatedRooms}</p></div>
                <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20"><p className="text-xs text-red-300 font-bold uppercase">Invalid Rows</p><p className="text-2xl font-black text-red-300 mt-1">{previewData.summary.invalidRows}</p></div>
            </div>

            {/* Preview Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-300">
                    <thead className="text-xs text-slate-300 uppercase bg-[#0b1118]/60">
                    <tr><th className="px-6 py-4">Status</th><th className="px-6 py-4">Room No.</th><th className="px-6 py-4">Total Beds</th><th className="px-6 py-4">AC</th><th className="px-6 py-4">Notes / Original Data</th></tr>
                    </thead>
                    <tbody>
                    {previewData.rooms.map((room, idx) => (
                        <tr key={idx} className="border-b border-white/10">
                        <td className="px-6 py-4">{renderStatusBadge(room.status)}</td>
                        <td className="px-6 py-4 font-mono font-bold text-white">{room.room_number || 'N/A'}</td>
                        <td className="px-6 py-4">{room.total_beds || 'N/A'}</td>
                        <td className="px-6 py-4">{typeof room.is_ac === 'boolean' ? (room.is_ac ? 'Yes' : 'No') : 'N/A'}</td>
                        <td className="px-6 py-4 text-slate-400 italic">{room.notes || room.original_row_data}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Confirmation Buttons */}
            <div className="flex flex-col sm:flex-row justify-end items-center gap-4 pt-6 border-t border-white/10">
                <button onClick={handleCancel} disabled={isConfirming} className="w-full sm:w-auto py-3 px-6 rounded-xl text-sm font-bold text-slate-200 bg-[#15202b]/60 border border-white/10 hover:bg-white/10 transition-colors">
                    Cancel & Upload New File
                </button>
                <button onClick={handleConfirmUpload} disabled={isConfirming} className="w-full sm:w-auto py-3 px-8 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2">
                    {isConfirming ? <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle><path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.96 7.96 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" fill="currentColor"></path></svg> : 'Confirm & Save Changes'}
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default RoomManagement;