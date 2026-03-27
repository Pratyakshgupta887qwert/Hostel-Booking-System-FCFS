import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getEligibleHostels, getErrorMessage } from "../../services/api";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user, refreshProfile } = useAuth();
  const [hostels, setHostels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      setIsLoading(true);

      try {
        await refreshProfile();
        const hostelResponse = await getEligibleHostels();
        setHostels(hostelResponse);
      } catch (error) {
        toast.error(
          getErrorMessage(error, "Unable to load student dashboard."),
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, [refreshProfile]);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-[#15202b]/40 border border-white/10 p-6 rounded-2xl backdrop-blur-md shadow-2xl">
        <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-lg">
          Student Dashboard
        </h1>
        <p className="text-slate-300 text-sm mt-1 font-medium">
          Profile and eligible hostels loaded from backend.
        </p>
      </div>

      <div className="bg-[#15202b]/60 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-white/10 bg-[#0b1118]/60 p-5">
            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">
              Name
            </p>
            <p className="mt-2 text-2xl font-black text-white">
              {user?.name || "N/A"}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#0b1118]/60 p-5">
            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">
              Roll Number
            </p>
            <p className="mt-2 text-2xl font-black text-[#3b9cff]">
              {user?.roll_number || "N/A"}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#0b1118]/60 p-5">
            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">
              Year / Gender
            </p>
            <p className="mt-2 text-2xl font-black text-white capitalize">
              {user?.year || "N/A"} / {user?.gender || "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#15202b]/60 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Eligible Hostels</h2>
            <p className="text-sm text-slate-400 mt-1">
              Pulled from `GET /api/student/hostels`.
            </p>
          </div>
          <button
            onClick={() => navigate("/student/booking")}
            className="py-3 px-5 rounded-xl text-sm font-bold text-white bg-[#137fec]/90 border border-[#137fec]/50 hover:bg-[#137fec] cursor-pointer"
          >
            Open Hostel List
          </button>
        </div>

        {isLoading ? (
          <p className="text-sm text-slate-300">Loading eligible hostels...</p>
        ) : hostels.length === 0 ? (
          <p className="text-sm text-slate-300">
            No hostel currently matches your profile.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hostels.map((hostel) => (
              <div
                key={hostel.hostel_id}
                className="rounded-xl border border-white/10 bg-[#0b1118]/60 p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-bold text-white">
                      {hostel.hostel_name}
                    </p>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400 mt-1">
                      Hostel ID {hostel.hostel_id}
                    </p>
                  </div>
                  <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-bold uppercase text-sky-300">
                    {hostel.gender}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
