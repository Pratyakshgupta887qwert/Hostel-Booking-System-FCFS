import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getEligibleHostels, getErrorMessage } from "../../services/api";

const BookingPage = () => {
  const navigate = useNavigate();
  const [hostels, setHostels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHostels = async () => {
      setIsLoading(true);

      try {
        const response = await getEligibleHostels();
        setHostels(response);
      } catch (error) {
        toast.error(getErrorMessage(error, "Unable to load hostels."));
      } finally {
        setIsLoading(false);
      }
    };

    loadHostels();
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-[#15202b]/40 border border-white/10 p-6 rounded-2xl backdrop-blur-md shadow-2xl">
        <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-lg">
          Eligible Hostels
        </h1>
        <p className="text-slate-300 text-sm mt-2 font-medium">
          Connected to the backend hostel eligibility endpoint.
        </p>
      </div>

      <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 p-5 text-sm text-amber-100">
        The backend currently returns only eligible hostels. Room listing, FCFS
        bed locking, and payment initiation endpoints are not available yet, so
        this page stops at hostel discovery.
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-white/10 bg-[#15202b]/60 p-6 text-sm text-slate-300">
          Loading eligible hostels...
        </div>
      ) : hostels.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#15202b]/60 p-6 text-sm text-slate-300">
          No hostels are available for your profile right now.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hostels.map((hostel) => (
            <div
              key={hostel.hostel_id}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#15202b]/60 p-6 backdrop-blur-xl shadow-2xl"
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-white drop-shadow-md">
                  {hostel.hostel_name}
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 text-slate-200 border border-slate-600">
                  {hostel.gender}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border mb-6 bg-[#0b1118]/40 border-white/10">
                <span className="text-sm font-semibold text-slate-200">
                  Hostel ID
                </span>
                <span className="text-2xl font-black font-mono text-emerald-400">
                  {hostel.hostel_id}
                </span>
              </div>

              <button
                onClick={() => navigate("/student/checkout")}
                className="w-full py-3.5 rounded-xl text-sm font-bold bg-[#0b1118]/70 text-slate-300 border border-white/10 hover:bg-white/10 cursor-pointer"
              >
                Why booking is disabled
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingPage;
