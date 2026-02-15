import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Login() {
  const [isStudent, setIsStudent] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white font-['Lexend',sans-serif] text-slate-800 antialiased overflow-hidden relative">
      
      {/* Abstract Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#135bec]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-60 h-60 bg-[#135bec]/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Container */}
      <main className="w-full max-w-md px-6 z-10 flex flex-col h-full justify-between pt-8 pb-8">
        
        {/* Header Section */}
        <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6 mb-8">
          <div className="relative w-24 h-24 bg-white rounded-2xl shadow-[0_4px_20px_-2px_rgba(19,91,236,0.1)] flex items-center justify-center mb-2 ring-1 ring-slate-100">
            <img 
              alt="University Logo Abstract Icon" 
              className="w-16 h-16 object-contain opacity-90" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtST0hgk7z19tIAmmNUqWKsVv-GC2nRD5mX5Krdq3YUXi9WvUAsMno_EUpYJqxdquxondMfQyAmGjCFmbO2kdVx-hvuv5m1XnNx6lC3Czl5OZKTwR2QIgwK8_4WzuQfeT3KCyXmJ4Y-Pqj8z24eCn7j4-QtW4AsTKXTzEf0lHf4aKZl0YJ7LtDJpTWAN-go9V1MFkqaDHFLENWh-zToq18Drox2l2lPd90t6t8DdM5wCk8dFp3Obt3sfrAw1WY8FS5dUSn2NG-h6M"
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">GLA University</h1>
            <p className="text-slate-500 text-sm font-medium">Hostel Booking System</p>
          </div>
        </div>

        {/* Login Form Section */}
        <div className="flex-grow w-full space-y-6">
          
          {/* Role Toggle */}
          <div className="bg-slate-200/50 p-1 rounded-xl flex items-center relative mb-6">
            <button 
              onClick={() => setIsStudent(true)}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                isStudent 
                  ? 'bg-white text-[#135bec] shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Student
            </button>
            <button 
              onClick={() => setIsStudent(false)}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                !isStudent 
                  ? 'bg-white text-[#135bec] shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Admin
            </button>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1" htmlFor="email">
                University Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {/* Mail Icon SVG */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-slate-400 group-focus-within:text-[#135bec] transition-colors">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <input 
                  id="email" 
                  type="email" 
                  placeholder="rollnumber@gla.ac.in" 
                  className="block w-full pl-10 pr-3 py-3.5 bg-white border-0 ring-1 ring-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#135bec] focus:bg-white transition-all shadow-sm sm:text-sm outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500" htmlFor="password">
                  Password
                </label>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {/* Lock Icon SVG */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-slate-400 group-focus-within:text-[#135bec] transition-colors">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter your password" 
                  className="block w-full pl-10 pr-10 py-3.5 bg-white border-0 ring-1 ring-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#135bec] focus:bg-white transition-all shadow-sm sm:text-sm outline-none"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-slate-400 hover:text-slate-600 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-slate-400 hover:text-slate-600 cursor-pointer">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="text-right pt-1">
                <NavLink className="text-xs font-medium text-[#135bec] hover:text-[#0e45b5] transition-colors" to="/forgot-password">
                  Forgot Password?
                </NavLink>
              </div>
            </div>

            {/* Login Button */}
            <button 
              type="submit" 
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-[0_4px_20px_-2px_rgba(19,91,236,0.3)] text-sm font-bold text-white bg-[#135bec] hover:bg-[#0e45b5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#135bec] transition-all active:scale-[0.98]"
            >
              Login to Dashboard
            </button>
          </form>

          {/* Availability Snippet */}
          <div className="bg-[#135bec]/5 border border-[#135bec]/10 rounded-lg p-3 flex items-start space-x-3">
             {/* Info Icon SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-[#135bec] mt-0.5 flex-shrink-0">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
            </svg>
            <p className="text-xs text-slate-600 leading-relaxed">
              Rooms are allocated on a <span className="font-bold text-[#135bec]">First-Come, First-Serve</span> basis. Please login to check real-time availability.
            </p>
          </div>
        </div>

        {/* Footer Section */}
        <div className="pt-6 pb-4 text-center space-y-4">
          <p className="text-sm text-slate-500">
            Don't have a room yet? 
            <NavLink className="font-bold text-[#135bec] hover:text-[#0e45b5] transition-colors ml-1" to="/signup">
              Register for Hostel
            </NavLink>
          </p>
          <div className="flex justify-center space-x-1">
            <div className="h-1 w-1 bg-slate-300 rounded-full"></div>
            <div className="h-1 w-1 bg-slate-300 rounded-full"></div>
            <div className="h-1 w-1 bg-slate-300 rounded-full"></div>
          </div>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-4">
            © GLA University
          </p>
        </div>

      </main>
    </div>
  )
}

export default Login
