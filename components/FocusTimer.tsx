
import React, { useState, useEffect, useCallback } from 'react';

interface FocusTimerProps {
  onClose: () => void;
}

const FOCUS_TIME = 25 * 60; // 25 minutes
const BREAK_TIME = 5 * 60;  // 5 minutes

const FocusTimer: React.FC<FocusTimerProps> = ({ onClose }) => {
  const [isFocusing, setIsFocusing] = useState(true);
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [isActive, setIsActive] = useState(false);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setIsFocusing(true);
    setTimeLeft(FOCUS_TIME);
  }, []);

  useEffect(() => {
    let interval: number | undefined = undefined;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Time's up, switch modes
      new Audio('/notification.mp3').play().catch(e => console.log("Audio play failed", e)); // Placeholder sound
      setIsActive(false);
      if (isFocusing) {
        setIsFocusing(false);
        setTimeLeft(BREAK_TIME);
      } else {
        setIsFocusing(true);
        setTimeLeft(FOCUS_TIME);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, isFocusing]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = (isFocusing ? (FOCUS_TIME - timeLeft) / FOCUS_TIME : (BREAK_TIME - timeLeft) / BREAK_TIME) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-sm p-6 md:p-8" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{isFocusing ? 'Focus Session' : 'Short Break'}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="relative h-48 w-48 mx-auto my-8 flex items-center justify-center">
            <svg className="absolute inset-0" viewBox="0 0 100 100">
                <circle className="stroke-current text-slate-200 dark:text-slate-700" strokeWidth="5" cx="50" cy="50" r="45" fill="transparent" />
                <circle 
                    className={`stroke-current ${isFocusing ? 'text-blue-500' : 'text-emerald-500'}`}
                    strokeWidth="5" cx="50" cy="50" r="45" fill="transparent"
                    strokeDasharray="282.74"
                    strokeDashoffset={282.74 - (progress / 100) * 282.74}
                    transform="rotate(-90 50 50)"
                    style={{ transition: 'stroke-dashoffset 1s linear' }}
                />
            </svg>
            <div className="text-5xl font-mono font-bold">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button onClick={toggleTimer} className={`w-28 text-white font-bold py-3 px-4 rounded-lg transition-colors ${isActive ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-600 hover:bg-blue-700'}`}>
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button onClick={resetTimer} className="w-28 bg-slate-200 dark:bg-slate-700 font-bold py-3 px-4 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default FocusTimer;
