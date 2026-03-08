import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// --- Import All Page Components ---
import Login from "./components/Pages/Login";
import StudentDashboard from "./components/Pages/StudentDashboard";
import BookingPage from "./components/Pages/BookingPage";
import PaymentCheckout from "./components/Pages/PaymentCheckout";
import AdminDashboard from "./components/Pages/AdminDashboard";
import AllBookings from "./components/Pages/AllBookings";
import RoomManagement from "./components/Pages/RoomManagement";
import ManualBooking from "./components/Pages/ManualBooking";

// --- Import Shared Components ---
import Navbar from "./components/Navbar";

/**
 * AuthLayout Component
 * This component provides a consistent wrapper for all authenticated pages.
 * It includes the global background, the navigation bar, and the footer.
 */
const AuthLayout = ({ children }) => (
  <div className="min-h-screen relative flex flex-col font-sans text-slate-300 selection:bg-[#137fec]/30 overflow-hidden">
    {/* Global background styling */}
    <div className="fixed inset-0 z-0 pointer-events-none">
      <img
        alt="Modern university campus architecture"
        className="w-full h-full object-cover"
        src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop"
      />
      <div className="absolute inset-0 bg-[#0b1118]/95 bg-blend-multiply backdrop-blur-[2px]"></div>
      <div className="absolute top-[10%] left-[20%] w-96 h-96 bg-[#137fec]/10 rounded-full blur-[150px]"></div>
      <div className="absolute bottom-[10%] right-[10%] w-80 h-80 bg-emerald-500/5 rounded-full blur-[120px]"></div>
    </div>

    <div className="relative z-10 flex flex-col grow w-full">
      <Navbar />

      <main className="grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {children}
      </main>

      <footer className="border-t border-white/10 bg-[#0b1118]/60 backdrop-blur-md mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-6 gap-6">
            {/* Left Side: Logo and Copyright */}
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br from-[#137fec]/30 to-transparent border border-[#137fec]/40">
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
                    d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A11.953 11.953 0 0112 16.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0021 12c0-.778.099-1.533-.284-2.253M12 21a9.004 9.004 0 008.716-6.747"
                  />
                </svg>
              </div>
              <p className="text-xs text-slate-400">
                © 2026 GLA University. FCFS Allocation Engine.
              </p>
            </div>

            {/* Right Side: Links and Socials */}
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
              >
                {/* Support Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
                Support
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
              >
                {/* Terms Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Terms of Allocation
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
);

/**
 * Main App Component
 * This component defines the entire routing structure for the application.
 */
const App = () => {
  return (
    <Routes>
      {/* --- PUBLIC ROUTES --- */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      {/* --- STUDENT ROUTES (Protected by AuthLayout) --- */}
      <Route
        path="/student/dashboard"
        element={
          <AuthLayout>
            <StudentDashboard />
          </AuthLayout>
        }
      />
      <Route
        path="/student/booking"
        element={
          <AuthLayout>
            <BookingPage />
          </AuthLayout>
        }
      />
      <Route
        path="/student/checkout"
        element={
          <AuthLayout>
            <PaymentCheckout />
          </AuthLayout>
        }
      />

      {/* --- ADMIN ROUTES (Protected by AuthLayout) --- */}
      <Route
        path="/admin/dashboard"
        element={
          <AuthLayout>
            <AdminDashboard />
          </AuthLayout>
        }
      />
      <Route
        path="/admin/bookings"
        element={
          <AuthLayout>
            <AllBookings />
          </AuthLayout>
        }
      />
      <Route
        path="/admin/rooms"
        element={
          <AuthLayout>
            <RoomManagement />
          </AuthLayout>
        }
      />
      <Route
        path="/admin/booking"
        element={
          <AuthLayout>
            <ManualBooking />
          </AuthLayout>
        }
      />

      {/* --- FALLBACK ROUTE --- */}
      {/* Redirects any unknown URL back to the login page */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
