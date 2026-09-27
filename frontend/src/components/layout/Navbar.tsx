'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { name: 'Home', href: '/' },
  { name: 'Explore', href: '/explore' },
  { name: 'About', href: '/#story' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Escape closes the mobile menu
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const isCurrent = (href: string) => (href === '/' ? pathname === '/' : href.startsWith('/explore') && pathname.startsWith('/explore'));

  return (
    <nav aria-label="Primary" className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" aria-label="Vice City Postcards, home" className="text-2xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-fuchsia-500 to-cyan-400 drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]">
              VICE CITY<br/><span className="text-sm font-medium tracking-widest text-white not-italic drop-shadow-none">POSTCARDS</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  aria-current={isCurrent(link.href) ? 'page' : undefined}
                  className={`px-3 py-2 text-sm font-bold uppercase tracking-wider transition-colors hover:text-cyan-400 ${
                    isCurrent(link.href) ? 'text-white' : 'text-gray-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/explore"
                className="relative inline-flex group"
              >
                <span className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-lg blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt" aria-hidden="true"></span>
                <span className="relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white transition-all duration-200 bg-slate-950 rounded-lg border border-white/10 uppercase tracking-widest">
                  Start Adventure
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 border-b border-white/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={isCurrent(link.href) ? 'page' : undefined}
                  className="block px-3 py-3 text-base font-bold text-gray-300 hover:text-cyan-400 hover:bg-white/5 rounded-md uppercase tracking-wider transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/explore"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center mt-4 px-6 py-3 text-base font-bold text-white bg-gradient-to-r from-pink-700 to-cyan-700 rounded-lg shadow-[0_0_15px_rgba(236,72,153,0.5)] uppercase tracking-wider"
              >
                Start Adventure
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
