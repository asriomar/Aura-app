
import { GoogleGenAI, Type } from "@google/genai";
import { Task, Workload, WorkloadLevel } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // A simple alert for demonstration. In a real app, this would be handled more gracefully.
  alert("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const chunkTask = async (taskTitle: string): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an expert productivity coach. A student has a task: '${taskTitle}'. Break this task down into 3-5 small, actionable steps.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subtasks: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);
    return result.subtasks || [];
  } catch (error) {
    console.error("Error chunking task:", error);
    return ["Research and outline", "Write first draft", "Review and edit"];
  }
};

export const getWorkloadAnalysis = async (tasks: Task[]): Promise<Workload> => {
  const activeTasks = tasks.filter(t => !t.completed).map(t => ({ title: t.title, dueDate: t.dueDate }));
  if(activeTasks.length === 0) {
    return { level: WorkloadLevel.LIGHT, advice: "All clear! Enjoy your free time." };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are a student well-being advisor. Based on the following tasks for the week, analyze the workload. Tasks: ${JSON.stringify(activeTasks)}. Today is ${new Date().toLocaleDateString()}. Classify the workload as 'Light Drizzle', 'Busy', or 'Stormy'. Provide a short, encouraging piece of advice (max 20 words).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            level: { type: Type.STRING, enum: [WorkloadLevel.LIGHT, WorkloadLevel.MODERATE, WorkloadLevel.HEAVY] },
            advice: { type: Type.STRING }
          }
        }
      }
    });

    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);
    return result as Workload;

  } catch (error) {
    console.error("Error analyzing workload:", error);
    if(activeTasks.length < 3) return { level: WorkloadLevel.LIGHT, advice: "Looking good! Keep up the momentum." };
    if(activeTasks.length < 6) return { level: WorkloadLevel.MODERATE, advice: "A busy week, but you can handle it." };
    return { level: WorkloadLevel.HEAVY, advice: "It's a heavy load. Remember to take breaks." };
  }
};


export const getKindnessPrompt = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "You are a positive psychology coach. Provide one simple, low-stakes, positive social action a student can do this week to connect with others. Keep it under 15 words. Example: 'Ask a classmate about their weekend.'",
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error getting kindness prompt:", error);
    return "Send a thank you message to someone who helped you recently.";
  }
};
