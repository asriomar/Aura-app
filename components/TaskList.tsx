
import React from 'react';
import { Task } from '../types';
import TaskItem from './TaskItem';
import { ClipboardListIcon } from './icons/Icons';

interface TaskListProps {
  tasks: Task[];
  onCompleteTask: (taskId: string) => void;
  onToggleSubtask: (taskId: string, subtaskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onCompleteTask, onToggleSubtask }) => {
  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);
  
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm">
      <h3 className="text-xl font-bold mb-4">Your Tasks</h3>
      {activeTasks.length > 0 ? (
        <div className="space-y-4">
          {activeTasks.map(task => (
            <TaskItem key={task.id} task={task} onCompleteTask={onCompleteTask} onToggleSubtask={onToggleSubtask} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-slate-500 dark:text-slate-400">
          <ClipboardListIcon className="h-12 w-12 mx-auto text-slate-400" />
          <p className="mt-2 font-medium">No active tasks!</p>
          <p className="text-sm">Add a new task to get started.</p>
        </div>
      )}

      {completedTasks.length > 0 && (
         <details className="mt-8">
            <summary className="font-semibold text-slate-600 dark:text-slate-300 cursor-pointer">
              Completed ({completedTasks.length})
            </summary>
            <div className="space-y-4 mt-4">
              {completedTasks.map(task => (
                <TaskItem key={task.id} task={task} onCompleteTask={() => {}} onToggleSubtask={() => {}} />
              ))}
            </div>
          </details>
      )}
    </div>
  );
};

export default TaskList;
