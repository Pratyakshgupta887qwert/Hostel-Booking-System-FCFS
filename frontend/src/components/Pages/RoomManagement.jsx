import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  addAllowedYears,
  confirmRooms,
  createHostel,
  getAllHostels,
  getErrorMessage,
  previewRooms,
} from "../../services/api";

const RoomManagement = () => {
  const fileInputRef = useRef(null);
  const [hostels, setHostels] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isLoadingHostels, setIsLoadingHostels] = useState(true);
  const [isSavingHostel, setIsSavingHostel] = useState(false);
  const [hostelForm, setHostelForm] = useState({
    hostel_name: "",
    gender: "male",
    years: [1],
  });

  const loadHostels = async () => {
    setIsLoadingHostels(true);

    try {
      const response = await getAllHostels();
      setHostels(response);
      setSelectedHostel((current) =>
        current || response[0]?.hostel_id?.toString() || "",
      );
    } catch (loadError) {
      toast.error(getErrorMessage(loadError, "Unable to load hostels."));
    } finally {
      setIsLoadingHostels(false);
    }
  };

  useEffect(() => {
    loadHostels();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    if (
      ![
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ].includes(file.type)
    ) {
      toast.error("Invalid file type. Please upload an .xlsx or .xls file.");
      setSelectedFile(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is too large. Maximum size is 5 MB.");
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handlePreviewUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select an Excel file to upload.");
      return;
    }

    if (!selectedHostel) {
      toast.error("Please select a hostel first.");
      return;
    }

    setIsLoadingPreview(true);
    setPreviewData(null);

    try {
      const response = await previewRooms(selectedHostel, selectedFile);
      setPreviewData(response);
      toast.success("Preview generated successfully.");
    } catch (uploadError) {
      toast.error(getErrorMessage(uploadError, "Preview upload failed."));
    } finally {
      setIsLoadingPreview(false);
    }
  };

  const handleConfirmUpload = async () => {
    setIsConfirming(true);

    try {
      const response = await confirmRooms(selectedHostel, selectedFile);
      toast.success(
        `${response.message} Inserted ${response.inserted}, updated ${response.updated}, skipped ${response.skipped}.`,
      );
      handleCancel();
      await loadHostels();
    } catch (confirmError) {
      toast.error(getErrorMessage(confirmError, "Room confirmation failed."));
    } finally {
      setIsConfirming(false);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreviewData(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleHostelFormChange = (event) => {
    const { name, value } = event.target;
    setHostelForm((current) => ({ ...current, [name]: value }));
  };

  const toggleYear = (year) => {
    setHostelForm((current) => {
      const years = current.years.includes(year)
        ? current.years.filter((item) => item !== year)
        : [...current.years, year].sort();

      return {
        ...current,
        years,
      };
    });
  };

  const handleCreateHostel = async (event) => {
    event.preventDefault();
    setIsSavingHostel(true);

    try {
      const response = await createHostel({
        hostel_name: hostelForm.hostel_name.trim(),
        gender: hostelForm.gender,
      });

      await addAllowedYears(response.hostel.hostel_id, {
        years: hostelForm.years,
      });

      toast.success("Hostel created and allowed years saved successfully.");
      setHostelForm({
        hostel_name: "",
        gender: "male",
        years: [1],
      });
      await loadHostels();
    } catch (hostelError) {
      toast.error(getErrorMessage(hostelError, "Unable to create hostel."));
    } finally {
      setIsSavingHostel(false);
    }
  };

  const previewRows = !previewData
    ? []
    : [
        ...previewData.new_rooms.map((room) => ({
          ...room,
          status: "new",
          notes: "This room will be created.",
        })),
        ...previewData.updated_rooms.map((room) => ({
          room_number: room.room_number,
          total_beds: room.new_total_beds,
          is_ac: room.new_is_ac,
          status: "updated",
          notes: `Beds ${room.old_total_beds} -> ${room.new_total_beds}, AC ${room.old_is_ac ? "Yes" : "No"} -> ${room.new_is_ac ? "Yes" : "No"}`,
        })),
        ...previewData.unchanged_rooms.map((roomNumber) => ({
          room_number: roomNumber,
          status: "unchanged",
          notes: "No changes detected.",
        })),
        ...previewData.warnings.map((warning) => ({
          original_row_data: `Row ${warning.row}`,
          status: "invalid",
          notes: warning.message,
        })),
      ];

  const renderStatusBadge = (status) => {
    switch (status) {
      case "new":
        return (
          <span className="px-2 py-1 text-[10px] font-bold uppercase rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
            New
          </span>
        );
      case "updated":
        return (
          <span className="px-2 py-1 text-[10px] font-bold uppercase rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Updated
          </span>
        );
      case "unchanged":
        return (
          <span className="px-2 py-1 text-[10px] font-bold uppercase rounded bg-slate-500/20 text-slate-300 border border-slate-500/30">
            Unchanged
          </span>
        );
      case "invalid":
        return (
          <span className="px-2 py-1 text-[10px] font-bold uppercase rounded bg-red-500/20 text-red-300 border border-red-500/30">
            Invalid
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between bg-[#15202b]/40 border border-white/10 p-6 rounded-2xl backdrop-blur-md shadow-2xl">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-lg">
            Admin Hostel & Room Management
          </h1>
          <p className="text-slate-300 text-sm mt-1 font-medium">
            Connected to hostel creation, allowed years, and room upload APIs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-[#15202b]/60 p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl">
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-white drop-shadow-md">
              Create Hostel
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              Requires a `main_admin` token on the backend.
            </p>
          </div>

          <form onSubmit={handleCreateHostel} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-300">
                Hostel Name
              </label>
              <input
                required
                name="hostel_name"
                value={hostelForm.hostel_name}
                onChange={handleHostelFormChange}
                placeholder="e.g. Block D"
                className="block w-full px-4 py-3.5 bg-[#0b1118]/70 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#137fec] focus:ring-1 focus:ring-[#137fec]"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-300">
                Gender
              </label>
              <select
                name="gender"
                value={hostelForm.gender}
                onChange={handleHostelFormChange}
                className="block w-full px-4 py-3.5 bg-[#0b1118]/70 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#137fec] focus:ring-1 focus:ring-[#137fec]"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-300">
                Allowed Years
              </label>
              <div className="flex flex-wrap gap-3">
                {[1, 2, 3, 4].map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => toggleYear(year)}
                    className={`rounded-xl border px-4 py-2 text-sm font-bold cursor-pointer ${
                      hostelForm.years.includes(year)
                        ? "border-[#137fec]/50 bg-[#137fec]/20 text-white"
                        : "border-white/10 bg-[#0b1118]/60 text-slate-300"
                    }`}
                  >
                    Year {year}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSavingHostel || hostelForm.years.length === 0}
              className="py-3.5 px-8 rounded-xl text-sm font-bold text-white bg-[#137fec]/90 hover:bg-[#137fec] shadow-[0_0_20px_rgba(19,127,236,0.4)] cursor-pointer disabled:bg-slate-600 disabled:cursor-not-allowed"
            >
              {isSavingHostel ? "Saving..." : "Create Hostel"}
            </button>
          </form>
        </div>

        <div className="bg-[#15202b]/60 p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl">
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-white drop-shadow-md">
              Existing Hostels
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              Loaded from `GET /api/admin/hostels`.
            </p>
          </div>

          {isLoadingHostels ? (
            <p className="text-sm text-slate-300">Loading hostels...</p>
          ) : hostels.length === 0 ? (
            <p className="text-sm text-slate-300">No hostels found.</p>
          ) : (
            <div className="space-y-3 max-h-112 overflow-y-auto pr-1">
              {hostels.map((hostel) => (
                <div
                  key={hostel.hostel_id}
                  className="rounded-xl border border-white/10 bg-[#0b1118]/55 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-bold text-white">{hostel.hostel_name}</p>
                      <p className="text-xs text-slate-400 mt-1">
                        ID {hostel.hostel_id} • {hostel.gender} • Years{" "}
                        {hostel.allowed_years.length > 0
                          ? hostel.allowed_years.join(", ")
                          : "none"}
                      </p>
                    </div>
                    <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-bold uppercase text-emerald-300">
                      {hostel.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {!previewData && (
        <div className="bg-[#15202b]/60 p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-300">
                Step 1: Select Hostel
              </label>
              <select
                value={selectedHostel}
                onChange={(event) => setSelectedHostel(event.target.value)}
                className="block w-full px-4 py-3.5 bg-[#0b1118]/70 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#137fec] cursor-pointer"
              >
                <option value="">Select hostel</option>
                {hostels.map((hostel) => (
                  <option key={hostel.hostel_id} value={hostel.hostel_id}>
                    {hostel.hostel_name} ({hostel.gender})
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-300">
                Step 2: Upload File
              </label>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                accept=".xlsx, .xls"
                className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#137fec]/20 file:text-[#3b9cff] hover:file:bg-[#137fec]/30 cursor-pointer"
              />
            </div>
            <button
              onClick={handlePreviewUpload}
              disabled={isLoadingPreview || !selectedFile || !selectedHostel}
              className="py-3.5 px-8 rounded-xl text-sm font-bold text-white bg-[#137fec]/90 hover:bg-[#137fec] shadow-[0_0_20px_rgba(19,127,236,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:bg-slate-600 disabled:cursor-not-allowed"
            >
              {isLoadingPreview ? "Uploading..." : "Upload & Preview"}
            </button>
          </div>
        </div>
      )}

      {previewData && (
        <div className="bg-[#15202b]/60 p-6 sm:p-8 rounded-2xl border border-[#137fec]/40 shadow-[0_15px_40px_rgba(19,127,236,0.15)] backdrop-blur-xl space-y-8">
          <div>
            <h2 className="text-2xl font-extrabold text-white drop-shadow-md">
              Step 3: Preview Changes
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              Review the changes below. No rooms have been modified yet.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="p-4 bg-sky-500/10 rounded-xl border border-sky-500/20">
              <p className="text-xs text-sky-300 font-bold uppercase">New Rooms</p>
              <p className="text-2xl font-black text-sky-300 mt-1">
                {previewData.summary.new_rooms}
              </p>
            </div>
            <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
              <p className="text-xs text-amber-300 font-bold uppercase">Updated</p>
              <p className="text-2xl font-black text-amber-300 mt-1">
                {previewData.summary.updated_rooms}
              </p>
            </div>
            <div className="p-4 bg-slate-500/10 rounded-xl border border-slate-500/20">
              <p className="text-xs text-slate-300 font-bold uppercase">Unchanged</p>
              <p className="text-2xl font-black text-slate-100 mt-1">
                {previewData.summary.unchanged_rooms}
              </p>
            </div>
            <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
              <p className="text-xs text-red-300 font-bold uppercase">Skipped</p>
              <p className="text-2xl font-black text-red-300 mt-1">
                {previewData.summary.skipped_rows}
              </p>
            </div>
            <div className="p-4 bg-[#0b1118]/60 rounded-xl border border-white/10">
              <p className="text-xs text-slate-400 font-bold uppercase">Warnings</p>
              <p className="text-2xl font-black text-white mt-1">
                {previewData.warnings.length}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-300">
              <thead className="text-xs text-slate-300 uppercase bg-[#0b1118]/60">
                <tr>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Room No.</th>
                  <th className="px-6 py-4">Total Beds</th>
                  <th className="px-6 py-4">AC</th>
                  <th className="px-6 py-4">Notes</th>
                </tr>
              </thead>
              <tbody>
                {previewRows.map((room, index) => (
                  <tr key={`${room.status}-${room.room_number || index}`} className="border-b border-white/10">
                    <td className="px-6 py-4">{renderStatusBadge(room.status)}</td>
                    <td className="px-6 py-4 font-mono font-bold text-white">
                      {room.room_number || "N/A"}
                    </td>
                    <td className="px-6 py-4">{room.total_beds || "N/A"}</td>
                    <td className="px-6 py-4">
                      {typeof room.is_ac === "boolean"
                        ? room.is_ac
                          ? "Yes"
                          : "No"
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-slate-400 italic">
                      {room.notes || room.original_row_data}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row justify-end items-center gap-4 pt-6 border-t border-white/10">
            <button
              onClick={handleCancel}
              disabled={isConfirming}
              className="w-full sm:w-auto py-3 px-6 rounded-xl text-sm font-bold text-slate-200 bg-[#15202b]/60 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
            >
              Cancel & Upload New File
            </button>
            <button
              onClick={handleConfirmUpload}
              disabled={isConfirming}
              className="w-full sm:w-auto py-3 px-8 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer"
            >
              {isConfirming ? "Saving..." : "Confirm & Save Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomManagement;
