import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./components/Pages/AdminDashboard";
import AllBookings from "./components/Pages/AllBookings";
import BookingPage from "./components/Pages/BookingPage";
import Login from "./components/Pages/Login";
import ManualBooking from "./components/Pages/ManualBooking";
import PaymentCheckout from "./components/Pages/PaymentCheckout";
import RoomManagement from "./components/Pages/RoomManagement";
import StudentDashboard from "./components/Pages/StudentDashboard";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthContext";

const AuthLayout = ({ children }) => (
  <div className="min-h-screen relative flex flex-col font-sans text-slate-300 selection:bg-[#137fec]/30 overflow-hidden">
    <div className="fixed inset-0 z-0 pointer-events-none">
      <img
        alt="Modern university campus architecture"
        className="w-full h-full object-cover"
        src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop"
      />
      <div className="absolute inset-0 bg-[#0b1118]/95 bg-blend-multiply backdrop-blur-[2px]" />
      <div className="absolute top-[10%] left-[20%] w-96 h-96 bg-[#137fec]/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-[10%] right-[10%] w-80 h-80 bg-emerald-500/5 rounded-full blur-[120px]" />
    </div>
    <div className="relative z-10 flex flex-col grow w-full">
      <Navbar />
      <main className="grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {children}
      </main>
      <footer className="border-t border-white/10 bg-[#0b1118]/60 backdrop-blur-md mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-6 gap-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#137fec]/30 to-transparent border border-[#137fec]/40">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3"
                  />
                </svg>
              </div>
              <p className="text-xs text-slate-400">
                © 2026 GLA University. Hostel management portal.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-xs text-slate-400">
                Frontend aligned to live backend routes
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
);

const App = () => {
  const { isAuthenticated, role } = useAuth();
  const defaultPath = isAuthenticated
    ? role === "admin"
      ? "/admin/dashboard"
      : "/student/dashboard"
    : "/login";

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: "#15202b",
            color: "#f8fafc",
            border: "1px solid rgba(255,255,255,0.12)",
          },
          success: { iconTheme: { primary: "#34d399", secondary: "#0b1118" } },
          error: { iconTheme: { primary: "#f87171", secondary: "#0b1118" } },
        }}
      />
      <Routes>
        <Route path="/" element={<Navigate to={defaultPath} replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRole="student">
              <AuthLayout>
                <StudentDashboard />
              </AuthLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/booking"
          element={
            <ProtectedRoute allowedRole="student">
              <AuthLayout>
                <BookingPage />
              </AuthLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/checkout"
          element={
            <ProtectedRoute allowedRole="student">
              <AuthLayout>
                <PaymentCheckout />
              </AuthLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AuthLayout>
                <AdminDashboard />
              </AuthLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute allowedRole="admin">
              <AuthLayout>
                <AllBookings />
              </AuthLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/rooms"
          element={
            <ProtectedRoute allowedRole="admin">
              <AuthLayout>
                <RoomManagement />
              </AuthLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/booking"
          element={
            <ProtectedRoute allowedRole="admin">
              <AuthLayout>
                <ManualBooking />
              </AuthLayout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to={defaultPath} replace />} />
      </Routes>
    </>
  );
};

export default App;
