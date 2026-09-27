'use client';

import { useAppStore } from '@/store/useAppStore';

const TITLE_MAX = 40;
const MESSAGE_MAX = 150;

export function PostcardForm() {
  const { postcardTitle, setPostcardTitle, postcardMessage, setPostcardMessage } = useAppStore();

  return (
    <section aria-labelledby="message-details-title" className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
      <h2 id="message-details-title" className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-6">Message Details</h2>

      <div className="space-y-6">
        <div>
          <label htmlFor="postcard-title" className="block text-xs font-bold text-slate-300 uppercase tracking-widest mb-2">
            Postcard Title
          </label>
          <input
            id="postcard-title"
            type="text"
            value={postcardTitle}
            onChange={(e) => setPostcardTitle(e.target.value)}
            aria-describedby="postcard-title-count"
            className="w-full bg-slate-950 border border-white/10 text-white placeholder-slate-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500/60 focus:border-pink-500/50 transition-all font-bold"
            placeholder="e.g. Summer in Vice City"
            maxLength={TITLE_MAX}
          />
          <p id="postcard-title-count" className="mt-1.5 text-right text-xs text-slate-400">
            {postcardTitle.length} / {TITLE_MAX}
          </p>
        </div>

        <div>
          <label htmlFor="postcard-message" className="block text-xs font-bold text-slate-300 uppercase tracking-widest mb-2">
            Custom Message
          </label>
          <textarea
            id="postcard-message"
            value={postcardMessage}
            onChange={(e) => setPostcardMessage(e.target.value)}
            aria-describedby="postcard-message-count"
            className="w-full bg-slate-950 border border-white/10 text-white placeholder-slate-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500/60 focus:border-pink-500/50 transition-all min-h-[120px] resize-none"
            placeholder="Write your message here..."
            maxLength={MESSAGE_MAX}
          />
          <p id="postcard-message-count" className="mt-1.5 text-right text-xs text-slate-400">
            {postcardMessage.length} / {MESSAGE_MAX}
          </p>
        </div>
      </div>
    </section>
  );
}
