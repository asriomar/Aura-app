
import React, { useState } from 'react';
import { BufferCategory, BufferActivity } from '../types';
import { BrainIcon, HeartIcon, SparklesIcon, ScaleIcon } from './icons/Icons';

const activities: BufferActivity[] = [
    { id: '1', category: BufferCategory.MIND, title: '5-min Meditation', description: 'Clear your mind and reset.', icon: BrainIcon },
    { id: '2', category: BufferCategory.BODY, title: 'Stretch', description: 'Loosen up your muscles.', icon: ScaleIcon },
    { id: '3', category: BufferCategory.SENSES, title: 'Listen to a Song', description: 'Tune into your favorite track.', icon: SparklesIcon },
    { id: '4', category: BufferCategory.MIND, title: 'Journal One Thought', description: 'Write down what\'s on your mind.', icon: BrainIcon },
    { id: '5', category: BufferCategory.BODY, title: 'Walk Around', description: 'Get your blood flowing.', icon: ScaleIcon },
    { id: '6', category: BufferCategory.SENSES, title: 'Smell a Scent', description: 'Light a candle or smell some coffee.', icon: SparklesIcon },
];

interface BufferModalProps {
  onClose: () => void;
  onComplete: () => void;
}

const BufferModal: React.FC<BufferModalProps> = ({ onClose, onComplete }) => {
    const [selectedActivity, setSelectedActivity] = useState<BufferActivity | null>(null);

    const handleSelect = (activity: BufferActivity) => {
      setSelectedActivity(activity);
      setTimeout(() => {
        onComplete();
      }, 500);
    }
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg p-6 md:p-8 text-center" onClick={e => e.stopPropagation()}>
          <div className="mx-auto bg-emerald-100 dark:bg-emerald-900/50 rounded-full h-16 w-16 flex items-center justify-center">
            <HeartIcon className="h-8 w-8 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold mt-4">Great Work!</h2>
          <p className="text-slate-600 dark:text-slate-300 mt-2 mb-6">Time for a well-deserved break. Pick a restorative activity to recharge.</p>

          <div className="space-y-3">
            {activities.map(activity => (
              <button 
                key={activity.id}
                onClick={() => handleSelect(activity)}
                className={`w-full text-left p-4 rounded-lg border-2 flex items-center gap-4 transition-all duration-300
                  ${selectedActivity?.id === activity.id ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/50 scale-105' : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600'}`}
              >
                <activity.icon className="h-6 w-6 text-slate-500"/>
                <div>
                  <h4 className="font-semibold">{activity.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{activity.description}</p>
                </div>
              </button>
            ))}
          </div>

          <button onClick={onClose} className="mt-6 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
            Skip for now
          </button>
        </div>
      </div>
    );
};

export default BufferModal;
