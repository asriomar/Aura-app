import React from 'react';
import { Workload, WorkloadLevel } from '../types';
import { SunIcon, CloudIcon, ZapIcon, ExclamationTriangleIcon } from './icons/Icons';

interface WorkloadWeatherProps {
  workload: Workload;
  burnoutAlert: { active: boolean; streak: number };
  onScheduleBuffer: () => void;
}

const workloadStyles = {
  [WorkloadLevel.LIGHT]: {
    icon: <SunIcon className="h-10 w-10 text-yellow-400" />,
    gradient: 'from-sky-500 to-blue-500',
    title: 'Light Drizzle',
  },
  [WorkloadLevel.MODERATE]: {
    icon: <CloudIcon className="h-10 w-10 text-slate-400" />,
    gradient: 'from-slate-500 to-gray-600',
    title: 'Getting Busy',
  },
  [WorkloadLevel.HEAVY]: {
    icon: <ZapIcon className="h-10 w-10 text-red-500" />,
    gradient: 'from-red-600 to-rose-700',
    title: 'Stormy Weather',
  },
};

const WorkloadWeather: React.FC<WorkloadWeatherProps> = ({ workload, burnoutAlert, onScheduleBuffer }) => {
  const styles = workloadStyles[workload.level];

  return (
    <div className="mb-8">
        <div className={`p-6 rounded-2xl bg-gradient-to-br ${styles.gradient} text-white shadow-lg`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{styles.title}</h2>
              <p className="text-sm opacity-90 mt-1">{workload.advice}</p>
            </div>
            <div className="flex-shrink-0">
              {styles.icon}
            </div>
          </div>
        </div>

        {burnoutAlert.active && (
            <div className="mt-4 p-4 rounded-2xl bg-amber-100 dark:bg-amber-900/50 border border-amber-300 dark:border-amber-800 flex items-start gap-4">
                <ExclamationTriangleIcon className="h-6 w-6 text-amber-500 flex-shrink-0 mt-1" />
                <div>
                    <h4 className="font-bold text-amber-800 dark:text-amber-200">Burnout Alert</h4>
                    <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                        Your workload has been stormy for {burnoutAlert.streak} days. Remember to prioritize rest.
                    </p>
                    <button
                        onClick={onScheduleBuffer}
                        className="mt-3 text-sm font-semibold bg-amber-500 text-white px-3 py-1.5 rounded-lg hover:bg-amber-600 transition-colors"
                    >
                        Schedule De-Stress Block
                    </button>
                </div>
            </div>
        )}
    </div>
  );
};

export default WorkloadWeather;