import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getAllHostels, getErrorMessage } from "../../services/api";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, refreshProfile } = useAuth();
  const [hostels, setHostels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      setIsLoading(true);

      try {
        await refreshProfile();
        const hostelResponse = await getAllHostels();
        setHostels(hostelResponse);
      } catch (error) {
        toast.error(getErrorMessage(error, "Unable to load admin data."));
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, [refreshProfile]);

  const adminControls = [
    {
      title: "Manual Booking",
      description: "Disabled until backend exposes a booking endpoint.",
      path: "/admin/booking",
    },
    {
      title: "View All Bookings",
      description: "Disabled until backend exposes a booking list endpoint.",
      path: "/admin/bookings",
    },
    {
      title: "Manage Rooms",
      description: "Connected to hostel and room upload APIs.",
      path: "/admin/rooms",
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-[#15202b]/40 border border-white/10 p-6 rounded-2xl backdrop-blur-md shadow-2xl">
        <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-lg">
          Admin Dashboard
        </h1>
        <p className="text-slate-300 text-sm mt-1 font-medium">
          Backend-connected hostel management overview.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#15202b]/60 p-6 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl">
          <p className="text-slate-300 text-sm font-bold uppercase tracking-wider">
            Admin Role
          </p>
          <p className="text-4xl font-black mt-3 drop-shadow-lg text-white">
            {user?.role || "N/A"}
          </p>
        </div>
        <div className="bg-[#15202b]/60 p-6 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl">
          <p className="text-slate-300 text-sm font-bold uppercase tracking-wider">
            Total Hostels
          </p>
          <p className="text-4xl font-black mt-3 drop-shadow-lg text-emerald-400">
            {hostels.length}
          </p>
        </div>
        <div className="bg-[#15202b]/60 p-6 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl">
          <p className="text-slate-300 text-sm font-bold uppercase tracking-wider">
            Active Hostels
          </p>
          <p className="text-4xl font-black mt-3 drop-shadow-lg text-[#3b9cff]">
            {hostels.filter((hostel) => hostel.is_active).length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {adminControls.map((control) => (
          <div
            key={control.title}
            onClick={() => navigate(control.path)}
            className="bg-[#15202b]/60 p-6 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl hover:-translate-y-1 hover:border-[#137fec]/50 hover:bg-[#15202b]/80 transition-all duration-300 cursor-pointer"
          >
            <h3 className="text-lg font-bold text-white">{control.title}</h3>
            <p className="text-sm text-slate-400 mt-2">{control.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#15202b]/60 p-6 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
          <h3 className="text-lg font-extrabold text-white">Backend Hostels</h3>
          <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
            {isLoading ? "Loading" : `${hostels.length} records`}
          </span>
        </div>

        {isLoading ? (
          <p className="text-sm text-slate-300">Loading hostels...</p>
        ) : hostels.length === 0 ? (
          <p className="text-sm text-slate-300">No hostels found.</p>
        ) : (
          <div className="space-y-4">
            {hostels.map((hostel) => (
              <div
                key={hostel.hostel_id}
                className="rounded-xl border border-white/10 bg-[#0b1118]/50 p-4"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="text-base font-bold text-white">
                      {hostel.hostel_name}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      ID {hostel.hostel_id} • Gender {hostel.gender} • Years{" "}
                      {hostel.allowed_years.length > 0
                        ? hostel.allowed_years.join(", ")
                        : "none"}
                    </p>
                  </div>
                  <span className="rounded-full px-3 py-1 text-xs font-bold uppercase border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
                    {hostel.is_active ? "Active" : "Inactive"}
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

export default AdminDashboard;
