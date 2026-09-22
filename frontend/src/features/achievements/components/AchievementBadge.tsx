'use client';

import { Achievement } from '@/types/collection';
import { motion } from 'framer-motion';

interface AchievementBadgeProps {
  achievement: Achievement;
  index: number;
}

export function AchievementBadge({ achievement, index }: AchievementBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, type: 'spring', bounce: 0.4 }}
      className="relative group cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full blur-md opacity-30 group-hover:opacity-60 transition-opacity" />
      <div className="relative w-20 h-20 bg-slate-900 border-2 border-white/20 rounded-full flex items-center justify-center text-4xl shadow-xl z-10 group-hover:border-pink-500 transition-colors">
        {achievement.icon}
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 w-48">
        <div className="bg-slate-950 border border-white/10 p-3 rounded-xl shadow-2xl text-center">
          <p className="text-sm font-bold text-white mb-1">{achievement.name}</p>
          <p className="text-xs text-slate-400">{achievement.description}</p>
        </div>
        {/* Triangle pointer */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-950" />
      </div>
    </motion.div>
  );
}
