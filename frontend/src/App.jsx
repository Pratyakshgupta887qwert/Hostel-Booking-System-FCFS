import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import Pages
import Login from './components/Pages/Login';
import StudentDashboard from './components/Pages/StudentDashboard';
import BookingPage from './components/Pages/BookingPage';
import PaymentCheckout from './components/Pages/PaymentCheckout';
import AdminDashboard from './components/Pages/AdminDashboard';
import AllBookings from './components/Pages/AllBookings'; // <-- IMPORT THE NEW PAGE

// Import Shared Components
import Navbar from './components/Navbar';

// AuthLayout remains the same
const AuthLayout = ({ children }) => (
  // ... (no changes needed here)
  <div className="min-h-screen relative flex flex-col font-sans text-slate-300 selection:bg-[#137fec]/30 overflow-hidden"><div className="fixed inset-0 z-0 pointer-events-none"><img alt="background" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop" /><div className="absolute inset-0 bg-[#0b1118]/95"></div></div><div className="relative z-10 flex flex-col grow w-full"><Navbar /><main className="grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">{children}</main><footer className="border-t border-white/5 bg-[#0b1118]/60 py-6 mt-auto"><div className="max-w-7xl mx-auto px-4 text-xs text-slate-500"><p>© 2026 GLA University.</p></div></footer></div></div>
);


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      
      {/* Student Routes */}
      <Route path="/student/dashboard" element={<AuthLayout><StudentDashboard /></AuthLayout>} />
      <Route path="/student/booking" element={<AuthLayout><BookingPage /></AuthLayout>} />
      <Route path="/student/checkout" element={<AuthLayout><PaymentCheckout /></AuthLayout>} />

      {/* --- ADMIN ROUTES --- */}
      <Route path="/admin/dashboard" element={<AuthLayout><AdminDashboard /></AuthLayout>} />
      
      {/* ADD THE NEW ROUTE FOR VIEWING ALL BOOKINGS */}
      <Route 
        path="/admin/bookings" 
        element={<AuthLayout><AllBookings /></AuthLayout>} 
      />

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;