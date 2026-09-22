'use client';

import { useAppStore } from '@/store/useAppStore';

export function PostcardForm() {
  const { postcardTitle, setPostcardTitle, postcardMessage, setPostcardMessage } = useAppStore();

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Message Details</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            Postcard Title
          </label>
          <input
            type="text"
            value={postcardTitle}
            onChange={(e) => setPostcardTitle(e.target.value)}
            className="w-full bg-slate-950 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all font-bold"
            placeholder="e.g. Summer in Vice City"
            maxLength={40}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            Custom Message
          </label>
          <textarea
            value={postcardMessage}
            onChange={(e) => setPostcardMessage(e.target.value)}
            className="w-full bg-slate-950 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all min-h-[120px] resize-none"
            placeholder="Write your message here..."
            maxLength={150}
          />
        </div>
      </div>
    </div>
  );
}
