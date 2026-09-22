'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Explore', href: '/explore' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-fuchsia-500 to-cyan-400 drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]">
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
                  className="text-gray-300 hover:text-cyan-400 px-3 py-2 text-sm font-bold uppercase tracking-wider transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/postcard"
                className="relative inline-flex group"
              >
                <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-lg blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                <button className="relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white transition-all duration-200 bg-slate-950 font-pj rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 border border-white/10 uppercase tracking-widest">
                  Start Adventure
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
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
                  className="block px-3 py-3 text-base font-bold text-gray-300 hover:text-cyan-400 hover:bg-white/5 rounded-md uppercase tracking-wider transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/postcard"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center mt-4 px-6 py-3 text-base font-bold text-white bg-gradient-to-r from-pink-600 to-cyan-600 rounded-lg shadow-[0_0_15px_rgba(236,72,153,0.5)] uppercase tracking-wider"
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
