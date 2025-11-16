
import React from 'react';
import { FireIcon, RefreshIcon, UsersIcon } from './icons/Icons';

interface SocialPromptProps {
  prompt: string;
  streak: number;
  onRefresh: () => void;
}

const SocialPrompt: React.FC<SocialPromptProps> = ({ prompt, streak, onRefresh }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3 text-purple-500 mb-3">
            <UsersIcon className="h-6 w-6"/>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Kindness Prompt</h3>
        </div>
        <p className="text-slate-600 dark:text-slate-300 italic">"{prompt}"</p>
        <button onClick={onRefresh} className="text-xs text-slate-500 hover:underline mt-3 flex items-center gap-1">
          <RefreshIcon className="h-3 w-3" />
          Get another idea
        </button>
      </div>

       <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3 text-orange-500 mb-3">
            <FireIcon className="h-6 w-6"/>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Well-being Streak</h3>
        </div>
        <div className="text-center">
            <p className="text-5xl font-bold text-orange-500">{streak}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{streak === 1 ? 'Day' : 'Days'} of consistent breaks</p>
        </div>
      </div>
    </div>
  );
};

export default SocialPrompt;
