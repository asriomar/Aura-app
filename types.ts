import React from 'react';

export enum TaskType {
  ACADEMIC = 'ACADEMIC',
  SOCIAL = 'SOCIAL',
  WELLBEING = 'WELLBEING',
}

export interface Subtask {
  id: string;
  text: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  type: TaskType;
  subtasks: Subtask[];
  completed: boolean;
}

export enum WorkloadLevel {
  LIGHT = 'Light Drizzle',
  MODERATE = 'Busy',
  HEAVY = 'Stormy',
}

export interface Workload {
  level: WorkloadLevel;
  advice: string;
}

export interface WorkloadHistoryEntry {
  date: string; // YYYY-MM-DD
  level: WorkloadLevel;
}

export enum BufferCategory {
  MIND = 'Mind',
  BODY = 'Body',
  SENSES = 'Senses',
}

export interface BufferActivity {
  id: string;
  category: BufferCategory;
  title: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}