import React, { useState, useEffect, useCallback } from 'react';
import { Task, Workload, WorkloadLevel, WorkloadHistoryEntry } from './types';
import { getWorkloadAnalysis, chunkTask, getKindnessPrompt } from './services/geminiService';
import Header from './components/Header';
import WorkloadWeather from './components/WorkloadWeather';
import TaskList from './components/TaskList';
import AddTaskModal from './components/AddTaskModal';
import BufferModal from './components/BufferModal';
import SocialPrompt from './components/SocialPrompt';
import FocusTimer from './components/FocusTimer';

const checkBurnoutStreak = (history: WorkloadHistoryEntry[]): number => {
    const sortedHistory = [...history].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    if (sortedHistory.length === 0) return 0;

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const latestEntryDate = new Date(sortedHistory[0].date);
    latestEntryDate.setHours(0, 0, 0, 0);

    const timeDiff = currentDate.getTime() - latestEntryDate.getTime();
    if (timeDiff > 24 * 60 * 60 * 1000) {
        return 0; // Latest entry is not recent, no active streak
    }

    if(timeDiff > 0 && timeDiff <= 24 * 60 * 60 * 1000) {
        currentDate.setDate(currentDate.getDate() - 1); // Start check from yesterday
    }
    
    for (const entry of sortedHistory) {
        const entryDate = new Date(entry.date);
        entryDate.setHours(0, 0, 0, 0);

        if (entryDate.getTime() === currentDate.getTime() && entry.level === WorkloadLevel.HEAVY) {
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        } else if (entryDate.getTime() < currentDate.getTime()) {
             break; // Streak is broken by a non-heavy day or a gap
        }
    }
    return streak;
};


const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [workload, setWorkload] = useState<Workload>({ level: WorkloadLevel.LIGHT, advice: 'Start your week fresh!' });
  const [workloadHistory, setWorkloadHistory] = useState<WorkloadHistoryEntry[]>([]);
  const [burnoutAlert, setBurnoutAlert] = useState<{ active: boolean; streak: number }>({ active: false, streak: 0 });
  const [socialPrompt, setSocialPrompt] = useState<string>('');
  const [isAddTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [isBufferModalOpen, setBufferModalOpen] = useState(false);
  const [isFocusTimerOpen, setFocusTimerOpen] = useState(false);
  const [streak, setStreak] = useState<number>(0);

  useEffect(() => {
    const savedTasks = localStorage.getItem('aura_tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    const savedStreak = localStorage.getItem('aura_streak');
    if(savedStreak) {
      setStreak(parseInt(savedStreak, 10));
    }
    const savedHistory = localStorage.getItem('aura_workload_history');
    if(savedHistory) {
      const history = JSON.parse(savedHistory);
      setWorkloadHistory(history);
      const currentStreak = checkBurnoutStreak(history);
      if (currentStreak >= 3) {
        setBurnoutAlert({ active: true, streak: currentStreak });
      }
    }
  }, []);

  const analyzeWorkload = useCallback(async (currentTasks: Task[]) => {
    if (currentTasks.filter(t => !t.completed).length > 0) {
      try {
        const analysis = await getWorkloadAnalysis(currentTasks);
        setWorkload(analysis);

        setWorkloadHistory(prevHistory => {
            const todayStr = new Date().toISOString().split('T')[0];
            const newHistory = prevHistory.filter(h => h.date !== todayStr);
            const updatedHistory = [...newHistory, { date: todayStr, level: analysis.level }];
            
            const currentStreak = checkBurnoutStreak(updatedHistory);
            if (currentStreak >= 3) {
                setBurnoutAlert({ active: true, streak: currentStreak });
            } else {
                setBurnoutAlert({ active: false, streak: 0 });
            }
            return updatedHistory;
        });

      } catch (error) {
        console.error("Error analyzing workload:", error);
        setWorkload({ level: WorkloadLevel.MODERATE, advice: 'Stay focused and you will get it done!' });
      }
    } else {
      setWorkload({ level: WorkloadLevel.LIGHT, advice: 'All clear! Enjoy your free time.' });
      setBurnoutAlert({ active: false, streak: 0 });
    }
  }, []);
  
  const fetchSocialPrompt = useCallback(async () => {
    try {
      const prompt = await getKindnessPrompt();
      setSocialPrompt(prompt);
    } catch (error) {
      console.error("Error fetching social prompt:", error);
      setSocialPrompt("Smile at a stranger today.");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('aura_tasks', JSON.stringify(tasks));
    analyzeWorkload(tasks);
  }, [tasks, analyzeWorkload]);

  useEffect(() => {
    localStorage.setItem('aura_streak', streak.toString());
  }, [streak]);
  
  useEffect(() => {
    localStorage.setItem('aura_workload_history', JSON.stringify(workloadHistory));
  }, [workloadHistory]);

  useEffect(() => {
    fetchSocialPrompt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddTask = async (taskData: Omit<Task, 'id' | 'subtasks' | 'completed'>) => {
    const subtasksText = await chunkTask(taskData.title);
    const newSubtasks = subtasksText.map(text => ({ id: crypto.randomUUID(), text, completed: false }));
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      subtasks: newSubtasks,
      completed: false
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
    setAddTaskModalOpen(false);
  };
  
  const handleToggleSubtask = (taskId: string, subtaskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, subtasks: task.subtasks.map(sub => sub.id === subtaskId ? { ...sub, completed: !sub.completed } : sub) } 
        : task
    ));
  };

  const handleCompleteTask = (taskId: string) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: true } : task));
    setBufferModalOpen(true);
  };

  const handleBufferCompleted = () => {
    setStreak(prev => prev + 1);
    setBufferModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans">
      <Header onFocusClick={() => setFocusTimerOpen(true)} />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <WorkloadWeather 
              workload={workload} 
              burnoutAlert={burnoutAlert} 
              onScheduleBuffer={() => setBufferModalOpen(true)} 
            />
            <TaskList tasks={tasks} onCompleteTask={handleCompleteTask} onToggleSubtask={handleToggleSubtask} />
          </div>
          <div>
            <SocialPrompt prompt={socialPrompt} streak={streak} onRefresh={fetchSocialPrompt} />
          </div>
        </div>
      </main>

      <div className="fixed bottom-8 right-8">
        <button
          onClick={() => setAddTaskModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-full shadow-lg transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-label="Add new task"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {isAddTaskModalOpen && <AddTaskModal onClose={() => setAddTaskModalOpen(false)} onAddTask={handleAddTask} />}
      {isBufferModalOpen && <BufferModal onClose={() => setBufferModalOpen(false)} onComplete={handleBufferCompleted} />}
      {isFocusTimerOpen && <FocusTimer onClose={() => setFocusTimerOpen(false)} />}
    </div>
  );
};

export default App;