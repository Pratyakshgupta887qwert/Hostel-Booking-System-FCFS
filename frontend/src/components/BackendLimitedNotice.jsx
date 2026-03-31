const BackendLimitedNotice = ({ title, description, points = [] }) => (
  <div className="space-y-8 animate-fadeIn">
    <div className="bg-[#15202b]/40 border border-white/10 p-6 rounded-2xl backdrop-blur-md shadow-2xl">
      <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-lg">
        {title}
      </h1>
      <p className="text-slate-300 text-sm mt-2 font-medium">{description}</p>
    </div>

    <div className="bg-[#15202b]/60 border border-amber-400/30 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl">
      <div className="flex items-start gap-4">
        <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-400/15 border border-amber-400/30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-amber-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
            />
          </svg>
        </div>
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-white">
              Frontend aligned to current backend
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              This screen stays read-only because the backend does not expose an
              endpoint for the action yet.
            </p>
          </div>

          {points.length > 0 && (
            <ul className="space-y-2 text-sm text-slate-300">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-300" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default BackendLimitedNotice;
