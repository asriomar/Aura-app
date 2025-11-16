
import React from 'react';
import { Task, TaskType } from '../types';
import { AcademicCapIcon, UsersIcon, HeartIcon } from './icons/Icons';

interface TaskItemProps {
  task: Task;
  onCompleteTask: (taskId: string) => void;
  onToggleSubtask: (taskId: string, subtaskId: string) => void;
}

// FIX: Changed JSX.Element to React.ReactElement to avoid issues with the global JSX namespace.
const taskTypeIcons: Record<TaskType, React.ReactElement> = {
  [TaskType.ACADEMIC]: <AcademicCapIcon className="h-5 w-5 text-blue-500" />,
  [TaskType.SOCIAL]: <UsersIcon className="h-5 w-5 text-purple-500" />,
  [TaskType.WELLBEING]: <HeartIcon className="h-5 w-5 text-emerald-500" />,
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onCompleteTask, onToggleSubtask }) => {
  const allSubtasksCompleted = task.subtasks.every(sub => sub.completed);
  const progress = task.subtasks.length > 0 ? (task.subtasks.filter(s => s.completed).length / task.subtasks.length) * 100 : 0;

  return (
    <div className={`p-4 border rounded-lg transition-opacity ${task.completed ? 'opacity-50 bg-slate-50 dark:bg-slate-700/50' : 'bg-transparent dark:bg-slate-800'} border-slate-200 dark:border-slate-700`}>
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3">
            {taskTypeIcons[task.type]}
            <h4 className={`font-semibold ${task.completed ? 'line-through text-slate-500' : 'text-slate-800 dark:text-slate-100'}`}>{task.title}</h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
        </div>
        {!task.completed && (
          <button 
            onClick={() => onCompleteTask(task.id)}
            disabled={!allSubtasksCompleted}
            className="text-xs font-semibold px-3 py-1 rounded-md bg-emerald-500 text-white disabled:bg-slate-300 dark:disabled:bg-slate-600 disabled:cursor-not-allowed hover:bg-emerald-600 transition-colors"
          >
            Done
          </button>
        )}
      </div>

      {task.subtasks.length > 0 && (
        <div className="mt-4 space-y-3">
          <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-1.5">
            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          {task.subtasks.map(subtask => (
            <label key={subtask.id} className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={subtask.completed}
                onChange={() => onToggleSubtask(task.id, subtask.id)}
                disabled={task.completed}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
              />
              <span className={`${subtask.completed ? 'line-through text-slate-500' : 'text-slate-700 dark:text-slate-300'}`}>{subtask.text}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskItem;