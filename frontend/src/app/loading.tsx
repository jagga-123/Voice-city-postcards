export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center">
      {/* GTA-style loader */}
      <div className="relative flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 mb-8 animate-pulse tracking-widest uppercase">
          Loading
        </h1>
        <div className="w-64 h-2 bg-slate-900 rounded-full overflow-hidden border border-white/10">
          <div className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 w-full animate-[shimmer_1.5s_infinite]" style={{ backgroundSize: '200% 100%' }} />
        </div>
      </div>
    </div>
  );
}
