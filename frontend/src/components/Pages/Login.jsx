import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [isStudent, setIsStudent] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    setErrorMessage('');
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    // --- SIMULATE API CALL ---
    setTimeout(() => {
      if (formData.email.endsWith('@gla.ac.in') && formData.password) {
        // Simulate successful login
        // In a real app, you would save the token: localStorage.setItem('authToken', 'your_jwt_token');
        setIsSubmitting(false);
        const destination = isStudent ? '/student/dashboard' : '/admin/dashboard';
        navigate(destination);
      } else {
        setErrorMessage('Invalid credentials or email domain.');
        setIsSubmitting(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen relative flex flex-col font-sans text-slate-900 dark:text-white bg-[#101922] overflow-hidden">
      
      <div className="absolute inset-0 z-0">
        <img
          alt="University campus buildings at dusk"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnXKleNz5LerblYDkOheUbGHPZ9XQLFW3caEN32IE50czVqgCn7gCham6diXu4UFu0XhwYRxTbtWr7DtazHYO5dTNHgMpmNiM-eGvgIRPjcgaxtItsRAfivUmeN0un0_WqoMXCBQ6fKiNpMRdvMULv2YRJr6aji_9lF_ZwtSE-Edfvy3Tni1k9I5ZtL7P3MQH9zyM3FkJFpcqIdFHxyt1kn83Azj582Kot1D8fumKPoOGnnlOwtix6HkAv1TvHcwddb9rTyo0c4-Y"
        />
        <div className="absolute inset-0 bg-[#101922]/90 bg-blend-multiply"></div>
        <div className="absolute -top-[20%] -left-[10%] w-96 h-96 bg-[#137fec]/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[10%] right-[10%] w-72 h-72 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      </div>

      <main className="relative z-10 grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        
        <div className="w-full max-w-md animate-[fadeIn_0.5s_ease-out]">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[#137fec]/10 mb-4 border border-[#137fec]/20 shadow-[0_0_15px_rgba(19,127,236,0.3)]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#137fec]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.499 5.24 50.552 50.552 0 00-2.658.813m-15.482 0A50.55 50.55 0 0112 13.489a50.551 50.551 0 0112-4.82 50.55 50.55 0 01-5.223 9.58m-13.553-.33c-.88 5.895 2.76 9.698 2.76 9.698" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white mb-2">GLA University</h1>
            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Hostel Allocation Portal</p>
          </div>

          <div 
            className="rounded-xl shadow-2xl p-8 transition-all duration-300 backdrop-blur-md"
            style={{ backgroundColor: 'rgba(24, 36, 48, 0.7)', border: '1px solid rgba(255, 255, 255, 0.05)' }}
          >
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-medium text-emerald-400">System Online</span>
              </div>
              <span className="text-xs text-slate-500 font-mono">FCFS Mode Active</span>
            </div>

            <div className="bg-[#101922]/50 p-1 rounded-lg flex mb-8 border border-white/5 relative">
              <button
                onClick={() => setIsStudent(true)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${ isStudent ? 'bg-[#137fec] text-white shadow-lg shadow-[#137fec]/25' : 'text-slate-400 hover:text-white hover:bg-white/5' }`}
              >
                Student
              </button>
              <button
                onClick={() => setIsStudent(false)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${ !isStudent ? 'bg-[#137fec] text-white shadow-lg shadow-[#137fec]/25' : 'text-slate-400 hover:text-white hover:bg-white/5' }`}
              >
                Admin
              </button>
            </div>

             <form onSubmit={handleSubmit} className="space-y-5">
               {errorMessage && (
                <div className="rounded-lg border px-3 py-2 text-sm border-red-400/30 bg-red-900/20 text-red-200">
                  {errorMessage}
                </div>
               )}
               
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-300" htmlFor="email">University Email ID</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500 group-focus-within:text-[#137fec] transition-colors" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                  </div>
                  <input id="email" name="email" type="email" required value={formData.email} onChange={handleInputChange} disabled={isSubmitting} placeholder="roll_number@gla.ac.in"
                    className="block w-full pl-10 pr-3 py-2.5 bg-[#101922]/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#137fec] focus:ring-1 focus:ring-[#137fec] sm:text-sm transition-all shadow-inner" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-300" htmlFor="password">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500 group-focus-within:text-[#137fec] transition-colors" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                  </div>
                  <input id="password" name="password" type={showPassword ? "text" : "password"} required value={formData.password} onChange={handleInputChange} disabled={isSubmitting} placeholder="••••••••"
                    className="block w-full pl-10 pr-10 py-2.5 bg-[#101922]/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#137fec] focus:ring-1 focus:ring-[#137fec] sm:text-sm transition-all shadow-inner" />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500 hover:text-slate-300 transition-colors" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                    ) : ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500 hover:text-slate-300 transition-colors" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" /><path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.742L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.064 7 9.542 7 .847 0 1.669-.105 2.454-.303z" /></svg>
                    )}
                  </div>
                </div>
                <div className="flex justify-end pt-1"><a href="#" className="text-xs font-medium text-[#137fec] hover:text-blue-400 transition-colors">Forgot password?</a></div>
              </div>

              <button type="submit" disabled={isSubmitting}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-[#137fec] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-[#137fec] transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99]"
              >
                {isSubmitting ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : 'Secure Login'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
