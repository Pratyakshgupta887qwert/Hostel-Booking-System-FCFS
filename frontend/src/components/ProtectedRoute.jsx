import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoadingScreen = () => (
  <div className="min-h-screen bg-[#101922] text-white flex items-center justify-center">
    <div className="rounded-2xl border border-white/10 bg-[#15202b]/70 px-6 py-5 shadow-2xl backdrop-blur-xl">
      <p className="text-sm font-semibold tracking-wide text-slate-200">
        Verifying session...
      </p>
    </div>
  </div>
);

const ProtectedRoute = ({ allowedRole, children }) => {
  const location = useLocation();
  const { isAuthenticated, isBootstrapping, role } = useAuth();

  if (isBootstrapping) return <LoadingScreen />;
  if (!isAuthenticated)
    return <Navigate to="/login" replace state={{ from: location }} />;
  if (allowedRole && role !== allowedRole) {
    const fallbackPath =
      role === "admin" ? "/admin/dashboard" : "/student/dashboard";
    return <Navigate to={fallbackPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
