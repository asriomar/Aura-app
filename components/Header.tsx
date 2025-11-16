
import React from 'react';
import { SunIcon, MoonIcon, ClockIcon } from './icons/Icons';

interface HeaderProps {
  onFocusClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onFocusClick }) => {
  // A simple theme toggler can be implemented here if needed
  // For now, it's just a placeholder.
  return (
    <header className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg sticky top-0 z-10 border-b border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4 md:px-8 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-2 rounded-lg">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">Aura</h1>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={onFocusClick}
            className="flex items-center gap-2 text-sm font-medium bg-slate-100 dark:bg-slate-700 px-3 py-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
          >
            <ClockIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Focus Mode</span>
          </button>
          {/* Theme toggle can be added here */}
        </div>
      </div>
    </header>
  );
};

export default Header;
